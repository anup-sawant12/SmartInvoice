import axios from "axios";

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || "https://smart-invoice-server.vercel.app/api";
  url = url.replace(/\/+$/, "");
  return url.endsWith("/api") ? url : url + "/api";
};

const API = getBaseURL() + "/products";

const getToken = () => localStorage.getItem("token");

export const createProduct = async (productData) => {
  const response = await axios.post(API, productData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API}/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};