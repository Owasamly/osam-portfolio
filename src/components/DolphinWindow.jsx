import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { 
  X, Minus, Folder, FileText, ChevronLeft, ChevronRight, 
  LayoutGrid, List, Download, Music, Image, Video, 
  Briefcase, User, Archive, GraduationCap, Trash2, 
  Terminal, Mail, FileCode, Globe, Camera, Images,
  FileImage, Film, Clapperboard, MonitorPlay, ArrowRight, MapPin, ShieldCheck
} from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';
import { directoryContents, places } from '../data/portfolioFileSystem';

function LinkedInMark({ className = '' }) {
  return (
    <span className={`${className} inline-flex items-center justify-center rounded-sm bg-[#0A66C2] font-sans text-[9px] font-black leading-none text-white`}>
      in
    </span>
  );
}

const iconMap = {
  archive: Archive,
  briefcase: Briefcase,
  camera: Camera,
  clapperboard: Clapperboard,
  code: FileCode,
  download: Download,
  education: GraduationCap,
  folder: Folder,
  film: Film,
  fileImage: FileImage,
  globe: Globe,
  image: Image,
  images: Images,
  linkedin: LinkedInMark,
  mail: Mail,
  music: Music,
  monitorPlay: MonitorPlay,
  terminal: Terminal,
  text: FileText,
  trash: Trash2,
  user: User,
  video: Video,
};

