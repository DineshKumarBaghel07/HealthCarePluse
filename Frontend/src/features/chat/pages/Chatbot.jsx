import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat.js";
import { useChatSocket } from "../hooks/useChatSocekt.js";

export default function Chatbot({ onClose }) {

  const [input, setInput] = useState("");

  const { chats, currentChatId, isLoading } =
    useSelector((state) => state.chat);

  const {
    handleSendMessage,
    initializeSocketConnection
  } = useChat();

  const chatEndRef = useRef(null);

  // initialize socket once
  useEffect(() => {
    initializeSocketConnection();
  }, [initializeSocketConnection]);

  // start listening to streaming tokens
  useChatSocket();

  // SAFE messages selector
  const messages = currentChatId
    ? chats[currentChatId]?.messages || []
    : [];

  const sendMessage = () => {

    if (!input.trim()) return;

    handleSendMessage({
      message: input,
      chatId: currentChatId
    });

    setInput("");
  };

  // auto-scroll when messages update
  useEffect(() => {

    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }

  }, [messages]);

  return (

    <div className="chat-container">

      <div className="chat-header">

        <span>💬 AI Assistant</span>

        {onClose && (

          <button
            className="chat-close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        )}

      </div>

      <div className="chat-box">

        <ul className="chat-list">

          {messages.map((msg, index) => (

            <li
              key={index}
              className={`chat-bubble ${
                msg.role === "user"
                  ? "user"
                  : "bot"
              }`}
            >
              {msg.content}
            </li>

          ))}

          {isLoading && (

            <li className="chat-bubble bot typing">
              <span></span>
              <span></span>
              <span></span>
            </li>

          )}

        </ul>

        <div ref={chatEndRef} />

      </div>

      <div className="input-box">

        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" && sendMessage()
          }
        />

        <button onClick={sendMessage}>
          ➤
        </button>

      </div>

    </div>
  );
}