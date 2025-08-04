import axios from "axios";
import {BACKEND_URL} from '../Utils/constant'

export const fetchCharactersData = async () =>{
    const res = await axios.get(BACKEND_URL+'/character/getAll')
    return res;
}

export const deleteCharacter = async (Id)=>{
    const res = await axios.delete(BACKEND_URL+'/character/delete/'+Id)
    return res;
}
export const updateCharacter = async (Id , data, headers) =>{
const res = await axios.patch(BACKEND_URL+ '/character/update/'+Id, data,{headers})
return res;
}

export const createCharacter = async(data)=>{
const res =  await axios.post(BACKEND_URL+'/character/create',data,{
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res;
}