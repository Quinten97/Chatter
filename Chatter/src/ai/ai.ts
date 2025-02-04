import { loadCharacter } from "../utils/characterStorage";
import { loadConversation } from "./conversations";
import { Ollama } from "ollama/browser";

const ollama = new Ollama({ host: `${import.meta.env.VITE_AI_ENDPOINT}` });

const ollamaRequest = async (prompt: string): Promise<string> => {
  console.log(import.meta.env.VITE_AI_ENDPOINT);
  try {
    const response = await ollama.chat({
      model: "mistral:7b",
      messages: [{ role: "user", content: prompt }],
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

  const prompt = `
  You are acting as a character in a roleplay scenario, and your task is to roleplay with the user (the person you are speaking to) as the personality and bio provided below.

  You should **always** speak as the character provided. The user is interacting with you as if you are the character, and you should maintain the character's tone, speech style, and personality at all times. You are the character responding to the user.

  Your responses should include:
  1. **Dialogue**: Always respond in plain text as the character. For example: "Hello, how are you?"
  2. **Actions**: Only provide actions when necessary, and enclose them in asterisks. For example: *I walk towards you with an outstretched hand*.

    - **Do not explain things or give system responses**. Only give the roleplay dialogue and actions.
    - **You are responding to the adventurer, not acting as the user**. The user is roleplaying with you, and you are responding in character.
    - Actions should be used **only when they are needed** for describing movement or expressions. Keep actions brief and relevant to the conversation.

  The conversation history will be included for context. Read the conversation carefully and respond accordingly, staying consistent with your character's traits and bio.

  Name: ${character?.name}  
  Traits: ${character?.traits}  
  Bio: ${character?.bio}

  Your responses should **always** be in the form of roleplay: dialogue and actions. Keep your answers in character, interacting with the user as if they are speaking to you, the character.
  
  Here is the message history so you have some context to what is happening to you do not include it in your response.
  ${JSON.stringify(conversationHistory.slice(-5))}
  `;

  const aiResponse = await ollamaRequest(prompt);

  const aiMessage = aiResponse;

  return aiMessage;
};
