import "./backbutton.css";

export const BackButton = () => {
  return (
    <button className="back-button" onClick={() => console.log("BACK")}>
      {"<-"}
    </button>
  );
};
