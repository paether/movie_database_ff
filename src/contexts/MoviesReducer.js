export const MoviesReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_RESULT":
      return {
        ...state,
        searchResult: action.payload,
      };
    case "REORDER_CARDS":
      const reorderCards = () => {
        const sourceClone = Array.from(state[action.payload.sourceIndex]);
        const [removed] = sourceClone.splice(action.payload.startIndex, 1);
        sourceClone.splice(action.payload.endIndex, 0, removed);
        const newState = { ...state };
        newState[action.payload.sourceIndex] = sourceClone;

        return newState;
      };

      return reorderCards();

    case "MOVE_CARD":
      const moveCard = () => {
        const sourceClone = Array.from(state[action.payload.sourceIndex]);
        const destClone = Array.from(state[action.payload.destIndex]);
        const [removed] = sourceClone.splice(
          action.payload.droppableSource.index,
          1
        );
        destClone.splice(action.payload.droppableDestination.index, 0, removed);
        const result = {};
        result[action.payload.droppableSource.droppableId] = sourceClone;
        result[action.payload.droppableDestination.droppableId] = destClone;

        return result;
      };

      return moveCard();

    case "DELETE_CARD":
      const deleteCard = () => {
        const newState = { ...state };
        newState[action.payload.sourceIndex].splice(
          action.payload.startIndex,
          1
        );

        return newState;
      };

      return deleteCard();
    default:
      return state;
  }
};
