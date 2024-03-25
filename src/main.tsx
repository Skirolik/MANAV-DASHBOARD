import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createTheme, MantineProvider, rem } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",

  primaryColor: "teal",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Notifications />
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
