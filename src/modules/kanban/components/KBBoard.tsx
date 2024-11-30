import { memo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Chip,
  IconButton,
  Alert,
  Button,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/system";
import { Edit, Delete, Add } from "@mui/icons-material";
import { Task } from "type";
import { mock_board } from "@mock/index";
import { camelToCapital } from "@util/index";
import TaskCard from "./Card";

// Type for Task
type Tasks = {
  [key: string]: Task[];
};

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
  const [tasks, setTasks] = useState<Tasks>(mock_board);
  const [error, setError] = useState<string>("");
  const [editedTask, setEditedTask] = useState<Task | null>(null);

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

  const handleEdit = (task: Task) => {
    setEditedTask(task);
  };

  const handleDelete = (columnId: string, taskIndex: number) => {
    const newTasks = { ...tasks };
    newTasks[columnId].splice(taskIndex, 1);
    setTasks(newTasks);
  };

  const handleUpdateTask = (
    columnId: string,
    taskIndex: number,
    updatedTask: Task
  ) => {
    if (!updatedTask.title || !updatedTask.description) {
      setError("Title and description are required");
      return;
    }

    const newTasks = { ...tasks };
    newTasks[columnId][taskIndex] = updatedTask;
    setTasks(newTasks);
    setEditedTask(null);
    setError("");
  };

  const handleInputChange = (field: keyof Task, value: string) => {
    setEditedTask((prev) => (prev ? { ...prev, [field]: value } : null));
  };

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
                            // editedTask={editedTask}
                            // onEdit={handleEdit}
                            // onInputChange={handleInputChange}
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
