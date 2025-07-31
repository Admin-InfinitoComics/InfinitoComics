import axios from "axios";
import { API_URL } from "../Utils/constant";

export const getAllFaqs = async () => {
  return await axios.get(API_URL);
};

export const addFaq = async (faq) => {
  return await axios.post(API_URL, faq);
};

export const updateFaq = async (id, updatedFaq) => {
  return await axios.put(`${API_URL}/${id}`, updatedFaq);
};

export const deleteFaq = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
