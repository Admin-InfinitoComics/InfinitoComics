import axios from 'axios'
import { BASE_URL } from '../utils/constants.js'

export const fetchComics = async () => {
    const res = await axios.get(`${BASE_URL}/api/comic`);
    // console.log("RES in services: ", res);
    return res.data.data;
}