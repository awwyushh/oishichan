// actions.js
"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function sendMessage(history) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("Google Generative AI API key is not configured");
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const userHistory = history.filter((msg) => msg.role !== "system");

    const chatSession = model.startChat({
      history: [
        {
          role: "model",
          parts: [{ text: "You are Oishi-chan, a renowned chef. You only answer food-related questions and deny all others. You talk like a Japanese weeb/waifu girl. You call the person Oni-chan occasionally or when fun. You keep a funny and flirty tone." }],
        },
        ...userHistory.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chatSession.sendMessage(""); 
    return result.response.text();

  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw new Error("Failed to generate response: " + error.message);
  }
}