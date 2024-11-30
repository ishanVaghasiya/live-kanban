import { mock_board } from "@mock/index";
import type { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";
import { ICardDeletePayload, ICardUpdatePayload, Task, Tasks } from "type";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

let mock_database: Tasks = { ...mock_board };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    switch (method) {
      case "GET":
        res.status(200).json({ mock_database });
        break;

      case "POST":
        const newTask: Task = req.body;
        if (!mock_database[newTask.status]) {
          return res.status(400).json({ error: "Invalid task status" });
        }

        mock_database[newTask.status].push(newTask);
        await pusher.trigger("task_board", "TASK_LIST", {
          mock_database,
        });
        res.status(201).json({ message: "Task added", mock_database });
        break;

      case "PUT":
        const { columnId, taskIndex, updatedTask }: ICardUpdatePayload =
          req.body;

        if (!mock_database[columnId] || !mock_database[columnId][taskIndex]) {
          return res.status(404).json({ error: "Task not found" });
        }

        mock_database[columnId][taskIndex] = updatedTask;
        await pusher.trigger("task_board", "TASK_LIST", {
          mock_database,
        });
        res.status(200).json({ message: "Task updated", mock_database });
        break;

      case "DELETE":
        const {
          columnId: deleteId,
          taskIndex: deleteTaskId,
        }: ICardDeletePayload = req.body;
        
        if (
          !mock_database[deleteId] ||
          !mock_database[deleteId][deleteTaskId]
        ) {
          return res.status(404).json({ error: "Task not found" });
        }

        mock_database[deleteId].splice(deleteTaskId, 1);
        await pusher.trigger("task_board", "TASK_LIST", {
          mock_database,
        });
        res.status(200).json({ message: "Task deleted", mock_database });
        break;

      default:
        res.status(405).json({ message: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
