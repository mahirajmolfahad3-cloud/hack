"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import type { Character } from "@/lib/characters";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const EASE: Easing = [0.16, 1, 0.3, 1] as const;

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
          isUser
            ? "rounded-br-md bg-white text-black"
            : "rounded-bl-md border border-white/10 bg-white/[0.04] text-white/90 backdrop-blur-xl"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="flex justify-start"
    >
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur-xl">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:0.3s]" />
      </div>
    </motion.div>
  );
}

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
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#07070a] text-white">
      {/* Ambient wash, consistent with the landing page's brand atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(80% 50% at 50% 0%, rgba(124,58,237,0.10) 0%, rgba(7,7,10,0) 60%)",
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="relative z-10 border-b border-white/[0.08] bg-black/40 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 text-white/50 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-sm"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span className="text-[13px] font-medium">Back</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-white">
                {character.name}
              </h1>
              <p className="flex items-center justify-end gap-1.5 text-[11px] text-white/40">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Online
              </p>
            </div>
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/60 to-fuchsia-500/30" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={character.image}
                alt={character.name}
                className="relative h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Chat area */}
      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-6">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-1 items-center justify-center"
          >
            <p className="max-w-md text-center text-[15px] leading-7 text-white/35">
              Start a conversation with{" "}
              <span className="font-medium text-white/70">{character.name}</span>
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isSending && <TypingIndicator key="typing" />}
            </AnimatePresence>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      {/* Input */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 transition-colors duration-300 focus-within:border-violet-400/40 focus-within:bg-white/[0.06]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder={`Message ${character.name}...`}
              className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/30 focus:outline-none"
            />
            <motion.button
              onClick={handleSend}
              disabled={!input.trim() || isSending}
              whileHover={input.trim() && !isSending ? { scale: 1.06 } : undefined}
              whileTap={input.trim() && !isSending ? { scale: 0.94 } : undefined}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </motion.button>
          </div>
          <p className="mt-2.5 text-center text-[11px] text-white/25">
            {character.name} can make mistakes. Keep it fun!
          </p>
        </div>
      </footer>
    </div>
  );
}