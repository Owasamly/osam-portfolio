import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import {
  X, Minus, Globe, ChevronLeft, ChevronRight, RotateCw,
  Lock, Star, ExternalLink, ShieldCheck, FileText,
  Code2, MapPin, GitFork, CircleDot, Music2, Play, CheckCircle2
} from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

const githubProjects = {
  'kubernetes-runtime-security': {
    title: 'kubernetes-runtime-security',
    description: 'Kubernetes runtime threat detection with Falco, FalcoSidekick and OWASP Juice Shop.',
    language: 'Shell',
    topics: ['kubernetes', 'falco', 'runtime-security', 'devsecops'],
    highlights: ['Custom interactive-shell detection rule', 'Multi-node k3d environment', 'FalcoSidekick alert forwarding'],
  },
  'local-kubernetes-gitops': {
    title: 'local-kubernetes-gitops',
    description: 'A reproducible local GitOps platform with Argo CD, Helm and k3d.',
    language: 'Shell',
    topics: ['gitops', 'argocd', 'helm', 'kubernetes'],
    highlights: ['Continuous reconciliation from Git', 'Automated drift correction', 'GitHub Actions validation'],
  },
  'devsecops-policy-as-code': {
    title: 'devsecops-policy-as-code',
    description: 'Terraform security guardrails enforced with OPA/Rego before infrastructure deployment.',
    language: 'HCL',
    topics: ['terraform', 'opa', 'rego', 'policy-as-code'],
    highlights: ['Blocks insecure S3 configurations', 'Evaluates Terraform plan JSON', 'Verified against LocalStack'],
  },
  'devsecops-juice-shop': {
    title: 'devsecops-juice-shop',
    description: 'A multi-stage security pipeline for OWASP Juice Shop using open-source scanning tools.',
    language: 'TypeScript',
    topics: ['github-actions', 'semgrep', 'trivy', 'trufflehog'],
    highlights: ['Secret and SAST scanning', 'Dependency and container analysis', 'Automated CI security reporting'],
  },
  'Snippy-app': {
    title: 'Snippy-app',
    description: 'An experimental AI desktop assistant concept for contextual, in-app learning.',
    language: 'JavaScript',
    topics: ['ai-assistant', 'desktop', 'prototype'],
    highlights: ['Context-aware assistance concept', 'Learning-by-doing interaction model', 'Experimental prototype'],
  },
};

const ExternalButton = ({ url, currentAccent, label = 'Open real page' }) => (
  <a href={url} target="_blank" rel="noopener noreferrer"
    className="px-4 py-2 text-white rounded-md font-bold inline-flex items-center gap-2 shadow-sm hover:brightness-110 transition"
    style={{ backgroundColor: currentAccent }}>
    <ExternalLink className="w-4 h-4" />
    <span>{label}</span>
  </a>
);

