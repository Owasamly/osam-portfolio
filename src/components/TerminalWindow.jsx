import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Terminal as TerminalIcon } from 'lucide-react';

export default function TerminalWindow({ isOpen, isMinimized, onClose, onMinimize }) {
  const nodeRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  
  // Virtual filesystem structure for realistic navigation & cat commands
  const fileSystem = {
    '~': {
      type: 'dir',
      contents: ['projects', 'experience', 'about.txt', 'cv.txt', 'secret.txt']
    },
    '~/projects': {
      type: 'dir',
      contents: ['snippy-app', 'agentic-analyzer', 'linux-portfolio']
    },
    '~/experience': {
      type: 'dir',
      contents: ['cyber-researcher.txt', 'software-engineer.txt']
    }
  };

  const fileContents = {
    '~/about.txt': 'Cybersecurity researcher & software engineer specializing in automated binary analysis, reverse engineering, and low-level systems architecture.',
    '~/cv.txt': 'Name: Guest User\nRole: Security Researcher / Systems Developer\nSkills: C, C++, Python, Rust, Linux Kernel, Docker, Wireshark\nStatus: Open for opportunities.',
    '~/secret.txt': 'Congrats, you found the hidden flag! FLAG{linux_terminal_master_2026}',
    '~/projects/snippy-app': 'Snippy App: A high-performance code snippet manager built with modern web tools.',
    '~/projects/agentic-analyzer': 'Agentic Analyzer: Autonomous binary vulnerability scanner utilizing local LLM hooks.',
    '~/projects/linux-portfolio': 'Linux Portfolio: This immersive portfolio operating inside a custom web desktop environment.',
    '~/experience/cyber-researcher.txt': 'Role: Lead Security Researcher\nFocus: Automated vulnerability discovery, fuzzing pipelines, and secure firmware analysis.',
    '~/experience/software-engineer.txt': 'Role: Systems Engineer\nFocus: Low-level tool development, cross-platform performance optimization, and custom CLI utilities.'
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
      content: 'Ubuntu 24.04 LTS \nKernel: Linux 6.8.0-generic x86_64\nType "help" or run portfolio shortcuts like "whoami", "projects", or "ls".\n',
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
          response = 'Available commands:\n  ls         - List directory contents\n  cd <dir>   - Change directory (~, projects, experience)\n  cat <file> - Read file contents\n  whoami     - Brief personal introduction\n  projects   - Display core engineering projects\n  experience - View professional background\n  ifconfig   - Display active network configuration\n  date       - Show current system date and time\n  clear      - Clear terminal window\n  help       - Show this help menu';
          break;

        case 'whoami':
          response = 'Cybersecurity researcher & software engineer specializing in low-level development and automated binary analysis.';
          break;

        case 'projects':
          response = '• Snippy App (Code manager utility)\n• Agentic Analyzer (Autonomous binary vulnerability scanner)\n• Linux Portfolio (Interactive web desktop OS interface)';
          break;

        case 'experience':
          response = '• Cybersecurity Researcher & Master\'s Student (Present)\n• Specialized in low-level systems architecture and vulnerability research.';
          break;

        case 'date':
          response = new Date().toString();
          break;

        case 'ifconfig':
          response = 'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500\n        inet 192.168.1.104  netmask 255.255.255.0  broadcast 192.168.1.255\n        inet6 fe80::42:acff:fe11:2342  prefixlen 64  scopeid 0x20<link>\n        ether 02:42:ac:11:23:42  txqueuelen 0  (Ethernet)\n\nlo: flags=73<UP,LOOPBACK,RUNNING> mtu 65536\n        inet 127.0.0.1  netmask 255.0.0.0\n        inet6 ::1  prefixlen 64  scopeid 0x10<host>';
          break;

        case 'ls':
          const targetDir = fileSystem[currentPath];
          if (targetDir) {
            response = targetDir.contents.join('   ');
          } else {
            response = '';
          }
          break;

        case 'cd':
          if (!arg || arg === '~') {
            setCurrentPath('~');
          } else if (arg === '..' || arg === '/') {
            setCurrentPath('~');
          } else {
            const newPath = currentPath === '~' ? `~/${arg}` : `${currentPath}/${arg}`;
            if (fileSystem[newPath] && fileSystem[newPath].type === 'dir') {
              setCurrentPath(newPath);
            } else {
              response = `cd: no such file or directory: ${arg}`;
            }
          }
          break;

        case 'cat':
          if (!arg) {
            response = 'cat: missing file argument';
          } else {
            const filePath = currentPath === '~' ? `~/${arg}` : `${currentPath}/${arg}`;
            if (fileContents[filePath]) {
              response = fileContents[filePath];
            } else {
              const directMatch = Object.keys(fileContents).find(k => k.endsWith(`/${arg}`) || k === `~/${arg}`);
              if (directMatch) {
                response = fileContents[directMatch];
              } else {
                response = `cat: ${arg}: No such file or directory`;
              }
            }
          }
          break;

        case '':
          response = '';
          break;

        default:
          response = `${cmd}: command not found. Type "help" for a list of valid commands.`;
      }

      if (response) {
        newHistory.push({ type: 'output', content: response });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <Draggable handle=".ubuntu-term-header" nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        style={{ display: isMinimized ? 'none' : 'flex' }}
        className="absolute top-20 left-20 w-[700px] h-[450px] bg-[#0d1117]/95 backdrop-blur-xl border border-[#30363d] rounded-lg shadow-2xl flex-col z-20 overflow-hidden font-mono text-xs select-none"
      >
        {/* Terminal Header Matching File Explorer / Top Bar Style */}
        <div className="ubuntu-term-header cursor-move bg-[#161b22] px-4 py-2.5 border-b border-[#30363d] flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-200 font-semibold tracking-wide text-[11px]">
            <TerminalIcon className="w-4 h-4 text-green-400" />
            <span>guest@ubuntu: {currentPath}</span>
          </div>

          {/* Ubuntu Yaru Controls (Minimize & Close) */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onMinimize}
              className="w-5 h-5 rounded-full bg-[#333333] hover:bg-[#444444] text-gray-300 flex items-center justify-center transition-colors shadow-inner"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={onClose}
              className="w-5 h-5 rounded-full bg-[#E95420] hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-inner"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto text-[#c9d1d9] bg-[#0d1117] space-y-2.5 cursor-text font-mono"
        >
          {history.map((item, index) => (
            <div key={index}>
              {item.type === 'ascii' && (
                <pre className="text-green-500 font-bold text-[8px] sm:text-[9px] leading-none select-none drop-shadow">
                  {item.content}
                </pre>
              )}
              {item.type === 'output' && (
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">{item.content}</div>
              )}
              {item.type === 'command' && (
                <div className="text-green-400 font-medium">{item.content}</div>
              )}
            </div>
          ))}

          {/* Interactive Command Line Prompt */}
          <div className="flex items-center space-x-2 pt-1">
            <span className="text-green-400 font-bold">guest@ubuntu:{currentPath}$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent outline-none text-white font-mono text-xs caret-green-400"
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