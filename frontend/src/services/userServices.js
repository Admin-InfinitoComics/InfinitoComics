import axios from 'axios';
import { BASE_URL } from '../utils/constants';


export const loginUser = async (email, password) => {
  const response = await axios.post( BASE_URL+'/api/login', {
    email: email.toLowerCase(),
    password,
  });
  return response.data;
};

export const latestBlog = async () => {
  const response = await axios.get( BASE_URL+'/blog/latestblog', {
    limit : 1
  });
  return response?.data?.blogs[0];
}