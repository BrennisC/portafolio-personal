import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { Message } from "../types";
import { Mail, Send, Inbox, Trash2, Heart, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function ContactCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showInbox, setShowInbox] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Load local messages left by users
  useEffect(() => {
    const stored = localStorage.getItem("brennis_portfolio_messages");
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !text.trim()) return;

    setStatus("sending");

    const newMessage: Message = {
      id: "msg_" + Date.now(),
      name,
      email,
      text,
      timestamp: new Date().toLocaleDateString("es-PE", {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setTimeout(() => {
      const updated = [newMessage, ...messages];
      setMessages(updated);
      localStorage.setItem("brennis_portfolio_messages", JSON.stringify(updated));

      setName("");
      setEmail("");
      setText("");
      setStatus("success");

      setTimeout(() => setStatus("idle"), 3000);
    }, 800);
  };

  const deleteMessage = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem("brennis_portfolio_messages", JSON.stringify(updated));
  };

  return (
    <div id="contact-card" className="h-full flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl relative overflow-hidden group">
      {/* Background glow shadow */}
      <div className="absolute bottom-0 left-4 w-28 h-28 bg-emerald-500/5 rounded-full filter blur-xl group-hover:bg-emerald-500/10 transition pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="font-sans font-semibold text-white text-sm">Buzón de Mensajes</h3>
          </div>

          <button
            id="contact-toggle-inbox"
            onClick={() => setShowInbox(!showInbox)}
            className="text-[9px] font-mono text-zinc-500 hover:text-zinc-300 border border-zinc-800 bg-zinc-950 px-2 py-0.5 rounded-lg flex items-center gap-1 transition"
          >
            <Inbox className="w-3 h-3 text-emerald-400" />
            <span>Mensajes ({messages.length})</span>
          </button>
        </div>

        {/* Dynamic Display: Form vs Inbox List */}
        {showInbox ? (
          /* Stored Messages Inbox List */
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
            {messages.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-[10px] font-mono text-zinc-600">No hay mensajes guardados en este navegador.</p>
              </div>
            ) : (
              messages.map(m => (
                <div key={m.id} className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-850 relative group/item">
                  <div className="flex items-center justify-between text-[9px] font-mono mb-1 text-zinc-400">
                    <span className="font-bold text-white truncate max-w-[120px]">{m.name}</span>
                    <span className="text-zinc-600">{m.timestamp}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-sans leading-relaxed break-words pr-4">{m.text}</p>
                  
                  <button
                    id={`delete-${m.id}`}
                    onClick={(e) => deleteMessage(m.id, e)}
                    className="absolute right-2 bottom-2 p-1 text-zinc-600 hover:text-rose-400 rounded hover:bg-rose-500/10 transition duration-150"
                    title="Eliminar mensaje"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Form Entry */
          <form id="contact-form" onSubmit={handleSend} className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                id="contact-name-input"
                type="text"
                placeholder="Tu Nombre"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-all font-sans"
              />
              <input
                id="contact-email-input"
                type="email"
                placeholder="Tu Correo"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-all font-sans"
              />
            </div>
            <textarea
              id="contact-text-input"
              rows={2}
              placeholder="Escribe tu propuesta..."
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-all font-sans resize-none"
            />

            <button
              id="contact-btn-submit"
              type="submit"
              disabled={status === "sending"}
              className={`w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                status === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                  : "bg-emerald-500 text-black hover:bg-emerald-400 active:scale-[0.98]"
              }`}
            >
              {status === "sending" ? (
                <span>Enviando...</span>
              ) : status === "success" ? (
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> ¡Recibido en Local!
                </span>
              ) : (
                <>
                  <Send className="w-3 h-3" />
                  <span>Enviar Mensaje</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="text-[9px] font-sans text-zinc-500 mt-2 flex items-center justify-between">
        <span className="flex items-center gap-1">
          Hecho con <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> por Brennis Castro
        </span>
        <span>Santiago / Lima 2026</span>
      </div>
    </div>
  );
}
