import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, FileText, Save, Check } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

export default function TextEditorWindow({ 
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize, 
  onFocus,
  fileName = 'whoami.sh', 
  fileContent = '', 
  currentAccent = '#77216F',
  isLightMode = false,
  zIndex = 35
}) {
  const nodeRef = useRef(null);
  const isMobile = useIsMobile(768);
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContent(fileContent || getDefaultContent(fileName));
  }, [fileName, fileContent]);

  const getDefaultContent = (name) => {
    if (name === 'whoami.sh') {
      return `#!/bin/bash\necho "Name: Security Researcher"\necho "Location: Munich, DE"\necho "Focus: Reverse Engineering & Binary Analysis"\n\nwhile true; do\n  echo "System secure. Ready for deployment."\n  sleep 3\ndone`;
    }
    if (name === 'shortcut_notes.txt') {
      return `Quick Notes:\n- Finalize master's thesis topic on agentic binary fuzzing.\n- Deploy portfolio with Linux desktop environment.\n- Test experimental 3D WebGL modules.`;
    }
    if (name === 'config.json') {
      return `{\n  "theme": "yaru-light",\n  "windowManager": "custom-react",\n  "terminal": "bash-emu",\n  "securityLevel": "maximum"\n}`;
    }
    return `// Content for ${name}\n\nSystem operational. Ready for edits.`;
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <Draggable handle=".editor-header" nodeRef={nodeRef} disabled={isMobile}>
      <div 
        ref={nodeRef} 
        onMouseDownCapture={onFocus}
        onPointerDownCapture={onFocus}
        style={{ display: isMinimized ? 'none' : 'flex', zIndex: isMobile ? 100 : zIndex }}
        className={`border shadow-2xl flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isMobile ? 'fixed inset-0 w-full h-[100dvh] rounded-none' : 'absolute top-24 left-1/4 w-[640px] h-[480px] rounded-t-lg'
        } ${
          isLightMode 
            ? 'bg-white border-gray-300 text-gray-900' 
            : 'bg-[#1e1e1e] border-[#333333] text-gray-200'
        }`}
      >
        {/* Header */}
        <div 
          onMouseDown={onFocus}
          onPointerDown={onFocus}
          className={`editor-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
            isLightMode 
              ? 'bg-gray-100 border-gray-300 text-gray-800' 
              : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold">
            <FileText className="w-4 h-4" style={{ color: currentAccent }} />
            <span>Text Editor — {fileName}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={onMinimize}
              className={`rounded-full flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'} ${
                isLightMode ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
            >
              <Minus className="w-3 h-3" />
            </button>
            <button 
              onClick={onClose} 
              className={`rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className={`px-3 py-1.5 border-b flex items-center justify-between text-[11px] ${
          isLightMode 
            ? 'bg-gray-50 border-gray-200 text-gray-700' 
            : 'bg-[#181818] border-[#2d2d2d] text-gray-300'
        }`}>
          <button 
            onClick={handleSave}
            className={`flex items-center space-x-1.5 border px-3 py-1 rounded transition-colors font-medium cursor-pointer ${
              isLightMode 
                ? 'bg-white border-gray-300 hover:bg-gray-100 text-gray-800' 
                : 'bg-[#252525] border-[#3d3d3d] hover:bg-[#303030] text-gray-200'
            }`}
          >
            {saved ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Save className="w-3.5 h-3.5" style={{ color: currentAccent }} />}
            <span>{saved ? 'Saved!' : 'Save Changes'}</span>
          </button>
          <div className={`text-[10px] ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>UTF-8 • Bash/Text Mode</div>
        </div>

        {/* Editor Body */}
        <div className={`flex-1 p-3 flex ${isLightMode ? 'bg-white' : 'bg-[#1e1e1e]'}`}>
          <div className={`w-8 py-1 pr-3 text-right select-none space-y-1 text-[11px] font-mono border-r ${
            isLightMode 
              ? 'text-gray-400 border-gray-200' 
              : 'text-gray-600 border-[#2d2d2d]'
          }`}>
            {content.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`flex-1 bg-transparent pl-4 py-1 font-mono text-xs resize-none focus:outline-none leading-relaxed ${
              isLightMode ? 'text-gray-800' : 'text-gray-200'
            }`}
            spellCheck="false"
          />
        </div>
      </div>
    </Draggable>
  );
}