import axios from "axios";
import {BACKEND_URL} from '../Utils/constant'

export const sendJob = async (data) =>{
    const res = await axios.post (BACKEND_URL+"/career/create",data)
    console.log(res?.data);
    return res?.data;

}
export const fetchJob = async ()=>{
    const res = await axios.get(BACKEND_URL+"/career/getall")
    console.log(res?.data?.data);
    return res?.data?.data;
}