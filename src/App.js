import "./App.css";
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import axiosInstance from "./api";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00414c",
    },
    secondary: {
      main: "#e29e20",
    },
    darkOrange: {
      main: "#bd5003",
    },
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  const [genres, setGenres] = useState([]);

  //populate the Genre dropdown from the database
  async function getGenres() {
    const resp = await axiosInstance.get("/titles/utils/genres");
    setGenres(resp.data.results);
  }

  useEffect(() => {
    getGenres();
  }, []);

  // im using HashRouter instead of BrowserRouter because GitHub Pages
  // doesn’t support the HTML5 pushState history API
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home genres={genres} />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
