import axios from "axios";
import {BACKEND_URL} from '../Utils/constant'

export const getAllItems = async () => {
  return await axios.get(BACKEND_URL);
};

export const addItems = async (item) => {
  const formData = new FormData();
  formData.append("title", item.title);
  formData.append("eventDate", item.eventDate);
  formData.append("description", item.description);
  formData.append("image", item.image); // File

  const token = localStorage.getItem("authToken");

  return await axios.post(`${BACKEND_URL}/timeline/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const updateItems = async (id, item) => {
  return await axios.put(`${BACKEND_URL}/${id}`, item);
};

export const deleteItems = async (id) => {
  return await axios.delete(`${BACKEND_URL}/${id}`);
};
