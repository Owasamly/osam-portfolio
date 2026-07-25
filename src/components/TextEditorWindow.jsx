import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, FileText, Save, Check } from 'lucide-react';

export default function TextEditorWindow({ isOpen, isMinimized, onClose, onMinimize, fileName = 'whoami.sh', fileContent = '' }) {
  const nodeRef = useRef(null);
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
      return `Quick Notes:\n- Finalize master's thesis topic on agentic binary fuzzing.\n- Deploy osam.me portfolio with Linux desktop environment.\n- Test osam.live experimental 3D WebGL modules.`;
    }
    if (name === 'config.json') {
      return `{\n  "theme": "yaru-dark",\n  "windowManager": "custom-react",\n  "terminal": "bash-emu",\n  "securityLevel": "maximum"\n}`;
    }
    return `// Content for ${name}\n\nSystem operational. Ready for edits.`;
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <Draggable handle=".editor-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef} 
        style={{ display: isMinimized ? 'none' : 'flex' }}
        className="absolute top-24 left-1/4 w-[640px] h-[480px] bg-[#1e1e1e]/95 backdrop-blur-md border border-[#333333] rounded-t-lg shadow-2xl flex-col z-35 overflow-hidden font-mono text-xs select-none"
      >
        {/* Header */}
        <div className="editor-header cursor-move bg-[#111111] px-4 py-2.5 border-b border-[#2b2b2b] flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-200 font-bold">
            <FileText className="w-4 h-4 text-[#E95420]" />
            <span>Text Editor — {fileName}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={onMinimize}
              className="w-5 h-5 rounded-full bg-[#333333] hover:bg-[#444444] text-gray-300 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button 
              onClick={onClose} 
              className="w-5 h-5 rounded-full bg-[#E95420] hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-[#181818] px-3 py-1.5 border-b border-[#2b2b2b] flex items-center justify-between text-gray-300 text-[11px]">
          <button 
            onClick={handleSave}
            className="flex items-center space-x-1.5 bg-[#222222] border border-[#333333] hover:bg-[#333333] px-3 py-1 rounded transition-colors text-gray-200 cursor-pointer"
          >
            {saved ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Save className="w-3.5 h-3.5 text-[#E95420]" />}
            <span>{saved ? 'Saved!' : 'Save Changes'}</span>
          </button>
          <div className="text-[10px] text-gray-500">UTF-8 • Bash/Text Mode</div>
        </div>

        {/* Editor Body */}
        <div className="flex-1 bg-[#141414] p-3 flex">
          <div className="w-8 py-1 pr-3 text-right text-gray-600 select-none space-y-1 text-[11px] font-mono border-r border-[#222222]">
            {content.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 bg-transparent pl-4 py-1 text-gray-200 font-mono text-xs resize-none focus:outline-none leading-relaxed"
            spellCheck="false"
          />
        </div>
      </div>
    </Draggable>
  );
}