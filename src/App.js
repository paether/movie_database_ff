import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import axiosInstance from "./api";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import InformationCard from "./components/InformationCard";

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

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home genres={genres} />} />
          <Route path="/:id" element={<Detail />} />
          <Route
            path="*"
            element={
              <InformationCard information={"404 - This page does not exist"} />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
