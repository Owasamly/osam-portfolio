import React, { useState } from 'react';
import { Wifi, Volume2, VolumeX, Sun, Bluetooth, Shield, Power } from 'lucide-react';

export default function QuickSettingsMenu({ isOpen, onClose, currentAccent = '#77216F', isWifiOn, setIsWifiOn, isBluetoothOn, setIsBluetoothOn, volume, setVolume }) {
  if (!isOpen) return null;

  const [isMuted, setIsMuted] = useState(false);
  const [brightness, setBrightness] = useState(100);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-transparent" />

      <div className="absolute top-9 right-3 w-80 bg-white/95 backdrop-blur-xl border border-gray-300 rounded-2xl shadow-2xl z-50 p-4 font-mono text-xs text-gray-800 space-y-4 select-none animate-in fade-in zoom-in-95 duration-150">
        
        {/* Quick Toggles Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Wi-Fi Toggle */}
          <button 
            onClick={() => setIsWifiOn(!isWifiOn)}
            className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${isWifiOn ? 'bg-gray-100 border-gray-300 text-gray-900 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'}`}
          >
            <div className={`p-2 rounded-lg ${isWifiOn ? 'bg-white shadow-xs' : 'bg-gray-200/50'}`}>
              <Wifi className="w-4 h-4" style={{ color: isWifiOn ? currentAccent : 'inherit' }} />
            </div>
            <div className="text-left truncate">
              <div className="font-bold text-[11px] truncate">Wi-Fi</div>
              <div className="text-[10px] text-gray-500 truncate">{isWifiOn ? 'Munich-Fiber' : 'Off'}</div>
            </div>
          </button>

          {/* Bluetooth Toggle */}
          <button 
            onClick={() => setIsBluetoothOn(!isBluetoothOn)}
            className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${isBluetoothOn ? 'bg-gray-100 border-gray-300 text-gray-900 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'}`}
          >
            <div className={`p-2 rounded-lg ${isBluetoothOn ? 'bg-white shadow-xs' : 'bg-gray-200/50'}`}>
              <Bluetooth className="w-4 h-4" style={{ color: isBluetoothOn ? currentAccent : 'inherit' }} />
            </div>
            <div className="text-left truncate">
              <div className="font-bold text-[11px] truncate">Bluetooth</div>
              <div className="text-[10px] text-gray-500 truncate">{isBluetoothOn ? 'Connected' : 'Off'}</div>
            </div>
          </button>
        </div>

        {/* Sliders Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-3">
          {/* Volume Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] text-gray-700">
              <div className="flex items-center space-x-2">
                <button onClick={toggleMute} className="hover:text-black transition-colors">
                  {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5" style={{ color: currentAccent }} />}
                </button>
                <span>Volume</span>
              </div>
              <span className="text-gray-500">{isMuted ? '0%' : `${volume}%`}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={isMuted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); if(isMuted) setIsMuted(false); }}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-current"
              style={{ accentColor: currentAccent }}
            />
          </div>

          {/* Brightness Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] text-gray-700">
              <div className="flex items-center space-x-2">
                <Sun className="w-3.5 h-3.5" style={{ color: currentAccent }} />
                <span>Brightness</span>
              </div>
              <span className="text-gray-500">{brightness}%</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: currentAccent }}
            />
          </div>
        </div>

        {/* System Status Footers */}
        <div className="pt-1 flex justify-between items-center text-[10px] text-gray-500 px-1">
          <div className="flex items-center space-x-1.5">
            <Shield className="w-3 h-3 text-emerald-600" />
            <span>Secure Boot Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => window.location.reload()} title="Restart System" className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors border border-gray-300">
              <Power className="w-3 h-3 text-red-500" />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}