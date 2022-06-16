import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_RAPIDAPI_BASE_URL,
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
  },
});
export default axiosInstance;
