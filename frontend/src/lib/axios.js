import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://dammu-chat.vercel.app/api" : "/api",
  withCredentials: true,
});
