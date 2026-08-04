import axios from "axios";

const API = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000/api") + "/auth",
});

export const register = (userData) => {
  return API.post("/register", userData);
};

export const login = (userData) => {
  return API.post("/login", userData);
};