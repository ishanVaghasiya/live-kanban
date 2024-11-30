import KanbanBoard from "@modules/kanban/KanbanBoard";
import { Box, Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <KanbanBoard />
      </Box>
    </Container>
  );
}
