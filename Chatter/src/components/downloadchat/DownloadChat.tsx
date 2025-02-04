import "./downloadChat.css";
import DownloadSVG from "../../assets/download.svg";

export const DownloadChat = () => {
  const handleDownload = () => {
    const chatHistory = localStorage.getItem("chatHistory");
    if (!chatHistory) {
      alert("No chat history found!");
      return;
    }

    const blob = new Blob([JSON.stringify(JSON.parse(chatHistory), null, 2)], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat_history.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      <img src={DownloadSVG} alt="download button" />
    </button>
  );
};
