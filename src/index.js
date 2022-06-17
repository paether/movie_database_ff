import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { MoviesContextProvider } from "./contexts/MoviesContext";

ReactDOM.render(
  <MoviesContextProvider>
    <CssBaseline />
    <App />
  </MoviesContextProvider>,
  document.getElementById("root")
);
