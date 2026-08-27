"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const starterPrompts = [
  "What does Ahsanali specialize in?",
  "Suggest research topics based on his experience.",
  "What technical questions could Ahsanali answer?",
];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 4 16 8-16 8 3-8-3-8Zm3 8h13" />
    </svg>
  );
}

export default function AiClone() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I’m Ahsanali’s profile assistant. Ask me about his experience, strengths, career journey, or grounded research and technical discussion ideas.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  async function askQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/clone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.answer ?? data.error ?? "I couldn’t answer that right now. Please try again.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "I couldn’t reach the assistant right now. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askQuestion(input);
  }

  return (
    <section className="clone section-shell" id="clone">
      <div className="section-marker light-marker"><span>05</span><span>Ask the profile</span></div>
      <div className="clone-layout">
        <div className="clone-intro">
          <p className="eyebrow">Human / AI interface</p>
          <h2 className="section-heading light-heading">Meet the<br /><em>digital twin.</em></h2>
          <p className="clone-description">A focused assistant trained on Ahsanali&apos;s professional profile — useful for quick context, research directions, and questions worth preparing for.</p>
          <div className="clone-boundary"><span className="status-dot" /><span>Profile-only answers<br />with grounded suggestions</span></div>
        </div>

        <div className="clone-chat" aria-label="Ahsanali profile assistant">
          <div className="chat-header"><span><i className="status-dot" /> ONLINE / PROFILE MODE</span><span>GLM-5.3</span></div>
          <div className="chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
                <span className="chat-label">{message.role === "assistant" ? "AS / AI" : "YOU"}</span>
                <p>{message.content}</p>
              </div>
            ))}
            {loading && <div className="chat-message assistant"><span className="chat-label">AS / AI</span><p className="typing"><i /><i /><i /></p></div>}
            <div ref={messageEndRef} />
          </div>
          <div className="starter-prompts">
            {starterPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => void askQuestion(prompt)}>{prompt}<ArrowUpRight /></button>)}
          </div>
          <form className="chat-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="clone-question">Ask Ahsanali&apos;s profile assistant</label>
            <input id="clone-question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about the work..." maxLength={2400} disabled={loading} />
            <button type="submit" aria-label="Send question" disabled={loading || !input.trim()}><SendIcon /></button>
          </form>
          <p className="chat-footnote">Answers are limited to the professional profile and grounded suggestions.</p>
        </div>
      </div>
    </section>
  );
}
