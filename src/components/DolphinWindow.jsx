import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Square, Minus, Folder, FileText, ChevronRight, User, Briefcase } from 'lucide-react';

export default function DolphinWindow({ isOpen, onClose, activeTab, setActiveTab }) {
  const nodeRef = useRef(null);
  if (!isOpen) return null;

  return (
    <Draggable handle=".ubuntu-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef} 
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[680px] h-[500px] bg-[#1e1e1e]/95 backdrop-blur-md border border-[#333333] rounded-t-lg shadow-2xl flex flex-col z-20 overflow-hidden font-mono text-xs"
      >
        {/* Ubuntu Dark Yaru Window Header */}
        <div className="ubuntu-header cursor-move bg-[#111111] px-4 py-2.5 border-b border-[#2b2b2b] flex justify-between items-center select-none">
          <div className="flex items-center space-x-2 text-gray-200 font-bold">
            <Folder className="w-4 h-4 text-[#E95420]" />
            <span>Files — Home</span>
          </div>
          
          {/* Ubuntu Yaru Control Buttons */}
          <div className="flex items-center space-x-2">
            <button className="w-5 h-5 rounded-full bg-[#333333] hover:bg-[#444444] text-gray-300 flex items-center justify-center transition-colors">
              <Minus className="w-3 h-3" />
            </button>
            <button className="w-5 h-5 rounded-full bg-[#333333] hover:bg-[#444444] text-gray-300 flex items-center justify-center transition-colors">
              <Square className="w-2.5 h-2.5" />
            </button>
            <button onClick={onClose} className="w-5 h-5 rounded-full bg-[#E95420] hover:bg-red-600 text-white flex items-center justify-center transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Path Bar */}
        <div className="bg-[#181818] px-4 py-1.5 border-b border-[#2b2b2b] flex items-center space-x-2 text-gray-400 text-[11px]">
          <span>home</span>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span className="text-[#E95420] font-semibold">user/{activeTab}</span>
        </div>

        {/* Body Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-40 bg-[#141414] border-r border-[#2b2b2b] p-2 space-y-1">
            <div className="text-[10px] text-gray-500 font-bold px-2 py-1 uppercase">Places</div>
            {[
              { id: 'about', name: 'About', icon: User },
              { id: 'projects', name: 'Projects', icon: Folder },
              { id: 'experience', name: 'Experience', icon: Briefcase },
              { id: 'cv', name: 'CV (PDF)', icon: FileText },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded transition-colors text-left ${
                    activeTab === item.id ? 'bg-[#E95420] text-white font-bold' : 'text-gray-300 hover:bg-[#252525]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Explorer View */}
          <div className="flex-1 p-5 overflow-y-auto text-gray-200 bg-[#1e1e1e]">
            {activeTab === 'about' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#E95420]">whoami.sh</h3>
                <p className="text-xs leading-relaxed text-gray-300">
                  Cybersecurity researcher & software engineer specializing in automated binary analysis, reverse engineering, and low-level development.
                </p>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="grid grid-cols-2 gap-3">
                {['Snippy App', 'Agentic Analyzer', 'Linux Portfolio'].map((proj, idx) => (
                  <div key={idx} className="p-3 border border-[#333333] rounded bg-[#141414] flex items-center space-x-3 hover:border-[#E95420] transition-colors">
                    <Folder className="w-6 h-6 text-[#E95420]" />
                    <div>
                      <div className="font-bold text-xs">{proj}</div>
                      <div className="text-[10px] text-gray-400">Directory</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-3">
                <div className="p-3 border-l-2 border-[#E95420] bg-[#141414]">
                  <div className="font-bold text-xs text-white">Master's Student & Researcher</div>
                  <div className="text-[11px] text-gray-400">Cybersecurity • Present</div>
                </div>
              </div>
            )}

            {activeTab === 'cv' && (
              <div className="text-center py-8 space-y-3">
                <FileText className="w-10 h-10 text-[#E95420] mx-auto" />
                <div className="font-bold">curriculum_vitae.pdf</div>
                <a href="/cv.pdf" download className="inline-block bg-[#E95420] text-white font-bold px-4 py-2 rounded text-xs hover:bg-orange-600 transition-colors">
                  Download PDF
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
}