import axios from 'axios';
import { BASE_URL } from '../utils/constants';


export const researchBrowse = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/researchPaper`);
    return response.data;
  } catch (error) {
    console.error("Error fetching research papers:", error);
    throw error;
  }
};