import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const getAllStories = async () => {
  const response = await axios.get(BASE_URL + '/timeline/getAll');
  return response.data.data; //stories array
};