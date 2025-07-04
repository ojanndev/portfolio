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
    <div className="w-full max-w-xl mx-auto mt-8">
      <h3 className="text-xl font-bold mb-4 text-white">Komentar</h3>
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Nama Anda"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
          required
        />
        <textarea
          placeholder="Tulis komentar..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none min-h-[80px]"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-all"
        >
          Kirim Komentar
        </button>
      </form>
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-gray-400">Belum ada komentar.</p>
        )}
        {comments.map((comment, idx) => (
          <div key={idx} className="flex items-start gap-3 px-4 pt-4 pb-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group hover:shadow-lg hover:-translate-y-0.5">
            <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]">
              <UserCircle2 className="w-7 h-7" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between gap-4 mb-2">
                <h4 className="font-medium text-white truncate">{comment.userName}</h4>
                <span className="text-xs text-gray-400 whitespace-nowrap">{comment.createdAt}</span>
              </div>
              <p className="text-gray-300 text-sm break-words leading-relaxed relative bottom-2">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commentar; 