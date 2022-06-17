import { useEffect, useReducer, useRef } from "react";

import axiosInstance from "../api";

function useFetch(url) {
  const cancelRequest = useRef(false);
  const initialState = {
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await axiosInstance.get(url);

        if (response.statusText !== "OK") {
          throw new Error(response.statusText);
        }

        const data = response.data;
        if (cancelRequest.current) return;

        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;
        dispatch({ type: "error", payload: error });
      }
    };

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return state;
}

export default useFetch;
