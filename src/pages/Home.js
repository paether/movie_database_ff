import { useCallback, useEffect, useState, useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import axiosInstance from "../api";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import { MoviesContext } from "../contexts/MoviesContext";

function Home({ genres }) {
  const { state, deleteCard, updateSearchResult, reorderCards, moveCard } =
    useContext(MoviesContext);

  useEffect(() => {
    console.log(state);
  }, [state]);
  const [genreFilter, setGenreFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setGenreFilter(event.target.value);
  };

  const getTitle = useCallback(
    async (e) => {
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
            },
          }
        );

        // setMovieStorage((prev) => ({
        //   ...prev,
        //   searchResult: resp.data.results,
        // }));
        // dispatch({ type: "UPDATE_SEARCH_RESULT", payload: resp.data.results });
        updateSearchResult(resp.data.results);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    },
    [titleFilter, genreFilter, updateSearchResult]
  );

  // useEffect(() => {
  //   console.log(movieStorage);
  // }, [movieStorage]);

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
    if (!destination || destination.droppableId === "searchResult") {
      return;
    }
    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    // if (
    //   movieStorage[dInd] &&
    //   movieStorage[dInd].find(
    //     (item) => item.id === movieStorage[sInd][source.index].id
    //   )
    // ) {
    //   return;
    // }

    if (sInd === dInd) {
      // const items = reorder(
      //   movieStorage[sInd],
      //   source.index,
      //   destination.index
      // );
      // const newState = { ...movieStorage };
      // newState[sInd] = items;
      // setMovieStorage(newState);
      reorderCards(sInd, source.index, destination.index);
      // dispatch({
      //   type: "REORDER_CARDS",
      //   payload: {
      //     sourceIndex: sInd,
      //     startIndex: source.index,
      //     endIndex: destination.index,
      //   },
      // });
    } else {
      // const result = move(
      //   movieStorage[sInd],
      //   movieStorage[dInd],
      //   source,
      //   destination
      // );
      // const newState = { ...movieStorage };
      // newState[sInd] = result[sInd];
      // newState[dInd] = result[dInd];

      // setMovieStorage(newState);
      moveCard(sInd, dInd, source, destination);
      // dispatch({
      //   type: "MOVE_CARD",
      //   payload: {
      //     sourceIndex: sInd,
      //     destIndex: dInd,
      //     droppableSource: source,
      //     droppableDestination: destination,
      //   },
      // });
    }
  }

  //        EZT MEG KELL MÉG

  // const deleteMovieCard = (key, index) => {
  //   dispatch({
  //     type: "DELETE_CARD",
  //     payload: {
  //       sourceIndex: key,
  //       startIndex: index,
  //     },
  //   });
  //   // const newState = { ...movieStorage };
  //   // newState[key].splice(index, 1);
  //   // setMovieStorage(newState);
  // };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#e29e20",
          p: "10px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          fontWeight: "700",
          boxShadow: "10px 10px 0px 4px rgb(189 80 3);",
        }}
      >
        My Movie List
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e29e20",
          flexDirection: "column",
          padding: { lg: "50px", sm: "10px" },
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          boxShadow: "10px 10px 0px 4px rgb(189 80 3);",
        }}
      >
        <SearchBar
          {...{
            genreFilter,
            handleChange,
            genres,
            titleFilter,
            getTitle,
            isLoading,
            setTitleFilter,
          }}
        />

        <Box
          sx={{
            display: "flex",
            gap: "50px",
            maxHeight: "500px",
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(state).map((key) => (
              <MovieList
                listData={state[key]}
                key={key}
                type={key}
                onClickDelete={deleteCard}
              />
            ))}
          </DragDropContext>
        </Box>
      </Box>
    </>
  );
}

export default Home;
