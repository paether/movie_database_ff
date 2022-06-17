export const MoviesReducer = (state, action) => {
  switch (action.type) {
    case "test":
      return {
        ...state,
        toWatch: [
          { id: "1234", titleText: { text: "helo" } },
          { id: "234567", titleText: { text: "helo2" } },
        ],
      };
    case "UPDATE_SEARCH_RESULT":
      return {
        ...state,
        searchResult: action.payload,
      };
    case "REORDER_CARDS":
      const reorder = () => {
        const result = Array.from(state[action.payload.sourceIndex]);
        const [removed] = result.splice(action.payload.startIndex, 1);
        result.splice(action.payload.endIndex, 0, removed);
        const newState = { ...state };
        newState[action.payload.sourceIndex] = result;

        return newState;
      };

      return reorder();

    case "MOVE_CARD":
      const move = () => {
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
      // const result = move();

      return move();

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
