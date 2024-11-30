// import MasterLayout from "@layouts";
// import ProtectedRoute from "@layouts";
// import {ProtectedRoute, MasterLayout} from ";
import KanbanBoard from "@modules/kanban/KanbanBoard";
import { Box, Container } from "@mui/material";
import MasterLayout from "pageLayouts/MasterLayout";
import ProtectedRoute from "pageLayouts/ProtectedLayout";

export default function Home() {
  return (
    <ProtectedRoute>
      <MasterLayout>
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
      </MasterLayout>
    </ProtectedRoute>
  );
}
