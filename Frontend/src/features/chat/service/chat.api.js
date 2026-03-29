import axios from "axios";

const url = import.meta.env.BASEURL || "http://localhost:3000"
const api = axios.create({
    baseURL:url,
    withCredentials:true
})


export const sendMessage = async({message,chatId}) =>{
    const response = await api.post("/api/chats/message",{message,chatId})
    return response.data
}


export const getChat = async() =>{
    const response = await api.get("/api/chats")
    return response.data
}


export const getMessage = async ({chatId})=>{
    const response = await api.get(`/api/chats/${chatId}/message`)
    return response.data
}


export const deleteChat = async ({chatId}) =>{
    const response = await api.delete(`/api/chats/delete/${chatId}`)
    return response.data
}