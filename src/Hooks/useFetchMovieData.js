import { useEffect, useReducer } from "react";

import axiosInstance from "../api";

function useFetchMovieData(url) {
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

    const getMovieData = (info) => {
      return axiosInstance.get(url, {
        params: {
          info: info,
        },
      });
    };

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const [rating, awards, base_info, creators] = await Promise.all([
          getMovieData("rating"),
          getMovieData("awards"),
          getMovieData("base_info"),
          getMovieData("creators_directors_writers"),
        ]);
        console.log(base_info.data.results);
        const aggregateData = {
          rating: rating.data.results.ratingsSummary,
          wins: awards.data.results.wins,
          nominations: awards.data.results.nominations,
          plot: base_info.data.results.plot?.plotText?.plainText,
          imageUrl: base_info.data.results.primaryImage?.url,
          creators: creators.data.results,
        };
        dispatch({ type: "fetched", payload: aggregateData });
      } catch (error) {
        dispatch({ type: "error", payload: error });
      }
    };

    fetchData();
  }, [url]);

  return state;
}

export default useFetchMovieData;
