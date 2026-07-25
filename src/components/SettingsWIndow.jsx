// import React, { useRef } from 'react';
// import Draggable from 'react-draggable';
// import { Settings, X, Minus, Palette, Monitor, Shield, Cpu } from 'lucide-react';

// export default function SettingsWindow({ isOpen, isMinimized, onClose, onMinimize, currentAccent, setAccentColor }) {
//   const nodeRef = useRef(null);

//   if (!isOpen || isMinimized) return null;

//   const themes = [
//     { name: 'Ubuntu Orange', color: '#E95420' },
//     { name: 'Cyberpunk Green', color: '#10B981' },
//     { name: 'Terminal Blue', color: '#3B82F6' },
//     { name: 'Cyber Violet', color: '#8B5CF6' },
//     { name: 'Amber Glow', color: '#F59E0B' },
//   ];

//   return (
//     <Draggable handle=".settings-header" nodeRef={nodeRef}>
//       <div 
//         ref={nodeRef} 
//         className="absolute top-20 left-1/3 w-[500px] bg-[#1e1e1e]/95 backdrop-blur-md border border-[#333333] rounded-t-lg shadow-2xl flex flex-col z-30 overflow-hidden font-mono text-xs select-none"
//       >
//         {/* Window Header */}
//         <div className="settings-header cursor-move bg-[#111111] px-4 py-2.5 border-b border-[#2b2b2b] flex justify-between items-center">
//           <div className="flex items-center space-x-2 text-gray-200 font-bold">
//             <Settings className="w-4 h-4" style={{ color: currentAccent }} />
//             <span>Settings — GNOME Control Center</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button onClick={onMinimize} className="w-5 h-5 rounded-full bg-[#333333] hover:bg-[#444444] text-gray-300 flex items-center justify-center transition-colors">
//               <Minus className="w-3 h-3" />
//             </button>
//             <button onClick={onClose} className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
//               <X className="w-3 h-3" />
//             </button>
//           </div>
//         </div>

//         {/* Settings Body */}
//         <div className="flex bg-[#161616] text-gray-200 h-[340px]">
//           {/* Sidebar */}
//           <div className="w-40 bg-[#121212] border-r border-[#262626] p-2 space-y-1">
//             <div className="flex items-center space-x-2 px-3 py-2 rounded bg-white/10 text-white font-semibold cursor-pointer">
//               <Palette className="w-3.5 h-3.5" style={{ color: currentAccent }} />
//               <span>Appearance</span>
//             </div>
//             <div className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-white/5 text-gray-400 cursor-pointer">
//               <Monitor className="w-3.5 h-3.5" />
//               <span>Displays</span>
//             </div>
//             <div className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-white/5 text-gray-400 cursor-pointer">
//               <Shield className="w-3.5 h-3.5" />
//               <span>Security</span>
//             </div>
//             <div className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-white/5 text-gray-400 cursor-pointer">
//               <Cpu className="w-3.5 h-3.5" />
//               <span>About</span>
//             </div>
//           </div>

//           {/* Content Panel */}
//           <div className="flex-1 p-6 space-y-6 overflow-y-auto">
//             <div>
//               <h3 className="text-sm font-bold text-white mb-1 flex items-center space-x-2">
//                 <span>Accent Color</span>
//               </h3>
//               <p className="text-[11px] text-gray-400 mb-4">Choose your system-wide theme palette.</p>
              
//               <div className="grid grid-cols-1 gap-2.5">
//                 {themes.map((t) => (
//                   <button
//                     key={t.color}
//                     onClick={() => setAccentColor(t.color)}
//                     className={`flex items-center justify-between p-2.5 rounded border transition-all ${currentAccent === t.color ? 'bg-[#222222] border-gray-400 shadow' : 'bg-[#181818] border-[#2b2b2b] hover:bg-[#1f1f1f]'}`}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className="w-4 h-4 rounded-full shadow" style={{ backgroundColor: t.color }} />
//                       <span className="font-medium text-gray-200">{t.name}</span>
//                     </div>
//                     {currentAccent === t.color && (
//                       <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white">Active</span>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="pt-4 border-t border-[#262626] text-[11px] text-gray-500">
//               Ubuntu 24.04 LTS — GNOME 46 Window Manager
//             </div>
//           </div>
//         </div>
//       </div>
//     </Draggable>
//   );
// }