import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  headers: {
    "Content-Type": "application/json",
  },
});