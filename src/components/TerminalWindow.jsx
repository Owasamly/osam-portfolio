import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Terminal as TerminalIcon } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

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
  const isMobile = useIsMobile(768);
  const [viewportHeight, setViewportHeight] = useState('100dvh');
  const commandHistoryRef = useRef([]);
  const commandIndexRef = useRef(-1);

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

  useEffect(() => {
    if (!isMobile) return;

    const visualViewport = window.visualViewport;
    if (!visualViewport) return;

    const updateViewportHeight = () => {
      setViewportHeight(`${visualViewport.height}px`);
    };

    updateViewportHeight();
    visualViewport.addEventListener('resize', updateViewportHeight);

    return () => {
      visualViewport.removeEventListener('resize', updateViewportHeight);
    };
  }, [isMobile]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [input, viewportHeight, history]);

  if (!isOpen) return null;

  const executeCommand = (rawCommand) => {
    const fullCmd = rawCommand.trim();
    const parts = fullCmd.split(' ');
    const cmd = parts[0].toLowerCase();

    if (fullCmd) {
      commandHistoryRef.current = [...commandHistoryRef.current, fullCmd];
      commandIndexRef.current = commandHistoryRef.current.length;
    }

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
  };

  const navigateCommandHistory = (direction) => {
    const commandHistory = commandHistoryRef.current;
    if (!commandHistory.length) return;

    if (direction < 0) {
      commandIndexRef.current = Math.max(0, commandIndexRef.current - 1);
    } else {
      commandIndexRef.current = Math.min(commandHistory.length - 1, commandIndexRef.current + 1);
    }

    setInput(commandHistory[commandIndexRef.current] ?? '');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleCommandKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(input);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateCommandHistory(-1);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateCommandHistory(1);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      setInput(prev => `${prev}    `);
    }
  };

  const handleQuickAction = (action) => {
    if (action === 'tab') {
      setInput(prev => `${prev}    `);
    } else if (action === 'ctrlc') {
      setInput('');
    } else if (action === 'up') {
      navigateCommandHistory(-1);
      return;
    } else if (action === 'down') {
      navigateCommandHistory(1);
      return;
    } else {
      executeCommand(action);
      return;
    }

    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <Draggable handle=".ubuntu-term-header" nodeRef={nodeRef} disabled={isMobile}>
      <div
        ref={nodeRef}
        onMouseDownCapture={onFocus}
        onPointerDownCapture={onFocus}
        style={{ display: isMinimized ? 'none' : 'flex', zIndex: isMobile ? 100 : zIndex }}
        className={`border shadow-2xl flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-xl ${
          isMobile ? 'fixed inset-0 w-full h-[100dvh] rounded-none' : 'absolute top-20 left-20 w-[700px] h-[450px] rounded-lg'
        } ${
          isLightMode ? 'bg-[#f7f7f7]/95 border-gray-300 text-gray-900' : 'bg-[#0d1117]/95 border-[#30363d] text-[#c9d1d9]'
        }`}
      >
        <div 
          onMouseDown={onFocus}
          onPointerDown={onFocus}
          className={`ubuntu-term-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
            isLightMode ? 'bg-[#e3e3e3] border-gray-300 text-gray-800' : 'bg-[#161b22] border-[#30363d] text-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-semibold text-[11px]">
            <TerminalIcon className="w-4 h-4 text-green-500" />
            <span>guest@ubuntu: {currentPath}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={onMinimize} className={`rounded-full bg-gray-400/20 hover:bg-gray-400/40 flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'}`}>
              <Minus className="w-3 h-3" />
            </button>
            <button onClick={onClose} className={`rounded-full bg-[#E95420] hover:bg-red-600 text-white flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'}`}>
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col">
          <div 
            onClick={() => inputRef.current?.focus()}
            className={`flex-1 min-h-0 p-4 overflow-y-auto overscroll-contain pb-4 space-y-2.5 cursor-text font-mono ${
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
            <div ref={bottomRef} />
          </div>

          <div className={`flex-shrink-0 sticky bottom-0 w-full border-t px-4 py-3 ${isLightMode ? 'bg-white border-gray-200' : 'bg-[#0d1117] border-[#30363d]'}`}>
            {isMobile && (
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]">
                {[
                  { label: 'Tab', action: 'tab' },
                  { label: 'Ctrl+C', action: 'ctrlc' },
                  { label: 'Clear', action: 'clear' },
                  { label: 'whoami', action: 'whoami' },
                  { label: 'projects', action: 'projects' },
                  { label: 'ls', action: 'ls' },
                  { label: '↑', action: 'up' },
                  { label: '↓', action: 'down' },
                ].map((button) => (
                  <button
                    key={button.label}
                    onClick={() => handleQuickAction(button.action)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                      isLightMode
                        ? 'border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200'
                        : 'border-[#30363d] bg-[#161b22] text-gray-200 hover:bg-[#21262d]'
                    }`}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-2">
              <span className="text-green-600 font-bold">guest@ubuntu:{currentPath}$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommandKeyDown}
                className={`flex-1 bg-transparent outline-none font-mono ${isMobile ? 'text-[16px]' : 'text-xs'} caret-green-500`}
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}