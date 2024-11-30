import usePusher from "@services/pusher/hooks/usePusher";
import { FC, useState } from "react";
import KBBoard from "./components/KBBoard";

interface KanbanBoardProps {}

const KanbanBoard: FC<KanbanBoardProps> = () => {
  const [message, setMessage] = useState<string | null>(null);

  usePusher(); //* Register the service

  const sendMessage = async () => {
    const res = await fetch("/api/pusher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Hello from Pusher!" }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Pusher with Next.js</h1>
      <button onClick={sendMessage}>Send Pusher Event</button>
      {message && <div>Received Message: {message}</div>}

      <KBBoard />
    </div>
  );
};

export default KanbanBoard;
