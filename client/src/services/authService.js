import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-invoice-server.vercel.app/",
});

export const register = (userData) => {
  return API.post("/register", userData);
};

export const login = (userData) => {
  return API.post("/login", userData);
};