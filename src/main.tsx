import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter } from "react-router-dom";

const color = localStorage.getItem("color") || "teal";

console.log("color in main", color);

const theme = createTheme({
  fontFamily: "Verdana, sans-serif",
  headings: { fontFamily: "Greycliff CF, sans-serif" },

  primaryColor: color,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <Notifications />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </MantineProvider>
);
