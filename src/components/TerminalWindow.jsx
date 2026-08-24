import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Minus, Terminal as TerminalIcon, X } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

const PROJECT_INDEX = `COMPLETED
  ✓ Kubernetes_Runtime_Security
  ✓ Local_Kubernetes_GitOps
  ✓ Terraform_OPA_Guardrails
  ✓ DevSecOps_Juice_Shop
  ✓ MK_Delivery

PROTOTYPE
  ◇ Snippy_AI_Cursor

IN PROGRESS
  ◌ Agentic_Job_Search
  ◌ Vault_OIDC_Secrets
  ◌ Secure_Supply_Chain
  ◌ AI_Auto_Remediation

Use "open projects" to browse the project folders.`;

const SKILLS_OUTPUT = `Programming       Python · JavaScript · TypeScript · Node.js · Bash
AI Automation     LLM APIs · structured outputs · tool calling · browser automation · validation
Containers        Docker · Kubernetes · k3d · Helm
Infrastructure    Terraform · LocalStack · OPA/Rego
CI/CD & GitOps    GitHub Actions · Argo CD
AppSec            TruffleHog · Semgrep · Trivy
Runtime Security  Falco · FalcoSidekick
Systems           Linux · Git/GitHub · Wireshark`;

const HELP_OUTPUT = `PORTFOLIO COMMANDS
  about / whoami       Short professional introduction
  projects             List completed, prototype and active projects
  skills               Show technical stack
  experience           Show practical experience
  education            Show education summary
  status               Show current portfolio status
  open <target>        Open home, projects, experience, education,
                       documents, downloads, pictures, videos, music,
                       cv, github, linkedin or contact
  github / linkedin    Open the corresponding profile
  cv / contact         Open the CV or contact window

SHELL COMMANDS
  ls [directory]       List directory contents
  cd <directory>       Change directory; supports .. and ~
  pwd                  Print the current path
  cat <file>           Print a text, JSON or shell file
  tree                 Show the portfolio filesystem
  run <script.sh>      Execute a portfolio shell script
  ./<script.sh>        Execute a script directly
  history              Show command history
  echo <text>          Print text
  date                 Show local date and time
  uname                Show system information
  neofetch             Show portfolio system summary
  clear                Clear the terminal
  help                 Show this command reference

TIP: Use ↑ and ↓ to navigate command history.`;

const TREE_OUTPUT = `~
├── 00_START_HERE.sh
├── about.txt
├── skills.json
├── cv.pdf
├── Projects/
│   ├── 00_PROJECT_INDEX.sh
│   ├── Agentic_Job_Search/ [in progress]
│   ├── Kubernetes_Runtime_Security/
│   ├── Local_Kubernetes_GitOps/
│   ├── Terraform_OPA_Guardrails/
│   ├── DevSecOps_Juice_Shop/
│   ├── MK_Delivery/
│   ├── Snippy_AI_Cursor/
│   ├── Vault_OIDC_Secrets/ [in progress]
│   ├── Secure_Supply_Chain/ [in progress]
│   └── AI_Auto_Remediation/ [in progress]
├── Experience/
├── Education/
├── Documents/
├── Downloads/
├── Pictures/
├── Videos/
└── Music/`;

const FILE_SYSTEM = {
  '~': ['00_START_HERE.sh', 'about.txt', 'skills.json', 'cv.pdf', 'Projects/', 'Experience/', 'Education/', 'Documents/', 'Downloads/', 'Pictures/', 'Videos/', 'Music/'],
  '~/Projects': ['00_PROJECT_INDEX.sh', 'Agentic_Job_Search [in progress]', 'Kubernetes_Runtime_Security/', 'Local_Kubernetes_GitOps/', 'Terraform_OPA_Guardrails/', 'DevSecOps_Juice_Shop/', 'MK_Delivery/', 'Snippy_AI_Cursor/', 'Vault_OIDC_Secrets [in progress]', 'Secure_Supply_Chain [in progress]', 'AI_Auto_Remediation [in progress]'],
  '~/Experience': ['MK_Delivery.txt', 'Mekelle_University_ICT.json'],
  '~/Education': ['HDBW_MSc_Cybersecurity.json', 'Bachelors_Degree.txt', 'Research_Direction_FABA.txt'],
  '~/Documents': ['Osama_Kahsay_CV_EN.pdf', 'Master_Thesis_Ideas.json', 'DevSecOps_Learning_Path.json', 'Portfolio_README.txt'],
  '~/Downloads': ['Osama_Kahsay_CV_EN.pdf', 'Osama_Kahsay_CV_DE.pdf'],
  '~/Pictures': ['Education_Timeline.png', 'Experience_Timeline.png', 'Agentic_Workflow_Architecture.svg', 'GitOps_Architecture.png', 'ArgoCD_Synchronized.png', 'OPA_Policy_Rejection.png', 'Falco_Alert.png', 'MK_Delivery_Home.png', 'MK_Delivery_Details.png', 'MK_Delivery_Checkout.png', 'MK_Delivery_Order_Success.png'],
  '~/Videos': ['Portfolio_Tour.mp4', 'GitOps_Self_Healing.webm', 'Falco_Detection.mkv', 'MK_Delivery_Demo.mov'],
  '~/Music': ['About_These_Playlists.txt'],
};

