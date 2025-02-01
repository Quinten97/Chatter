import { BackButton } from "../../components/BackButton";
import placeholder from "../../assets/Headshot-Placeholder.png";
import { ScreenProps } from "../../App";
import "./chatscreen.css";

export const ChatScreen: React.FC<ScreenProps> = ({ setScreen, character }) => {
  function textAreaAdjust(element: HTMLTextAreaElement) {
    element.style.height = "7%";
    if (element.value.trim() === "") {
      element.style.height = "7%";
    } else {
      element.style.height = `${element.scrollHeight}px`;
    }
  }

  return (
    <>
      <BackButton setScreen={setScreen} whichScreen="home" />
      <div className="chat-container">
        <div className="chat-header">
          <img src={character?.image || placeholder} className="chat-image" />
          <p className="character-name">{character?.name}</p>
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
