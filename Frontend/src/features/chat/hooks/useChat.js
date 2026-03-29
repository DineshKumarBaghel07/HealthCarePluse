import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { initializeSocketConnection } from "../service/chat.socket.js";
import { setLoading, createNewChat } from "../chat.slice.js";
import { sendMessage } from "../service/chat.api.js";

export const useChat = () => {
  const dispatch = useDispatch();

  const handleSendMessage = useCallback(async ({ message, chatId }) => {
    dispatch(setLoading(true));
    try {
      const data = await sendMessage({ message, chatId });
      const { chat, aiMessage } = data;
      dispatch(createNewChat({ chatId: chat._id, title: chat.title }));
      return { chat, aiMessage };
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const connectSocket = useCallback(() => initializeSocketConnection(), []);

  return { initializeSocketConnection: connectSocket, handleSendMessage };
};
