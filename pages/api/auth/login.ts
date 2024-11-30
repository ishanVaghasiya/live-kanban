import type { NextApiRequest, NextApiResponse } from "next";
import { IUser, UserRole } from "type";

export interface ServerMock extends IUser {
  password: string;
}

const server_mock_users: ServerMock[] = [
  {
    id: 1,
    email: "test@example.com",
    password: "test@123", // Store hashed passwords in real scenarios!
    name: "Test User",
    role: "user",
  },
  {
    id: 2,
    email: "john.doe@example.com",
    password: "test@123",
    name: "John Doe",
    role: "admin",
  },
];

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
  user?: IUser;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const { email, password }: LoginRequest = req.body;

  const user: ServerMock | null =
    server_mock_users.find(
      (user) => user.email === email && user.password === password
    ) || null;

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
}
