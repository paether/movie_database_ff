import { Draggable } from "react-beautiful-dnd";

import MovieCard from "./MovieCard";

const MovieListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <MovieCard
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          ></MovieCard>
        );
      }}
    </Draggable>
  );
};

export default MovieListItem;
