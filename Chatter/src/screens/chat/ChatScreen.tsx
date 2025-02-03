import { useState } from "react";
import { BackButton } from "../../components/BackButton";
import placeholder from "../../assets/Headshot-Placeholder.png";
import { ScreenProps } from "../../App";
import "./chatscreen.css";
import {
  loadConversation,
  addMessageToConversation,
} from "../../ai/conversations";
import { getAIResponse } from "../../ai/ai";

export const ChatScreen: React.FC<ScreenProps> = ({ setScreen, character }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState(loadConversation()); // Load previous conversation history

  const handleUserMessage = async () => {
    if (!userMessage.trim()) return;

    // Store the user's message in conversation
    addMessageToConversation("user", userMessage);
    setMessages(loadConversation()); // Refresh the messages state to show user message

    // Get the AI response
    const aiResponse = await getAIResponse(userMessage);

    // Add the AI response to the messages and update the state
    addMessageToConversation("ai", aiResponse);
    setMessages(loadConversation()); // Refresh messages again after the AI response

    // Clear input field
    setUserMessage("");
  };

  return (
    <>
      <BackButton setScreen={setScreen} whichScreen="home" />
      <div className="chat-container">
        <div className="chat-header">
          <img src={character?.image || placeholder} className="chat-image" />
          <p className="character-name">{character?.name}</p>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === "user" ? "user-message" : "ai-message"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="message-container">
          <textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="message-input"
            placeholder="Type something..."
          />
          <button className="send-chat" onClick={handleUserMessage}>
            {"->"}
          </button>
        </div>
      </div>
    </>
  );
};
