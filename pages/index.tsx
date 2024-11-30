import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "@redux/hooks/hook";
import { logout } from "@redux/slice/authslice";
import { persistor } from "@redux/store";
import * as React from "react";
import { useDispatch } from "react-redux";
import Copyright from "../src/Copyright";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import ProtectedRoute from "pageLayouts/ProtectedLayout";
import MasterLayout from "pageLayouts/MasterLayout";

export default function Home() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const userEmail = useAppSelector((state) => state?.auth?.user?.email);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Dispatch logout action to clear Redux state
    dispatch(logout());

    // Clear persisted Redux state
    persistor.purge().then(() => {
      console.log("Redux state cleared on logout!");
    });
  };

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
            <Typography variant="h1" component={"h1"}>
              Coming Soon
            </Typography>
          </Box>
        </Container>
      </MasterLayout>
    </ProtectedRoute>
  );
}
