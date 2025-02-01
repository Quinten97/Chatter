import "./newchat.css";
import placeholder from "../../assets/Headshot-Placeholder.png";
import { BackButton } from "../../components/BackButton";
import { ScreenProps } from "../../App";
import { useState } from "react";
import { saveCharacter } from "../../utils/characterStorage";

export const NewChatScreen: React.FC<ScreenProps> = ({
  setScreen,
  setCharacter,
}) => {
  const [name, setName] = useState("");
  const [traits, setTraits] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Convert image to Base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click when image is clicked
  const triggerFileInput = () => {
    document.getElementById("image-upload")?.click();
  };

  // Save Character Data
  const handleSaveCharacter = () => {
    if (!name.trim()) {
      alert("Please enter a character name!");
      return;
    }
    const newCharacter = { name, traits, bio, image };
    saveCharacter(newCharacter);
    if (setCharacter) {
      setCharacter(newCharacter);
    }
    setScreen("chat");
  };

  return (
    <>
      <BackButton setScreen={setScreen} whichScreen={"home"} />
      <div className="new-chat-container">
        <div
          onClick={triggerFileInput}
          className="new-chat-image-wrapper"
          style={{ cursor: "pointer" }}
        >
          <img
            src={image || placeholder}
            alt="character"
            className="new-chat-image"
          />
        </div>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        <input
          type="text"
          placeholder="Character Name"
          className="new-chat-input name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Traits"
          className="new-chat-input large-input"
          value={traits}
          onChange={(e) => setTraits(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bio"
          className="new-chat-input large-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button className="new-chat-button" onClick={handleSaveCharacter}>
          Start Chatting
        </button>
      </div>
    </>
  );
};
