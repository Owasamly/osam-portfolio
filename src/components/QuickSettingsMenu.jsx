import React, { useState } from 'react';
import { Wifi, Volume2, VolumeX, Sun, Moon, Bluetooth, Shield, Power } from 'lucide-react';

export default function QuickSettingsMenu({ 
  isOpen, 
  onClose, 
  currentAccent = '#77216F', 
  isWifiOn, 
  setIsWifiOn, 
  isBluetoothOn, 
  setIsBluetoothOn, 
  volume, 
  setVolume,
  isLightMode = false,
  setIsLightMode,
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [brightness, setBrightness] = useState(100);

  if (!isOpen) return null;

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-transparent" />

      <div className={`absolute top-9 right-3 w-80 backdrop-blur-xl border rounded-2xl shadow-2xl z-50 p-4 font-mono text-xs space-y-4 select-none animate-in fade-in zoom-in-95 duration-150 ${
        isLightMode 
          ? 'bg-white/95 border-gray-300 text-gray-800' 
          : 'bg-[#1e1e1e]/95 border-[#333333] text-gray-200'
      }`}>
        
        {/* Quick Toggles Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Wi-Fi Toggle */}
          <button 
            onClick={() => setIsWifiOn(!isWifiOn)}
            className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${
              isWifiOn 
                ? isLightMode 
                  ? 'bg-gray-100 border-gray-300 text-gray-900 shadow-sm' 
                  : 'bg-[#2a2a2a] border-[#3d3d3d] text-white shadow-sm'
                : isLightMode 
                  ? 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100' 
                  : 'bg-[#141414] border-[#282828] text-gray-500 hover:bg-[#1f1f1f]'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              isWifiOn 
                ? isLightMode ? 'bg-white shadow-xs' : 'bg-[#1e1e1e] shadow-xs' 
                : isLightMode ? 'bg-gray-200/50' : 'bg-[#252525]'
            }`}>
              <Wifi className="w-4 h-4" style={{ color: isWifiOn ? currentAccent : 'inherit' }} />
            </div>
            <div className="text-left truncate">
              <div className="font-bold text-[11px] truncate">Wi-Fi</div>
              <div className={`text-[10px] truncate ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>{isWifiOn ? 'Munich-Fiber' : 'Off'}</div>
            </div>
          </button>

          {/* Bluetooth Toggle */}
          <button 
            onClick={() => setIsBluetoothOn(!isBluetoothOn)}
            className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${
              isBluetoothOn 
                ? isLightMode 
                  ? 'bg-gray-100 border-gray-300 text-gray-900 shadow-sm' 
                  : 'bg-[#2a2a2a] border-[#3d3d3d] text-white shadow-sm'
                : isLightMode 
                  ? 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100' 
                  : 'bg-[#141414] border-[#282828] text-gray-500 hover:bg-[#1f1f1f]'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              isBluetoothOn 
                ? isLightMode ? 'bg-white shadow-xs' : 'bg-[#1e1e1e] shadow-xs' 
                : isLightMode ? 'bg-gray-200/50' : 'bg-[#252525]'
            }`}>
              <Bluetooth className="w-4 h-4" style={{ color: isBluetoothOn ? currentAccent : 'inherit' }} />
            </div>
            <div className="text-left truncate">
              <div className="font-bold text-[11px] truncate">Bluetooth</div>
              <div className={`text-[10px] truncate ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>{isBluetoothOn ? 'Connected' : 'Off'}</div>
            </div>
          </button>

          {/* Appearance Toggle */}
          <button
            onClick={() => setIsLightMode?.(!isLightMode)}
            aria-pressed={!isLightMode}
            className={`col-span-2 flex items-center justify-between gap-3 rounded-xl border p-3 transition-all ${
              isLightMode
                ? 'bg-gray-100 border-gray-300 text-gray-900 shadow-sm'
                : 'bg-[#2a2a2a] border-[#3d3d3d] text-white shadow-sm'
            }`}
          >
            <div className="flex min-w-0 items-center space-x-3">
              <div className={`rounded-lg p-2 ${isLightMode ? 'bg-white shadow-xs' : 'bg-[#1e1e1e] shadow-xs'}`}>
                {isLightMode
                  ? <Sun className="h-4 w-4" style={{ color: currentAccent }} />
                  : <Moon className="h-4 w-4" style={{ color: currentAccent }} />}
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold">Appearance</div>
                <div className={`text-[10px] ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {isLightMode ? 'Light mode' : 'Dark mode'}
                </div>
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${
              isLightMode ? 'bg-white text-gray-600' : 'bg-[#141414] text-gray-300'
            }`}>
              Switch to {isLightMode ? 'dark' : 'light'}
            </span>
          </button>
        </div>

        {/* Sliders Section */}
        <div className={`border rounded-xl p-3 space-y-3 ${
          isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-[#141414] border-[#2d2d2d]'
        }`}>
          {/* Volume Slider */}
          <div className="space-y-1">
            <div className={`flex justify-between items-center text-[11px] ${isLightMode ? 'text-gray-700' : 'text-gray-300'}`}>
              <div className="flex items-center space-x-2">
                <button onClick={toggleMute} className="hover:opacity-75 transition-opacity">
                  {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5" style={{ color: currentAccent }} />}
                </button>
                <span>Volume</span>
              </div>
              <span className={isLightMode ? 'text-gray-500' : 'text-gray-400'}>{isMuted ? '0%' : `${volume}%`}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={isMuted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); if(isMuted) setIsMuted(false); }}
              className="quick-settings-slider w-full cursor-pointer"
              style={{
                '--slider-accent': currentAccent,
                '--slider-progress': `${isMuted ? 0 : volume}%`,
                '--slider-track': isLightMode ? '#e5e7eb' : '#374151',
              }}
            />
          </div>

          {/* Brightness Slider */}
          <div className="space-y-1">
            <div className={`flex justify-between items-center text-[11px] ${isLightMode ? 'text-gray-700' : 'text-gray-300'}`}>
              <div className="flex items-center space-x-2">
                <Sun className="w-3.5 h-3.5" style={{ color: currentAccent }} />
                <span>Brightness</span>
              </div>
              <span className={isLightMode ? 'text-gray-500' : 'text-gray-400'}>{brightness}%</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="quick-settings-slider w-full cursor-pointer"
              style={{
                '--slider-accent': currentAccent,
                '--slider-progress': `${((brightness - 20) / 80) * 100}%`,
                '--slider-track': isLightMode ? '#e5e7eb' : '#374151',
              }}
            />
          </div>
        </div>

        {/* System Status Footers */}
        <div className={`pt-1 flex justify-between items-center text-[10px] px-1 ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
          <div className="flex items-center space-x-1.5">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span>Secure Boot Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => window.location.reload()} 
              title="Restart System" 
              className={`p-1.5 rounded-lg transition-colors border ${
                isLightMode 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300' 
                  : 'bg-[#282828] hover:bg-[#333333] text-gray-200 border-[#3d3d3d]'
              }`}
            >
              <Power className="w-3 h-3 text-red-500" />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
