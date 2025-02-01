import { useState, useEffect } from "react";
import { ChatScreen } from "./screens/chat/ChatScreen";
import { HomeScreen } from "./screens/home/Home";
import { LoadingScreen } from "./screens/loading/Loading";
import { NewChatScreen } from "./screens/newchat/NewChat";
import { loadCharacter } from "./utils/characterStorage";
import { CharacterProps } from "./utils/characterStorage";

export interface ScreenProps {
  setScreen: (screen: string) => void;
  setCharacter?: (character: CharacterProps) => void;
  character?: CharacterProps | null;
}

function App() {
  const [screen, setScreen] = useState<string>("loading");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [character, setCharacter] = useState<CharacterProps | null>(null);

  useEffect(() => {
    const storedCharacter = loadCharacter();
    setCharacter(storedCharacter);
    setTimeout(() => {
      setIsLoading(false);
      setScreen("home");
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : screen === "home" ? (
        <HomeScreen
          setScreen={setScreen}
          character={character}
          setCharacter={setCharacter}
        />
      ) : screen === "newChat" ? (
        <NewChatScreen setScreen={setScreen} setCharacter={setCharacter} />
      ) : screen === "chat" ? (
        <ChatScreen setScreen={setScreen} character={character} />
      ) : null}
    </>
  );
}

export default App;
