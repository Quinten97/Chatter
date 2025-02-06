import "./backbutton.css";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/back arrow.svg";

interface BackButtonProps {
  to: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(to)}>
      <img src={BackArrow} alt="back button" />
    </button>
  );
};
