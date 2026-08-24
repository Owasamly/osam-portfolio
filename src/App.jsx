import React, { useEffect, useState, useRef } from 'react';
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
import useIsMobile from './hooks/useIsMobile';
import {
  Folder, FileText, Mail, Terminal, Wifi, Volume2, 
  VolumeX, Grid, Globe, Film, Settings
} from 'lucide-react';

function GitHubMark({ className = '' }) {
  return (
    <span className={`${className} inline-flex items-center justify-center rounded-full bg-slate-600/85 font-sans text-xs font-bold text-white shadow-sm`}>
      GH
    </span>
  );
}

function LinkedInMark({ className = '' }) {
  return (
    <span className={`${className} inline-flex items-center justify-center rounded-md bg-[#3977a8]/85 font-sans text-base font-bold leading-none text-white shadow-sm`}>
      in
    </span>
  );
}

function DesktopIcon({ item, onOpen, isLightMode, isMobile }) {
  const nodeRef = useRef(null);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const Icon = item.icon;

  return (
    <Draggable
      defaultPosition={isMobile ? item.mobilePos : item.defaultPos}
      nodeRef={nodeRef}
      onStart={(_event, data) => {
        dragStartX.current = data.x;
        dragStartY.current = data.y;
      }}
      onStop={(_event, data) => {
        const distance = Math.hypot(data.x - dragStartX.current, data.y - dragStartY.current);
        if (distance < 5) {
          onOpen(item.id);
        }
      }}
    >
      <div
        ref={nodeRef}
        className="absolute w-20 flex flex-col items-center justify-center p-2 rounded hover:bg-white/10 cursor-grab active:cursor-grabbing text-center space-y-1 group transition-colors select-none"
      >
        <Icon className={`w-10 h-10 ${item.color} filter drop-shadow group-hover:scale-105 transition-transform`} />
        <span className={`text-xs font-semibold ${isLightMode ? 'text-gray-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]' : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'}`}>
          {item.label}
        </span>
      </div>
    </Draggable>
  );
}

