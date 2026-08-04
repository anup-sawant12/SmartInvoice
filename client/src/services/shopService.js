import axios from "axios";

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  url = url.replace(/\/+$/, "");
  return url.endsWith("/api") ? url : url + "/api";
};

const API = getBaseURL() + "/shop";

const getToken = () => localStorage.getItem("token");

export const createShop = async (formData) => {
  const res = await axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getShop = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

export const updateShop = async (formData) => {
  const res = await axios.put(API, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};