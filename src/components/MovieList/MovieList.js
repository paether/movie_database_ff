import { Droppable, Draggable } from "react-beautiful-dnd";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
              maxHeight: "400px",
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
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Drag your favorite movies here!
                    </Typography>
                  </CardContent>
                </Card>
              ) : listData === "No movies found!" ? (
                <Card>
                  <div>no movies found</div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    ></Typography>
                    <SwipeRightIcon />
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    ></Typography>
                    <SwipeRightIcon />
                  </CardContent>
                </Card>
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
