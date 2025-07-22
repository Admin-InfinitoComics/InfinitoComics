import axios from "axios";
import {BACKEND_URL} from '../Utils/constant'

export const getAllItems = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/timeline/getAll`);
    return response.data.data; 
  } catch (error) {
    console.error("Failed to fetch timeline items", error);
    return [];
  }
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
     const token = localStorage.getItem("authToken");
  try {
    const response = await axios.delete(`${BACKEND_URL}/delete/${id}`, {
      withCredentials: true, // in case you are using cookies for auth
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
