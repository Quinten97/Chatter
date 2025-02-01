import "./backbutton.css";

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
      {"<-"}
    </button>
  );
};
