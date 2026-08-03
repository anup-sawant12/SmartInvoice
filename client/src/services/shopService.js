import axios from "axios";

const API = "https://smart-invoice-server.vercel.app/";

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