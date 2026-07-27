import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import ParticleBackground from './components/ParticleBackground';
import DolphinWindow from './components/DolphinWindow';
import TerminalWindow from './components/TerminalWindow';
import PdfViewerWindow from './components/PdfViewerWindow';
import TextEditorWindow from './components/TextEditorWindow';
import SystemMonitorWindow from './components/SystemMonitorWindow';
import BrowserWindow from './components/BrowserWindow';
import ContactWindow from './components/ContactWindow';
import VideoPlayerWindow from './components/VideoPlayerWindow';
import QuickSettingsMenu from './components/QuickSettingsMenu';
import SettingsWindow from './components/SettingsWindow';
import ContextMenu from './components/ContextMenu';
import { Folder, FileText, Mail, Terminal, Wifi, Volume2, VolumeX, Grid, Globe, Film, Settings } from 'lucide-react';

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
  const [currentEditorFile, setCurrentEditorFile] = useState('whoami.sh');

  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const [isBrowserMinimized, setIsBrowserMinimized] = useState(false);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isContactMinimized, setIsContactMinimized] = useState(false);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoMinimized, setIsVideoMinimized] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('Project Demo');

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSettingsMinimized, setIsSettingsMinimized] = useState(false);

  // Dynamic Window Depth Stacking (Z-Index)
  const [zIndices, setZIndices] = useState({
    files: 30,
    terminal: 31,
    pdf: 25,
    editor: 25,
    browser: 25,
    contact: 25,
    video: 25,
    settings: 32,
    monitor: 20
  });

  const bringToFront = (appId) => {
    setZIndices(prev => {
      const highest = Math.max(...Object.values(prev));
      return { ...prev, [appId]: highest + 1 };
    });
  };

  // Appearance states
  const [isLightMode, setIsLightMode] = useState(false);
  const [bgPreset, setBgPreset] = useState('#77216F');

  const [contextMenuPos, setContextMenuPos] = useState(null);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isBluetoothOn, setIsBluetoothOn] = useState(true);
  const [volume, setVolume] = useState(80);

  const [activeTab, setActiveTab] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const accentColor = '#E95420';

  const desktopIcons = [
    { id: 'about', label: 'Home', icon: Folder, color: 'text-amber-400', defaultPos: { x: 30, y: 30 } },
    { id: 'projects', label: 'Projects', icon: Folder, color: 'text-amber-400', defaultPos: { x: 30, y: 130 } },
    { id: 'cv', label: 'cv.pdf', icon: FileText, color: 'text-red-400', defaultPos: { x: 30, y: 230 } },
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'text-green-400', defaultPos: { x: 30, y: 330 } },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'text-sky-400', defaultPos: { x: 30, y: 430 } },
  ];

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
  };

  const handleOpenApp = (appId) => {
    bringToFront(appId);
    if (appId === 'terminal') {
      setIsTermOpen(true);
      setIsTermMinimized(false);
    } else if (appId === 'cv' || appId === 'pdf') {
      setCurrentPdfFile('cv.pdf');
      setIsPdfOpen(true);
      setIsPdfMinimized(false);
    } else if (appId === 'editor') {
      setIsEditorOpen(true);
      setIsEditorMinimized(false);
    } else if (appId === 'video') {
      setIsVideoOpen(true);
      setIsVideoMinimized(false);
    } else if (appId === 'settings') {
      setIsSettingsOpen(true);
      setIsSettingsMinimized(false);
    } else if (appId === 'files') {
      setIsWindowOpen(true);
      setIsWindowMinimized(false);
    } else if (appId === 'browser') {
      setIsBrowserOpen(true);
      setIsBrowserMinimized(false);
    } else if (appId === 'contact') {
      setIsContactOpen(true);
      setIsContactMinimized(false);
    }
  };

  const handleIconDoubleClick = (id) => {
    if (id === 'terminal') {
      bringToFront('terminal');
      setIsTermOpen(true);
      setIsTermMinimized(false);
    } else if (id === 'cv') {
      bringToFront('pdf');
      setCurrentPdfFile('cv.pdf');
      setIsPdfOpen(true);
      setIsPdfMinimized(false);
    } else if (id === 'contact') {
      bringToFront('contact');
      setIsContactOpen(true);
      setIsContactMinimized(false);
    } else {
      bringToFront('files');
      setActiveTab(id);
      setIsWindowOpen(true);
      setIsWindowMinimized(false);
    }
  };

  return (
    <div 
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenuPos(null)}
      className={`relative w-screen h-screen overflow-hidden select-none font-mono transition-colors duration-500 ${
        isLightMode ? 'text-gray-900' : 'text-gray-200'
      }`}
    >
      <ParticleBackground bgPreset={bgPreset} />

      <ContextMenu 
        position={contextMenuPos} 
        onClose={() => setContextMenuPos(null)} 
        onOpenApp={handleOpenApp} 
        isLightMode={isLightMode}
      />

      {/* Top Status Bar */}
      <header className={`absolute top-0 left-0 w-full h-8 border-b z-50 px-4 flex justify-between items-center text-xs backdrop-blur-md transition-colors ${
        isLightMode ? 'bg-[#f0f0f0]/90 border-gray-300 text-gray-800' : 'bg-[#111111]/90 border-[#222222] text-gray-300'
      }`}>
        <div className="flex items-center space-x-4">
          <span className="font-bold hover:opacity-80 cursor-pointer text-[#E95420]">Activities</span>
          <span className="text-gray-400 text-[11px]">Ubuntu 24.04 LTS</span>
        </div>
        <div className="font-semibold">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        
        <div 
          onClick={(e) => { e.stopPropagation(); setIsQuickSettingsOpen(!isQuickSettingsOpen); }}
          className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
        >
          {isWifiOn ? <Wifi className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5 text-gray-500" />}
          {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
      </header>

      <QuickSettingsMenu
        isOpen={isQuickSettingsOpen}
        onClose={() => setIsQuickSettingsOpen(false)}
        currentAccent={accentColor}
        isWifiOn={isWifiOn}
        setIsWifiOn={setIsWifiOn}
        isBluetoothOn={isBluetoothOn}
        setIsBluetoothOn={setIsBluetoothOn}
        volume={volume}
        setVolume={setVolume}
        isLightMode={isLightMode}
      />

      <SystemMonitorWindow currentAccent={accentColor} isWidgetMode={true} isLightMode={isLightMode} />

      <div className="relative z-10 pt-8">
        {desktopIcons.map((item) => (
          <DesktopIcon key={item.id} item={item} onDoubleClick={handleIconDoubleClick} />
        ))}
      </div>

      {/* Layered Window Stack */}
      <div className="relative" style={{ zIndex: zIndices.settings }}>
        <SettingsWindow
          isOpen={isSettingsOpen}
          isMinimized={isSettingsMinimized}
          onClose={() => setIsSettingsOpen(false)}
          onMinimize={() => setIsSettingsMinimized(!isSettingsMinimized)}
          onFocus={() => bringToFront('settings')}
          isLightMode={isLightMode}
          setIsLightMode={setIsLightMode}
          bgPreset={bgPreset}
          setBgPreset={setBgPreset}
        />
      </div>

      <div className="relative" style={{ zIndex: zIndices.files }}>
        <DolphinWindow
          isOpen={isWindowOpen}
          isMinimized={isWindowMinimized}
          onClose={() => setIsWindowOpen(false)}
          onMinimize={() => setIsWindowMinimized(!isWindowMinimized)}
          onFocus={() => bringToFront('files')}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLightMode={isLightMode}
        />
      </div>

      <div className="relative" style={{ zIndex: zIndices.pdf }}>
        <PdfViewerWindow
          isOpen={isPdfOpen}
          isMinimized={isPdfMinimized}
          onClose={() => setIsPdfOpen(false)}
          onMinimize={() => setIsPdfMinimized(!isPdfMinimized)}
          onFocus={() => bringToFront('pdf')}
          pdfFile={currentPdfFile}
          isLightMode={isLightMode}
        />
      </div>

      <div className="relative" style={{ zIndex: zIndices.editor }}>
        <TextEditorWindow
          isOpen={isEditorOpen}
          isMinimized={isEditorMinimized}
          onClose={() => setIsEditorOpen(false)}
          onMinimize={() => setIsEditorMinimized(!isEditorMinimized)}
          onFocus={() => bringToFront('editor')}
          fileName={currentEditorFile}
          currentAccent={bgPreset}
          isLightMode={isLightMode}
        />
      </div>

      <div className="relative" style={{ zIndex: zIndices.terminal }}>
        <TerminalWindow
          isOpen={isTermOpen}
          isMinimized={isTermMinimized}
          onClose={() => setIsTermOpen(false)}
          onMinimize={() => setIsTermMinimized(!isTermMinimized)}
          onFocus={() => bringToFront('terminal')}
          isLightMode={isLightMode}
        />
      </div>

      <div className="relative" style={{ zIndex: zIndices.browser }}>
        <BrowserWindow
          isOpen={isBrowserOpen}
          isMinimized={isBrowserMinimized}
          onClose={() => setIsBrowserOpen(false)}
          onMinimize={() => setIsBrowserMinimized(!isBrowserMinimized)}
          onFocus={() => bringToFront('browser')}
          currentAccent={accentColor}
          isLightMode={isLightMode}
        />
      </div>

      <div className="relative" style={{ zIndex: zIndices.contact }}>
        <ContactWindow
          isOpen={isContactOpen}
          isMinimized={isContactMinimized}
          onClose={() => setIsContactOpen(false)}
          onMinimize={() => setIsContactMinimized(!isContactMinimized)}
          onFocus={() => bringToFront('contact')}
          currentAccent={accentColor}
          isLightMode={isLightMode}
        />
      </div>

      <div className="relative" style={{ zIndex: zIndices.video }}>
        <VideoPlayerWindow
          isOpen={isVideoOpen}
          isMinimized={isVideoMinimized}
          onClose={() => setIsVideoOpen(false)}
          onMinimize={() => setIsVideoMinimized(!isVideoMinimized)}
          onFocus={() => bringToFront('video')}
          videoSrc={currentVideoSrc}
          videoTitle={currentVideoTitle}
          currentAccent={bgPreset}
          isLightMode={isLightMode}
        />
      </div>

      {/* Start Menu Launcher */}
      {isMenuOpen && (
        <div className={`absolute bottom-12 left-2 w-64 rounded-t-lg border shadow-2xl z-50 p-2 text-xs space-y-1 backdrop-blur-md ${
          isLightMode ? 'bg-[#f4f4f4]/95 border-gray-300 text-gray-800' : 'bg-[#111111]/95 border-[#333333] text-gray-200'
        }`}>
          <div className="p-2 font-bold border-b border-gray-500/20 uppercase tracking-wider text-[10px] text-[#E95420]">
            Ubuntu Applications
          </div>
          <button onClick={() => { bringToFront('files'); setIsWindowOpen(true); setIsWindowMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <Folder className="w-4 h-4 text-amber-500" />
            <span>Files</span>
          </button>
          <button onClick={() => { bringToFront('browser'); setIsBrowserOpen(true); setIsBrowserMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <Globe className="w-4 h-4 text-blue-500" />
            <span>Firefox Browser</span>
          </button>
          <button onClick={() => { bringToFront('contact'); setIsContactOpen(true); setIsContactMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <Mail className="w-4 h-4 text-sky-500" />
            <span>Contact Mail</span>
          </button>
          <button onClick={() => { bringToFront('video'); setIsVideoOpen(true); setIsVideoMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <Film className="w-4 h-4 text-purple-500" />
            <span>Video Player</span>
          </button>
          <button onClick={() => { bringToFront('pdf'); setCurrentPdfFile('cv.pdf'); setIsPdfOpen(true); setIsPdfMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <FileText className="w-4 h-4 text-red-500" />
            <span>PDF Viewer (CV)</span>
          </button>
          <button onClick={() => { bringToFront('editor'); setIsEditorOpen(true); setIsEditorMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Text Editor (Gedit)</span>
          </button>
          <button onClick={() => { bringToFront('terminal'); setIsTermOpen(true); setIsTermMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <Terminal className="w-4 h-4 text-green-500" />
            <span>Terminal</span>
          </button>
          <button onClick={() => { bringToFront('settings'); setIsSettingsOpen(true); setIsSettingsMinimized(false); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left border-t border-gray-500/20 pt-2">
            <Settings className="w-4 h-4 text-gray-500" />
            <span>Settings</span>
          </button>
        </div>
      )}

      {/* Dock Bar Theme Matched to Light & Dark Mode */}
      <footer className={`absolute bottom-0 left-0 w-full h-10 border-t z-50 px-3 flex justify-between items-center text-xs backdrop-blur-md transition-colors ${
        isLightMode ? 'bg-[#e5e5e5]/95 border-gray-300 text-gray-800' : 'bg-[#111111]/95 border-[#222222] text-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <button onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} className="p-1.5 rounded hover:bg-black/10 transition-colors text-[#E95420]">
            <Grid className="w-4 h-4" />
          </button>

          {isWindowOpen && (
            <button 
              onClick={() => { bringToFront('files'); setIsWindowMinimized(!isWindowMinimized); }} 
              className={`flex items-center space-x-2 px-3 py-1 rounded border font-semibold transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-300 text-gray-800 shadow-sm' 
                  : 'bg-[#222222] border-[#333333] text-white'
              }`}
            >
              <Folder className="w-3.5 h-3.5 text-amber-500" />
              <span>Files</span>
            </button>
          )}

          {isBrowserOpen && (
            <button 
              onClick={() => { bringToFront('browser'); setIsBrowserMinimized(!isBrowserMinimized); }} 
              className={`flex items-center space-x-2 px-3 py-1 rounded border font-semibold transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-300 text-gray-800 shadow-sm' 
                  : 'bg-[#222222] border-[#333333] text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>Firefox</span>
            </button>
          )}

          {isTermOpen && (
            <button 
              onClick={() => { bringToFront('terminal'); setIsTermMinimized(!isTermMinimized); }} 
              className={`flex items-center space-x-2 px-3 py-1 rounded border font-semibold transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-300 text-gray-800 shadow-sm' 
                  : 'bg-[#222222] border-[#333333] text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-green-500" />
              <span>Terminal</span>
            </button>
          )}

          {isEditorOpen && (
            <button 
              onClick={() => { bringToFront('editor'); setIsEditorMinimized(!isEditorMinimized); }} 
              className={`flex items-center space-x-2 px-3 py-1 rounded border font-semibold transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-300 text-gray-800 shadow-sm' 
                  : 'bg-[#222222] border-[#333333] text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Editor</span>
            </button>
          )}

          {isPdfOpen && (
            <button 
              onClick={() => { bringToFront('pdf'); setIsPdfMinimized(!isPdfMinimized); }} 
              className={`flex items-center space-x-2 px-3 py-1 rounded border font-semibold transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-300 text-gray-800 shadow-sm' 
                  : 'bg-[#222222] border-[#333333] text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-red-500" />
              <span>PDF</span>
            </button>
          )}

          {isVideoOpen && (
            <button 
              onClick={() => { bringToFront('video'); setIsVideoMinimized(!isVideoMinimized); }} 
              className={`flex items-center space-x-2 px-3 py-1 rounded border font-semibold transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-300 text-gray-800 shadow-sm' 
                  : 'bg-[#222222] border-[#333333] text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span>Video</span>
            </button>
          )}

          {isContactOpen && (
            <button 
              onClick={() => { bringToFront('contact'); setIsContactMinimized(!isContactMinimized); }} 
              className={`flex items-center space-x-2 px-3 py-1 rounded border font-semibold transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-300 text-gray-800 shadow-sm' 
                  : 'bg-[#222222] border-[#333333] text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Contact</span>
            </button>
          )}

          {isSettingsOpen && (
            <button 
              onClick={() => { bringToFront('settings'); setIsSettingsMinimized(!isSettingsMinimized); }} 
              className={`flex items-center space-x-2 px-3 py-1 rounded border font-semibold transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-300 text-gray-800 shadow-sm' 
                  : 'bg-[#222222] border-[#333333] text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-gray-500" />
              <span>Settings</span>
            </button>
          )}
        </div>

        <div className="text-[11px] text-gray-500 font-mono">
          Ubuntu Desktop OS
        </div>
      </footer>
    </div>
  );
}