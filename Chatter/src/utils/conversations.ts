import { getSessionId } from "./session";

export const saveConversationSummary = (summary: string) => {
  const sessionId = getSessionId();
  localStorage.setItem(`chat_summary_${sessionId}`, summary);
};

export const getConversationSummary = (): string | null => {
  const sessionId = getSessionId();
  return localStorage.getItem(`chat_summary_${sessionId}`);
};
