import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewMessage } from "../chat.slice.js";
import { getSocket } from "../service/chat.socket.js";

export const useChatSocket = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const socket = getSocket();

    socket.on("ai_stream", ({ token, chatId }) => {
      console.log(token);
      dispatch(addNewMessage({
        role: "ai",
        content: token,
        chatId
      }));

    });

    socket.on("ai_stream_end", () => {

      console.log("Streaming finished");

    });

    socket.on("ai_error", (err) => {

      console.error(err.message);

    });

    return () => {

      socket.off("ai_stream");
      socket.off("ai_stream_end");
      socket.off("ai_error");

    };

  }, [dispatch]);

};