import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Search } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

import axiosInstance from "../api";
import MovieList from "../components/MovieList";

function Home({ movieStorage, setMovieStorage, genres }) {
  const [genreFilter, setGenreFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setGenreFilter(event.target.value);
  };

  const getTitle = useCallback(
    async (e) => {
      console.log("getting title");
      if (!titleFilter) return;
      try {
        setIsLoading(true);
        const resp = await axiosInstance.get(
          `/titles/search/title/${titleFilter}`,
          {
            params: {
              info: "base_info",
              titleType: "movie",
              ...(genreFilter && { genre: genreFilter }),
              limit: "50",
            },
          }
        );

        setMovieStorage((prev) => ({
          ...prev,
          searchResult: resp.data.results,
        }));

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    },
    [titleFilter, genreFilter, setMovieStorage]
  );

  useEffect(() => {
    console.log(movieStorage);
  }, [movieStorage]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  function onDragEnd(result) {
    const { source, destination } = result;
    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    if (!destination) {
      return;
    }

    // if (
    //   movieStorage[dInd] &&
    //   movieStorage[dInd].find(
    //     (item) => item.id === movieStorage[sInd][source.index].id
    //   )
    // ) {
    //   return;
    // }

    if (sInd === dInd) {
      const items = reorder(
        movieStorage[sInd],
        source.index,
        destination.index
      );
      const newState = { ...movieStorage };
      newState[sInd] = items;
      setMovieStorage(newState);
    } else {
      const result = move(
        movieStorage[sInd],
        movieStorage[dInd],
        source,
        destination
      );
      const newState = { ...movieStorage };
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setMovieStorage(newState);
    }
  }

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: "5px",
    width: 250,
  });

  const deleteMovieCard = (key, index) => {
    const newState = { ...movieStorage };
    newState[key].splice(index, 1);
    setMovieStorage(newState);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Genre</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={genreFilter}
          label="Genre"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genres.map((genre, i) => (
            <MenuItem key={i} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="outlined-name"
        label="Title"
        onChange={(e) => setTitleFilter(e.target.value)}
        value={titleFilter}
      />
      {/* <Button type="submit" onClick={getTitle}>
        submit
      </Button> */}
      <LoadingButton
        size="small"
        color="secondary"
        onClick={getTitle}
        loading={isLoading}
        loadingPosition="start"
        startIcon={<Search />}
        variant="contained"
      >
        Search
      </LoadingButton>

      <Box sx={{ display: "flex", gap: "20px", backgroundColor: "red" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(movieStorage).map((key) =>
            movieStorage[key] ? (
              <MovieList
                listData={movieStorage[key]}
                key={key}
                type={key}
                onClickDelete={deleteMovieCard}
              />
            ) : (
              <div key={key}>empty</div>
            )
          )}
        </DragDropContext>
      </Box>
    </Container>
  );
}

export default Home;
