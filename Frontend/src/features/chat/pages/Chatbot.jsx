import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setTyping(true);

    setTimeout(() => {
      const botMessage = {
        text: `You said: ${input}`,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
      setTyping(false);
    }, 800);

    setInput("");
  };

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span>💬 AI Assistant</span>
        {onClose && (
          <button className="chat-close-btn" onClick={onClose}>
            ✕
          </button>
        )}
      </div>

      <div className="chat-box">
        <ul className="chat-list">
          {messages.map((msg, index) => (
            <li key={index} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </li>
          ))}

          {typing && (
            <li className="chat-bubble bot typing">
              <span></span><span></span><span></span>
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
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}