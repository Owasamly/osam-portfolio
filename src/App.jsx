import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import ParticleBackground from './components/ParticleBackground';
import DolphinWindow from './components/DolphinWindow';
import { Folder, FileText, Mail, Trash2, Terminal, Wifi, Volume2, Grid } from 'lucide-react';

// Draggable Desktop Icon Item with nodeRef wrapper
function DesktopIcon({ item, onDoubleClick }) {
  const nodeRef = useRef(null);
  const Icon = item.icon;

  return (
    <Draggable defaultPosition={item.defaultPos} nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        onDoubleClick={() => onDoubleClick(item.id)}
        className="absolute w-20 flex flex-col items-center justify-center p-2 rounded hover:bg-white/10 cursor-grab active:cursor-grabbing text-center space-y-1 group transition-colors select-none"
      >
        <Icon className={`w-10 h-10 ${item.color} filter drop-shadow group-hover:scale-105 transition-transform`} />
        <span className="text-xs text-white font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          {item.label}
        </span>
      </div>
    </Draggable>
  );
}

export default function App() {
  const [isWindowOpen, setIsWindowOpen] = useState(false); // Closed by default
  const [activeTab, setActiveTab] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const desktopIcons = [
    { id: 'about', label: 'Home', icon: Folder, color: 'text-amber-400', defaultPos: { x: 30, y: 30 } },
    { id: 'projects', label: 'Projects', icon: Folder, color: 'text-amber-400', defaultPos: { x: 30, y: 130 } },
    { id: 'cv', label: 'cv.txt', icon: FileText, color: 'text-emerald-400', defaultPos: { x: 30, y: 230 } },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'text-orange-400', defaultPos: { x: 30, y: 330 } },
    { id: 'trash', label: 'Trash', icon: Trash2, color: 'text-gray-400', defaultPos: { x: 30, y: 430 } },
  ];

  const handleIconDoubleClick = (id) => {
    setActiveTab(id);
    setIsWindowOpen(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none font-mono">
      {/* 1. Fast & Crisp Canvas Background */}
      <ParticleBackground />

      {/* 2. Top Ubuntu Yaru Status Bar */}
      <header className="absolute top-0 left-0 w-full h-8 bg-[#111111]/90 border-b border-[#222222] z-30 px-4 flex justify-between items-center text-xs text-gray-300">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-white hover:text-[#E95420] cursor-pointer">Activities</span>
          <span className="text-gray-400 text-[11px]">Ubuntu 24.04 LTS</span>
        </div>

        <div className="font-semibold text-white">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        <div className="flex items-center space-x-3 text-gray-300">
          <Wifi className="w-3.5 h-3.5" />
          <Volume2 className="w-3.5 h-3.5" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
      </header>

      {/* 3. Movable Desktop Icons */}
      <div className="relative z-10 pt-8">
        {desktopIcons.map((item) => (
          <DesktopIcon key={item.id} item={item} onDoubleClick={handleIconDoubleClick} />
        ))}
      </div>

      {/* 4. Floating Draggable File Manager Window */}
      <DolphinWindow
        isOpen={isWindowOpen}
        onClose={() => setIsWindowOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 5. Ubuntu Start Menu Launcher */}
      {isMenuOpen && (
        <div className="absolute bottom-12 left-2 w-64 bg-[#111111]/95 border border-[#333333] rounded-t-lg shadow-2xl z-30 p-2 text-xs text-gray-200 space-y-1 backdrop-blur-md">
          <div className="p-2 font-bold text-[#E95420] border-b border-[#222222] uppercase tracking-wider text-[10px]">Ubuntu Applications</div>
          <button onClick={() => { setIsWindowOpen(true); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#222222] rounded text-left">
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Files</span>
          </button>
          <button onClick={() => setIsMenuOpen(false)} className="w-full flex items-center space-x-2 p-2 hover:bg-[#222222] rounded text-left">
            <Terminal className="w-4 h-4 text-green-400" />
            <span>Terminal</span>
          </button>
        </div>
      )}

      {/* 6. Ubuntu Bottom Dock / Panel */}
      <footer className="absolute bottom-0 left-0 w-full h-10 bg-[#111111]/95 border-t border-[#222222] z-30 px-3 flex justify-between items-center text-xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 rounded hover:bg-white/10 text-[#E95420] transition-colors"
          >
            <Grid className="w-4 h-4" />
          </button>

          {isWindowOpen && (
            <div className="flex items-center space-x-2 bg-[#222222] border border-[#333333] px-3 py-1 rounded text-white font-semibold">
              <Folder className="w-3.5 h-3.5 text-[#E95420]" />
              <span>Files</span>
            </div>
          )}
        </div>

        <div className="text-[11px] text-gray-500 font-mono">
          Double-click icons to open
        </div>
      </footer>
    </div>
  );
}