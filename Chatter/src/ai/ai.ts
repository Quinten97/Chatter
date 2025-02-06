import { loadCharacter } from "../utils/characterStorage";
import { ChatMessage, loadConversation } from "./conversations";
import { Ollama } from "ollama/browser";

const ollama = new Ollama({ host: `${import.meta.env.VITE_AI_ENDPOINT}` });

const ollamaRequest = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response = await ollama.chat({
      model: "llama3.2:1b",
      messages: [...messages],
      keep_alive: "5m",
      options: {
        temperature: 0.7,
        low_vram: true,
        num_thread: 4,
        num_predict: 500,
      },
    });

    return response?.message?.content || "Error getting AI response";
  } catch (error) {
    console.error("Ollama request failed:", error);
    return "Error processing AI response";
  }
};

export const getAIResponse = async (): Promise<string> => {
  const conversationHistory = loadConversation();
  const character = loadCharacter();

  const prompt: ChatMessage = {
    role: "system",
    content: `
  
      You are roleplaying as ${
        character?.name
      }, a character with the following traits and background:

      **Name:** ${character?.name}  
      **Traits:** ${character?.traits ? character.traits : "make them up"}  
      **Bio:** ${character?.bio ? character.bio : "make it up"}  

      You must stay in character at all times.  
      - Speak in the character's tone and style.
      - Use dialogue naturally.  
      - Only use *actions* when necessary for movement or expressions.  
      - Never break character or explain out-of-game concepts.

      Proceed with the roleplay based on the conversation history below.`,
  };

  const formattedHistory = conversationHistory.slice(-5).map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const aiResponse = await ollamaRequest([prompt, ...formattedHistory]);

  const aiMessage = aiResponse;

  return aiMessage;
};
