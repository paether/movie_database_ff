import { useState, useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

import MovieList from "../components/MovieList/MovieList";
import SearchBar from "../components/SearchBar";
import { MoviesContext } from "../contexts/MoviesContext";

function Home({ genres }) {
  const { state, deleteCard, updateSearchResult, reorderCards, moveCard } =
    useContext(MoviesContext);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const [titleFilter, setTitleFilter] = useState("");

  function onDragEnd(result) {
    const { source, destination } = result;
    //if drag is outside of the list OR the user tries to drag into the search result list
    if (!destination || destination.droppableId === "searchResult") {
      return;
    }
    const sourceIndex = source.droppableId;
    const destIndex = destination.droppableId;

    if (sourceIndex === destIndex) {
      reorderCards(sourceIndex, source.index, destination.index);
    } else {
      moveCard(sourceIndex, destIndex, source, destination);
    }
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#e29e20",
          p: "10px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          fontSize: "2rem",
          fontWeight: "700",
          boxShadow: "10px 10px 0px 4px rgb(189 80 3);",
          color: "#002127",
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
          padding: { lg: "30px 0 0 0", sm: "10px" },
          margin: "0 20px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          boxShadow: "10px 10px 0px 4px rgb(189 80 3);",
        }}
      >
        <SearchBar
          {...{
            genres,
            titleFilter,
            setTitleFilter,
            updateSearchResult,
          }}
        />

        <Box
          sx={{
            display: "flex",
            gap: { xs: "10px", md: "30px" },
            margin: { xs: "10px", md: "30px" },
            maxHeight: "500px",
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(state).map((key) => (
              <Box
                sx={{
                  width: { xxs: "150px", xs: "200px", md: "300px" },
                  height: "100%",
                  borderBottomRightRadius: "20px",
                  borderBottomLeftRadius: "20px",
                }}
              >
                <Typography
                  color="white"
                  textAlign="center"
                  sx={{
                    backgroundColor: "primary.dark",
                    width: "100%",
                    padding: { md: "20px", xxs: "10px" },
                    borderTopRightRadius: "20px",
                    borderTopLeftRadius: "20px",
                    fontSize: { xxs: "1rem", xs: "1.5rem", md: "2rem" },
                  }}
                >
                  {key === "toWatch" ? "My Movies" : "Searched Movies"}
                </Typography>
                <MovieList
                  listData={state[key]}
                  key={key}
                  type={key}
                  onClickDelete={deleteCard}
                />
              </Box>
            ))}
          </DragDropContext>
        </Box>
      </Box>
    </>
  );
}

export default Home;