function GithubPreview({ url, currentAccent, isLightMode, onNavigate }) {
  const repositoryName = new URL(url).pathname.split('/').filter(Boolean)[1];
  const project = githubProjects[repositoryName];
  const card = isLightMode ? 'bg-white border-gray-200' : 'bg-[#161b22] border-[#30363d]';
  const muted = isLightMode ? 'text-gray-600' : 'text-gray-400';

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto space-y-5">
        <div className={`border rounded-lg p-5 ${card}`}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E95420] to-[#77216F] text-white grid place-items-center text-xl font-bold">ON</div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Osama Nurhussen Kahsay</h1>
              <p className={muted}>Owasamly · Cybersecurity & DevSecOps</p>
              <p className={`mt-2 leading-relaxed ${muted}`}>Building practical security automation, cloud-native systems and developer-friendly security workflows.</p>
            </div>
          </div>
          <div className={`mt-5 pt-4 border-t flex flex-wrap gap-x-5 gap-y-2 ${isLightMode ? 'border-gray-200' : 'border-[#30363d]'}`}>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Munich, Germany</span>
            <span className="flex items-center gap-1.5"><GitFork className="w-4 h-4" /> DevSecOps projects</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {Object.values(githubProjects).slice(0, 4).map((item) => (
            <button key={item.title} onClick={() => onNavigate(`https://github.com/Owasamly/${item.title}`)}
              className={`text-left border rounded-lg p-4 hover:border-[#E95420] transition ${card}`}>
              <span className="font-bold text-[#19B6EE]">{item.title}</span>
              <p className={`mt-2 leading-relaxed ${muted}`}>{item.description}</p>
            </button>
          ))}
        </div>
        <ExternalButton url={url} currentAccent={currentAccent} label="View GitHub profile" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-2 text-sm"><Code2 className="w-5 h-5" /><span>Owasamly</span><span>/</span><strong className="text-[#19B6EE]">{project.title}</strong><span className={`border rounded-full px-2 py-0.5 text-[10px] ${isLightMode ? 'border-gray-300' : 'border-[#30363d]'}`}>Public</span></div>
      <div className={`border rounded-lg overflow-hidden ${card}`}>
        <div className={`p-5 border-b ${isLightMode ? 'border-gray-200' : 'border-[#30363d]'}`}>
          <h1 className="text-lg font-bold">{project.description}</h1>
          <div className="flex flex-wrap gap-2 mt-4">{project.topics.map(topic => <span key={topic} className="rounded-full px-2.5 py-1 bg-sky-500/10 text-sky-500">{topic}</span>)}</div>
        </div>
        <div className={`px-5 py-3 flex items-center gap-5 border-b ${isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-[#0d1117] border-[#30363d]'}`}>
          <span className="flex items-center gap-1.5"><CircleDot className="w-3.5 h-3.5 text-amber-500" />{project.language}</span>
          <span className="flex items-center gap-1.5"><GitFork className="w-3.5 h-3.5" />main</span>
        </div>
        <div className="p-5">
          <h2 className="font-bold text-base flex items-center gap-2"><FileText className="w-4 h-4" /> README.md</h2>
          <h3 className="font-bold mt-5 mb-3">What this project demonstrates</h3>
          <ul className={`space-y-2 ${muted}`}>{project.highlights.map(item => <li key={item} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{item}</li>)}</ul>
        </div>
      </div>
      <ExternalButton url={url} currentAccent={currentAccent} label="Open repository on GitHub" />
    </div>
  );
}

function LinkedInPreview({ url, currentAccent, isLightMode }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className={`border rounded-lg overflow-hidden shadow-sm ${isLightMode ? 'bg-white border-gray-200' : 'bg-[#1c1b22] border-[#383441]'}`}>
        <div className="h-24 bg-gradient-to-r from-[#0A66C2] to-[#19B6EE]" />
        <div className="p-5 -mt-9">
          <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-br from-[#E95420] to-[#77216F] text-white grid place-items-center text-2xl font-bold">ON</div>
          <h1 className="text-xl font-bold mt-3">Osama Nurhussen Kahsay</h1>
          <p className="mt-1">M.Sc. Cybersecurity · DevSecOps · Cloud-native Security</p>
          <p className={`mt-2 flex items-center gap-1.5 ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}><MapPin className="w-4 h-4" /> Munich, Germany</p>
          <p className={`mt-4 leading-relaxed ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>Cybersecurity master's student building hands-on systems across CI/CD security, policy-as-code, GitOps and Kubernetes runtime monitoring.</p>
          <div className="mt-5"><ExternalButton url={url} currentAccent={currentAccent} label="View LinkedIn profile" /></div>
        </div>
      </div>
    </div>
  );
}

function SpotifyPreview({ url, currentAccent, isLightMode }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className={`rounded-xl p-6 border ${isLightMode ? 'bg-white border-gray-200' : 'bg-gradient-to-b from-[#26352d] to-[#121212] border-[#333]'}`}>
        <div className="flex flex-col sm:flex-row gap-5 sm:items-end">
          <div className="w-36 h-36 bg-gradient-to-br from-emerald-400 via-cyan-600 to-[#77216F] shadow-xl grid place-items-center"><Music2 className="w-14 h-14 text-white" /></div>
          <div><span className="uppercase text-[10px] font-bold">Playlist</span><h1 className="text-3xl font-bold mt-2">Deep Focus</h1><p className={`mt-2 ${isLightMode ? 'text-gray-500' : 'text-gray-300'}`}>A sample soundtrack for building, researching and solving difficult problems.</p></div>
        </div>
        <div className="mt-6 flex items-center gap-3"><button className="w-11 h-11 rounded-full bg-[#1DB954] text-black grid place-items-center"><Play className="w-5 h-5 fill-current" /></button><ExternalButton url={url} currentAccent={currentAccent} label="Open Spotify" /></div>
      </div>
    </div>
  );
}

