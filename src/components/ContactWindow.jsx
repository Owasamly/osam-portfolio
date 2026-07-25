import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Mail, X, Minus, Send, CheckCircle2 } from 'lucide-react';

export default function ContactWindow({ isOpen, isMinimized, onClose, onMinimize, currentAccent }) {
  const nodeRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || isMinimized) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate EmailJS, Formspree, or an API backend here if desired
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <Draggable handle=".contact-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef} 
        className="absolute top-24 left-1/3 w-[460px] bg-[#1e1e1e]/95 backdrop-blur-md border border-[#333333] rounded-t-lg shadow-2xl flex flex-col z-30 overflow-hidden font-mono text-xs select-none"
      >
        <div className="contact-header cursor-move bg-[#111111] px-4 py-2.5 border-b border-[#2b2b2b] flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-200 font-bold">
            <Mail className="w-4 h-4" style={{ color: currentAccent }} />
            <span>Send Message — Mail Client</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={onMinimize} className="w-5 h-5 rounded-full bg-[#333333] hover:bg-[#444444] text-gray-300 flex items-center justify-center transition-colors">
              <Minus className="w-3 h-3" />
            </button>
            <button onClick={onClose} className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="p-6 bg-[#161616] text-gray-200">
          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-sm font-bold text-white">Message Dispatched!</h3>
              <p className="text-xs text-gray-400">Thank you for reaching out. I'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">Your Name / Handle</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Jane Doe"
                  className="w-full bg-[#121212] border border-[#333333] rounded px-3 py-2 text-gray-200 outline-none focus:border-gray-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="w-full bg-[#121212] border border-[#333333] rounded px-3 py-2 text-gray-200 outline-none focus:border-gray-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Let's build something or discuss an opportunity..."
                  className="w-full bg-[#121212] border border-[#333333] rounded px-3 py-2 text-gray-200 outline-none focus:border-gray-500 transition-colors resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 rounded font-bold text-white shadow transition-all flex items-center justify-center space-x-2"
                style={{ backgroundColor: currentAccent }}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Transmission</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </Draggable>
  );
}