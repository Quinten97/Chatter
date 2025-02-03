import { useEffect, useRef, useState } from "react";
import { BackButton } from "../../components/backbutton/BackButton";
import placeholder from "../../assets/Headshot-Placeholder.png";
import { ScreenProps } from "../../App";
import "./chatscreen.css";
import {
  loadConversation,
  addMessageToConversation,
  ChatMessage,
} from "../../ai/conversations";
import { getAIResponse } from "../../ai/ai";
import LoadingSpinner from "../../components/loadingspinner/LoadingSpinner";

// Function to handle user message input
const handleUserMessage = async (
  userMessage: string,
  setUserMessage: React.Dispatch<React.SetStateAction<string>>,
  setMessages: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>> // Set loading state
) => {
  if (!userMessage.trim()) return;

  // Store user message in localStorage
  const userMessageObj: ChatMessage = { sender: "user", text: userMessage };
  addMessageToConversation(userMessageObj);

  // Update state immediately with the new message
  setMessages(loadConversation());

  // Clear input field
  setUserMessage("");

  // Start loading
  setLoading(true);

  // Get AI response
  const aiResponse = await getAIResponse();

  // Save updated conversation to localStorage
  const aiMessageObj: ChatMessage = { sender: "ai", text: aiResponse };
  addMessageToConversation(aiMessageObj);

  // Update state immediately with the new message
  setMessages(loadConversation());

  // Stop loading
  setLoading(false);
};

export const ChatScreen: React.FC<ScreenProps> = ({ setScreen, character }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState(loadConversation()); // Load conversation from localStorage
  const [loading, setLoading] = useState(false); // Loading state
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <BackButton setScreen={setScreen} whichScreen="home" />
      <div className="chat-container">
        <div className="chat-header">
          <img src={character?.image || placeholder} className="chat-image" />
          <p className="character-name">{character?.name}</p>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === "user" ? "user" : "ai"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
          {loading && (
            <div className="chat-message ai">
              <LoadingSpinner />
            </div>
          )}
        </div>
        <div className="message-container">
          <textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="message-input"
            placeholder="Type something..."
          />
          <button
            className="send-chat"
            onClick={() =>
              handleUserMessage(
                userMessage,
                setUserMessage,
                setMessages,
                setLoading
              )
            }
          >
            {"->"}
          </button>
        </div>
      </div>
    </>
  );
};
