import "./home.css";
import placeholder from "../../assets/Headshot-Placeholder.png";
import { ScreenProps } from "../../App";

export const HomeScreen: React.FC<ScreenProps> = ({ setScreen, character }) => {
  return (
    <div className="home-body">
      <h1 className="home-header">Chatter AI</h1>
      <button className="new-button" onClick={() => setScreen("newChat")}>
        New
      </button>
      <div className="continue-container">
        <button className="continue-button" onClick={() => setScreen("chat")}>
          Continue
        </button>
        <img
          src={character?.image || placeholder}
          alt="current chat character image"
          className="character-image"
        />
      </div>
    </div>
  );
};
