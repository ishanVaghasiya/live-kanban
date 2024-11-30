import type { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      await pusher.trigger('task_board', 'TASK_LIST', {
        message,
      });
      res.status(200).json({ message: 'Event triggered' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to trigger event' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
