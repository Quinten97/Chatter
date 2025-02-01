import { useState, useEffect } from "react";
import { ChatScreen } from "./screens/chat/ChatScreen";
import { HomeScreen } from "./screens/home/Home";
import { LoadingScreen } from "./screens/loading/Loading";
import { NewChatScreen } from "./screens/newchat/NewChat";

export interface ScreenProps {
  setScreen: (screen: string) => void;
}

function App() {
  const [screen, setScreen] = useState<string>("loading");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching data (e.g., localStorage, API calls, etc.)
    setTimeout(() => {
      setIsLoading(false); // Set loading to false once data is retrieved
      setScreen("home"); // Navigate to home screen
    }, 2000); // Simulating a 2-second delay
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : screen === "home" ? (
        <HomeScreen setScreen={setScreen} />
      ) : screen === "newChat" ? (
        <NewChatScreen setScreen={setScreen} />
      ) : screen === "chat" ? (
        <ChatScreen setScreen={setScreen} />
      ) : null}
    </>
  );
}

export default App;
