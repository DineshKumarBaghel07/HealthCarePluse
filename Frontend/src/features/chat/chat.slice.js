import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null
  },

  reducers: {

    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;

      state.chats[chatId] = {
        chatId,
        title,
        messages: [],
        lastUpdated: new Date().toISOString()
      };
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },

    addNewMessage: (state, action) => {
      const { content, role, chatId } = action.payload;

      // Ensure chat exists before pushing messages
      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          chatId,
          title: "",
          messages: [],
          lastUpdated: new Date().toISOString()
        };
      }

      const chat = state.chats[chatId];

      // Streaming-safe append logic
      if (
        !chat.messages.length ||
        chat.messages.at(-1).role !== role
      ) {
        chat.messages.push({ role, content });
      } else {
        chat.messages.at(-1).content += content;
      }
    },

    addMessage: (state, action) => {
      const { messages, chatId } = action.payload;

      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          chatId,
          title: "",
          messages: [],
          lastUpdated: new Date().toISOString()
        };
      }

      state.chats[chatId].messages.push(...messages);
    },

    setChat: (state, action) => {
      state.chats = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  createNewChat,
  setCurrentChatId,
  addNewMessage,
  addMessage,
  setChat,
  setLoading,
  setError
} = chatSlice.actions;

export default chatSlice.reducer;