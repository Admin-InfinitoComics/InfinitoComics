import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const fetchFAQsByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/faq?category=${category}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
};
