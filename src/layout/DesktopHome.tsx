import { useAuthenticator } from "@aws-amplify/ui-react";
import { AccountCircle, Home as HomeIcon, Search } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { APP_NAME } from "../consts/app";

const DesktopHome = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { signOut } = useAuthenticator();

  const handleMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  return (
    <Container>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {APP_NAME}
            </Typography>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit">
              <Search />
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              onClick={(e) => handleMenu(e)}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
      <Box mt={2} p={2}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default DesktopHome;
