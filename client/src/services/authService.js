import axios from "axios";

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || "https://smart-invoice-server.vercel.app/api";
  url = url.replace(/\/+$/, "");
  return url.endsWith("/api") ? url : url + "/api";
};

const API = axios.create({
  baseURL: getBaseURL() + "/auth",
});

export const register = (userData) => {
  return API.post("/register", userData);
};

export const login = (userData) => {
  return API.post("/login", userData);
};