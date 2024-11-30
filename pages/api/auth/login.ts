import { ChildProcessWithoutNullStreams } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";
import { IResponse, IUser, UserRole } from "type";

export interface ServerMock extends IUser {
  password: string;
}

const server_mock_users: ServerMock[] = [
  {
    id: 1,
    email: "test@mail.com",
    password: "test@123", // Store hashed passwords in real scenarios!
    name: "Test User",
    role: "user",
  },
  {
    id: 2,
    email: "test2@mail.com",
    password: "test@123",
    name: "John Doe",
    role: "admin",
  },
];

type LoginRequest = {
  email: string;
  password: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<{ user?: IUser } | null>>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed", data: null });
  }

  const { email, password }: LoginRequest = req.body;

  const user: ServerMock | null =
    server_mock_users.find(
      (user) => user.email === email && user.password === password
    ) || null;

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials", data: null });
  }

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    },
  });
}
