export const summarizeChat = async (messages: string[]): Promise<string> => {
  const apiKey = "YOUR_OPENAI_API_KEY";
  const prompt = `
    Summarize the following roleplay conversation into key events, interactions, and unresolved plot points:

    ${messages.join("\n")}

    Keep it concise but retain important details so the story continues naturally.
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Summary unavailable";
};
