import { BackButton } from "../../components/BackButton";
import placeholder from "../../assets/Headshot-Placeholder.png";

import "./chatscreen.css";

export const ChatScreen = () => {
  function textAreaAdjust(element: HTMLTextAreaElement) {
    element.style.height = "7%"; // Reset height to shrink if needed
    if (element.value.trim() === "") {
      element.style.height = "7%"; // Set back to original height when empty
    } else {
      element.style.height = `${element.scrollHeight}px`; // Expand based on content
    }
  }

  return (
    <>
      <BackButton />
      <div className="chat-container">
        <div className="chat-header">
          <img src={placeholder} className="chat-image" />
          <p className="character-name">character name</p>
        </div>
        <div className="chat-body">
          <textarea
            onChange={(e) => textAreaAdjust(e.currentTarget)}
            className="message-input"
            placeholder="Type something..."
          />
          <button
            className="send-chat"
            onClick={() => {
              console.log("chat sent!");
            }}
          >
            {"->"}
          </button>
        </div>
      </div>
    </>
  );
};
