import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Folder, FileText, ChevronRight, Monitor, Download, Music, Image, Video, Briefcase, User, Archive } from 'lucide-react';

export default function DolphinWindow({ isOpen, isMinimized, onClose, onMinimize, activeTab, setActiveTab }) {
  const nodeRef = useRef(null);
  const [currentSubFolder, setCurrentSubFolder] = useState(null);

  if (!isOpen) return null;

  // Linux standard directory list for sidebar
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
    { id: 'cv', name: 'cv.pdf', icon: FileText },
  ];

  // Directory contents mapping for grid view
  const directoryContents = {
    about: [
      { name: 'whoami.sh', type: 'file', ext: 'sh', icon: FileText, color: 'text-emerald-400' },
      { name: 'projects', type: 'dir', icon: Folder, color: 'text-amber-400', target: 'projects' },
      { name: 'documents', type: 'dir', icon: Folder, color: 'text-amber-400', target: 'documents' },
    ],
    desktop: [
      { name: 'shortcut_notes.txt', type: 'file', ext: 'txt', icon: FileText, color: 'text-emerald-400' },
      { name: 'config.json', type: 'file', ext: 'json', icon: FileText, color: 'text-yellow-400' },
      { name: 'background.png', type: 'file', ext: 'png', icon: Image, color: 'text-purple-400' },
    ],
    documents: [
      { name: 'Resume_2026.pdf', type: 'file', ext: 'pdf', icon: FileText, color: 'text-red-400' },
      { name: 'Research_Paper.pdf', type: 'file', ext: 'pdf', icon: FileText, color: 'text-red-400' },
      { name: 'Notes.txt', type: 'file', ext: 'txt', icon: FileText, color: 'text-emerald-400' },
    ],
    downloads: [
      { name: 'ubuntu_iso_backup.iso', type: 'file', ext: 'iso', icon: Archive, color: 'text-blue-400' },
      { name: 'toolkit_v2.tar.gz', type: 'file', ext: 'gz', icon: Archive, color: 'text-orange-400' },
      { name: 'patch_notes.md', type: 'file', ext: 'md', icon: FileText, color: 'text-blue-300' },
    ],
    projects: [
      { name: 'Snippy App', type: 'dir', icon: Folder, color: 'text-amber-400' },
      { name: 'Agentic Analyzer', type: 'dir', icon: Folder, color: 'text-amber-400' },
      { name: 'Linux Portfolio', type: 'dir', icon: Folder, color: 'text-amber-400' },
    ],
    experience: [
      { name: 'cyber_researcher.txt', type: 'file', ext: 'txt', icon: FileText, color: 'text-emerald-400' },
      { name: 'software_engineer.txt', type: 'file', ext: 'txt', icon: FileText, color: 'text-emerald-400' },
    ],
    music: [],
    pictures: [],
    videos: [],
    cv: [
      { name: 'curriculum_vitae.pdf', type: 'file', ext: 'pdf', icon: FileText, color: 'text-red-400' }
    ]
  };

  const currentItems = directoryContents[activeTab] || [];

  const handleSidebarClick = (id) => {
    setActiveTab(id);
    setCurrentSubFolder(null);
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === 'dir' && item.target) {
      setActiveTab(item.target);
    }
  };

  return (
    <Draggable handle=".ubuntu-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef} 
        style={{ display: isMinimized ? 'none' : 'flex' }}
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[720px] h-[520px] bg-[#1e1e1e]/95 backdrop-blur-md border border-[#333333] rounded-t-lg shadow-2xl flex-col z-25 overflow-hidden font-mono text-xs select-none"
      >
        {/* Ubuntu Dark Yaru Window Header */}
        <div className="ubuntu-header cursor-move bg-[#111111] px-4 py-2.5 border-b border-[#2b2b2b] flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-200 font-bold">
            <Folder className="w-4 h-4 text-[#E95420]" />
            <span>Files — /home/guest/{activeTab}</span>
          </div>
          
          {/* Ubuntu Yaru Control Buttons */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={onMinimize}
              className="w-5 h-5 rounded-full bg-[#333333] hover:bg-[#444444] text-gray-300 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button 
              onClick={onClose} 
              className="w-5 h-5 rounded-full bg-[#E95420] hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Interactive Breadcrumb Path Bar */}
        <div className="bg-[#181818] px-4 py-1.5 border-b border-[#2b2b2b] flex items-center space-x-2 text-gray-400 text-[11px]">
          <span 
            onClick={() => handleSidebarClick('about')}
            className="hover:text-white cursor-pointer transition-colors"
          >
            home
          </span>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span 
            onClick={() => handleSidebarClick('about')}
            className="hover:text-white cursor-pointer transition-colors"
          >
            guest
          </span>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span className="text-[#E95420] font-semibold capitalize">{activeTab}</span>
        </div>

        {/* Body Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Linux Standard Places */}
          <div className="w-44 bg-[#141414] border-r border-[#2b2b2b] p-2 space-y-0.5 overflow-y-auto">
            <div className="text-[10px] text-gray-500 font-bold px-2 py-1 uppercase tracking-wider">Places</div>
            {places.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarClick(item.id)}
                  className={`w-full flex items-center space-x-2.5 px-3 py-1.5 rounded transition-colors text-left ${
                    activeTab === item.id ? 'bg-[#E95420] text-white font-bold shadow' : 'text-gray-300 hover:bg-[#252525]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Explorer Grid View Contents */}
          <div className="flex-1 p-5 overflow-y-auto text-gray-200 bg-[#1e1e1e]">
            {activeTab === 'about' && (
              <div className="mb-5 pb-3 border-b border-[#333333]">
                <h3 className="text-sm font-bold text-[#E95420] mb-1">whoami.sh</h3>
                <p className="text-xs leading-relaxed text-gray-300">
                  Cybersecurity researcher & software engineer specializing in automated binary analysis, reverse engineering, and low-level development.
                </p>
              </div>
            )}

            {activeTab === 'cv' && (
              <div className="text-center py-4 space-y-3 mb-5 pb-3 border-b border-[#333333]">
                <FileText className="w-8 h-8 text-[#E95420] mx-auto" />
                <div className="font-bold">curriculum_vitae.pdf</div>
                <a href="/cv.pdf" download className="inline-block bg-[#E95420] text-white font-bold px-3 py-1.5 rounded text-xs hover:bg-orange-600 transition-colors">
                  Download PDF
                </a>
              </div>
            )}

            {/* Folder Grid View (Borderless & Clean) */}
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">Contents</div>
            
            {currentItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500 space-y-2">
                <Folder className="w-10 h-10 mx-auto opacity-30 text-gray-400" />
                <div>This folder is empty</div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {currentItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onDoubleClick={() => handleItemDoubleClick(item)}
                      className="p-2 rounded-lg flex flex-col items-center text-center space-y-1.5 hover:bg-white/5 transition-all cursor-pointer group select-none"
                    >
                      <Icon className={`w-10 h-10 ${item.color} group-hover:scale-105 transition-transform drop-shadow`} />
                      <span className="text-[11px] text-gray-200 font-medium truncate w-full group-hover:text-[#E95420] transition-colors">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
}