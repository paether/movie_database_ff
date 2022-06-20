import { Routes, Route, HashRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import "./App.css";
import InformationCard from "./components/InformationCard";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import useFetchMovieData from "./hooks/useFetchMovieData";

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
  const { data, error } = useFetchMovieData("/titles/utils/genres");

  if (error) {
    return <InformationCard information={"Cannot get movie genres!"} />;
  }
  if (!data) {
    return <CircularProgress />;
  }
  // im using HashRouter instead of BrowserRouter because GitHub Pages
  // doesn’t support the HTML5 pushState history API
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home genres={data.data.results} />} />
          <Route path="/:id" element={<Detail />} />
          <Route
            path="*"
            element={<InformationCard information={"404 - Not Found!"} />}
          />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
