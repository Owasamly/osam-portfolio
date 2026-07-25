import React, { useState } from 'react';
import { Wifi, Volume2, VolumeX, Sun, Bluetooth, Shield, Power, Moon, Sliders } from 'lucide-react';

export default function QuickSettingsMenu({ isOpen, onClose, currentAccent, isWifiOn, setIsWifiOn, isBluetoothOn, setIsBluetoothOn, volume, setVolume }) {
  if (!isOpen) return null;

  const [isMuted, setIsMuted] = useState(false);
  const [brightness, setBrightness] = useState(100);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Backdrop to close when clicking outside */}
      <div onClick={onClose} className="fixed inset-0 z-40 bg-transparent" />

      {/* GNOME Quick Settings Dropdown */}
      <div className="absolute top-9 right-3 w-80 bg-[#181818]/95 backdrop-blur-xl border border-[#333333] rounded-2xl shadow-2xl z-50 p-4 font-mono text-xs text-gray-200 space-y-4 select-none animate-in fade-in zoom-in-95 duration-150">
        
        {/* Quick Toggles Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Wi-Fi Toggle */}
          <button 
            onClick={() => setIsWifiOn(!isWifiOn)}
            className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${isWifiOn ? 'bg-[#282828] border-gray-600 text-white shadow-md' : 'bg-[#1e1e1e] border-[#2b2b2b] text-gray-400 hover:bg-[#242424]'}`}
          >
            <div className={`p-2 rounded-lg ${isWifiOn ? 'bg-white/10' : 'bg-white/5'}`}>
              <Wifi className="w-4 h-4" style={{ color: isWifiOn ? currentAccent : 'inherit' }} />
            </div>
            <div className="text-left truncate">
              <div className="font-bold text-[11px] truncate">Wi-Fi</div>
              <div className="text-[10px] text-gray-400 truncate">{isWifiOn ? 'Munich-Fiber' : 'Off'}</div>
            </div>
          </button>

          {/* Bluetooth Toggle */}
          <button 
            onClick={() => setIsBluetoothOn(!isBluetoothOn)}
            className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${isBluetoothOn ? 'bg-[#282828] border-gray-600 text-white shadow-md' : 'bg-[#1e1e1e] border-[#2b2b2b] text-gray-400 hover:bg-[#242424]'}`}
          >
            <div className={`p-2 rounded-lg ${isBluetoothOn ? 'bg-white/10' : 'bg-white/5'}`}>
              <Bluetooth className="w-4 h-4" style={{ color: isBluetoothOn ? currentAccent : 'inherit' }} />
            </div>
            <div className="text-left truncate">
              <div className="font-bold text-[11px] truncate">Bluetooth</div>
              <div className="text-[10px] text-gray-400 truncate">{isBluetoothOn ? 'Connected' : 'Off'}</div>
            </div>
          </button>
        </div>

        {/* Sliders Section (Volume & Brightness) */}
        <div className="bg-[#121212] border border-[#2b2b2b] rounded-xl p-3 space-y-3">
          {/* Volume Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] text-gray-300">
              <div className="flex items-center space-x-2">
                <button onClick={toggleMute} className="hover:text-white transition-colors">
                  {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" style={{ color: currentAccent }} />}
                </button>
                <span>Volume</span>
              </div>
              <span className="text-gray-400">{isMuted ? '0%' : `${volume}%`}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={isMuted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); if(isMuted) setIsMuted(false); }}
              className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer accent-current"
              style={{ accentColor: currentAccent }}
            />
          </div>

          {/* Brightness Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] text-gray-300">
              <div className="flex items-center space-x-2">
                <Sun className="w-3.5 h-3.5" style={{ color: currentAccent }} />
                <span>Brightness</span>
              </div>
              <span className="text-gray-400">{brightness}%</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: currentAccent }}
            />
          </div>
        </div>

        {/* System Status Footers */}
        <div className="pt-1 flex justify-between items-center text-[10px] text-gray-400 px-1">
          <div className="flex items-center space-x-1.5">
            <Shield className="w-3 h-3 text-green-400" />
            <span>Secure Boot Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => window.location.reload()} title="Restart System" className="p-1.5 rounded-lg bg-[#222222] hover:bg-[#333333] text-gray-300 transition-colors">
              <Power className="w-3 h-3 text-red-400" />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}