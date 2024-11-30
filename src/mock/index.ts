import { Tasks } from "type";

export const mock_board: Tasks = {
  backlog: [
    {
      id: "1",
      title: "Design UI Components",
      description: "Create reusable UI components for the project",
      status: "backlog",
    },
    {
      id: "2",
      title: "Implement Authentication",
      description: "Set up user authentication system",
      status: "backlog",
    },
  ],
  inProgress: [
    {
      id: "3",
      title: "API Integration",
      description: "Connect frontend with backend APIs",
      status: "inProgress",
    },
  ],
  completed: [
    {
      id: "4",
      title: "Project Setup",
      description: "Initialize project and setup development environment",
      status: "completed",
    },
  ],
};
