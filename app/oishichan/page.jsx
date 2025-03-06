// page.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { sendMessage } from "./actions";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { Square } from "lucide-react";

const OishiChan = () => {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are Oishi-chan, a renowned chef. You only help with food-related queries." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingResponse, setTypingResponse] = useState("");
  const [typingActive, setTypingActive] = useState(false);
  const [error, setError] = useState(null);
  const typingIntervalRef = useRef(null);
  const chatContainerRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setTypingResponse("");
    setTypingActive(true);
    setError(null);

    try {
      const response = await sendMessage([...messages, userMessage]);
      simulateTypingEffect(response);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Oops! Oishi-chan's kitchen is having some technical difficulties~");
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
    <div className="flex flex-col mt-12 mb-30 h-[80vh] w-[120vw] max-w-lg mx-auto p-4 bg-gray-50 shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-4">🍣 Oishi-chan Chat</h1>
      
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-2 p-2 bg-gray-50 border-2 rounded-lg">
        {messages.filter((msg) => msg.role !== "system").map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-4 py-2 max-w-xs rounded-lg ${
                msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.role === "assistant" ? <ReactMarkdown>{msg.content}</ReactMarkdown> : msg.content}
            </div>
          </div>
        ))}

        {typingResponse && (
          <div className="flex justify-start">
            <div className="px-4 py-2 bg-gray-200 text-black max-w-xs rounded-lg">
              <ReactMarkdown>{typingResponse}</ReactMarkdown>
            </div>
          </div>
        )}

        {loading && !typingActive && (
          <div className="flex justify-start">
            <div className="px-4 py-2 bg-gray-200 rounded-lg">
              <Skeleton className="w-20 h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-start">
            <div className="px-4 py-2 bg-red-100 text-red-700 max-w-xs rounded-lg">
              {error}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about food..."
          className="input input-bordered flex-grow p-3 rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyPress={(e) => e.key === "Enter" && !typingActive && handleSend()}
        />
        <button
          onClick={typingActive ? stopTyping : handleSend}
          className={`px-4 py-2 rounded-r-lg ${typingActive ? "bg-red-500" : "bg-blue-500"} text-white disabled:opacity-50`}
          disabled={loading && !typingActive}
        >
          {typingActive ? <Square className="text-sm" /> : "Send"}
        </button> 
      </div>
    </div>
  );
};

export default OishiChan;