import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChatScreen } from "./screens/chat/ChatScreen";
import { HomeScreen } from "./screens/home/Home";
// import { LoadingScreen } from "./screens/loading/Loading";
import { NewChatScreen } from "./screens/newchat/NewChat";
import { useState, useEffect } from "react";
import { loadCharacter } from "./utils/characterStorage";
import { CharacterProps } from "./utils/characterStorage";

export interface ChatScreenProps {
  character: CharacterProps | null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState<CharacterProps | null>(null);

  useEffect(() => {
    const storedCharacter = loadCharacter();
    setCharacter(storedCharacter);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen character={character} />} />
        <Route
          path="/newChat"
          element={<NewChatScreen setCharacter={setCharacter} />}
        />
        <Route path="/chat" element={<ChatScreen character={character} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
