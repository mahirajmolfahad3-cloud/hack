"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import type { Character } from "@/lib/characters";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function ChatInterface({ character }: { character: Character }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when messages change.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const content = input.trim();
    if (!content || isSending) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    // TODO: Replace with a real backend/AI reply for the character.
    const reply =
      `${character.name}: Thanks for your message! "${content}" — a real reply is coming soon.`;

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: reply },
      ]);
      setIsSending(false);
    }, 600);
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header: character image (left) + name (right) */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={character.image}
              alt={character.name}
              className="h-14 w-14 rounded-2xl object-cover shadow-sm"
            />
            <div className="text-right">
              <h1 className="text-xl font-bold text-gray-900">
                {character.name}
              </h1>
              <p className="text-sm text-green-500">● Online</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-6">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="max-w-md text-center text-lg text-gray-400">
              Start a conversation with{" "}
              <span className="font-semibold text-gray-700">
                {character.name}
              </span>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    message.role === "user"
                      ? "rounded-br-sm bg-gray-900 text-white"
                      : "rounded-bl-sm border border-gray-200 bg-white text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.3s]" />
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      {/* ChatGPT-style input box */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 rounded-3xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder={`Message ${character.name}...`}
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isSending}
              className="rounded-full bg-gray-900 p-2 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-gray-400">
            {character.name} can make mistakes. Keep it fun!
          </p>
        </div>
      </footer>
    </div>
  );
}