import { memo, use, useEffect, useState } from "react";
import { Box, Paper, Typography, Alert } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/system";
import { ITaskFormPayload, Task, Tasks } from "type";
import { camelToCapital } from "@util/index";
import TaskCard from "./Card";
import axios from "axios";
import Pusher from "pusher-js";
import KBButton from "@components/form/KBButton";
import TaskForm from "./TaskForm";
import { useAppSelector } from "@redux/hooks/hook";

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
  const [addTaskId, setAddTaskId] = useState<string | null>(null); // *Help full for create new task and identify in which board
  const { user } = useAppSelector((state) => state.auth);
  // console.log('uset', user);

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

  const handleDelete = async (columnId: string, taskIndex: number) => {
    await axios.delete("/api/pusher", { data: { columnId, taskIndex } });
  };

  const handleUpdateTask = async (
    columnId: string,
    taskIndex: number,
    updatedTask: Task
  ) => {
    await axios.put("/api/pusher", { columnId, taskIndex, updatedTask });
  };

  const onAddTask = async (columnId: string, payload: ITaskFormPayload) => {
    await axios.post("/api/pusher", { columnId, data: payload });
  };

  // * Add lister for event
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

              {user?.role === "admin" && (
                <KBButton onClick={() => setAddTaskId(columnId)}>
                  Add task +
                </KBButton>
              )}

              {columnId === addTaskId && (
                <TaskForm
                  initialValues={{
                    title: "",
                    description: "",
                  }}
                  onSubmit={(values) => {
                    onAddTask(columnId, Object.assign(values));
                    setAddTaskId(null);
                  }}
                />
              )}

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
                            userRole={user?.role}
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
