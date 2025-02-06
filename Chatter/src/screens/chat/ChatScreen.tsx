import { useEffect, useRef, useState } from "react";
import { BackButton } from "../../components/backbutton/BackButton";
import placeholder from "../../assets/Headshot-Placeholder.png";
import "./chatscreen.css";
import {
  loadConversation,
  addMessageToConversation,
  ChatMessage,
} from "../../ai/conversations";
import { getAIResponse } from "../../ai/ai";
import LoadingSpinner from "../../components/loadingspinner/LoadingSpinner";
import SendArrow from "../../assets/send arrow.svg";
import { DownloadChat } from "../../components/downloadchat/DownloadChat";
import { ChatScreenProps } from "../../App";

// Function to handle user message input
const handleUserMessage = async (
  userMessage: string,
  setUserMessage: React.Dispatch<React.SetStateAction<string>>,
  setMessages: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!userMessage.trim()) return;

  const userMessageObj: ChatMessage = { role: "user", content: userMessage };
  addMessageToConversation(userMessageObj);
  setMessages(loadConversation());
  setUserMessage("");
  setLoading(true);

  // Get AI response
  const aiResponse = await getAIResponse();

  // Save updated conversation to localStorage
  const aiMessageObj: ChatMessage = { role: "assistant", content: aiResponse };
  addMessageToConversation(aiMessageObj);

  // Update state immediately with the new message
  setMessages(loadConversation());

  // Stop loading
  setLoading(false);
};

export const ChatScreen: React.FC<ChatScreenProps> = ({ character }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState(loadConversation());
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
    const handleResize = () => {
      if (chatBodyRef.current) {
        chatBodyRef.current.style.height = `${
          window.innerHeight - messageContainerRef.current!.offsetHeight
        }px`;
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    };
  }, [messages]);

  return (
    <>
      <BackButton to="/home" />
      <DownloadChat />
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
                msg.role === "user" ? "user" : "assistant"
              }`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
          {loading && (
            <div className="chat-message assistant">
              <LoadingSpinner />
            </div>
          )}
        </div>
        <div className="message-container" ref={messageContainerRef}>
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
            <img src={SendArrow} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};
