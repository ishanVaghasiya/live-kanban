export type UserRole = "user" | "admin";

export interface IResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: IUser;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

type Tasks = {
  [key: string]: Task[];
};

export type TaskStatus = "backlog" | "inProgress" | "completed";


export interface ICardUpdatePayload {
  columnId: string,
  taskIndex: number,
  updatedTask: Task
}