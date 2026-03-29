import axios from "axios";


const url = "http://localhost:3000"
const api = axios.create({
    baseURL:url,
    withCredentials:true
})


export const register = async({username,phone,email,password}) =>{
    const response = await api.post("/api/auth/register",{username,phone,email,password})
   return response.data;
}


export const login = async({username,password}) => {
   const respone  = await api.post("/api/auth/login",{username,password})
   return respone.data
}


export const getMe = async() =>{
    const response = await api.get("/api/auth/get-me");
    console.log(response.data);
    return response.data
}