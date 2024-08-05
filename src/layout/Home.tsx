import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

import DesktopHome from "./DesktopHome";
import MobileHome from "./MobileHome";

const theme = createTheme();

const Home = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isMobile ? <MobileHome /> : <DesktopHome />}
    </ThemeProvider>
  );
};

export default Home;
