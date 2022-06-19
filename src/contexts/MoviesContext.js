import React, { createContext, useReducer, useCallback } from "react";

import { MoviesReducer } from "./MoviesReducer";

const initialState = {
  searchResult: [],
  watchList: [],
};

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MoviesReducer, initialState);

  const updateSearchResult = useCallback((payload) => {
    dispatch({ type: "UPDATE_SEARCH_RESULT", payload });
  }, []);

  const reorderCards = useCallback((sourceIndex, startIndex, endIndex) => {
    dispatch({
      type: "REORDER_CARDS",
      payload: {
        sourceIndex,
        startIndex,
        endIndex,
      },
    });
  }, []);
  const moveCard = useCallback(
    (sourceIndex, destIndex, droppableSource, droppableDestination) => {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceIndex,
          destIndex,
          droppableSource,
          droppableDestination,
        },
      });
    },
    []
  );
  const deleteCard = useCallback((sourceIndex, startIndex) => {
    dispatch({
      type: "DELETE_CARD",
      payload: {
        sourceIndex,
        startIndex,
      },
    });
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        state,
        updateSearchResult,
        reorderCards,
        moveCard,
        deleteCard,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
