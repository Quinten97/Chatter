export interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

// Function to load conversation from localStorage
export const loadConversation = (): ChatMessage[] => {
  const storedConversation = localStorage.getItem("chatHistory");
  return storedConversation ? JSON.parse(storedConversation) : [];
};

// Function to save conversation to localStorage
export const saveConversation = (newMessages: ChatMessage[]) => {
  localStorage.setItem("chatHistory", JSON.stringify(newMessages));
};

// Function to add a message to the conversation
export const addMessageToConversation = (newMessage: ChatMessage) => {
  const conversation = loadConversation();
  conversation.push(newMessage);
  saveConversation(conversation);
};

// Function to remove chat history from localStorage
export const removeChatHistory = () => {
  localStorage.removeItem("chatHistory");
};
