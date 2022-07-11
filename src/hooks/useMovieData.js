import { useQuery } from "react-query";
import axiosInstance from "../api";

const getMovieData = async (movieId, params) => {
  const requests = params.map((info) => {
    return axiosInstance.get(`/titles/${movieId}`, {
      params: {
        info: info,
      },
    });
  });
  const data = await Promise.all(requests);
  return data;
};

export default function useMovieData(movieId, params) {
  return useQuery(["genres", movieId], () => getMovieData(movieId, params));
}
