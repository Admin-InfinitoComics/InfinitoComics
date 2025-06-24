import axios from 'axios';
import { BASE_URL } from '../utils/constants';


export const loginUser = async (email, password) => {
  const response = await axios.post( BASE_URL+'/api/login', {
    email: email.toLowerCase(),
    password,
  });
  return response.data;
};

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