export default function App() {
  const isMobile = useIsMobile(768);

  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return ['system', 'light', 'dark'].includes(savedTheme) ? savedTheme : 'system';
  });
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const isLightMode = themeMode === 'system' ? !systemPrefersDark : themeMode === 'light';
  const [bgPreset, setBgPreset] = useState('#EFE2CF'); // Warm sand without the previous grey cast

  useEffect(() => {
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = (event) => setSystemPrefersDark(event.matches);

    setSystemPrefersDark(colorScheme.matches);
    colorScheme.addEventListener('change', syncSystemTheme);
    return () => colorScheme.removeEventListener('change', syncSystemTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', themeMode);
    document.documentElement.style.colorScheme = isLightMode ? 'light' : 'dark';
  }, [themeMode, isLightMode]);

  // Window visibility states
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const [isWindowMinimized, setIsWindowMinimized] = useState(false);

  const [isTermOpen, setIsTermOpen] = useState(false);
  const [isTermMinimized, setIsTermMinimized] = useState(false);
  const terminalScriptIdRef = useRef(0);
  const [terminalScriptRequest, setTerminalScriptRequest] = useState(null);

  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isPdfMinimized, setIsPdfMinimized] = useState(false);
  const [currentPdfFile, setCurrentPdfFile] = useState('docs/CV_EN.pdf');

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isEditorMinimized, setIsEditorMinimized] = useState(false);
  const [currentEditorFile, setCurrentEditorFile] = useState('whoami.sh');
  const [currentEditorContent, setCurrentEditorContent] = useState('');

  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const [isBrowserMinimized, setIsBrowserMinimized] = useState(false);
  const [browserUrl, setBrowserUrl] = useState('https://portfolio.local/security-research');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isContactMinimized, setIsContactMinimized] = useState(false);

  // Media Viewer State
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isMediaMinimized, setIsMediaMinimized] = useState(false);
  const [mediaState, setMediaState] = useState({
    src: '/devsecops_juice_shop/juice-shop-demo.mp4',
    title: 'Project Demo',
    type: 'video' // 'video' | 'image' | 'gif'
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSettingsMinimized, setIsSettingsMinimized] = useState(false);

  // Dynamic Window Depth Stacking (Z-Index)
  const [zIndices, setZIndices] = useState({
    files: 32,
    terminal: 30,
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

  const windowControls = {
    files: { isOpen: isWindowOpen, setIsMinimized: setIsWindowMinimized },
    terminal: { isOpen: isTermOpen, setIsMinimized: setIsTermMinimized },
    pdf: { isOpen: isPdfOpen, setIsMinimized: setIsPdfMinimized },
    editor: { isOpen: isEditorOpen, setIsMinimized: setIsEditorMinimized },
    browser: { isOpen: isBrowserOpen, setIsMinimized: setIsBrowserMinimized },
    contact: { isOpen: isContactOpen, setIsMinimized: setIsContactMinimized },
    media: { isOpen: isMediaOpen, setIsMinimized: setIsMediaMinimized },
    settings: { isOpen: isSettingsOpen, setIsMinimized: setIsSettingsMinimized },
  };

  const minimizeOtherWindows = (activeAppId) => {
    if (!isMobile) return;

    Object.entries(windowControls).forEach(([appId, control]) => {
      // Ignore 'files' so Dolphin stays open underneath on mobile!
      if (appId !== 'files' && appId !== activeAppId && control.isOpen) {
        control.setIsMinimized(true);
      }
    });
  };

  const focusWindow = (appId, setIsMinimized) => {
    minimizeOtherWindows(appId);
    setIsMinimized(false);
    bringToFront(appId);
  };

  const openWindow = (appId, setIsOpen, setIsMinimized, beforeOpen) => {
    minimizeOtherWindows(appId);
    // Removed minimizeOtherWindows(appId) so other windows (like Files) stay open underneath on mobile!
    if (beforeOpen) beforeOpen();
    setIsOpen(true);
    setIsMinimized(false);
    bringToFront(appId);
  };

  const toggleWindowMinimized = (appId, setIsMinimized, isMinimized) => {
    if (isMinimized) {
      minimizeOtherWindows(appId);
      setIsMinimized(false);
      bringToFront(appId);
      return;
    }

    setIsMinimized(true);
  };

  const [contextMenuPos, setContextMenuPos] = useState(null);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isBluetoothOn, setIsBluetoothOn] = useState(true);
  const [volume, setVolume] = useState(80);

  const [activeTab, setActiveTab] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const accentColor = '#C65D3B';

  const desktopIcons = [
    { id: 'about', label: 'Home', icon: Folder, color: 'text-amber-600', defaultPos: { x: 30, y: 30 }, mobilePos: { x: 12, y: 16 } },
    { id: 'projects', label: 'Projects', icon: Folder, color: 'text-amber-600', defaultPos: { x: 30, y: 130 }, mobilePos: { x: 12, y: 96 } },
    { id: 'cv', label: 'cv.pdf', icon: FileText, color: 'text-rose-600', defaultPos: { x: 30, y: 230 }, mobilePos: { x: 12, y: 176 } },
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'text-emerald-700', defaultPos: { x: 30, y: 330 }, mobilePos: { x: 12, y: 256 } },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'text-sky-700', defaultPos: { x: 30, y: 430 }, mobilePos: { x: 12, y: 336 } },
    { id: 'github', label: 'GitHub', icon: GitHubMark, color: 'text-slate-600', defaultPos: { x: 30, y: 530 }, mobilePos: { x: 12, y: 416 } },
    { id: 'linkedin', label: 'LinkedIn', icon: LinkedInMark, color: 'text-[#3977a8]', defaultPos: { x: 30, y: 630 }, mobilePos: { x: 12, y: 496 } },
  ];

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
  };

  const handleOpenApp = (appId) => {
    if (appId === 'terminal') {
      openWindow('terminal', setIsTermOpen, setIsTermMinimized);
    } else if (appId === 'cv' || appId === 'pdf') {
      openWindow('pdf', setIsPdfOpen, setIsPdfMinimized, () => setCurrentPdfFile('docs/CV_EN.pdf'));
    } else if (appId === 'editor') {
      openWindow('editor', setIsEditorOpen, setIsEditorMinimized);
    } else if (appId === 'video' || appId === 'media') {
      openWindow('media', setIsMediaOpen, setIsMediaMinimized);
    } else if (appId === 'settings') {
      openWindow('settings', setIsSettingsOpen, setIsSettingsMinimized);
    } else if (appId === 'files') {
      openWindow('files', setIsWindowOpen, setIsWindowMinimized);
    } else if (appId === 'browser') {
      openWindow('browser', setIsBrowserOpen, setIsBrowserMinimized);
    } else if (appId === 'contact') {
      openWindow('contact', setIsContactOpen, setIsContactMinimized);
    }
  };

  const openMediaViewer = (title, src, type = 'image') => {
    openWindow('media', setIsMediaOpen, setIsMediaMinimized, () => setMediaState({ title, src, type }));
  };

  const handleIconOpen = (id) => {
    if (id === 'terminal') {
      openWindow('terminal', setIsTermOpen, setIsTermMinimized);
    } else if (id === 'cv') {
      openWindow('pdf', setIsPdfOpen, setIsPdfMinimized, () => setCurrentPdfFile('docs/CV_EN.pdf'));
    } else if (id === 'contact') {
      openWindow('contact', setIsContactOpen, setIsContactMinimized);
    } else if (id === 'github') {
      openWindow('browser', setIsBrowserOpen, setIsBrowserMinimized, () => setBrowserUrl('https://github.com/Owasamly'));
    } else if (id === 'linkedin') {
      openWindow('browser', setIsBrowserOpen, setIsBrowserMinimized, () => setBrowserUrl('https://www.linkedin.com/in/osama-nurhussen/'));
    } else {
      openWindow('files', setIsWindowOpen, setIsWindowMinimized, () => setActiveTab(id));
    }
  };

  return (
    <div 
  onContextMenu={handleContextMenu}
  onClick={() => {
    setContextMenuPos(null);
    setIsMenuOpen(false); // Add this to close the start menu on outside clicks
  }}
  className={`fixed inset-0 w-full h-[100dvh] overflow-hidden overscroll-none touch-none select-none font-mono transition-colors duration-500 ${
    isLightMode ? 'text-gray-900' : 'text-gray-200'
  }`}
>
      {/* 1. Canvas Background dynamically updates when bgPreset changes */}
      <ParticleBackground bgPreset={isLightMode ? bgPreset : '#2C001E'} />

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
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        onOpenSettings={() => {
          setIsQuickSettingsOpen(false);
          handleOpenApp('settings');
        }}
      />

      {!isMobile && (
        <SystemMonitorWindow currentAccent={accentColor} isWidgetMode={true} isLightMode={isLightMode} isMobile={isMobile} />
      )}

      <div className="relative z-10 pt-8">
        {desktopIcons.map((item) => (
  <DesktopIcon
    key={item.id}
    item={item}
    onOpen={handleIconOpen}
    isLightMode={isLightMode}
    isMobile={isMobile}
  />
))}
      </div>

      {/* 2. Settings Window linked directly to bgPreset */}
      <SettingsWindow
        isOpen={isSettingsOpen}
        isMinimized={isSettingsMinimized}
        onClose={() => setIsSettingsOpen(false)}
        onMinimize={() => toggleWindowMinimized('settings', setIsSettingsMinimized, isSettingsMinimized)}
        onFocus={() => focusWindow('settings', setIsSettingsMinimized)}
        isLightMode={isLightMode}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        bgPreset={bgPreset}
        setBgPreset={setBgPreset}
        zIndex={zIndices.settings}
        isMobile={isMobile}
      />

     <DolphinWindow
        isOpen={isWindowOpen}
        isMinimized={isWindowMinimized}
        onClose={() => setIsWindowOpen(false)}
        onMinimize={() => toggleWindowMinimized('files', setIsWindowMinimized, isWindowMinimized)}
        onFocus={() => focusWindow('files', setIsWindowMinimized)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLightMode={isLightMode}
        zIndex={zIndices.files}
        isMobile={isMobile}
        onFileOpen={(fileName) => {
          setCurrentPdfFile(fileName);
          openWindow('pdf', setIsPdfOpen, setIsPdfMinimized);
        }}
        onTextEditorOpen={(fileName, fileContent) => {
          setCurrentEditorFile(fileName);
          setCurrentEditorContent(fileContent);
          openWindow('editor', setIsEditorOpen, setIsEditorMinimized);
        }}
        onTerminalOpen={(scriptName) => {
          if (scriptName) {
            terminalScriptIdRef.current += 1;
            setTerminalScriptRequest({ name: scriptName, id: terminalScriptIdRef.current });
          }
          openWindow('terminal', setIsTermOpen, setIsTermMinimized);
        }}
        onBrowserOpen={(url) => {
          openWindow('browser', setIsBrowserOpen, setIsBrowserMinimized, () => setBrowserUrl(url));
        }}
        onMediaOpen={(title, src, type) => {
          openMediaViewer(title, src, type);
        }}
        onContactOpen={() => {
          openWindow('contact', setIsContactOpen, setIsContactMinimized);
        }}
      />

      <PdfViewerWindow
        isOpen={isPdfOpen}
        isMinimized={isPdfMinimized}
        onClose={() => setIsPdfOpen(false)}
        onMinimize={() => toggleWindowMinimized('pdf', setIsPdfMinimized, isPdfMinimized)}
        onFocus={() => focusWindow('pdf', setIsPdfMinimized)}
        pdfFile={currentPdfFile}
        isLightMode={isLightMode}
        zIndex={zIndices.pdf}
        isMobile={isMobile}
      />

      <TextEditorWindow
        isOpen={isEditorOpen}
        isMinimized={isEditorMinimized}
        onClose={() => setIsEditorOpen(false)}
        onMinimize={() => toggleWindowMinimized('editor', setIsEditorMinimized, isEditorMinimized)}
        onFocus={() => focusWindow('editor', setIsEditorMinimized)}
        fileName={currentEditorFile}
        fileContent={currentEditorContent}
        currentAccent={accentColor}
        isLightMode={isLightMode}
        zIndex={zIndices.editor}
        isMobile={isMobile}
      />

      <TerminalWindow
        isOpen={isTermOpen}
        isMinimized={isTermMinimized}
        onClose={() => setIsTermOpen(false)}
        onMinimize={() => toggleWindowMinimized('terminal', setIsTermMinimized, isTermMinimized)}
        onFocus={() => focusWindow('terminal', setIsTermMinimized)}
        scriptRequest={terminalScriptRequest}
        onOpenFiles={(tab) => {
          openWindow('files', setIsWindowOpen, setIsWindowMinimized, () => setActiveTab(tab));
        }}
        onOpenBrowser={(url) => {
          openWindow('browser', setIsBrowserOpen, setIsBrowserMinimized, () => setBrowserUrl(url));
        }}
        onOpenPdf={(fileName) => {
          openWindow('pdf', setIsPdfOpen, setIsPdfMinimized, () => setCurrentPdfFile(fileName));
        }}
        onOpenContact={() => {
          openWindow('contact', setIsContactOpen, setIsContactMinimized);
        }}
        isLightMode={isLightMode}
        zIndex={zIndices.terminal}
        isMobile={isMobile}
      />

      <BrowserWindow
        isOpen={isBrowserOpen}
        isMinimized={isBrowserMinimized}
        onClose={() => setIsBrowserOpen(false)}
        onMinimize={() => toggleWindowMinimized('browser', setIsBrowserMinimized, isBrowserMinimized)}
        onFocus={() => focusWindow('browser', setIsBrowserMinimized)}
        initialUrl={browserUrl}
        currentAccent={accentColor}
        isLightMode={isLightMode}
        zIndex={zIndices.browser}
        isMobile={isMobile}
      />

      <ContactWindow
        isOpen={isContactOpen}
        isMinimized={isContactMinimized}
        onClose={() => setIsContactOpen(false)}
        onMinimize={() => toggleWindowMinimized('contact', setIsContactMinimized, isContactMinimized)}
        onFocus={() => focusWindow('contact', setIsContactMinimized)}
        currentAccent={accentColor}
        isLightMode={isLightMode}
        zIndex={zIndices.contact}
        isMobile={isMobile}
      />

      {/* 3. Media Viewer Window Integrated */}
      <MediaViewerWindow
        isOpen={isMediaOpen}
        isMinimized={isMediaMinimized}
        onClose={() => setIsMediaOpen(false)}
        onMinimize={() => toggleWindowMinimized('media', setIsMediaMinimized, isMediaMinimized)}
        onFocus={() => focusWindow('media', setIsMediaMinimized)}
        mediaTitle={mediaState.title}
        mediaSrc={mediaState.src}
        mediaType={mediaState.type}
        currentAccent={accentColor}
        isLightMode={isLightMode}
        zIndex={zIndices.media}
        isMobile={isMobile}
      />

      {/* Start Menu Launcher */}
      {isMenuOpen && (
        
        
        <div
        onClick={(e) => e.stopPropagation()} className={`absolute bottom-16 left-2 w-64 rounded-t-lg border shadow-2xl z-50 p-2 text-xs space-y-1 backdrop-blur-md ${
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
          <button onClick={() => { openMediaViewer('DevSecOps Pipeline Demo', '/devsecops_juice_shop/juice-shop-demo.mp4', 'video'); setIsMenuOpen(false); }} className="w-full flex items-center space-x-2 p-2 hover:bg-[#E95420]/20 rounded text-left">
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
      <footer className={`fixed left-0 w-full border-t z-50 backdrop-blur-md transition-colors ${
  isMobile ? 'bottom-0 h-auto min-h-[4rem] px-2 py-2 pb-[env(safe-area-inset-bottom)] flex flex-row items-center justify-between overflow-x-auto overflow-y-hidden flex-shrink-0' : 'bottom-0 h-10 px-3 flex justify-between items-center'
} ${
  isLightMode ? 'bg-[#e5e5e5]/95 border-gray-300 text-gray-800' : 'bg-[#111111]/95 border-[#222222] text-gray-200'
}`}>
        <div className={`flex items-center space-x-3 ${isMobile ? 'overflow-x-auto overflow-y-hidden flex-shrink-0' : ''}`}>
          <button onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} className="p-1.5 rounded hover:bg-black/10 transition-colors text-[#E95420]">
            <Grid className="w-4 h-4" />
          </button>

          {isWindowOpen && (
            <button 
              onClick={() => toggleWindowMinimized('files', setIsWindowMinimized, isWindowMinimized)} 
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
              onClick={() => toggleWindowMinimized('browser', setIsBrowserMinimized, isBrowserMinimized)} 
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
              onClick={() => toggleWindowMinimized('terminal', setIsTermMinimized, isTermMinimized)} 
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
              onClick={() => toggleWindowMinimized('editor', setIsEditorMinimized, isEditorMinimized)} 
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
              onClick={() => toggleWindowMinimized('pdf', setIsPdfMinimized, isPdfMinimized)} 
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
              onClick={() => toggleWindowMinimized('media', setIsMediaMinimized, isMediaMinimized)} 
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
              onClick={() => toggleWindowMinimized('contact', setIsContactMinimized, isContactMinimized)} 
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
              onClick={() => toggleWindowMinimized('settings', setIsSettingsMinimized, isSettingsMinimized)} 
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

      </footer>
    </div>
  );
}
