import { Droppable, Draggable } from "react-beautiful-dnd";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";

import MovieCard from "./MovieCard";
import { MoviesContext } from "../../contexts/MoviesContext";

const MovieList = ({ type, listData }) => {
  const { deleteCard } = useContext(MoviesContext);

  return (
    <Droppable droppableId={type}>
      {(provided, snapshot) => (
        <>
          <Box
            sx={{
              backgroundColor: "primary.main",
              width: "100%",
              maxHeight: { xxs: "150px", sm: "400px" },
              overflow: "scroll",
              overscrollBehavior: "contain",
              position: "relative",
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {Array.isArray(listData) && listData.length > 0 ? (
                listData.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <MovieCard
                        snapshot={snapshot}
                        provided={provided}
                        onClickDelete={() => deleteCard(type, index)}
                        type={type}
                        index={index}
                        item={item}
                      ></MovieCard>
                    )}
                  </Draggable>
                ))
              ) : type === "toWatch" ? (
                <Box
                  sx={{
                    textAlign: "center",
                    color: "white",
                    padding: { xs: "10px", md: "20px" },
                  }}
                >
                  <Typography sx={{ fontSize: { xxs: "1rem", xs: "1.5rem" } }}>
                    Drop your favorite movies here!
                  </Typography>
                </Box>
              ) : listData === "No movies found!" ? (
                <Box
                  sx={{
                    textAlign: "center",
                    color: "white",
                    padding: { xs: "10px", md: "20px" },
                  }}
                >
                  <Typography variant="h5" component="h2">
                    Movie not found!
                  </Typography>
                </Box>
              ) : (
                <SwipeRightIcon
                  sx={{
                    margin: "10px",
                    fontSize: { xs: "2rem", sm: "3rem", color: "white" },
                  }}
                />
              )}
            </Box>
            {provided.placeholder}
          </Box>
        </>
      )}
    </Droppable>
  );
};

export default MovieList;
