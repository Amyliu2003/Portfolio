import React, { useState } from "react";
import { motion } from "motion/react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login for frontend demo
    if (email && password) {
      onLogin();
      onClose();
    } else {
      setError("Please fill in all fields");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0A0F33]/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-[#181A4B] border border-[#333] p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="text-3xl font-black italic uppercase text-white mb-8 tracking-tighter">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-[#333] text-white px-4 py-3 focus:border-[#BA76FF] outline-none transition-colors font-mono"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-[#333] text-white px-4 py-3 focus:border-[#BA76FF] outline-none transition-colors font-mono"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-mono">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#BA76FF] text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors duration-300"
          >
            Enter System
          </button>
        </form>
      </motion.div>
    </div>
  );
};
