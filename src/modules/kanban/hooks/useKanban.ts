import { useAppSelector } from "@redux/hooks/hook";
import axios from "axios";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import { ITaskFormPayload, Task, Tasks } from "type";

const useKanban = () => {
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

  return {
    tasks,
    handleDelete,
    onAddTask,
    handleUpdateTask,
    handleDragEnd,
    addTaskId,
    setAddTaskId,
    user,
  };
};

export default useKanban;
