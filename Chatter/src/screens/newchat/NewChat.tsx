import "./newchat.css";
import placeholder from "../../assets/Headshot-Placeholder.png";
import { BackButton } from "../../components/BackButton";

export const NewChatScreen = () => {
  return (
    <>
      <BackButton />
      <div className="new-chat-container">
        <img
          src={placeholder}
          onClick={() => {
            console.log("change image");
          }}
          alt="character image"
          className="new-chat-image"
        />
        <input
          type="text"
          placeholder="Character Name"
          className="new-chat-input name-input"
        />
        <input
          type="text"
          placeholder="Traits"
          className="new-chat-input large-input"
        />
        <input
          type="text"
          placeholder="bio"
          className="new-chat-input large-input"
        />
        <button
          className="new-chat-button"
          onClick={() => {
            console.log("start chat");
          }}
        >
          Start Chatting
        </button>
      </div>
    </>
  );
};