const FILE_CONTENTS = {
  '~/about.txt': 'Osama Nurhussen Kahsay\nCybersecurity master\'s student in Munich building across AI automation, cloud infrastructure, DevSecOps and cybersecurity.',
  '~/skills.json': JSON.stringify({
    programming: ['Python', 'JavaScript', 'TypeScript', 'Node.js', 'Bash'],
    ai_automation: ['LLM APIs', 'Structured outputs', 'Tool calling', 'Browser automation', 'Human-in-the-loop validation'],
    cloud_native: ['Docker', 'Kubernetes', 'k3d', 'Helm', 'Terraform'],
    security: ['OPA/Rego', 'Falco', 'Trivy', 'Semgrep', 'TruffleHog'],
    delivery: ['GitHub Actions', 'Argo CD'],
  }, null, 2),
  '~/00_START_HERE.sh': '#!/usr/bin/env bash\n# Guided introduction to Osama\'s interactive portfolio\nabout\nprojects\nskills',
  '~/Projects/00_PROJECT_INDEX.sh': '#!/usr/bin/env bash\n# Print project completion status\nprojects',
  '~/Experience/MK_Delivery.txt': 'Co-Founder and Software Developer of a food-delivery application that reached 3,000+ registered users and 1,000+ Google Play installs.',
  '~/Experience/Mekelle_University_ICT.json': JSON.stringify({ role: 'ICT Intern', project: 'ICT Resource Management System' }, null, 2),
  '~/Education/HDBW_MSc_Cybersecurity.json': JSON.stringify({ degree: 'M.Sc. Cybersecurity', institution: 'HDBW', location: 'Munich' }, null, 2),
  '~/Education/Bachelors_Degree.txt': 'Software-development foundation covering programming, databases, web and mobile development, networking and information systems.',
};

const SCRIPT_OUTPUTS = {
  '00_START_HERE.sh': `Starting portfolio introduction...

OSAMA NURHUSSEN KAHSAY
Cybersecurity master's student · Munich, Germany
Focus: DevSecOps · cloud-native security · security automation

Four focused DevSecOps mechanics projects are complete, alongside
real product-development experience from MK Delivery.

Recommended commands:
  projects       list project status
  skills         inspect the technical stack
  experience     view practical experience
  open cv        open the CV
  open github    visit the GitHub profile
  help           show every command`,
  '00_PROJECT_INDEX.sh': PROJECT_INDEX,
};

const INITIAL_HISTORY = [
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
    content: 'Ubuntu 24.04 LTS · Osama Portfolio Shell\nType "help" for commands or run "./00_START_HERE.sh".\n',
  },
];

function resolveDirectory(input, currentPath) {
  const requested = input?.trim().replace(/\/$/, '');
  if (!requested || requested === '~') return '~';
  if (requested === '..') return currentPath === '~' ? '~' : '~';

  const candidate = requested.startsWith('~/')
    ? requested
    : `~/${requested.replace(/^\.\//, '')}`;

  return Object.keys(FILE_SYSTEM).find((path) => path.toLowerCase() === candidate.toLowerCase()) || null;
}

