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

export const getFoundationBlogs = async () => {
  const res = await axios.get(BASE_URL+'/blog/foundation-blogs'); 
  return res.data;
};

export const getICBlogs = async () => {
  const res = await axios.get(BASE_URL + '/blog/ic-blogs');
  return res.data;
};

export const getBlogsById = async (id) => {
  const res = await axios.get(`${BASE_URL}/blog/getById/${id}`);
  return res.data;
};

export const getAllBlogs = async () => {
  const res = await axios.get(`${BASE_URL}/blog/getallblog`);
  return res.data.data; 
};

export const signUpUser = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + '/api/signup', {
      email: formData.email.toLowerCase(),
      password: formData.password,
      name: formData.name,
      dob: formData.dob,
      username: formData.username.trim().replace(/\s/g, "")
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

