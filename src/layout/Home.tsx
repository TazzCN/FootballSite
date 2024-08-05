import { Box, useMediaQuery, useTheme } from "@mui/material";

import DesktopHome from "./DesktopHome";
import MobileHome from "./MobileHome";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return <Box>{isMobile ? <MobileHome /> : <DesktopHome />}</Box>;
};

export default Home;
