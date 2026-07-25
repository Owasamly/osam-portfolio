import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import ParticleBackground from './components/ParticleBackground';
import DolphinWindow from './components/DolphinWindow';
import TerminalWindow from './components/TerminalWindow';
import PdfViewerWindow from './components/PdfViewerWindow';
import TextEditorWindow from './components/TextEditorWindow';
import SystemMonitorWindow from './components/SystemMonitorWindow';
import { Folder, FileText, Mail, Terminal, Wifi, Volume2, Grid, Activity } from 'lucide-react';

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
  // Window states
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isWindowMinimized, setIsWindowMinimized] = useState(false);

  const [isTermOpen, setIsTermOpen] = useState(true);
  const [isTermMinimized, setIsTermMinimized] = useState(false);

  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isPdfMinimized, setIsPdfMinimized] = useState(false);
  const [currentPdfFile, setCurrentPdfFile] = useState('cv.pdf');

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isEditorMinimized, setIsEditorMinimized] = useState(false);
  const [currentEditorFile, setCurrentEditorFile] = useState('notes.txt');

  const [isMonitorOpen, setIsMonitorOpen] = useState(false);
  const [isMonitorMinimized, setIsMonitorMinimized] = useState(false);

  // Theme accent state (defaults to Ubuntu Orange #E95420)
  const [accentColor, setAccentColor] = useState('#E95420');

  const [activeTab, setActiveTab] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const desktopIcons = [
    { id: 'about', label: 'Home', icon: Folder, color: 'text-amber-400', defaultPos: { x: 30, y: 30 } },
    { id: 'projects', label: 'Projects', icon: Folder, color: 'text-amber-400', defaultPos: { x: 30, y: 130 } },
    { id: 'cv', label: 'cv.pdf', icon: FileText, color: 'text-red-400', defaultPos: { x: 30, y: 230 } },
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'text-green-400', defaultPos: { x: 30, y: 330 } },
  ];

  const handleIconDoubleClick = (id) => {
    if (id === 'terminal') {
      setIsTermOpen(true);
      setIsTermMinimized(false);
    } else if (id === 'cv') {
      setCurrentPdfFile('cv.pdf');
      setIsPdfOpen(true);
      setIsPdfMinimized(false);
    } else {
      setActiveTab(id);
      setIsWindowOpen(true);
      setIsWindowMinimized(false);
    }
  };

  const handleFileOpen = (fileName) => {
    if (fileName && fileName.endsWith('.pdf')) {
      setCurrentPdfFile(fileName);
      setIsPdfOpen(true);
      setIsPdfMinimized(false);
    }
  };

  const handleTextEditorOpen = (fileName) => {
    if (fileName) {
      setCurrentEditorFile(fileName);
      setIsEditorOpen(true);
      setIsEditorMinimized(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none font-mono">
      <ParticleBackground />

      {/* Top Ubuntu Status Bar */}
      <header className="absolute top-0 left-0 w-full h-8 bg-[#111111]/90 border-b border-[#222222] z-30 px-4 flex justify-between items-center text-xs text-gray-300">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-white hover:opacity-80 cursor-pointer" style={{ color: accentColor }}>Activities</span>
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

      {/* Persistent Desktop Conky Telemetry Widget (Top-Right) */}
      <SystemMonitorWindow currentAccent={accentColor} isWidgetMode={true} />

      {/* Desktop Icons */}
      <div className="relative z-10 pt-8">
        {desktopIcons.map((item) => (
          <DesktopIcon key={item.id} item={item} onDoubleClick={handleIconDoubleClick} />
        ))}
      </div>

      {/* Windows */}
      <DolphinWindow
        isOpen={isWindowOpen}
        isMinimized={isWindowMinimized}
        onClose={() => setIsWindowOpen(false)}
        onMinimize={() => setIsWindowMinimized(!isWindowMinimized)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onFileOpen={handleFileOpen}
        onTextEditorOpen={handleTextEditorOpen}
      />

      <PdfViewerWindow
        isOpen={isPdfOpen}
        isMinimized={isPdfMinimized}
        onClose={() => setIsPdfOpen(false)}
        onMinimize={() => setIsPdfMinimized(!isPdfMinimized)}
        pdfFile={currentPdfFile}
      />

      <TextEditorWindow
        isOpen={isEditorOpen}
        isMinimized={isEditorMinimized}
        onClose={() => setIsEditorOpen(false)}
        onMinimize={() => setIsEditorMinimized(!isEditorMinimized)}
        fileName={currentEditorFile}
      />

      <TerminalWindow
        isOpen={isTermOpen}
        isMinimized={isTermMinimized}
        onClose={() => setIsTermOpen(false)}
        onMinimize={() => setIsTermMinimized(!isTermMinimized)}
      />

      {/* Ubuntu Start Menu Launcher */}
      {isMenuOpen && (
        <div className="absolute bottom-12 left-2 w-64 bg-[#111111]/95 border border-[#333333] rounded-t-lg shadow-2xl z-30 p-2 text-xs text-gray-200 space-y-1 backdrop-blur-md">
          <div className="p-2 font-bold border-b border-[#222222] uppercase tracking-wider text-[10px]" style={{ color: accentColor }}>Ubuntu Applications</div>
          <button onClick={() => { setIsWindowOpen(true); setIsWindowMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#222222] rounded text-left">
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Files</span>
          </button>
          <button onClick={() => { setCurrentPdfFile('cv.pdf'); setIsPdfOpen(true); setIsPdfMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#222222] rounded text-left">
            <FileText className="w-4 h-4 text-red-400" />
            <span>PDF Viewer (CV)</span>
          </button>
          <button onClick={() => { setIsEditorOpen(true); setIsEditorMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#222222] rounded text-left">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Text Editor (Gedit)</span>
          </button>
          <button onClick={() => { setIsTermOpen(true); setIsTermMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#222222] rounded text-left">
            <Terminal className="w-4 h-4 text-green-400" />
            <span>Terminal</span>
          </button>
        </div>
      )}

      {/* Ubuntu Bottom Dock */}
      <footer className="absolute bottom-0 left-0 w-full h-10 bg-[#111111]/95 border-t border-[#222222] z-30 px-3 flex justify-between items-center text-xs">
        <div className="flex items-center space-x-3">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1.5 rounded hover:bg-white/10 transition-colors" style={{ color: accentColor }}>
            <Grid className="w-4 h-4" />
          </button>

          {isWindowOpen && (
            <button onClick={() => setIsWindowMinimized(!isWindowMinimized)} className={`flex items-center space-x-2 px-3 py-1 rounded text-white font-semibold transition-colors border ${isWindowMinimized ? 'bg-[#111111] border-[#333333] opacity-60' : 'bg-[#222222] border-[#333333]'}`}>
              <Folder className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>Files</span>
            </button>
          )}

          {isPdfOpen && (
            <button onClick={() => setIsPdfMinimized(!isPdfMinimized)} className={`flex items-center space-x-2 px-3 py-1 rounded text-white font-semibold transition-colors border ${isPdfMinimized ? 'bg-[#111111] border-[#333333] opacity-60' : 'bg-[#222222] border-[#333333]'}`}>
              <FileText className="w-3.5 h-3.5 text-red-400" />
              <span className="truncate max-w-[100px]">{currentPdfFile}</span>
            </button>
          )}

          {isEditorOpen && (
            <button onClick={() => setIsEditorMinimized(!isEditorMinimized)} className={`flex items-center space-x-2 px-3 py-1 rounded text-white font-semibold transition-colors border ${isEditorMinimized ? 'bg-[#111111] border-[#333333] opacity-60' : 'bg-[#222222] border-[#333333]'}`}>
              <FileText className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span className="truncate max-w-[100px]">{currentEditorFile}</span>
            </button>
          )}

          {isTermOpen && (
            <button onClick={() => setIsTermMinimized(!isTermMinimized)} className={`flex items-center space-x-2 px-3 py-1 rounded text-white font-semibold transition-colors border ${isTermMinimized ? 'bg-[#111111] border-[#333333] opacity-60' : 'bg-[#222222] border-[#333333]'}`}>
              <Terminal className="w-3.5 h-3.5 text-green-400" />
              <span>Terminal</span>
            </button>
          )}
        </div>

        <div className="text-[11px] text-gray-500 font-mono">
          Double-click icons to open
        </div>
      </footer>
    </div>
  );
}