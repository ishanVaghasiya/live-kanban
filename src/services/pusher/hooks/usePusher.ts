import { useEffect } from "react";
import Pusher from "pusher-js";

const usePusher = () => {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("task_board");

    channel.bind("TASK_LIST", (data: any) => {
      console.log("Received event:", data);
    });

    return () => {
      pusher.unsubscribe("task_board");
    };
  }, []);

  return null;
};

export default usePusher;
