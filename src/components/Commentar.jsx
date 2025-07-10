import React, { useState } from "react";
import { UserCircle2 } from "lucide-react";

const Commentar = () => {
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim() || !newComment.trim()) return;
    setComments([
      {
        userName,
        content: newComment,
        createdAt: new Date().toLocaleString(),
      },
      ...comments,
    ]);
    setUserName("");
    setNewComment("");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <h3 className="text-2xl font-extrabold mb-6 text-white tracking-tight text-center drop-shadow-lg">Komentar</h3>
      <form onSubmit={handleSubmit} className="mb-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-white/20">
        <div className="flex gap-4 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Nama Anda"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 transition-all shadow-sm"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-all whitespace-nowrap"
          >
            Kirim
          </button>
        </div>
        <textarea
          placeholder="Tulis komentar..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 min-h-[90px] transition-all shadow-sm"
          required
        />
      </form>
      <div className="space-y-6">
        {comments.length === 0 && (
          <p className="text-gray-400 text-center">Belum ada komentar.</p>
        )}
        {comments.map((comment, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 transition-all group hover:shadow-2xl hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div className="flex items-center justify-center min-w-[48px] min-h-[48px] rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white font-bold text-lg shadow-md border-2 border-white/30">
              {getInitials(comment.userName) || <UserCircle2 className="w-8 h-8" />}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between gap-4 mb-1">
                <h4 className="font-semibold text-white truncate text-lg drop-shadow-sm">{comment.userName}</h4>
                <span className="text-xs text-gray-300 whitespace-nowrap font-mono">{comment.createdAt}</span>
              </div>
              <p className="text-gray-200 text-base break-words leading-relaxed relative">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
};

export default Commentar; 