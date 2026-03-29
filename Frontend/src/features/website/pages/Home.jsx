import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import Chatbot from "../../chat/pages/Chatbot";
import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import Services from "../component/Services";
import Vision from "../component/Vision";
import Operations from "../component/Operations";
import Testimonials from "../component/Testimonials";
import Footer from "../component/Footer";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleAiAvatarClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsChatbotOpen(true);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Vision />
      <Operations />
      <Testimonials />
      <Footer />
      <button
        type="button"
        className="ai-avatar-fab"
        onClick={handleAiAvatarClick}
        aria-label={user ? "Open AI chatbot" : "Login to use AI chatbot"}
        title={user ? "Open AI chatbot" : "Login to chat with AI"}
      >
        <span className="ai-avatar-core">
          <span className="ai-avatar-eyes">
            <span />
            <span />
          </span>
        </span>
        <span className="ai-avatar-label">
          {user ? "Chat with AI" : "Login for AI Chat"}
        </span>
      </button>
      {isChatbotOpen && (
        <div
          className="chatbot-modal-backdrop"
          onClick={() => setIsChatbotOpen(false)}
        >
          <div
            className="chatbot-modal-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <Chatbot onClose={() => setIsChatbotOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
