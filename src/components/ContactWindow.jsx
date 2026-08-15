import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  Minus,
  Send,
  X,
} from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

const initialFormData = {
  name: '',
  email: '',
  message: '',
  company: '', // Honeypot spam field
};

export default function ContactWindow({
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  currentAccent = '#77216F',
  isLightMode = false,
  zIndex = 25,
}) {
  const nodeRef = useRef(null);
  const isMobile = useIsMobile(768);

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || isMinimized) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === 'sending') return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || 'The message could not be sent. Please try again.',
        );
      }

      setStatus('success');
      setFormData(initialFormData);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error.message || 'The message could not be sent. Please try again.',
      );
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  const inputClasses = `w-full rounded px-3 py-2 outline-none transition-colors shadow-sm border ${
    isLightMode
      ? 'bg-white border-gray-300 text-gray-800 focus:border-gray-500'
      : 'bg-[#252525] border-[#3d3d3d] text-gray-100 placeholder-gray-500 focus:border-gray-400'
  }`;

  return (
    <Draggable
      handle=".contact-header"
      nodeRef={nodeRef}
      disabled={isMobile}
    >
      <div
        ref={nodeRef}
        onMouseDownCapture={onFocus}
        onPointerDownCapture={onFocus}
        style={{ zIndex: isMobile ? 100 : zIndex }}
        className={`border shadow-2xl flex flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isMobile
            ? 'fixed inset-0 w-full h-[100dvh] rounded-none'
            : 'absolute top-24 left-1/3 w-[460px] rounded-t-lg'
        } ${
          isLightMode
            ? 'bg-white border-gray-300 text-gray-900'
            : 'bg-[#1e1e1e] border-[#333333] text-gray-200'
        }`}
      >
        <div
          onMouseDown={onFocus}
          onPointerDown={onFocus}
          className={`contact-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
            isLightMode
              ? 'bg-gray-100 border-gray-300 text-gray-800'
              : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold">
            <Mail
              className="w-4 h-4"
              style={{ color: currentAccent }}
            />

            <span>Send Message — Mail Client</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onMinimize}
              aria-label="Minimize contact window"
              className={`rounded-full flex items-center justify-center transition-colors ${
                isMobile ? 'p-2' : 'w-5 h-5'
              } ${
                isLightMode
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
            >
              <Minus className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close contact window"
              className={`rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors ${
                isMobile ? 'p-2' : 'w-5 h-5'
              }`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div
          className={`p-6 ${
            isLightMode
              ? 'bg-gray-50 text-gray-700'
              : 'bg-[#181818] text-gray-300'
          }`}
        >
          {status === 'success' ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />

              <h3
                className={`text-sm font-bold ${
                  isLightMode ? 'text-gray-900' : 'text-white'
                }`}
              >
                Message sent successfully
              </h3>

              <p
                className={`text-xs ${
                  isLightMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                Thank you for reaching out. I will get back to you shortly.
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded font-bold text-white hover:opacity-90"
                style={{ backgroundColor: currentAccent }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-name"
                  className={`block text-[11px] font-semibold mb-1 ${
                    isLightMode ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  Your name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className={`block text-[11px] font-semibold mb-1 ${
                    isLightMode ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  Email address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className={`block text-[11px] font-semibold mb-1 ${
                    isLightMode ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  minLength={10}
                  maxLength={3000}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Let's discuss an opportunity..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {status === 'error' && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded border border-red-500/40 bg-red-500/10 p-3 text-red-400"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-2.5 rounded font-bold text-white shadow transition-all flex items-center justify-center space-x-2 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: currentAccent }}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send message</span>
                  </>
                )}
              </button>

              <p
                className={`text-[10px] text-center ${
                  isLightMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Your details will only be used to respond to your message.
              </p>
            </form>
          )}
        </div>
      </div>
    </Draggable>
  );
}