import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, FileText, Download, ZoomIn, ZoomOut, ExternalLink } from 'lucide-react';

export default function PdfViewerWindow({ isOpen, isMinimized, onClose, onMinimize, pdfFile = 'cv.pdf' }) {
  const nodeRef = useRef(null);
  const [zoom, setZoom] = useState(100);

  if (!isOpen) return null;

  // Correct path mapping to public folder assets
  const getPdfPath = (filename) => {
    if (!filename) return '/cv.pdf';
    return `/${filename}`;
  };

  const fileUri = getPdfPath(pdfFile);

  return (
    <Draggable handle=".pdf-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef} 
        style={{ display: isMinimized ? 'none' : 'flex' }}
        className="absolute top-16 left-1/3 w-[720px] h-[620px] bg-[#1e1e1e]/95 backdrop-blur-md border border-[#333333] rounded-t-lg shadow-2xl flex-col z-35 overflow-hidden font-mono text-xs select-none"
      >
        <div className="pdf-header cursor-move bg-[#111111] px-4 py-2.5 border-b border-[#2b2b2b] flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-200 font-bold">
            <FileText className="w-4 h-4 text-[#E95420]" />
            <span>Document Viewer — {pdfFile}</span>
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

        <div className="bg-[#181818] px-3 py-1.5 border-b border-[#2b2b2b] flex items-center justify-between text-gray-300 text-[11px]">
          <div className="flex items-center space-x-2">
            <a 
              href={fileUri} 
              download 
              className="flex items-center space-x-1.5 bg-[#222222] border border-[#333333] hover:bg-[#333333] px-2.5 py-1 rounded transition-colors text-gray-200"
            >
              <Download className="w-3.5 h-3.5 text-[#E95420]" />
              <span>Download File</span>
            </a>
            <a 
              href={fileUri} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-[#222222] border border-[#333333] hover:bg-[#333333] px-2.5 py-1 rounded transition-colors text-gray-200"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Open in Tab</span>
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={() => setZoom(prev => Math.max(prev - 15, 60))} className="p-1 hover:bg-[#333333] rounded transition-colors text-gray-400 hover:text-white">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-gray-400">{zoom}%</span>
            <button onClick={() => setZoom(prev => Math.min(prev + 15, 180))} className="p-1 hover:bg-[#333333] rounded transition-colors text-gray-400 hover:text-white">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#242424] p-4 overflow-auto flex justify-center items-start">
          <div 
            style={{ width: `${zoom}%`, height: '100%' }}
            className="min-h-[500px] bg-white rounded shadow-2xl overflow-hidden flex flex-col transition-all duration-150"
          >
            <iframe 
              src={`${fileUri}#view=FitH`} 
              title={pdfFile}
              className="w-full h-full flex-1 border-none"
            />
          </div>
        </div>
      </div>
    </Draggable>
  );
}