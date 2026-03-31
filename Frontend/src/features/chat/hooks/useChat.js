import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  setLoading,
  createNewChat,
  addNewMessage,
  setError,
  setCurrentChatId
} from "../chat.slice.js";

import { sendMessage } from "../service/chat.api.js";
import {
  initializeSocketConnection,
  getSocket
} from "../service/chat.socket.js";

export const useChat = () => {

  const dispatch = useDispatch();

  const handleSendMessage = useCallback(

    async ({ message, chatId }) => {

      dispatch(setLoading(true));

      try {

        const data = await sendMessage({
          message,
          chatId
        });

        const activeChatId = data.chat._id;
        const title = data.chat.title;

        // create chat if new
        if (!chatId) {

          dispatch(createNewChat({
            chatId: activeChatId,
            title
          }));

        }

        // VERY IMPORTANT: set active chat
        dispatch(setCurrentChatId(activeChatId));

        // store user message immediately
        dispatch(addNewMessage({
          content: message,
          role: "user",
          chatId: activeChatId
        }));

        // emit socket event to start streaming
        const socket = getSocket();

        console.log("Emitting socket event:", activeChatId);

        socket.emit("user_message", {
          chatId: activeChatId
        });

      } catch (error) {

        dispatch(setError(error.message));

      } finally {

        dispatch(setLoading(false));

      }

    },

    [dispatch]

  );

  const connectSocket = useCallback(() => {

    initializeSocketConnection();

  }, []);

  return {
    initializeSocketConnection: connectSocket,
    handleSendMessage
  };

};