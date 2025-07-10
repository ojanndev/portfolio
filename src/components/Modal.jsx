import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Halo! Ada yang bisa saya bantu? Silakan tulis pertanyaan Anda di sini." }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Fungsi auto-reply cerdas
  const getAutoReply = (userMsg) => {
    const msg = userMsg.toLowerCase();
    // Jawaban lebih kontekstual dan ramah
    if (
      msg.includes("bayar") ||
      msg.includes("pembayaran") ||
      msg.includes("transfer") ||
      msg.includes("biaya") ||
      msg.includes("harga") ||
      msg.includes("order") ||
      msg.includes("kerja sama") ||
      msg.includes("kolaborasi")
    ) {
      return (
        "Terkait pembayaran, harga, atau kerja sama, silakan hubungi saya langsung di WhatsApp: 089339454561. Saya siap membantu kebutuhan aplikasi, website, atau kolaborasi Anda!"
      );
    }
    if (
      msg.includes("aplikasi") ||
      msg.includes("website") ||
      msg.includes("project") ||
      msg.includes("buat")
    ) {
      return (
        "Anda ingin membuat aplikasi, website, atau project digital? Ceritakan kebutuhan Anda, atau langsung hubungi WhatsApp: 089339454561 untuk konsultasi gratis!"
      );
    }
    if (
      msg.includes("halo") ||
      msg.includes("hi") ||
      msg.includes("assalam") ||
      msg.includes("selamat pagi") ||
      msg.includes("selamat siang") ||
      msg.includes("selamat sore") ||
      msg.includes("selamat malam")
    ) {
      return "Halo juga! Ada yang bisa saya bantu? Silakan tulis pertanyaan Anda.";
    }
    if (
      msg.includes("terima kasih") ||
      msg.includes("makasih") ||
      msg.includes("thanks")
    ) {
      return "Sama-sama! Jika ada pertanyaan lain, jangan ragu untuk chat di sini atau hubungi WhatsApp saya.";
    }
    if (msg.includes("email")) {
      return "Anda juga bisa menghubungi saya lewat email: fauzannashiruddin50@gmail.com. Namun, untuk respon cepat, silakan chat WhatsApp: 089339454561.";
    }
    if (
      msg.includes("wa") ||
      msg.includes("whatsapp")
    ) {
      return "Nomor WhatsApp saya: 089339454561. Silakan chat untuk diskusi lebih lanjut!";
    }
    if (
      msg.includes("alamat") ||
      msg.includes("lokasi")
    ) {
      return "Saya berdomisili di Indonesia dan siap bekerja remote maupun onsite sesuai kebutuhan project.";
    }
    // Default
    return "Terima kasih atas pertanyaannya! Saya akan segera membalas atau Anda bisa menunggu balasan dari saya di sini. Jika ingin diskusi lebih lanjut, silakan chat WhatsApp: 089339454561.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    const reply = getAutoReply(input);
    setInput("");
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: reply }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full shadow-xl w-16 h-16 flex items-center justify-center hover:scale-110 transition-all focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Buka Chatbot"
        style={{ boxShadow: "0 8px 32px rgba(99,102,241,0.25)" }}
      >
        <MessageCircle className="w-8 h-8" />
      </button>
      {/* Chatbot Modal */}
      {open && (
        <div className="fixed z-50 bottom-24 right-6 w-[350px] max-w-[95vw] bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white">
            <span className="font-bold text-lg">Chatbot</span>
            <button onClick={() => setOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 px-4 py-3 space-y-2 overflow-y-auto max-h-72 scrollbar-thin scrollbar-thumb-[#a855f7]/40 scrollbar-track-transparent" style={{ minHeight: 180 }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2 rounded-2xl shadow text-sm max-w-[80%] ${msg.from === "user" ? "bg-[#a855f7] text-white" : "bg-[#6366f1] text-white"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-white/5">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 p-2 rounded-xl bg-white/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 text-sm"
              placeholder="Tulis pesan..."
              autoFocus
            />
            <button type="submit" className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-xl px-3 py-2 font-bold shadow hover:scale-105 transition-all">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </>
  );
};

export default Chatbot;