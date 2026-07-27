import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { 
  X, Minus, Globe, ChevronLeft, ChevronRight, RotateCw, 
  Lock, Star, ExternalLink, ShieldCheck, Terminal, Folder, FileText 
} from 'lucide-react';

export default function BrowserWindow({ 
  isOpen = true, 
  isMinimized = false, 
  onClose, 
  onMinimize, 
  onFocus,
  currentAccent = '#77216F',
  isLightMode = false,
  zIndex = 30
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
        onMouseDownCapture={onFocus}
        style={{ zIndex }}
        className={`absolute top-16 left-28 w-[860px] h-[580px] border rounded-t-lg shadow-2xl flex flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isLightMode 
            ? 'bg-white border-gray-300 text-gray-900' 
            : 'bg-[#1c1b22] border-[#383441] text-gray-100'
        }`}
      >
        {/* Title Bar */}
        <div 
          onMouseDown={onFocus}
          className={`browser-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
            isLightMode 
              ? 'bg-gray-100 border-gray-300 text-gray-800' 
              : 'bg-[#110f15] border-[#2b2a33] text-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold truncate">
            <Globe className="w-4 h-4 text-[#19B6EE]" />
            <span className="truncate">Firefox Developer Edition — {currentUrl}</span>
          </div>
          
          <div className="flex items-center space-x-2 shrink-0">
            <button 
              onClick={onMinimize} 
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                isLightMode 
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                  : 'bg-[#2b2a33] hover:bg-[#383441] text-gray-200'
              }`}
            >
              <Minus className="w-3 h-3" />
            </button>
            <button 
              onClick={onClose} 
              className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Navigation Toolbar */}
        <div className={`px-3 py-2 border-b flex items-center space-x-2 ${
          isLightMode 
            ? 'bg-gray-50 border-gray-200 text-gray-700' 
            : 'bg-[#2b2a33] border-[#383441] text-gray-200'
        }`}>
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleBack} 
              disabled={historyIndex === 0} 
              className={`p-1.5 rounded border transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-200 hover:bg-gray-100 text-gray-700' 
                  : 'bg-[#42414d] border-[#52505e] hover:bg-[#52505e] text-gray-200'
              } ${historyIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleForward} 
              disabled={historyIndex === history.length - 1} 
              className={`p-1.5 rounded border transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-200 hover:bg-gray-100 text-gray-700' 
                  : 'bg-[#42414d] border-[#52505e] hover:bg-[#52505e] text-gray-200'
              } ${historyIndex === history.length - 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleNavigate(currentUrl)} 
              className={`p-1.5 rounded border transition-colors cursor-pointer ${
                isLightMode 
                  ? 'bg-white border-gray-200 hover:bg-gray-100 text-gray-700' 
                  : 'bg-[#42414d] border-[#52505e] hover:bg-[#52505e] text-gray-200'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className={`flex-1 flex items-center border px-3 py-1.5 rounded shadow-inner space-x-2 ${
            isLightMode 
              ? 'bg-white border-gray-300 text-gray-800' 
              : 'bg-[#1c1b22] border-[#42414d] text-gray-100'
          }`}>
            <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
            <input 
              type="text" 
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full bg-transparent outline-none font-mono text-xs ${
                isLightMode ? 'text-gray-800' : 'text-gray-100'
              }`}
            />
            <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Viewport */}
        <div className={`flex-1 overflow-y-auto p-6 ${
          isLightMode ? 'bg-gray-50 text-gray-700' : 'bg-[#121117] text-gray-200'
        }`}>
          {currentUrl.includes('security-research') ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className={`border rounded-lg p-5 space-y-3 shadow-sm ${
                isLightMode 
                  ? 'bg-white border-gray-200' 
                  : 'bg-[#1c1b22] border-[#2b2a33]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${
                    isLightMode 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                  }`}>
                    Active Portfolio Page
                  </span>
                  <span className={isLightMode ? 'text-gray-400 text-[10px]' : 'text-gray-500 text-[10px]'}>
                    Munich, DE
                  </span>
                </div>
                <h1 className={`text-lg font-bold flex items-center space-x-2 ${
                  isLightMode ? 'text-gray-900' : 'text-white'
                }`}>
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  <span>Cybersecurity Research & Binary Analysis</span>
                </h1>
                <p className={`text-xs leading-relaxed ${
                  isLightMode ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  Specializing in reverse engineering, DevSecOps pipelines, automated binary analysis toolchains, and secure cloud system architectures. Currently building out agentic analysis assistants.
                </p>
                <div className="pt-2 flex gap-2">
                  <button 
                    onClick={() => handleNavigate('https://github.com')} 
                    className={`px-3 py-1.5 rounded border transition-colors flex items-center space-x-1.5 font-medium cursor-pointer ${
                      isLightMode 
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300' 
                        : 'bg-[#2b2a33] hover:bg-[#383441] text-gray-100 border-[#42414d]'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#19B6EE]" />
                    <span>View GitHub Repos</span>
                  </button>
                  <button 
                    onClick={() => handleNavigate('https://blog.local/writeups')} 
                    className={`px-3 py-1.5 rounded border transition-colors flex items-center space-x-1.5 font-medium cursor-pointer ${
                      isLightMode 
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300' 
                        : 'bg-[#2b2a33] hover:bg-[#383441] text-gray-100 border-[#42414d]'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Read Writeups</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded border shadow-sm space-y-2 ${
                  isLightMode ? 'bg-white border-gray-200' : 'bg-[#1c1b22] border-[#2b2a33]'
                }`}>
                  <h3 className={`font-bold flex items-center space-x-1.5 ${
                    isLightMode ? 'text-gray-900' : 'text-white'
                  }`}>
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    <span>Snippy-app Desktop</span>
                  </h3>
                  <p className={`text-[11px] ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Electron-based AI teaching assistant powered by the Gemini API for local code execution analysis.
                  </p>
                </div>
                <div className={`p-4 rounded border shadow-sm space-y-2 ${
                  isLightMode ? 'bg-white border-gray-200' : 'bg-[#1c1b22] border-[#2b2a33]'
                }`}>
                  <h3 className={`font-bold flex items-center space-x-1.5 ${
                    isLightMode ? 'text-gray-900' : 'text-white'
                  }`}>
                    <Folder className="w-4 h-4 text-amber-500" />
                    <span>3D Interactive Portfolio</span>
                  </h3>
                  <p className={`text-[11px] ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    WebGL and React Three Fiber multi-domain showcase highlighting technical projects and creative design.
                  </p>
                </div>
              </div>
            </div>
          ) : currentUrl.includes('github.com') ? (
            <div className="space-y-4 max-w-2xl mx-auto text-center py-10">
              <h2 className={`text-xl font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                GitHub External Redirect Simulated
              </h2>
              <p className={`text-xs ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                You are previewing a mock external navigation frame inside the local development environment.
              </p>
              <button 
                onClick={() => handleNavigate('https://portfolio.local/security-research')} 
                className="px-4 py-2 text-white rounded font-bold cursor-pointer" 
                style={{ backgroundColor: currentAccent }}
              >
                Return to Portfolio
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-w-xl mx-auto text-center py-12">
              <Globe className={`w-12 h-12 mx-auto ${isLightMode ? 'text-gray-300' : 'text-gray-600'}`} />
              <h2 className={`text-lg font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                Unable to Connect
              </h2>
              <p className={`text-xs ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Firefox can’t establish a connection to the server at <span className="text-amber-500">{currentUrl}</span>.
              </p>
              <button 
                onClick={() => handleNavigate('https://portfolio.local/security-research')} 
                className={`px-4 py-2 rounded border font-bold cursor-pointer ${
                  isLightMode 
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-300' 
                    : 'bg-[#2b2a33] hover:bg-[#383441] text-gray-100 border-[#42414d]'
                }`}
              >
                Go Back Home
              </button>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
}