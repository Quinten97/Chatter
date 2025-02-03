export interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

let conversationHistory: ChatMessage[] = [];

export const loadConversation = (): ChatMessage[] => {
  const storedConversation = localStorage.getItem("chatHistory");
  if (storedConversation) {
    conversationHistory = JSON.parse(storedConversation);
  }
  return conversationHistory;
};

export const saveConversation = (newMessages: ChatMessage[]) => {
  conversationHistory = newMessages;
  localStorage.setItem("chatHistory", JSON.stringify(conversationHistory));
};

export const summarizeConversation = (messages: ChatMessage[]): string => {
  // Your summarization logic here (could call Ollama or any other summarizer)
  // For now, just returns the last 2 messages for example purposes
  const summary = messages
    .slice(-2)
    .map((msg) => msg.text)
    .join(" ");
  return summary;
};

export const addMessageToConversation = (
  sender: "user" | "ai",
  text: string
) => {
  const newMessage: ChatMessage = { sender, text };
  conversationHistory.push(newMessage);
  saveConversation(conversationHistory);
};
