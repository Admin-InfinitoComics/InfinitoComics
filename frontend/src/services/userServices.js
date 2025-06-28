import axios from 'axios';
import { BASE_URL } from '../utils/constants';


export const loginUser = async (email, password) => {
  console.log(email,password);
  const response = await axios.post( BASE_URL+'/api/login', {
    email: email.toLowerCase(),
    password,
  });
  console.log(response.data);
  return response.data;
};

export const latestBlog = async () => {
  const response = await axios.get( BASE_URL+'/blog/latestblog', {
    limit : 1
  });
  return response?.data?.blogs[0];
}
export const signUpUser=async(formData)=>{
  const response=await axios.post(BASE_URL + '/api/signup',{
    email: formData.email.toLowerCase(),
    password: formData.password,
    name: formData.name,
    dob: formData.dob,
    username: formData.username.trim().replace(/\s/g, "")
  });
  return response.data;
}
