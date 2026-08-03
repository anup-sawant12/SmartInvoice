import axios from "axios";

const API = "http://localhost:5000/api/bills";

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
