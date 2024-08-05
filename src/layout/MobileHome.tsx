import { Home } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MobileHome = () => {
  const [value, setValue] = useState(0);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Outlet />
      </Box>
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        showLabels
        sx={{ position: "fixed", bottom: 0, width: "100%" }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
      </BottomNavigation>
    </Box>
  );
};

export default MobileHome;
