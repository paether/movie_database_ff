import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import axiosInstance from "./api";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";

function App() {
  // const [movieStorage, setMovieStorage] = useState({
  //   searchResult: [],
  //   toWatch: [],
  //   // [
  //   //   { id: "1234", titleText: { text: "helo" } },
  //   //   { id: "234567", titleText: { text: "helo2" } },
  //   // ],
  // });
  const [genres, setGenres] = useState([]);

  async function getGenres() {
    const resp = await axiosInstance.get("/titles/utils/genres");
    setGenres(resp.data.results);
  }

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home genres={genres} />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
