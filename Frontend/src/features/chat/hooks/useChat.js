import { initializeSocketConnection } from "../service/chat.socket.js";
import reducer from "../chat.slice.js";
import { setError,setLoading,setchat,createNewChat,addMessage,addNewMessage } from "../chat.slice.js";
import {useDispatch} from "react-redux";
import { sendMessage,getChat,getMessage,deleteChat } from "../service/chat.api.js";


export const useChat = () => {
   const dispatch = useDispatch();

   const handleSendMessage =async ({message,chatId}) =>{
     dispatch(setLoading(true));
     const data = await sendMessage({message,chatId});
     const {chat,aiMessage} = data;
     dispatch(createNewChat({chatId :chat._id,title:chat.title}))
   } 
  






  return {initializeSocketConnection};
}