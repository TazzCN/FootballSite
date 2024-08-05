import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Amplify } from "aws-amplify";
import { RouterProvider } from "react-router-dom";
import outputs from "../amplify_outputs.json";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "./consts/app";
import router from "./routes/Routes";

Amplify.configure(outputs);

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
});

export default function App() {
  return (
    <Authenticator>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Authenticator>
  );
}
