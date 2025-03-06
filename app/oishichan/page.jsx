// app/oishichan/page.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { Square } from "lucide-react";

const OishiChan = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingResponse, setTypingResponse] = useState("");
  const [typingActive, setTypingActive] = useState(false);
  const [error, setError] = useState(null);
  const typingIntervalRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initialize GoogleGenerativeAI with API key from environment
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are Oishi-chan, a renowned chef. You only answer food-related questions and deny all others. You talk like a Japanese weeb/waifu girl. You call the person Oni-chan occasionally or when fun. You keep a funny and flirty tone."
  });

  const sendMessage = async (history, newMessage) => {
    try {
      if (!process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY) {
        throw new Error("Google Generative AI API key is not configured");
      }

      const chatSession = model.startChat({
        history: history.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      });

      const result = await chatSession.sendMessage(newMessage);
      return result.response.text();
    } catch (error) {
      console.error("Error in sendMessage:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setTypingResponse("");
    setTypingActive(true);
    setError(null);

    try {
      const response = await sendMessage(messages, input);
      simulateTypingEffect(response);
    } catch (err) {
      setError("Oopsie~ Oishi-chan's kitchen is having some kawaii technical difficulties, Oni-chan!");
      setLoading(false);
      setTypingActive(false);
    }

    setInput("");
  };

  const stopTyping = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setMessages((prev) => [...prev, { role: "assistant", content: typingResponse }]);
    setTypingResponse("");
    setTypingActive(false);
    setLoading(false);
  };

  const simulateTypingEffect = (fullText) => {
    let index = -1;
    setTypingResponse("");
    setTypingActive(true);
    setLoading(false);

    typingIntervalRef.current = setInterval(() => {
      if (index < fullText.length) {
        setTypingResponse((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setMessages((prev) => [...prev, { role: "assistant", content: fullText }]);
        setTypingResponse("");
        setTypingActive(false);
      }
    }, 10);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, typingResponse]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="flex flex-col w-full max-w-2xl h-[85vh] sm:h-[80vh] md:h-[90vh] bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 p-4">
          <h1 className="text-xl sm:text-2xl font-bold text-center">🍣 Oishi-chan Chat</h1>
        </div>

        {/* Chat Container */}
        <div 
          ref={chatContainerRef} 
          className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50"
        >
          {messages.length === 0 && !typingResponse && !loading && !error && (
            <div className="text-center text-gray-500 text-sm sm:text-base">
              Start chatting with Oishi-chan about food, Oni-chan~!
            </div>
          )}

          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[70%] md:max-w-[65%] px-3 py-2 rounded-lg ${
                  msg.role === "user" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.role === "assistant" ? <ReactMarkdown>{msg.content}</ReactMarkdown> : msg.content}
              </div>
            </div>
          ))}

          {typingResponse && (
            <div className="flex justify-start">
              <div className="max-w-[80%] sm:max-w-[70%] md:max-w-[65%] px-3 py-2 bg-gray-200 text-black rounded-lg">
                <ReactMarkdown>{typingResponse}</ReactMarkdown>
              </div>
            </div>
          )}

          {loading && !typingActive && (
            <div className="flex justify-start">
              <div className="px-3 py-2 bg-gray-200 rounded-lg">
                <Skeleton className="w-16 sm:w-20 h-5 sm:h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-start">
              <div className="max-w-[80%] sm:max-w-[70%] md:max-w-[65%] px-3 py-2 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 p-3 sm:p-4 bg-white border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about food, Oni-chan~!"
              className="flex-1 px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyPress={(e) => e.key === "Enter" && !typingActive && handleSend()}
            />
            <button
              onClick={typingActive ? stopTyping : handleSend}
              className={`px-3 sm:px-4 py-2 rounded-lg ${
                typingActive ? "bg-red-500" : "bg-blue-500"
              } text-white disabled:opacity-50 whitespace-nowrap`}
              disabled={loading && !typingActive}
            >
              {typingActive ? <Square className="w-4 h-4 sm:w-5 sm:h-5" /> : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OishiChan;