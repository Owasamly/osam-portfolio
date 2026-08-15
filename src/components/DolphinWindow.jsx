import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { 
  X, Minus, Folder, FileText, ChevronLeft, ChevronRight, 
  LayoutGrid, List, Download, Music, Image, Video, 
  Briefcase, User, Archive, GraduationCap, Trash2, 
  Terminal, Mail, FileCode, Globe, Camera, Images,
  FileImage, Film, Clapperboard, MonitorPlay
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
      if (onFileOpen) onFileOpen(item.file || 'cv.pdf');
    } else if (item.action === 'download') {
      const link = document.createElement('a');
      link.href = `/${item.file || 'cv.pdf'}`;
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

  const getItemInteractions = (item) => {
    if (isMobile) {
      return { onClick: () => handleItemAction(item) };
    }
    return { onDoubleClick: () => handleItemAction(item) };
  };

  return (
    <Draggable handle=".ubuntu-header" nodeRef={nodeRef} disabled={isMobile}>
      <div 
        ref={nodeRef} 
        onMouseDownCapture={onFocus}
        onPointerDownCapture={onFocus}
        style={{ display: isMinimized ? 'none' : 'flex', zIndex: isMobile ? 100 : zIndex }}
        className={`border shadow-2xl flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isMobile ? 'fixed inset-0 w-full h-[100dvh] rounded-none' : 'absolute top-20 left-1/2 -translate-x-1/2 w-[740px] h-[520px] rounded-t-lg'
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
            <span>Files — /home/osama/{activeTab === 'about' ? '' : activeTab}</span>
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
          <div className={`w-36 sm:w-44 border-r p-1.5 sm:p-2 space-y-0.5 overflow-y-auto shrink-0 ${
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
            {activeTab === 'about' && (
              <div className={`mb-5 pb-3 border-b ${isLightMode ? 'border-gray-200' : 'border-[#333333]'}`}>
                <h3 className="text-sm font-bold text-[#E95420] mb-1">Home Directory (~/osama)</h3>
                <p className={`text-xs leading-relaxed ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
                  Welcome to my interactive DevSecOps desktop environment. Double click files to open editors/viewers or folders to explore further.
                </p>
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
          </div>
        </div>
      </div>
    </Draggable>
  );
}
