import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { RouterProvider } from "react-router-dom";
import outputs from "../amplify_outputs.json";
import router from "./routes/Routes";

Amplify.configure(outputs);

export default function App() {
  return (
    <Authenticator>
      <RouterProvider router={router} />
    </Authenticator>
  );
}
