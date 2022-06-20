import { useEffect, useReducer } from "react";

import axiosInstance from "../api";

function useFetchMovieData(url, paramInfos) {
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

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        let response;
        if (Array.isArray(paramInfos) && paramInfos.length > 0) {
          const requests = paramInfos.map((info) => {
            return axiosInstance.get(url, {
              params: {
                info: info,
              },
            });
          });
          response = await Promise.all(requests);
        } else {
          response = await axiosInstance.get(url);
        }

        dispatch({ type: "fetched", payload: response });
      } catch (error) {
        dispatch({ type: "error", payload: error });
      }
    };

    fetchData();
  }, [url]);

  return state;
}

export default useFetchMovieData;