const badgeClasses = {
  amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  blue: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

function RecruiterHome({ isLightMode, onProjects, onCv, onContact, onClassicView }) {
  const strengths = [
    ['Secure delivery', 'Security checks integrated into CI/CD before software reaches production.'],
    ['Cloud-native security', 'Kubernetes controls, runtime monitoring and infrastructure guardrails.'],
    ['Practical automation', 'Repeatable systems using GitOps, Terraform and policy-as-code.'],
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-5 pb-4">
      <section className={`relative overflow-hidden rounded-2xl border p-5 sm:p-7 ${
        isLightMode ? 'border-orange-200 bg-[#fffaf3]' : 'border-[#4a332b] bg-[#211b19]'
      }`}>
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#E95420]/10" />
        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#E95420]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E95420]/25 bg-[#E95420]/10 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open to opportunities
            </span>
            <span className={`inline-flex items-center gap-1 ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <MapPin className="h-3 w-3" /> Munich, Germany
            </span>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            <img
              src="/osama-portfolio-headshot-v2.png"
              alt="Osama Nurhussen Kahsay, DevSecOps and cybersecurity engineer"
              className="mx-auto h-32 w-32 shrink-0 rounded-2xl border-2 border-white object-cover shadow-md ring-1 ring-[#E95420]/25 sm:order-2 sm:mx-0 sm:h-40 sm:w-40"
            />
            <div className="min-w-0 flex-1 sm:order-1">
              <p className={`mb-1 text-xs font-semibold ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Hello, I’m</p>
              <h1 className={`text-2xl font-black tracking-tight sm:text-3xl ${isLightMode ? 'text-gray-950' : 'text-white'}`}>
                Osama Nurhussen Kahsay
              </h1>
              <h2 className="mt-2 text-base font-bold text-[#E95420] sm:text-lg">DevSecOps &amp; Cybersecurity Engineer</h2>
              <p className={`mt-3 max-w-2xl text-[12px] leading-6 ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
                I build secure cloud infrastructure and automated delivery pipelines, with hands-on work across Kubernetes, GitOps, policy-as-code and runtime security.
              </p>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button onClick={onProjects} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E95420] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#cf4318]">
                  View selected projects <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button onClick={onCv} className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-bold transition ${isLightMode ? 'border-gray-300 bg-white text-gray-800 hover:border-[#E95420]' : 'border-[#444] bg-[#161616] text-gray-100 hover:border-[#E95420]'}`}>
                  <Download className="h-3.5 w-3.5" /> View CV
                </button>
                <button onClick={onContact} className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-bold transition ${isLightMode ? 'border-gray-300 bg-white text-gray-800 hover:border-[#E95420]' : 'border-[#444] bg-[#161616] text-gray-100 hover:border-[#E95420]'}`}>
                  <Mail className="h-3.5 w-3.5" /> Contact me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#E95420]">At a glance</p>
            <h3 className={`mt-1 text-sm font-bold sm:text-base ${isLightMode ? 'text-gray-900' : 'text-white'}`}>What I can bring to your team</h3>
          </div>
          <span className={`hidden text-[10px] sm:block ${isLightMode ? 'text-gray-400' : 'text-gray-500'}`}>profile_summary.md</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {strengths.map(([title, description]) => (
            <article key={title} className={`rounded-xl border p-4 ${isLightMode ? 'border-gray-200 bg-white' : 'border-[#333] bg-[#181818]'}`}>
              <ShieldCheck className="mb-2 h-5 w-5 text-[#E95420]" />
              <h4 className={`text-xs font-bold ${isLightMode ? 'text-gray-900' : 'text-gray-100'}`}>{title}</h4>
              <p className={`mt-1.5 text-[10px] leading-4 ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <div className={`flex flex-col items-start justify-between gap-3 rounded-xl border px-4 py-3 sm:flex-row sm:items-center ${isLightMode ? 'border-gray-200 bg-gray-50' : 'border-[#333] bg-[#161616]'}`}>
        <div>
          <p className={`text-[11px] font-bold ${isLightMode ? 'text-gray-800' : 'text-gray-200'}`}>Want the full Linux experience?</p>
          <p className={`mt-0.5 text-[10px] ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Browse the portfolio as files, folders and terminal commands.</p>
        </div>
        <button onClick={onClassicView} className="shrink-0 text-[10px] font-bold text-[#E95420] hover:underline">Open classic file view →</button>
      </div>
    </div>
  );
}

export default function DolphinWindow({
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize, 
  activeTab, 
  setActiveTab, 
  onFileOpen, 
  onTextEditorOpen,
  onTerminalOpen,
  onBrowserOpen,
  onMediaOpen,
  onContactOpen,
  isLightMode,
  onFocus,
  zIndex = 25
}) {
  const nodeRef = useRef(null);
  const activeTabRef = useRef(activeTab);
  const statusTimerRef = useRef(null);
  const isMobile = useIsMobile(768);

  const [history, setHistory] = useState([activeTab || 'about']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [statusNotice, setStatusNotice] = useState('');
  const [showHomeFiles, setShowHomeFiles] = useState(false);

  useEffect(() => {
    if (activeTabRef.current === activeTab) return;

    activeTabRef.current = activeTab;
    setHistory((currentHistory) => {
      const nextHistory = currentHistory.slice(0, historyIndex + 1);
      if (nextHistory[nextHistory.length - 1] === activeTab) return currentHistory;
      nextHistory.push(activeTab);
      setHistoryIndex(nextHistory.length - 1);
      return nextHistory;
    });
  }, [activeTab, historyIndex]);

  useEffect(() => () => {
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
  }, []);

  const showStatusNotice = (message) => {
    if (!message) return;
    setStatusNotice(message);
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setStatusNotice(''), 3200);
  };

  const navigateTo = (tabId, addToHistory = true) => {
    if (!tabId || tabId === activeTab) return;
    activeTabRef.current = tabId;
    setActiveTab(tabId);
    if (addToHistory) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(tabId);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      activeTabRef.current = history[newIndex];
      setActiveTab(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      activeTabRef.current = history[newIndex];
      setActiveTab(history[newIndex]);
    }
  };

  if (!isOpen) return null;

  const currentItems = directoryContents[activeTab] || [];
  const isMobileListView = isMobile || viewMode === 'list';

  const handleSidebarClick = (id) => navigateTo(id);

  const handleItemAction = (item) => {
    if (item.disabled) {
      showStatusNotice(item.statusMessage || `${item.name} is not available.`);
    } else if (item.type === 'dir' && item.target) {
      navigateTo(item.target);
    } else if (item.action === 'contact') {
      if (onContactOpen) onContactOpen();
    } else if (item.action === 'pdf') {
      if (onFileOpen) onFileOpen(item.file || 'docs/CV_EN.pdf');
    } else if (item.action === 'download') {
      const link = document.createElement('a');
      link.href = `/${item.file || 'docs/CV_EN.pdf'}`;
      link.download = item.downloadName || item.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else if (item.action === 'terminal') {
      if (onTerminalOpen) onTerminalOpen(item.name);
    } else if (item.action === 'text') {
      if (onTextEditorOpen) onTextEditorOpen(item.name, item.content || '');
    } else if (item.action === 'media') {
      if (onMediaOpen) onMediaOpen(item.name, item.src, item.mediaType);
    } else if (item.action === 'browser' && item.url) {
      if (onBrowserOpen) {
        onBrowserOpen(item.url);
      } else {
        window.open(item.url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const getItemInteractions = (item) => ({
    onClick: () => handleItemAction(item),
  });

  return (
    <Draggable handle=".ubuntu-header" nodeRef={nodeRef} disabled={isMobile}>
      <div 
        ref={nodeRef} 
        onMouseDownCapture={onFocus}
        onPointerDownCapture={onFocus}
        style={{ display: isMinimized ? 'none' : 'flex', zIndex: isMobile ? 100 : zIndex }}
        className={`border shadow-2xl flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isMobile ? 'fixed inset-0 w-full h-[100dvh] rounded-none' : 'absolute top-10 left-1/2 -translate-x-1/2 w-[min(1080px,calc(100vw-150px))] h-[min(720px,calc(100vh-80px))] rounded-t-lg'
        } ${
          isLightMode ? 'bg-[#fafafa] text-gray-800 border-gray-300' : 'bg-[#1e1e1e]/95 text-gray-200 border-[#333333]'
        }`}
      >
        {/* Header */}
        <div 
          onMouseDown={onFocus}
          onPointerDown={onFocus}
          className={`ubuntu-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
            isLightMode ? 'bg-[#e5e5e5] border-gray-300 text-gray-900' : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold">
            <Folder className="w-4 h-4 text-[#E95420]" />
            <span>{activeTab === 'about' ? 'Welcome — Osama Kahsay' : `Files — /home/osama/${activeTab}`}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button onClick={onMinimize} className={`rounded-full flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'} ${
              isLightMode ? 'bg-gray-300 hover:bg-gray-400 text-gray-800' : 'bg-[#333333] hover:bg-[#444444] text-gray-300'
            }`}>
              <Minus className="w-3 h-3" />
            </button>
            <button onClick={onClose} className={`rounded-full bg-[#E95420] hover:bg-red-600 text-white flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'}`}>
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className={`px-3 py-2 border-b flex items-center justify-between text-[11px] ${
          isLightMode ? 'bg-[#f0f0f0] border-gray-300 text-gray-700' : 'bg-[#181818] border-[#2b2b2b] text-gray-300'
        }`}>
          <div className="flex items-center space-x-3 flex-1 mr-3">
            <div className={`flex items-center space-x-1 border rounded overflow-hidden shrink-0 ${
              isLightMode ? 'bg-white border-gray-300' : 'bg-[#222222] border-[#333333]'
            }`}>
              <button onClick={handleBack} disabled={historyIndex === 0} className={`p-1.5 transition-colors ${
                historyIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-black/5'
              }`}>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div className={`w-[1px] h-4 ${isLightMode ? 'bg-gray-300' : 'bg-[#333333]'}`} />
              <button onClick={handleForward} disabled={historyIndex === history.length - 1} className={`p-1.5 transition-colors ${
                historyIndex === history.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-black/5'
              }`}>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className={`flex-1 flex items-center space-x-1 border px-3 py-1.5 rounded shadow-inner overflow-x-auto ${
              isLightMode ? 'bg-white border-gray-300 text-gray-800' : 'bg-[#141414] border-[#333333] text-gray-300'
            }`}>
              <span onClick={() => handleSidebarClick('about')} className="hover:underline cursor-pointer">home</span>
              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
              <span onClick={() => handleSidebarClick('about')} className="hover:underline cursor-pointer">osama</span>
              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="text-[#E95420] font-semibold capitalize truncate">{activeTab}</span>
            </div>
          </div>

          <div className={`flex items-center space-x-1 border rounded p-0.5 shrink-0 ${
            isLightMode ? 'bg-white border-gray-300' : 'bg-[#222222] border-[#333333]'
          }`}>
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded transition-colors ${
              viewMode === 'grid' ? 'bg-[#E95420] text-white' : isLightMode ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white'
            }`}>
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded transition-colors ${
              viewMode === 'list' ? 'bg-[#E95420] text-white' : isLightMode ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white'
            }`}>
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {activeTab === 'about' && (
          <div className={`border-b px-3 py-1.5 sm:px-4 sm:py-2 ${
            isLightMode ? 'border-gray-200 bg-gray-50/70' : 'border-[#2b2b2b] bg-[#171717]/80'
          }`}>
            <div className="mx-auto flex max-w-4xl items-center justify-between gap-2">
              <div className="hidden min-w-0 sm:block">
                <p className={`text-[10px] font-semibold ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>Choose how to explore</p>
                <p className={`text-[9px] ${isLightMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Start with the quick summary or browse the complete Linux-style directory.
                </p>
              </div>
              <span className={`shrink-0 text-[9px] font-semibold sm:hidden ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Home view</span>
              <div className={`grid min-w-0 flex-1 grid-cols-2 rounded-md border p-0.5 sm:max-w-[270px] ${
                isLightMode ? 'border-gray-200 bg-white' : 'border-[#343434] bg-[#101010]'
              }`} role="group" aria-label="Home page display mode">
                <button
                  onClick={() => setShowHomeFiles(false)}
                  aria-pressed={!showHomeFiles}
                  className={`flex items-center justify-center gap-1.5 rounded px-2 py-1.5 text-[9px] font-semibold transition sm:text-[10px] ${
                    !showHomeFiles
                      ? isLightMode ? 'bg-orange-50 text-[#C84418] ring-1 ring-orange-200' : 'bg-[#E95420]/15 text-orange-300 ring-1 ring-[#E95420]/30'
                      : isLightMode ? 'text-gray-600 hover:bg-white' : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <User className="h-3.5 w-3.5" /> Quick overview
                </button>
                <button
                  onClick={() => setShowHomeFiles(true)}
                  aria-pressed={showHomeFiles}
                  className={`flex items-center justify-center gap-1.5 rounded px-2 py-1.5 text-[9px] font-semibold transition sm:text-[10px] ${
                    showHomeFiles
                      ? isLightMode ? 'bg-orange-50 text-[#C84418] ring-1 ring-orange-200' : 'bg-[#E95420]/15 text-orange-300 ring-1 ring-[#E95420]/30'
                      : isLightMode ? 'text-gray-600 hover:bg-white' : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <Folder className="h-3.5 w-3.5" /> Classic files
                </button>
              </div>
            </div>
          </div>
        )}

        {statusNotice && (
          <div className={`px-4 py-2 border-b text-[11px] font-semibold ${
            isLightMode
              ? 'bg-amber-50 border-amber-200 text-amber-800'
              : 'bg-amber-950/70 border-amber-800/60 text-amber-300'
          }`} role="status">
            {statusNotice}
          </div>
        )}

        {/* Explorer Content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Sidebar */}
          <div className={`${activeTab === 'about' ? 'hidden md:block' : 'w-36 sm:w-44'} md:w-44 border-r p-1.5 sm:p-2 space-y-0.5 overflow-y-auto shrink-0 ${
            isLightMode ? 'bg-[#eaeaea] border-gray-300' : 'bg-[#141414] border-[#2b2b2b]'
          }`}>
            <div className="text-[10px] text-gray-500 font-bold px-2 py-1 uppercase tracking-wider">Places</div>
            {places.map((item) => {
              const Icon = iconMap[item.icon] || Folder;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarClick(item.id)}
                  className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded transition-colors text-left ${
                    activeTab === item.id 
                      ? 'bg-[#E95420] text-white font-bold shadow' 
                      : isLightMode ? 'text-gray-700 hover:bg-black/5' : 'text-gray-300 hover:bg-[#252525]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Directory Viewer */}
          <div className={`flex-1 p-4 md:p-6 overflow-y-auto ${
            isLightMode ? 'bg-[#ffffff] text-gray-900' : 'bg-[#1e1e1e] text-gray-200'
          }`}>
            {activeTab === 'about' && !showHomeFiles ? (
              <RecruiterHome
                isLightMode={isLightMode}
                onProjects={() => navigateTo('projects')}
                onCv={() => onFileOpen?.('docs/CV_EN.pdf')}
                onContact={() => onContactOpen?.()}
                onClassicView={() => setShowHomeFiles(true)}
              />
            ) : (
              <>
                {activeTab === 'about' && (
                  <div className={`mb-5 border-b pb-3 ${isLightMode ? 'border-gray-200' : 'border-[#333333]'}`}>
                    <div>
                      <h3 className="text-sm font-bold text-[#E95420]">Home Directory (~/osama)</h3>
                      <p className={`mt-1 text-xs ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>Click any item once to open it.</p>
                    </div>
                  </div>
                )}

                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">Contents</div>
            
            {currentItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 space-y-2">
                <Folder className="w-10 h-10 mx-auto opacity-30" />
                <div>This folder is empty</div>
              </div>
            ) : isMobileListView ? (
              <div className={`flex flex-col space-y-2 ${isLightMode ? 'text-gray-900' : 'text-gray-200'}`}>
                {currentItems.map((item, idx) => {
                  const Icon = iconMap[item.icon] || FileText;
                  return (
                    <div
                      key={idx}
                      {...getItemInteractions(item)}
                      className={`flex flex-row items-center space-x-3 w-full p-2.5 border-b transition-colors group select-none ${
                        item.disabled ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'
                      } ${
                        isLightMode ? 'hover:bg-gray-50 border-gray-200' : 'hover:bg-white/5 border-[#2a2a2a]'
                      }`}
                    >
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.color} shrink-0`} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[13px] font-medium transition-colors break-words ${isLightMode ? 'text-gray-800' : 'text-gray-200'}`}>
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase font-semibold shrink-0 ${
                              badgeClasses[item.badgeTone] || badgeClasses.amber
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {item.ext}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {currentItems.map((item, idx) => {
                  const Icon = iconMap[item.icon] || FileText;
                  return (
                    <div
                      key={idx}
                      {...getItemInteractions(item)}
                      className={`p-2 rounded-lg flex flex-col items-center text-center space-y-1.5 transition-all group select-none relative ${
                        item.disabled ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'
                      } ${
                        isLightMode ? 'hover:bg-gray-100' : 'hover:bg-white/5'
                      }`}
                    >
                      {item.badge && (
                        <span className={`absolute top-1 right-1 text-[8px] px-1 py-0.5 rounded border uppercase font-semibold z-10 ${
                          badgeClasses[item.badgeTone] || badgeClasses.amber
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      <Icon className={`w-10 h-10 ${item.color} group-hover:scale-105 transition-transform drop-shadow shrink-0`} />
                      <span className={`text-[11px] font-medium w-full group-hover:text-[#E95420] transition-colors break-words leading-tight line-clamp-2 ${
                        isLightMode ? 'text-gray-800' : 'text-gray-200'
                      }`} title={item.name}>
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={`border rounded-lg overflow-hidden ${
                isLightMode ? 'border-gray-300 bg-white' : 'border-[#333333] bg-[#141414]'
              }`}>
                <div className={`grid grid-cols-12 px-3 py-2 text-[10px] font-bold uppercase border-b ${
                  isLightMode ? 'bg-gray-100 border-gray-300 text-gray-600' : 'bg-[#1c1c1c] border-[#333333] text-gray-400'
                }`}>
                  <div className="col-span-8">Name</div>
                  <div className="col-span-4">Type</div>
                </div>
                <div className={`divide-y ${isLightMode ? 'divide-gray-200' : 'divide-[#222222]'}`}>
                  {currentItems.map((item, idx) => {
                    const Icon = iconMap[item.icon] || FileText;
                    return (
                      <div
                        key={idx}
                        {...getItemInteractions(item)}
                        className={`grid grid-cols-12 px-3 py-2 items-center transition-colors group select-none ${
                          item.disabled ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'
                        } ${
                          isLightMode ? 'hover:bg-gray-50' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="col-span-8 flex items-center space-x-2.5 min-w-0">
                          <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
                          <span className={`group-hover:text-[#E95420] transition-colors font-medium truncate ${
                            isLightMode ? 'text-gray-800' : 'text-gray-200'
                          }`} title={item.name}>
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase font-semibold shrink-0 ${
                              badgeClasses[item.badgeTone] || badgeClasses.amber
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="col-span-4 text-gray-400 text-[11px] truncate">
                          {item.ext}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
