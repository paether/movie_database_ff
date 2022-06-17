import { Droppable, Draggable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";

import MovieCard from "./MovieCard";

const MovieList = ({ type, listData, onClickDelete }) => {
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: "5px",
    width: 250,
  });
  return (
    <Droppable droppableId={type}>
      {(provided, snapshot) => (
        <Box
          sx={{
            backgroundColor: "#001220",
            padding: "10px",
            overflow: "scroll",
            overscrollBehavior: "contain",
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Typography
            variant="h4"
            component="h2"
            color="white"
            textAlign="center"
          >
            {type === "toWatch" ? "My Movies" : "Searched Movies"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              overflow: "scroll ",
              overscrollBehavior: "contain",
            }}
          >
            {listData && listData.length > 0 ? (
              listData.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <MovieCard
                      snapshot={snapshot}
                      provided={provided}
                      onClickDelete={() => onClickDelete(type, index)}
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
                  <SwipeRightIcon />
                </CardContent>
              </Card>
            ) : (
              ""
            )}
          </Box>
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default MovieList;
