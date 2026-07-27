import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Terminal as TerminalIcon } from 'lucide-react';

export default function TerminalWindow({ 
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize, 
  onFocus, 
  isLightMode,
  zIndex = 20
}) {
  const nodeRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');

  const fileSystem = {
    '~': { type: 'dir', contents: ['projects', 'experience', 'about.txt', 'cv.txt', 'secret.txt'] },
    '~/projects': { type: 'dir', contents: ['snippy-app', 'agentic-analyzer', 'linux-portfolio'] },
    '~/experience': { type: 'dir', contents: ['cyber-researcher.txt', 'software-engineer.txt'] }
  };

  const fileContents = {
    '~/about.txt': 'Cybersecurity researcher & software engineer specializing in automated binary analysis.',
    '~/cv.txt': 'Name: Guest User\nRole: Security Researcher / Systems Developer',
    '~/secret.txt': 'FLAG{linux_terminal_master_2026}'
  };

  const [history, setHistory] = useState([
    {
      type: 'ascii',
      content: `
       _   _ _                 _          ____   ___  _  _  
      | | | | |__  _   _ _ __ | |_ _   _ | ___\\ / _ \\| || | 
      | | | | '_ \\| | | | '_ \\| __| | | |___ \\| | | | || |_
      | |_| | |_) | |_| | | | | |_| |_| |___) | |_| |__   _|
       \\___/|_.__/ \\__,_|_| |_|\\__|\\__,_|____/ \\___/   |_|  
      `,
    },
    {
      type: 'output',
      content: 'Ubuntu 24.04 LTS\nType "help" or run "whoami", "projects", or "ls".\n',
    },
  ]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const fullCmd = input.trim();
      const parts = fullCmd.split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts[1];

      const newHistory = [...history, { type: 'command', content: `guest@ubuntu:${currentPath}$ ${fullCmd}` }];

      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }

      let response = '';

      switch (cmd) {
        case 'help':
          response = 'Available commands: ls, cd, cat, whoami, projects, experience, date, clear, help';
          break;
        case 'whoami':
          response = 'Cybersecurity researcher & software engineer specializing in low-level systems.';
          break;
        case 'projects':
          response = '• Snippy App\n• Agentic Analyzer\n• Linux Portfolio';
          break;
        case 'ls':
          response = fileSystem[currentPath] ? fileSystem[currentPath].contents.join('   ') : '';
          break;
        default:
          response = `${cmd}: command not found`;
      }

      if (response) newHistory.push({ type: 'output', content: response });
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <Draggable handle=".ubuntu-term-header" nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        onMouseDownCapture={onFocus}
        style={{ display: isMinimized ? 'none' : 'flex', zIndex }}
        className={`absolute top-20 left-20 w-[700px] h-[450px] border rounded-lg shadow-2xl flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-xl ${
          isLightMode ? 'bg-[#f7f7f7]/95 border-gray-300 text-gray-900' : 'bg-[#0d1117]/95 border-[#30363d] text-[#c9d1d9]'
        }`}
      >
        <div 
          onMouseDown={onFocus}
          className={`ubuntu-term-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
            isLightMode ? 'bg-[#e3e3e3] border-gray-300 text-gray-800' : 'bg-[#161b22] border-[#30363d] text-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-semibold text-[11px]">
            <TerminalIcon className="w-4 h-4 text-green-500" />
            <span>guest@ubuntu: {currentPath}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={onMinimize} className="w-5 h-5 rounded-full bg-gray-400/20 hover:bg-gray-400/40 flex items-center justify-center transition-colors">
              <Minus className="w-3 h-3" />
            </button>
            <button onClick={onClose} className="w-5 h-5 rounded-full bg-[#E95420] hover:bg-red-600 text-white flex items-center justify-center transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div 
          onClick={() => inputRef.current?.focus()}
          className={`flex-1 p-4 overflow-y-auto space-y-2.5 cursor-text font-mono ${
            isLightMode ? 'bg-white text-gray-800' : 'bg-[#0d1117] text-[#c9d1d9]'
          }`}
        >
          {history.map((item, index) => (
            <div key={index}>
              {item.type === 'ascii' && (
                <pre className="text-green-600 font-bold text-[8px] sm:text-[9px] leading-none select-none">
                  {item.content}
                </pre>
              )}
              {item.type === 'output' && (
                <div className={`whitespace-pre-wrap leading-relaxed ${isLightMode ? 'text-gray-700' : 'text-gray-300'}`}>{item.content}</div>
              )}
              {item.type === 'command' && (
                <div className="text-green-600 font-medium">{item.content}</div>
              )}
            </div>
          ))}

          <div className="flex items-center space-x-2 pt-1">
            <span className="text-green-600 font-bold">guest@ubuntu:{currentPath}$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent outline-none font-mono text-xs caret-green-500"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </Draggable>
  );
}