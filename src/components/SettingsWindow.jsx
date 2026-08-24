import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Settings, X, Minus, Palette, Monitor, Sun, Moon } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

export default function SettingsWindow({ 
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize,
  isLightMode,
  themeMode = 'system',
  setThemeMode,
  bgPreset,
  setBgPreset,
  onFocus,
  zIndex = 40
}) {
  const nodeRef = useRef(null);
  const isMobile = useIsMobile(768);
  const [activeTab, setActiveTab] = useState('appearance');

  if (!isOpen || isMinimized) return null;

  const wallPapers = [
    { id: 'jammy-jellyfish', name: 'Jammy Dark Purple', color: '#2C001E' },
    { id: 'dark-space', name: 'Deep Space Black', color: '#0d1117' },
    { id: 'baltic-blue', name: 'Baltic Slate Blue', color: '#0f2027' },
    { id: 'nord-night', name: 'Nordic Dark Cyan', color: '#1a2332' },
  ];

  return (
    <Draggable handle=".settings-header" nodeRef={nodeRef} disabled={isMobile}>
      <div 
        ref={nodeRef} 
        onMouseDownCapture={onFocus}
        onPointerDownCapture={onFocus}
        style={{ zIndex: isMobile ? 100 : zIndex }}
        className={`desktop-window-resizable border shadow-2xl flex flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isMobile ? 'fixed inset-0 w-full h-[100dvh] rounded-none' : 'absolute top-20 left-1/3 w-[520px] rounded-t-lg'
        } ${
          isLightMode ? 'bg-[#f4f4f4] text-gray-800 border-gray-300' : 'bg-[#1e1e1e]/95 text-gray-200 border-[#333333]'
        }`}
      >
        {/* Header */}
        <div 
          onMouseDown={onFocus}
          onPointerDown={onFocus}
          className={`settings-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
            isLightMode ? 'bg-[#e5e5e5] border-gray-300 text-gray-900' : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold">
            <Settings className="w-4 h-4 text-[#E95420]" />
            <span>Settings — GNOME Control Center</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={onMinimize} className={`rounded-full bg-[#333333] hover:bg-[#444444] text-gray-300 flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'}`}>
              <Minus className="w-3 h-3" />
            </button>
            <button onClick={onClose} className={`rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'}`}>
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex h-[360px]">
          {/* Sidebar */}
          <div className={`w-40 border-r p-2 space-y-1 ${
            isLightMode ? 'bg-[#e9e9e9] border-gray-300' : 'bg-[#121212] border-[#262626]'
          }`}>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded font-semibold text-left transition-colors ${
                activeTab === 'appearance' 
                  ? 'bg-[#E95420] text-white' 
                  : isLightMode ? 'text-gray-700 hover:bg-black/5' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Appearance</span>
            </button>
            <button
              onClick={() => setActiveTab('background')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded font-semibold text-left transition-colors ${
                activeTab === 'background' 
                  ? 'bg-[#E95420] text-white' 
                  : isLightMode ? 'text-gray-700 hover:bg-black/5' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Wallpaper Color</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-5 space-y-5 overflow-y-auto">
            {activeTab === 'appearance' && (
              <div>
                <h3 className="text-xs font-bold mb-1">Global System Theme</h3>
                <p className="text-[11px] text-gray-500 mb-3">Applies light or dark mode across all windows and menus.</p>
                
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setThemeMode('system')}
                    className={`p-4 rounded-lg border flex flex-col items-center justify-center space-y-2 transition-all ${
                      themeMode === 'system' ? 'border-[#E95420] bg-[#E95420]/10 font-bold ring-1 ring-[#E95420]' : isLightMode ? 'border-gray-300 bg-gray-200 text-gray-700' : 'border-[#333333] bg-[#181818] text-gray-400'
                    }`}
                  >
                    <Monitor className="w-5 h-5 text-[#E95420]" />
                    <span>System</span>
                  </button>
                  <button
                    onClick={() => setThemeMode('dark')}
                    className={`p-4 rounded-lg border flex flex-col items-center justify-center space-y-2 transition-all ${
                      themeMode === 'dark' ? 'border-[#E95420] bg-black/40 text-white font-bold ring-1 ring-[#E95420]' : isLightMode ? 'border-gray-300 bg-gray-200 text-gray-700' : 'border-[#333333] bg-[#181818] text-gray-400'
                    }`}
                  >
                    <Moon className="w-5 h-5 text-purple-400" />
                    <span>Dark Yaru</span>
                  </button>
                  <button
                    onClick={() => setThemeMode('light')}
                    className={`p-4 rounded-lg border flex flex-col items-center justify-center space-y-2 transition-all ${
                      themeMode === 'light' ? 'border-[#E95420] bg-white text-gray-900 font-bold shadow ring-1 ring-[#E95420]' : isLightMode ? 'border-gray-300 bg-gray-200 text-gray-700' : 'border-[#333333] bg-[#181818] text-gray-400'
                    }`}
                  >
                    <Sun className="w-5 h-5 text-amber-500" />
                    <span>Light Mode</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'background' && (
              <div>
                <h3 className="text-xs font-bold mb-1">Desktop Wallpaper Color</h3>
                <p className="text-[11px] text-gray-500 mb-3">Select system background gradients and colors.</p>
                
                <div className="space-y-2">
                  {wallPapers.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => setBgPreset(bg.color)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                        bgPreset === bg.color 
                          ? 'border-[#E95420] ring-1 ring-[#E95420] bg-[#E95420]/10 font-bold' 
                          : isLightMode ? 'border-gray-300 bg-white hover:bg-gray-50' : 'border-[#2b2b2b] bg-[#181818] hover:bg-[#222222]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded border border-white/20 shadow" style={{ backgroundColor: bg.color }} />
                        <span>{bg.name}</span>
                      </div>
                      {bgPreset === bg.color && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#E95420] text-white">Active</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
