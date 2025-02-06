import "./home.css";
import placeholder from "../../assets/Headshot-Placeholder.png";
import { ChatScreenProps } from "../../App";
import { useNavigate } from "react-router-dom";

export const HomeScreen: React.FC<ChatScreenProps> = ({ character }) => {
  const navigate = useNavigate();

  return (
    <div className="home-body">
      <h1 className="home-header">Chatter AI</h1>
      <button className="new-button" onClick={() => navigate("/newChat")}>
        New
      </button>
      <div className="continue-container">
        <button className="continue-button" onClick={() => navigate("/chat")}>
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
