export type UserRole = "user" | "admin";

export interface IUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}
