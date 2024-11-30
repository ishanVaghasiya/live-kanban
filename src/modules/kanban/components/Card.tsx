// TaskCard.tsx

import { forwardRef, memo, useState } from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Task, TaskStatus } from "type";
import KBButton from "@components/form/KBButton";
import { Form, Formik } from "formik";
import { FormInput } from "@components/form/formik";
import * as Yup from "yup";
import TaskForm from "./TaskForm";
import { camelToCapital } from "@util/index";

interface TaskCardProps {
  task: Task;
  index: number;
  columnId: string;
  onDelete: (columnId: string, taskIndex: number) => void;
  onUpdateTask: (
    columnId: string,
    taskIndex: number,
    updatedTask: Task
  ) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const TaskCard = forwardRef<HTMLElement, TaskCardProps>(
  ({ task, index, columnId, onDelete, onUpdateTask }, ref) => {
    const getStatusColor = (status: TaskStatus) => {
      switch (status) {
        case "backlog":
          return "#ff9800";
        case "inProgress":
          return "#2196f3";
        case "completed":
          return "#4caf50";
        default:
          return "#757575";
      }
    };

    const [isEdit, setIsEdit] = useState(false);

    return (
      <Box
        ref={ref}
        sx={{
          padding: "16px",
          marginBottom: "8px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        {isEdit ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TaskForm
              initialValues={{
                title: task.title,
                description: task.description,
              }}
              onSubmit={(values) => {
                setIsEdit(false);
                onUpdateTask(columnId, index, Object.assign(task, values));
              }}
            />
          </Box>
        ) : (
          <>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle1">{task.title}</Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => setIsEdit(true)}
                  aria-label="edit task"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDelete(columnId, index)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Chip
              label={camelToCapital(task.status)}
              size="small"
              sx={{
                mt: 1,
                backgroundColor: getStatusColor(task.status),
                color: "white",
              }}
            />
          </>
        )}
      </Box>
    );
  }
);

export default memo(TaskCard);