export default function BrowserWindow({ 
  isOpen = true, 
  isMinimized = false, 
  onClose, 
  onMinimize, 
  onFocus,
  initialUrl = 'https://portfolio.local/security-research',
  currentAccent = '#77216F',
  isLightMode = false,
  zIndex = 30
}) {
  const nodeRef = useRef(null);
  const isMobile = useIsMobile(768);
  
  const [urlInput, setUrlInput] = useState(initialUrl);
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [history, setHistory] = useState([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Sync internal state if a new initialUrl is passed from outside (e.g. clicking .url files)
  useEffect(() => {
    if (initialUrl) {
      setUrlInput(initialUrl);
      setCurrentUrl(initialUrl);
      setHistory([initialUrl]);
      setHistoryIndex(0);
    }
  }, [initialUrl]);

  const handleNavigate = (newUrl) => {
    let formattedUrl = newUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    setUrlInput(formattedUrl);
    setCurrentUrl(formattedUrl);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(formattedUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNavigate(urlInput);
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
    <Draggable handle=".browser-header" nodeRef={nodeRef} disabled={isMobile}>
      <div 
        ref={nodeRef}
        onMouseDownCapture={onFocus}
        onPointerDownCapture={onFocus}
        style={{ zIndex: isMobile ? 100 : zIndex }}
        className={`desktop-window-resizable border shadow-2xl flex flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isMobile ? 'fixed inset-0 w-full h-[100dvh] rounded-none' : 'absolute top-16 left-28 w-[860px] h-[580px] rounded-t-lg'
        } ${
          isLightMode 
            ? 'bg-white border-gray-300 text-gray-900' 
            : 'bg-[#1c1b22] border-[#383441] text-gray-100'
        }`}
      >
        {/* Title Bar */}
        <div 
          onMouseDown={onFocus}
          onPointerDown={onFocus}
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
              className={`rounded-full flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'} ${
                isLightMode 
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                  : 'bg-[#2b2a33] hover:bg-[#383441] text-gray-200'
              }`}
            >
              <Minus className="w-3 h-3" />
            </button>
            <button 
              onClick={onClose} 
              className={`rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'}`}
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
          {currentUrl.includes('security-research') || currentUrl.includes('portfolio.local') ? (
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
                    onClick={() => handleNavigate('https://github.com/Owasamly')} 
                    className={`px-3 py-1.5 rounded border transition-colors flex items-center space-x-1.5 font-medium cursor-pointer ${
                      isLightMode 
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300' 
                        : 'bg-[#2b2a33] hover:bg-[#383441] text-gray-100 border-[#42414d]'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Open Osama's GitHub Profile</span>
                  </button>
                </div>
              </div>
            </div>
          ) : currentUrl.includes('github.com') ? (
            <GithubPreview url={currentUrl} currentAccent={currentAccent} isLightMode={isLightMode} onNavigate={handleNavigate} />
          ) : currentUrl.includes('linkedin.com') ? (
            <LinkedInPreview url={currentUrl} currentAccent={currentAccent} isLightMode={isLightMode} />
          ) : currentUrl.includes('spotify.com') ? (
            <SpotifyPreview url={currentUrl} currentAccent={currentAccent} isLightMode={isLightMode} />
          ) : (
            <div className="space-y-4 max-w-xl mx-auto text-center py-12">
              <Globe className={`w-12 h-12 mx-auto ${isLightMode ? 'text-gray-300' : 'text-gray-600'}`} />
              <h2 className={`text-lg font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                Navigation Complete / Simulated Webpage
              </h2>
              <p className={`text-xs ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Loaded destination: <span className="text-amber-500 font-mono">{currentUrl}</span>
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <a 
                  href={currentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-white rounded font-bold cursor-pointer inline-flex items-center space-x-2"
                  style={{ backgroundColor: currentAccent }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Externally</span>
                </a>
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
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
}
