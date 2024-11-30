import { memo } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/system";
import { camelToCapital } from "@util/index";
import TaskCard from "./Card";
import KBButton from "@components/form/KBButton";
import TaskForm from "./TaskForm";
import useKanban from "../hooks/useKanban";

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
  const {
    tasks,
    handleDelete,
    onAddTask,
    handleUpdateTask,
    handleDragEnd,
    addTaskId,
    setAddTaskId,
    user,
  } = useKanban();

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