function resolveFile(input, currentPath) {
  const requested = input?.trim().replace(/^\.\//, '');
  if (!requested) return null;

  const candidate = requested.startsWith('~/')
    ? requested
    : `${currentPath}/${requested}`.replace('~//', '~/');

  return Object.keys(FILE_CONTENTS).find((path) => path.toLowerCase() === candidate.toLowerCase()) || null;
}

function normalizeScriptName(input) {
  return input?.trim().replace(/^\.\//, '').split('/').pop();
}

function getScriptOutput(input) {
  const scriptName = normalizeScriptName(input);
  const matchedName = Object.keys(SCRIPT_OUTPUTS).find((name) => name.toLowerCase() === scriptName?.toLowerCase());
  return matchedName ? { name: matchedName, output: SCRIPT_OUTPUTS[matchedName] } : null;
}

export default function TerminalWindow({
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  onOpenFiles,
  onOpenBrowser,
  onOpenPdf,
  onOpenContact,
  scriptRequest,
  isLightMode,
  zIndex = 20,
}) {
  const nodeRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const isMobile = useIsMobile(768);
  const [viewportHeight, setViewportHeight] = useState('100dvh');
  const commandHistoryRef = useRef([]);
  const commandIndexRef = useRef(-1);
  const currentPathRef = useRef('~');
  const lastScriptRequestIdRef = useRef(null);

  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [history, setHistory] = useState(INITIAL_HISTORY);

  useEffect(() => {
    currentPathRef.current = currentPath;
  }, [currentPath]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (!isOpen || !scriptRequest?.name) return;
    if (lastScriptRequestIdRef.current === scriptRequest.id) return;

    const script = getScriptOutput(scriptRequest.name);
    if (!script) return;
    lastScriptRequestIdRef.current = scriptRequest.id;

    setHistory((current) => [
      ...current,
      { type: 'command', content: `osama@portfolio:${currentPathRef.current}$ ./${script.name}` },
      { type: 'output', content: script.output },
    ]);
  }, [scriptRequest, isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (!isMobile) return;

    const visualViewport = window.visualViewport;
    if (!visualViewport) return;

    const updateViewportHeight = () => setViewportHeight(`${visualViewport.height}px`);
    updateViewportHeight();
    visualViewport.addEventListener('resize', updateViewportHeight);

    return () => visualViewport.removeEventListener('resize', updateViewportHeight);
  }, [isMobile]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [input, viewportHeight, history]);

  if (!isOpen) return null;

  const openTarget = (target) => {
    const normalizedTarget = target?.toLowerCase();
    const directoryTargets = new Set(['home', 'projects', 'experience', 'education', 'documents', 'downloads', 'pictures', 'videos', 'music']);

    if (directoryTargets.has(normalizedTarget)) {
      onOpenFiles?.(normalizedTarget === 'home' ? 'about' : normalizedTarget);
      return `Opening ${normalizedTarget} in Files...`;
    }
    if (normalizedTarget === 'cv') {
      onOpenPdf?.('docs/CV_EN.pdf');
      return 'Opening Osama_Kahsay_CV.pdf...';
    }
    if (normalizedTarget === 'github') {
      onOpenBrowser?.('https://github.com/Owasamly');
      return 'Opening GitHub profile...';
    }
    if (normalizedTarget === 'linkedin') {
      onOpenBrowser?.('https://www.linkedin.com/in/osama-nurhussen/');
      return 'Opening LinkedIn profile...';
    }
    if (normalizedTarget === 'contact') {
      onOpenContact?.();
      return 'Opening contact window...';
    }

    return `open: unknown target "${target || ''}"\nTry: open projects, open cv, open github, open linkedin, or open contact`;
  };

  const executeCommand = (rawCommand) => {
    const fullCommand = rawCommand.trim();
    if (!fullCommand) return;

    const parts = fullCommand.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    const commandEntry = { type: 'command', content: `osama@portfolio:${currentPath}$ ${fullCommand}` };

    commandHistoryRef.current = [...commandHistoryRef.current, fullCommand];
    commandIndexRef.current = commandHistoryRef.current.length;
    setInput('');

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    let response = '';
    let responseType = 'output';

    if (command.startsWith('./')) {
      const script = getScriptOutput(parts[0]);
      response = script?.output || `${normalizeScriptName(parts[0])}: script not found`;
      responseType = script ? 'output' : 'error';
    } else {
      switch (command) {
        case 'help':
          response = HELP_OUTPUT;
          break;
        case 'about':
        case 'whoami':
          response = 'Osama Nurhussen Kahsay\nCybersecurity master\'s student in Munich building across AI automation, cloud infrastructure, DevSecOps and cybersecurity.';
          break;
        case 'projects':
          response = PROJECT_INDEX;
          break;
        case 'skills':
          response = SKILLS_OUTPUT;
          break;
        case 'experience':
          response = 'MK Delivery — Co-Founder and Software Developer; reached 3,000+ registered users and 1,000+ Google Play installs.\nMekelle University ICT — IT Security & Development internship and ICT Resource Management System development.';
          break;
        case 'education':
          response = 'M.Sc. Cybersecurity — HDBW, Munich — ongoing — current grade 1.4 (German scale)\nB.Sc. Electrical & Computer Engineering — Mekelle University — GPA 3.67 / 4.00';
          break;
        case 'status':
          response = 'Portfolio: online\nCompleted projects: 5\nPrototype: 1\nIn-progress projects: 4\nFocus: AI automation, cloud, DevSecOps, cybersecurity\nLocation: Munich, Germany';
          break;
        case 'ls': {
          const directory = args.length ? resolveDirectory(args[0], currentPath) : currentPath;
          if (!directory || !FILE_SYSTEM[directory]) {
            response = `ls: cannot access '${args[0]}': No such directory`;
            responseType = 'error';
          } else {
            response = FILE_SYSTEM[directory].join('   ');
          }
          break;
        }
        case 'cd': {
          const directory = resolveDirectory(args[0], currentPath);
          if (!directory) {
            response = `cd: ${args[0] || ''}: No such directory`;
            responseType = 'error';
          } else {
            setCurrentPath(directory);
          }
          break;
        }
        case 'pwd':
          response = `/home/osama${currentPath === '~' ? '' : currentPath.slice(1)}`;
          break;
        case 'cat': {
          const file = resolveFile(args[0], currentPath);
          if (!file) {
            response = args[0]?.toLowerCase().endsWith('.pdf')
              ? `cat: ${args[0]}: binary PDF file — use "open cv"`
              : `cat: ${args[0] || ''}: No such file`;
            responseType = 'error';
          } else {
            response = FILE_CONTENTS[file];
          }
          break;
        }
        case 'tree':
          response = TREE_OUTPUT;
          break;
        case 'run':
        case 'bash': {
          const script = getScriptOutput(args[0]);
          response = script?.output || `${command}: ${args[0] || ''}: script not found`;
          responseType = script ? 'output' : 'error';
          break;
        }
        case 'open':
          response = openTarget(args[0]);
          break;
        case 'github':
        case 'linkedin':
        case 'cv':
        case 'contact':
          response = openTarget(command);
          break;
        case 'history':
          response = commandHistoryRef.current.map((item, index) => `${index + 1}  ${item}`).join('\n');
          break;
        case 'echo':
          response = args.join(' ');
          break;
        case 'date':
          response = new Date().toString();
          break;
        case 'uname':
          response = 'Linux osama-portfolio 6.8.0-portfolio #1 SMP x86_64 GNU/Linux';
          break;
        case 'neofetch':
          response = `OS: Ubuntu 24.04 LTS\nHost: osamakahsay.dev\nShell: portfolio-bash\nUI: React + Vite + Tailwind CSS\nFocus: DevSecOps & Cloud-Native Security\nStatus: Ready for opportunities`;
          break;
        case 'sudo':
          response = 'osama is not in the sudoers file. This incident will be added to the portfolio.';
          responseType = 'error';
          break;
        default:
          response = `${command}: command not found\nType "help" to list available commands.`;
          responseType = 'error';
      }
    }

    const entries = [commandEntry];
    if (response) entries.push({ type: responseType, content: response });
    setHistory((current) => [...current, ...entries]);
  };

  const navigateCommandHistory = (direction) => {
    const commandHistory = commandHistoryRef.current;
    if (!commandHistory.length) return;

    if (direction < 0) {
      commandIndexRef.current = Math.max(0, commandIndexRef.current - 1);
    } else {
      commandIndexRef.current = Math.min(commandHistory.length, commandIndexRef.current + 1);
    }

    setInput(commandIndexRef.current === commandHistory.length ? '' : commandHistory[commandIndexRef.current] || '');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleCommandKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      executeCommand(input);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      navigateCommandHistory(-1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      navigateCommandHistory(1);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      setInput((current) => `${current}    `);
    }
  };

  const handleQuickAction = (action) => {
    if (action === 'ctrlc') {
      setInput('');
    } else if (action === 'up') {
      navigateCommandHistory(-1);
    } else if (action === 'down') {
      navigateCommandHistory(1);
    } else {
      executeCommand(action);
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
        className={`desktop-window-resizable border shadow-2xl flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-xl ${
          isMobile ? 'fixed inset-0 w-full h-[100dvh] rounded-none' : 'absolute top-20 left-20 w-[760px] h-[500px] rounded-lg'
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
            <span>osama@portfolio: {currentPath}</span>
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
                  <pre className="text-green-600 font-bold text-[8px] sm:text-[9px] leading-none select-none">{item.content}</pre>
                )}
                {item.type === 'output' && (
                  <div className={`whitespace-pre-wrap leading-relaxed ${isLightMode ? 'text-gray-700' : 'text-gray-300'}`}>{item.content}</div>
                )}
                {item.type === 'error' && (
                  <div className="whitespace-pre-wrap leading-relaxed text-red-400">{item.content}</div>
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
                  { label: 'Ctrl+C', action: 'ctrlc' },
                  { label: 'help', action: 'help' },
                  { label: 'projects', action: 'projects' },
                  { label: 'skills', action: 'skills' },
                  { label: 'ls', action: 'ls' },
                  { label: 'clear', action: 'clear' },
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
              <span className="text-green-600 font-bold">osama@portfolio:{currentPath}$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleCommandKeyDown}
                className={`flex-1 bg-transparent outline-none font-mono ${isMobile ? 'text-[16px]' : 'text-xs'} caret-green-500`}
                autoFocus
                spellCheck="false"
                autoComplete="off"
                aria-label="Terminal command"
              />
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
