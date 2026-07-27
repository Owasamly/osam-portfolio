import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Mail, X, Minus, Send, CheckCircle2 } from 'lucide-react';

export default function ContactWindow({ 
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize, 
  onFocus, 
  currentAccent = '#77216F',
  isLightMode = false
}) {
  const nodeRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || isMinimized) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
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
        onMouseDown={onFocus}
        className={`absolute top-24 left-1/3 w-[460px] border rounded-t-lg shadow-2xl flex flex-col z-30 overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isLightMode 
            ? 'bg-white border-gray-300 text-gray-900' 
            : 'bg-[#1e1e1e] border-[#333333] text-gray-200'
        }`}
      >
        <div className={`contact-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
          isLightMode 
            ? 'bg-gray-100 border-gray-300 text-gray-800' 
            : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
        }`}>
          <div className="flex items-center space-x-2 font-bold">
            <Mail className="w-4 h-4" style={{ color: currentAccent }} />
            <span>Send Message — Mail Client</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={onMinimize} 
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                isLightMode ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
            >
              <Minus className="w-3 h-3" />
            </button>
            <button onClick={onClose} className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className={`p-6 ${isLightMode ? 'bg-gray-50 text-gray-700' : 'bg-[#181818] text-gray-300'}`}>
          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h3 className={`text-sm font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Message Dispatched!</h3>
              <p className={`text-xs ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Thank you for reaching out. I'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>Your Name / Handle</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Jane Doe"
                  className={`w-full rounded px-3 py-2 outline-none transition-colors shadow-sm border ${
                    isLightMode 
                      ? 'bg-white border-gray-300 text-gray-800 focus:border-gray-500' 
                      : 'bg-[#252525] border-[#3d3d3d] text-gray-100 placeholder-gray-500 focus:border-gray-400'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@example.com"
                  className={`w-full rounded px-3 py-2 outline-none transition-colors shadow-sm border ${
                    isLightMode 
                      ? 'bg-white border-gray-300 text-gray-800 focus:border-gray-500' 
                      : 'bg-[#252525] border-[#3d3d3d] text-gray-100 placeholder-gray-500 focus:border-gray-400'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Let's build something or discuss an opportunity..."
                  className={`w-full rounded px-3 py-2 outline-none transition-colors resize-none shadow-sm border ${
                    isLightMode 
                      ? 'bg-white border-gray-300 text-gray-800 focus:border-gray-500' 
                      : 'bg-[#252525] border-[#3d3d3d] text-gray-100 placeholder-gray-500 focus:border-gray-400'
                  }`}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 rounded font-bold text-white shadow transition-all flex items-center justify-center space-x-2 hover:opacity-90 cursor-pointer"
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