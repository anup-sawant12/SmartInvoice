import axios from "axios";

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || "https://smart-invoice-server.vercel.app/api";
  url = url.replace(/\/+$/, "");
  return url.endsWith("/api") ? url : url + "/api";
};

const API = getBaseURL() + "/bills";

const getToken = () => localStorage.getItem("token");

export const createBill = async (billData) => {
  const response = await axios.post(API, billData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getBills = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getBillById = async (id) => {
  const response = await axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteBill = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getNextInvoiceNumber = async () => {
  const response = await axios.get(`${API}/next-number`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
