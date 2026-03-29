import { createSlice} from '@reduxjs/toolkit';


const chatSlice = createSlice({
    name:"chat",
    initialState:{
        chats:{},
        currentChatId:null,
        isLoading:false,
        error:null
    },
    reducers:{
        createNewChat:(state,action)=>{
            const{chatId,title}= action.payload
            state.chats[chatId]={
                chatId,
                title,
                messsages:[],
                lastUpdated: new Date().toISOString()
            }
        },
        addNewMessage:(state,action)=>{
            const {content,role,chatId} = action.payload
            state.chats[chatId].messsages.push({role,content})
        },
        addMessage:(state,action)=>{
            const{messages,chatId } = action.payload;
            state.chats[chatId].messages.push(...messages)
        },
        setChat:(state,action)=>{
            state.chats = action.payload
        },
        setLoading :(state,action)=>{
            state.isLoading = action.payload
        },
        setError:(state,action)=>{
            state.error = action.payload
        }
    }
});

export const{createNewChat,addNewMessage,addMessage,setChat,setLoading,setError} = chatSlice.actions
export default chatSlice.reducer
