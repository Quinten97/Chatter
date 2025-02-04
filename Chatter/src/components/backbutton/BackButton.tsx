import "./backbutton.css";
import BackArrow from "../../assets/back arrow.svg";
interface BackButtonProps {
  whichScreen: string;
  setScreen: (screen: string) => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  whichScreen,
  setScreen,
}) => {
  return (
    <button className="back-button" onClick={() => setScreen(whichScreen)}>
      <img src={BackArrow} alt="back button" />
    </button>
  );
};
