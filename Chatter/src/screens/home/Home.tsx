import "./home.css";
import placeholder from "../../assets/Headshot-Placeholder.png";

export const HomeScreen = () => {
  return (
    <div className="home-body">
      <h1 className="home-header">Chatter AI</h1>
      <button className="new-button">New</button>
      <div className="continue-container">
        <button className="continue-button">Continue</button>
        <img
          src={placeholder}
          alt="current chat character image"
          className="character-image"
        />
      </div>
    </div>
  );
};
