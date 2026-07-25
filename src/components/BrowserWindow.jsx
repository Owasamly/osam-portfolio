import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Globe, ChevronLeft, ChevronRight, RotateCw, Lock, Star, ExternalLink, ShieldCheck, Terminal, Folder, FileText } from 'lucide-react';

export default function BrowserWindow({ 
  isOpen = true, 
  isMinimized = false, 
  onClose, 
  onMinimize, 
  currentAccent = '#E95420' 
}) {
  const nodeRef = useRef(null);
  const [urlInput, setUrlInput] = useState('https://portfolio.local/security-research');
  const [currentUrl, setCurrentUrl] = useState('https://portfolio.local/security-research');
  const [history, setHistory] = useState(['https://portfolio.local/security-research']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleNavigate = (newUrl) => {
    setUrlInput(newUrl);
    setCurrentUrl(newUrl);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      let formattedUrl = urlInput.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      handleNavigate(formattedUrl);
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setUrlInput(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setUrlInput(history[newIndex]);
    }
  };

  if (!isOpen || isMinimized) return null;

  return (
    <Draggable handle=".browser-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef}
        className="absolute top-16 left-28 w-[860px] h-[580px] bg-[#1e1e1e]/95 backdrop-blur-md border border-[#333333] rounded-t-lg shadow-2xl flex flex-col z-30 overflow-hidden font-mono text-xs select-none"
      >
        {/* Browser Window Title Bar */}
        <div className="browser-header cursor-move bg-[#111111] px-4 py-2.5 border-b border-[#2b2b2b] flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-200 font-bold">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Firefox Developer Edition — {currentUrl}</span>
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

        {/* Browser Toolbar / URL Bar */}
        <div className="bg-[#181818] px-3 py-2 border-b border-[#2b2b2b] flex items-center space-x-2 text-gray-300">
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleBack} 
              disabled={historyIndex === 0} 
              className={`p-1.5 rounded bg-[#222222] hover:bg-[#333333] text-gray-300 ${historyIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleForward} 
              disabled={historyIndex === history.length - 1} 
              className={`p-1.5 rounded bg-[#222222] hover:bg-[#333333] text-gray-300 ${historyIndex === history.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleNavigate(currentUrl)} 
              className="p-1.5 rounded bg-[#222222] hover:bg-[#333333] text-gray-300"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 flex items-center bg-[#141414] border border-[#333333] px-3 py-1.5 rounded text-gray-200 shadow-inner space-x-2">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <input 
              type="text" 
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none text-gray-200 font-mono text-xs"
            />
            <Star className="w-3.5 h-3.5 text-amber-400 shrink-0 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Browser Viewport */}
        <div className="flex-1 bg-[#161616] overflow-y-auto p-6 text-gray-300">
          {currentUrl.includes('security-research') ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-[#1f1f1f] border border-[#333333] rounded-lg p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold uppercase">Active Portfolio Page</span>
                  <span className="text-gray-500 text-[10px]">Munich, DE</span>
                </div>
                <h1 className="text-lg font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Cybersecurity Research & Binary Analysis</span>
                </h1>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Specializing in reverse engineering, DevSecOps pipelines, automated binary analysis toolchains, and secure cloud system architectures. Currently building out agentic analysis assistants.
                </p>
                <div className="pt-2 flex gap-2">
                  <button onClick={() => handleNavigate('https://github.com')} className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#333333] text-white rounded border border-[#444] transition-colors flex items-center space-x-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    <span>View GitHub Repos</span>
                  </button>
                  <button onClick={() => handleNavigate('https://blog.local/writeups')} className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#333333] text-white rounded border border-[#444] transition-colors flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Read Writeups</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1b1b1b] p-4 rounded border border-[#2d2d2d] space-y-2">
                  <h3 className="font-bold text-white flex items-center space-x-1.5">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>Snippy-app Desktop</span>
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Electron-based AI teaching assistant powered by the Gemini API for local code execution analysis.
                  </p>
                </div>
                <div className="bg-[#1b1b1b] p-4 rounded border border-[#2d2d2d] space-y-2">
                  <h3 className="font-bold text-white flex items-center space-x-1.5">
                    <Folder className="w-4 h-4 text-amber-400" />
                    <span>3D Interactive Portfolio</span>
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    WebGL and React Three Fiber multi-domain showcase highlighting technical projects and creative design.
                  </p>
                </div>
              </div>
            </div>
          ) : currentUrl.includes('github.com') ? (
            <div className="space-y-4 max-w-2xl mx-auto text-center py-10">
              <h2 className="text-xl font-bold text-white">GitHub External Redirect Simulated</h2>
              <p className="text-gray-400 text-xs">You are previewing a mock external navigation frame inside the local development environment.</p>
              <button onClick={() => handleNavigate('https://portfolio.local/security-research')} className="px-4 py-2 bg-[#E95420] text-white rounded font-bold">
                Return to Portfolio
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-w-xl mx-auto text-center py-12">
              <Globe className="w-12 h-12 text-gray-600 mx-auto" />
              <h2 className="text-lg font-bold text-white">Unable to Connect</h2>
              <p className="text-gray-400 text-xs">Firefox can’t establish a connection to the server at <span className="text-amber-400">{currentUrl}</span>.</p>
              <button onClick={() => handleNavigate('https://portfolio.local/security-research')} className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#333333] text-white rounded border border-[#444] font-bold">
                Go Back Home
              </button>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
}