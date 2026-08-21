"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Headphones, Bot } from "lucide-react";

const QUICK_REPLIES = [
  "I want to book a service",
  "Check my booking status",
  "Become a service partner",
  "Talk to a human",
];

const AUTO_REPLY =
  "Thanks for reaching out to Brancho! Our team usually responds in under a minute between 9 AM – 8 PM IST. For instant help, you can also call 1800 123 4567.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "Hi there! 👋 How can we help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: AUTO_REPLY }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-2xl shadow-navy/30 transition-all hover:scale-105 hover:bg-navy-soft"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="relative">
              <MessageCircle size={24} />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gold">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-60" />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[80] flex h-[30rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-navy/20"
          >
            <div className="relative bg-navy px-6 py-5 text-white">
              <div className="dot-grid-light absolute inset-0 opacity-30" />
              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <Bot size={22} />
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold">Brancho Care</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/60">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    Online — replies instantly
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-surface-soft/60 p-5">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-sm bg-navy text-white"
                        : "rounded-bl-sm border border-line bg-surface text-ink"
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <span className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-line bg-surface px-4 pt-3">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-line bg-surface-soft px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent-deep"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 bg-surface p-4"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-full border border-line bg-surface-soft px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-accent"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-colors hover:bg-navy-soft"
              >
                <Send size={16} />
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 border-t border-line bg-surface-soft py-2.5 text-xs text-muted">
              <Headphones size={13} />
              Prefer to talk? Call{" "}
              <a href="tel:+9118001234567" className="font-semibold text-accent-deep">
                1800 123 4567
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
