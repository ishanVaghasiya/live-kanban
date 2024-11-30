import { memo, useEffect, useState } from "react";
import { Box, Paper, Typography, Alert } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/system";
import { Task, Tasks } from "type";
import { camelToCapital } from "@util/index";
import TaskCard from "./Card";
import axios from "axios";
import Pusher from "pusher-js";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "20px",
  margin: "10px",
  minHeight: "500px",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const ProjectTracker = () => {
  const [tasks, setTasks] = useState<Tasks>({});
  const [error, setError] = useState<string>("");

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceList = tasks[source.droppableId];
    const destList = tasks[destination.droppableId];
    const [removed] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, {
      ...removed,
      status: destination.droppableId,
    });

    setTasks({ ...tasks });
  };

  const handleDelete = (columnId: string, taskIndex: number) => {
    axios.delete("/api/pusher", { data: { columnId, taskIndex } });
  };

  const handleUpdateTask = (
    columnId: string,
    taskIndex: number,
    updatedTask: Task
  ) => {
    axios.put("/api/pusher", { columnId, taskIndex, updatedTask });
  };

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("task_board");

    channel.bind("TASK_LIST", (data: any) => {
      console.log("Received event:", data);
      setTasks(data.mock_database);
    });

    return () => {
      pusher.unsubscribe("task_board");
    };
  }, []);

  //* Fetch intial Data
  useEffect(() => {
    const fetch = async () => {
      await axios.get("/api/pusher").then(({ data }) => {
        setTasks(data.mock_database);
      });
    };
    fetch();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Project Development Tracker
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <StyledPaper key={columnId} elevation={2}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {camelToCapital(columnId)}
              </Typography>

              <Droppable droppableId={columnId}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ flex: 1 }}
                  >
                    {columnTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <TaskCard
                            index={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            task={task}
                            columnId={columnId}
                            onUpdateTask={handleUpdateTask}
                            onDelete={handleDelete}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </StyledPaper>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default memo(ProjectTracker);
