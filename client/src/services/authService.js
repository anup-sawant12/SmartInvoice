import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const register = (userData) => {
  return API.post("/register", userData);
};

export const login = (userData) => {
  return API.post("/login", userData);
};