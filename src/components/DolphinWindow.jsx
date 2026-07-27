import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Folder, FileText, ChevronLeft, ChevronRight, LayoutGrid, List, Monitor, Download, Music, Image, Video, Briefcase, User, Archive } from 'lucide-react';

export default function DolphinWindow({ 
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize, 
  activeTab, 
  setActiveTab, 
  onFileOpen, 
  onTextEditorOpen,
  isLightMode,
  onFocus,
}) {
  const nodeRef = useRef(null);

  const [history, setHistory] = useState(['about']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  const navigateTo = (tabId, addToHistory = true) => {
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
      setActiveTab(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setActiveTab(history[newIndex]);
    }
  };

  if (!isOpen) return null;

  const places = [
    { id: 'about', name: 'Home (~)', icon: User },
    { id: 'desktop', name: 'Desktop', icon: Monitor },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'downloads', name: 'Downloads', icon: Download },
    { id: 'projects', name: 'Projects', icon: Folder },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'pictures', name: 'Pictures', icon: Image },
    { id: 'videos', name: 'Videos', icon: Video },
  ];

  const directoryContents = {
    about: [
      { name: 'whoami.sh', type: 'file', ext: 'Shell Script', icon: FileText, color: 'text-emerald-500' },
      { name: 'projects', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500', target: 'projects' },
      { name: 'documents', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500', target: 'documents' },
    ],
    desktop: [
      { name: 'shortcut_notes.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
      { name: 'config.json', type: 'file', ext: 'JSON Data', icon: FileText, color: 'text-yellow-500' },
      { name: 'background.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
    ],
    documents: [
      { name: 'cv.pdf', type: 'file', ext: 'PDF Document', icon: FileText, color: 'text-red-500' },
      { name: 'Research_Paper.pdf', type: 'file', ext: 'PDF Document', icon: FileText, color: 'text-red-500' },
      { name: 'notes.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
    ],
    downloads: [
      { name: 'ubuntu_iso_backup.iso', type: 'file', ext: 'Disk Image', icon: Archive, color: 'text-blue-500' },
      { name: 'toolkit_v2.tar.gz', type: 'file', ext: 'Compressed Archive', icon: Archive, color: 'text-orange-500' },
    ],
    projects: [
      { name: 'Snippy App', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500' },
      { name: 'Agentic Analyzer', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500' },
    ],
    experience: [
      { name: 'cyber_researcher.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
    ],
    music: [],
    pictures: [],
    videos: []
  };

  const currentItems = directoryContents[activeTab] || [];

  const handleSidebarClick = (id) => navigateTo(id);

  const handleItemDoubleClick = (item) => {
    if (item.type === 'dir' && item.target) {
      navigateTo(item.target);
    } else if (item.name.endsWith('.pdf')) {
      if (onFileOpen) onFileOpen(item.name);
    } else if (item.name.endsWith('.sh') || item.name.endsWith('.txt') || item.name.endsWith('.json')) {
      if (onTextEditorOpen) onTextEditorOpen(item.name);
    }
  };

  return (
    <Draggable handle=".ubuntu-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef} 
        onMouseDown={onFocus}
        style={{ display: isMinimized ? 'none' : 'flex' }}
        className={`absolute top-20 left-1/2 -translate-x-1/2 w-[740px] h-[520px] rounded-t-lg border shadow-2xl flex-col z-25 overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isLightMode ? 'bg-[#fafafa] text-gray-800 border-gray-300' : 'bg-[#1e1e1e]/95 text-gray-200 border-[#333333]'
        }`}
      >
        {/* Header */}
        <div className={`ubuntu-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
          isLightMode ? 'bg-[#e5e5e5] border-gray-300 text-gray-900' : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
        }`}>
          <div className="flex items-center space-x-2 font-bold">
            <Folder className="w-4 h-4 text-[#E95420]" />
            <span>Files — /home/guest/{activeTab}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button onClick={onMinimize} className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
              isLightMode ? 'bg-gray-300 hover:bg-gray-400 text-gray-800' : 'bg-[#333333] hover:bg-[#444444] text-gray-300'
            }`}>
              <Minus className="w-3 h-3" />
            </button>
            <button onClick={onClose} className="w-5 h-5 rounded-full bg-[#E95420] hover:bg-red-600 text-white flex items-center justify-center transition-colors">
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
              <span onClick={() => handleSidebarClick('about')} className="hover:underline cursor-pointer">guest</span>
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

        {/* Explorer Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className={`w-44 border-r p-2 space-y-0.5 overflow-y-auto ${
            isLightMode ? 'bg-[#eaeaea] border-gray-300' : 'bg-[#141414] border-[#2b2b2b]'
          }`}>
            <div className="text-[10px] text-gray-500 font-bold px-2 py-1 uppercase tracking-wider">Places</div>
            {places.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarClick(item.id)}
                  className={`w-full flex items-center space-x-2.5 px-3 py-1.5 rounded transition-colors text-left ${
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
          <div className={`flex-1 p-5 overflow-y-auto ${
            isLightMode ? 'bg-[#ffffff] text-gray-900' : 'bg-[#1e1e1e] text-gray-200'
          }`}>
            {activeTab === 'about' && (
              <div className={`mb-5 pb-3 border-b ${isLightMode ? 'border-gray-200' : 'border-[#333333]'}`}>
                <h3 className="text-sm font-bold text-[#E95420] mb-1">whoami.sh</h3>
                <p className={`text-xs leading-relaxed ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
                  Cybersecurity researcher & software engineer specializing in automated binary analysis, reverse engineering, and low-level development.
                </p>
              </div>
            )}

            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">Contents</div>
            
            {currentItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 space-y-2">
                <Folder className="w-10 h-10 mx-auto opacity-30" />
                <div>This folder is empty</div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-4 gap-4">
                {currentItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onDoubleClick={() => handleItemDoubleClick(item)}
                      className={`p-2 rounded-lg flex flex-col items-center text-center space-y-1.5 transition-all cursor-pointer group select-none ${
                        isLightMode ? 'hover:bg-gray-100' : 'hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-10 h-10 ${item.color} group-hover:scale-105 transition-transform drop-shadow`} />
                      <span className={`text-[11px] font-medium truncate w-full group-hover:text-[#E95420] transition-colors ${
                        isLightMode ? 'text-gray-800' : 'text-gray-200'
                      }`}>
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
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        onDoubleClick={() => handleItemDoubleClick(item)}
                        className={`grid grid-cols-12 px-3 py-2 items-center cursor-pointer transition-colors group select-none ${
                          isLightMode ? 'hover:bg-gray-50' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="col-span-8 flex items-center space-x-2.5">
                          <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
                          <span className={`group-hover:text-[#E95420] transition-colors font-medium truncate ${
                            isLightMode ? 'text-gray-800' : 'text-gray-200'
                          }`}>
                            {item.name}
                          </span>
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