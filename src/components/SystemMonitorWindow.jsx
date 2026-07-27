import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Activity, Cpu, HardDrive, Wifi } from 'lucide-react';

export default function SystemMonitorWindow({ 
  isOpen = true, 
  isMinimized = false, 
  onClose, 
  onMinimize, 
  currentAccent = '#E95420',
  isWidgetMode = false,
  isLightMode = false,
  onFocus
}) {
  const nodeRef = useRef(null);

  const [cpuHistory, setCpuHistory] = useState(Array(20).fill(15));
  const [ramHistory, setRamHistory] = useState(Array(20).fill(42));
  const [netHistory, setNetHistory] = useState(Array(20).fill(2));

  const [cpuVal, setCpuVal] = useState(15);
  const [ramVal, setRamVal] = useState(42);
  const [netVal, setNetVal] = useState(1.8);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpu = Math.floor(Math.random() * 35) + 12;
      const newRam = +(40 + Math.random() * 5).toFixed(1);
      const newNet = +(Math.random() * 4 + 0.5).toFixed(1);

      setCpuVal(newCpu);
      setRamVal(newRam);
      setNetVal(newNet);

      setCpuHistory(prev => [...prev.slice(1), newCpu]);
      setRamHistory(prev => [...prev.slice(1), newRam]);
      setNetHistory(prev => [...prev.slice(1), newNet]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const renderSparkline = (data, maxVal, color) => {
    const width = 180;
    const height = 35;
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - (val / maxVal) * height;
      return `${x},${Math.max(2, Math.min(height - 2, y))}`;
    }).join(' ');

    return (
      <svg className="w-full h-9 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  if (isWidgetMode) {
    return (
      <div className={`absolute top-10 right-4 w-60 backdrop-blur-md border rounded-lg p-3 z-20 font-mono text-xs shadow-2xl pointer-events-none select-none ${
        isLightMode 
          ? 'bg-white/80 border-gray-300 text-gray-800' 
          : 'bg-[#141414]/90 border-[#333333] text-gray-200'
      }`}>
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-400/20">
          <div className="flex items-center space-x-1.5 font-bold" style={{ color: currentAccent }}>
            <Activity className="w-3.5 h-3.5" />
            <span>SYSTEM TELEMETRY</span>
          </div>
          <span className="text-[10px] text-gray-500">Conky</span>
        </div>

        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-gray-500 flex items-center space-x-1"><Cpu className="w-3 h-3 text-amber-500" /><span>CPU</span></span>
              <span className="font-bold">{cpuVal}%</span>
            </div>
            {renderSparkline(cpuHistory, 100, currentAccent)}
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-gray-500 flex items-center space-x-1"><HardDrive className="w-3 h-3 text-blue-500" /><span>RAM</span></span>
              <span className="font-bold">{ramVal}%</span>
            </div>
            {renderSparkline(ramHistory, 100, '#3b82f6')}
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-gray-500 flex items-center space-x-1"><Wifi className="w-3 h-3 text-emerald-500" /><span>NET</span></span>
              <span className="font-bold">{netVal} MB/s</span>
            </div>
            {renderSparkline(netHistory, 10, '#10b981')}
          </div>
        </div>
      </div>
    );
  }

  if (!isOpen || isMinimized) return null;

  return (
    <Draggable handle=".monitor-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef}
        onMouseDown={onFocus}
        className={`absolute top-24 right-20 w-[340px] backdrop-blur-md border rounded-t-lg shadow-2xl flex flex-col overflow-hidden font-mono text-xs select-none ${
          isLightMode ? 'bg-[#fafafa] border-gray-300 text-gray-900' : 'bg-[#1e1e1e]/95 border-[#333333] text-gray-200'
        }`}
      >
        <div className={`monitor-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
          isLightMode ? 'bg-[#e5e5e5] border-gray-300 text-gray-900' : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
        }`}>
          <div className="flex items-center space-x-2 font-bold">
            <Activity className="w-4 h-4" style={{ color: currentAccent }} />
            <span>System Monitor</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button onClick={onMinimize} className="w-5 h-5 rounded-full bg-gray-500/20 hover:bg-gray-500/40 flex items-center justify-center transition-colors">
              <Minus className="w-3 h-3" />
            </button>
            <button onClick={onClose} className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className={`p-4 space-y-4 ${isLightMode ? 'bg-white' : 'bg-[#181818]'}`}>
          <div className={`p-3 rounded border ${isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-[#141414] border-[#2d2d2d]'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold flex items-center space-x-1.5"><Cpu className="w-3.5 h-3.5 text-amber-500" /><span>Processor (CPU)</span></span>
              <span className="font-bold">{cpuVal}%</span>
            </div>
            {renderSparkline(cpuHistory, 100, currentAccent)}
          </div>

          <div className={`p-3 rounded border ${isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-[#141414] border-[#2d2d2d]'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold flex items-center space-x-1.5"><HardDrive className="w-3.5 h-3.5 text-blue-500" /><span>Memory (RAM)</span></span>
              <span className="font-bold">{ramVal}%</span>
            </div>
            {renderSparkline(ramHistory, 100, '#3b82f6')}
          </div>

          <div className={`p-3 rounded border ${isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-[#141414] border-[#2d2d2d]'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold flex items-center space-x-1.5"><Wifi className="w-3.5 h-3.5 text-emerald-500" /><span>Network (Down/Up)</span></span>
              <span className="font-bold">{netVal} MB/s</span>
            </div>
            {renderSparkline(netHistory, 10, '#10b981')}
          </div>
        </div>
      </div>
    </Draggable>
  );
}