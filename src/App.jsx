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
import MediaViewerWindow from './components/MediaViewerWindow';
import QuickSettingsMenu from './components/QuickSettingsMenu';
import SettingsWindow from './components/SettingsWindow';
import ContextMenu from './components/ContextMenu';
import { 
  Folder, FileText, Mail, Terminal, Wifi, Volume2, 
  VolumeX, Grid, Globe, Film, Settings, Image as ImageIcon, Sparkles 
} from 'lucide-react';

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
  // Global Appearance State (Jammy Dark Purple default)
  const [isLightMode, setIsLightMode] = useState(false);
  const [bgPreset, setBgPreset] = useState('#2C001E'); // Passed into ParticleBackground

  // Window visibility states
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

  // Media Viewer State
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isMediaMinimized, setIsMediaMinimized] = useState(false);
  const [mediaState, setMediaState] = useState({
    src: '/demo.mp4',
    title: 'Project Demo',
    type: 'video' // 'video' | 'image' | 'gif'
  });

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
    media: 25,
    settings: 32,
    monitor: 20
  });

  const bringToFront = (appId) => {
    setZIndices(prev => {
      const highest = Math.max(...Object.values(prev));
      if (prev[appId] === highest) return prev;
      return { ...prev, [appId]: highest + 1 };
    });
  };

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
    } else if (appId === 'video' || appId === 'media') {
      setIsMediaOpen(true);
      setIsMediaMinimized(false);
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

  const openMediaViewer = (title, src, type = 'image') => {
    setMediaState({ title, src, type });
    setIsMediaOpen(true);
    setIsMediaMinimized(false);
    bringToFront('media');
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
      {/* 1. Canvas Background dynamically updates when bgPreset changes */}
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

        <div className="flex items-center space-x-3">
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

      {/* 2. Settings Window linked directly to bgPreset */}
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
        zIndex={zIndices.settings}
      />

      <DolphinWindow
        isOpen={isWindowOpen}
        isMinimized={isWindowMinimized}
        onClose={() => setIsWindowOpen(false)}
        onMinimize={() => setIsWindowMinimized(!isWindowMinimized)}
        onFocus={() => bringToFront('files')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLightMode={isLightMode}
        zIndex={zIndices.files}
      />

      <PdfViewerWindow
        isOpen={isPdfOpen}
        isMinimized={isPdfMinimized}
        onClose={() => setIsPdfOpen(false)}
        onMinimize={() => setIsPdfMinimized(!isPdfMinimized)}
        onFocus={() => bringToFront('pdf')}
        pdfFile={currentPdfFile}
        isLightMode={isLightMode}
        zIndex={zIndices.pdf}
      />

      <TextEditorWindow
        isOpen={isEditorOpen}
        isMinimized={isEditorMinimized}
        onClose={() => setIsEditorOpen(false)}
        onMinimize={() => setIsEditorMinimized(!isEditorMinimized)}
        onFocus={() => bringToFront('editor')}
        fileName={currentEditorFile}
        currentAccent={accentColor}
        isLightMode={isLightMode}
        zIndex={zIndices.editor}
      />

      <TerminalWindow
        isOpen={isTermOpen}
        isMinimized={isTermMinimized}
        onClose={() => setIsTermOpen(false)}
        onMinimize={() => setIsTermMinimized(!isTermMinimized)}
        onFocus={() => bringToFront('terminal')}
        isLightMode={isLightMode}
        zIndex={zIndices.terminal}
      />

      <BrowserWindow
        isOpen={isBrowserOpen}
        isMinimized={isBrowserMinimized}
        onClose={() => setIsBrowserOpen(false)}
        onMinimize={() => setIsBrowserMinimized(!isBrowserMinimized)}
        onFocus={() => bringToFront('browser')}
        currentAccent={accentColor}
        isLightMode={isLightMode}
        zIndex={zIndices.browser}
      />

      <ContactWindow
        isOpen={isContactOpen}
        isMinimized={isContactMinimized}
        onClose={() => setIsContactOpen(false)}
        onMinimize={() => setIsContactMinimized(!isContactMinimized)}
        onFocus={() => bringToFront('contact')}
        currentAccent={accentColor}
        isLightMode={isLightMode}
        zIndex={zIndices.contact}
      />

      {/* 3. Media Viewer Window Integrated */}
      <MediaViewerWindow
        isOpen={isMediaOpen}
        isMinimized={isMediaMinimized}
        onClose={() => setIsMediaOpen(false)}
        onMinimize={() => setIsMediaMinimized(!isMediaMinimized)}
        onFocus={() => bringToFront('media')}
        mediaTitle={mediaState.title}
        mediaSrc={mediaState.src}
        mediaType={mediaState.type}
        currentAccent={accentColor}
        isLightMode={isLightMode}
        zIndex={zIndices.media}
      />

      {/* Start Menu Launcher */}
      {isMenuOpen && (
        <div className={`absolute bottom-12 left-2 w-64 rounded-t-lg border shadow-2xl z-50 p-2 text-xs space-y-1 backdrop-blur-md ${
          isLightMode ? 'bg-[#f4f4f4]/95 border-gray-300 text-gray-800' : 'bg-[#111111]/95 border-[#333333] text-gray-200'
        }`}>
          <div className="p-2 font-bold border-b border-gray-500/20 uppercase tracking-wider text-[10px] text-[#E95420]">
            Ubuntu Applications
          </div>
          <button onClick={() => { handleOpenApp('files'); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <Folder className="w-4 h-4 text-amber-500" />
            <span>Files</span>
          </button>
          <button onClick={() => { handleOpenApp('browser'); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <Globe className="w-4 h-4 text-blue-500" />
            <span>Firefox Browser</span>
          </button>
          <button onClick={() => { handleOpenApp('contact'); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <Mail className="w-4 h-4 text-sky-500" />
            <span>Contact Mail</span>
          </button>
          <button onClick={() => { openMediaViewer('Research Demo', '/demo.mp4', 'video'); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <Film className="w-4 h-4 text-purple-500" />
            <span>Media Player</span>
          </button>
          <button onClick={() => { handleOpenApp('cv'); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <FileText className="w-4 h-4 text-red-500" />
            <span>PDF Viewer (CV)</span>
          </button>
          <button onClick={() => { handleOpenApp('editor'); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Text Editor</span>
          </button>
          <button onClick={() => { handleOpenApp('terminal'); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
            <Terminal className="w-4 h-4 text-green-500" />
            <span>Terminal</span>
          </button>
          <button onClick={() => { handleOpenApp('settings'); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left border-t border-gray-500/20 pt-2">
            <Settings className="w-4 h-4 text-gray-500" />
            <span>Settings</span>
          </button>
        </div>
      )}

      {/* Dock Bar */}
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

          {isMediaOpen && (
            <button 
              onClick={() => { bringToFront('media'); setIsMediaMinimized(!isMediaMinimized); }} 
              className={`flex items-center space-x-2 px-3 py-1 rounded border font-semibold transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-300 text-gray-800 shadow-sm' 
                  : 'bg-[#222222] border-[#333333] text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span>Media Viewer</span>
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