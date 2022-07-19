import create from "zustand";
import produce from "immer";

function reorderCardsHelper(sourceIndex, startIndex, endIndex, state) {
  const sourceClone = Array.from(state[sourceIndex]);
  const [removed] = sourceClone.splice(startIndex, 1);
  sourceClone.splice(endIndex, 0, removed);
  const newState = { ...state };
  newState[sourceIndex] = sourceClone;

  return newState;
}

function moveCardHelper(
  sourceIndex,
  destIndex,
  droppableSource,
  droppableDestination,
  state
) {
  const sourceClone = Array.from(state[sourceIndex]);
  const destClone = Array.from(state[destIndex]);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
}

function deleteHelper(sourceIndex, startIndex, state) {
  const newState = { ...state };
  newState[sourceIndex].splice(startIndex, 1);

  return newState;
}

export const useStore = create((set) => ({
  searchResult: [],
  watchList: JSON.parse(localStorage.getItem("watchList")) || [],
  updateSearchResult: (searchResult) => set({ searchResult }),
  reorderCards: (sourceIndex, startIndex, endIndex) =>
    set(
      produce((state) => {
        state[sourceIndex] = reorderCardsHelper(
          sourceIndex,
          startIndex,
          endIndex,
          state
        )[sourceIndex];
      })
    ),
  moveCard: (sourceIndex, destIndex, droppableSource, droppableDestination) =>
    set(
      produce((state) => {
        const movedCard = moveCardHelper(
          sourceIndex,
          destIndex,
          droppableSource,
          droppableDestination,
          state
        );
        state[sourceIndex] = movedCard[sourceIndex];
        state[destIndex] = movedCard[destIndex];
      })
    ),
  deleteCard: (sourceIndex, startIndex) =>
    set(
      produce((state) => {
        state[sourceIndex] = deleteHelper(sourceIndex, startIndex, state)[
          sourceIndex
        ];
      })
    ),
}));
