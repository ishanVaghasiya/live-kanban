import { FC, useState } from "react";
import KBBoard from "./components/KBBoard";

interface KanbanBoardProps {}

const KanbanBoard: FC<KanbanBoardProps> = () => {
  
  return (
    <div>
      <KBBoard />
    </div>
  );
};

export default KanbanBoard;
