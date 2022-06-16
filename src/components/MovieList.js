import { Droppable, Draggable } from "react-beautiful-dnd";

import MovieCard from "./MovieCard";

const MovieList = ({ type, listData, onClickDelete }) => {
  return (
    <Droppable droppableId={type}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <h1>{type}</h1>
          {listData.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <MovieCard
                  provided={provided}
                  id={item.id}
                  titleText={item.titleText ? item.titleText.text : "test"}
                  releaseYear={item.year}
                  onClickDelete={() => onClickDelete(type, index)}
                  type={type}
                  index={index}
                ></MovieCard>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default MovieList;
