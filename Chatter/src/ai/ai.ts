// ai/ai.ts
import { loadCharacter } from "../utils/characterStorage";
import {
  loadConversation,
  addMessageToConversation,
  summarizeConversation,
} from "./conversations";

const ollamaRequest = async (
  prompt: string,
  character: any
): Promise<string> => {
  // Assuming Ollama package or fetch call works here
  const response = await fetch("http://your-ollama-server-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      character: character || loadCharacter(), // Include character info in the request
    }),
  });
  const data = await response.json();
  return data?.response || "Error getting AI response";
};

export const getAIResponse = async (message: string): Promise<string> => {
  const character = loadCharacter();
  const conversationHistory = loadConversation();

  // Decide if we need to summarize
  const context =
    conversationHistory.length > 15
      ? summarizeConversation(conversationHistory.slice(-15))
      : conversationHistory.map((msg) => msg.text).join(" ");

  // Construct the full prompt
  const prompt = `${context}\nUser: ${message}\nAI:`;

  // Request the AI response
  const aiResponse = await ollamaRequest(prompt, character);

  // Store AI's response in conversation history
  addMessageToConversation("ai", aiResponse);
  return aiResponse;
};
