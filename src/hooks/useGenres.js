import { useQuery } from "react-query";
import axiosInstance from "../api";

const getGenres = async () => {
  const { data } = await axiosInstance.get("/titles/utils/genres");
  return data;
};

export default function useGenres() {
  return useQuery(["genres"], getGenres);
}
