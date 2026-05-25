"use client";
import { useState } from "react";
import { MessageSquareText, X, SendHorizontal, Activity } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to get response");
      }
      
      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...updated,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
      {open && (
        <div style={{
          width: 340, height: 460, background: "#fff", borderRadius: 12,
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)", display: "flex",
          flexDirection: "column", marginBottom: 12, border: "1px solid #eee"
        }}>
          <div style={{
            padding: "12px 16px", background: "#2563eb",
            borderRadius: "12px 12px 0 0", color: "#fff",
            fontWeight: 500, display: "flex", alignItems: "center", gap: 8
          }}>
            <Activity size={18} />
            SlotsBot
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? "#2563eb" : "#f3f4f6",
                color: m.role === "user" ? "#fff" : "#111",
                padding: "8px 12px", borderRadius: 8, maxWidth: "80%", fontSize: 13,
                wordWrap: "break-word"
              }}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", fontSize: 13, color: "#888" }}>
                <span>Typing</span>
                <span style={{ animation: "dots 1.4s infinite" }}>...</span>
              </div>
            )}
          </div>

          <div style={{ padding: 10, borderTop: "1px solid #eee", display: "flex", gap: 6 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !loading && sendMessage()}
              placeholder="Ask about facilities..."
              disabled={loading}
              style={{ 
                flex: 1, padding: "8px 10px", borderRadius: 8, 
                border: "1px solid #ddd", fontSize: 13,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "text"
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                background: loading ? "#ccc" : "#2563eb", 
                color: "#fff", border: "none",
                borderRadius: 8, padding: "8px 12px", 
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              <SendHorizontal size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 52, height: 52, borderRadius: "50%", background: "#2563eb",
          color: "#fff", border: "none", cursor: "pointer",
          boxShadow: "0 4px 12px rgba(37,99,235,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s"
        }}
      >
        {open ? <X size={20} /> : <MessageSquareText size={22} />}
      </button>

      <style>{`
        @keyframes dots {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60%, 100% { content: '...'; }
        }
      `}</style>
    </div>
  );
}