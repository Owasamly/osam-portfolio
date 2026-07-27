import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, FileText, Download, ZoomIn, ZoomOut, ExternalLink } from 'lucide-react';

export default function PdfViewerWindow({ isOpen, isMinimized, onClose, onMinimize, onFocus, pdfFile = 'cv.pdf', currentAccent = '#77216F' }) {
  const nodeRef = useRef(null);
  const [zoom, setZoom] = useState(100);

  if (!isOpen) return null;

  const getPdfPath = (filename) => {
    if (!filename) return '/cv.pdf';
    return `/${filename}`;
  };

  const fileUri = getPdfPath(pdfFile);

  return (
    <Draggable handle=".pdf-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef} 
        onMouseDown={onFocus}
        style={{ display: isMinimized ? 'none' : 'flex' }}
        className="absolute top-16 left-1/3 w-[720px] h-[620px] bg-white border border-gray-300 rounded-t-lg shadow-2xl flex-col z-35 overflow-hidden font-mono text-xs select-none"
      >
        <div className="pdf-header cursor-move bg-gray-100 px-4 py-2.5 border-b border-gray-300 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-800 font-bold">
            <FileText className="w-4 h-4" style={{ color: currentAccent }} />
            <span>Document Viewer — {pdfFile}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={onMinimize}
              className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button 
              onClick={onClose} 
              className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 px-3 py-1.5 border-b border-gray-200 flex items-center justify-between text-gray-700 text-[11px]">
          <div className="flex items-center space-x-2">
            <a 
              href={fileUri} 
              download 
              className="flex items-center space-x-1.5 bg-white border border-gray-300 hover:bg-gray-100 px-2.5 py-1 rounded transition-colors text-gray-800 font-medium"
            >
              <Download className="w-3.5 h-3.5" style={{ color: currentAccent }} />
              <span>Download File</span>
            </a>
            <a 
              href={fileUri} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-white border border-gray-300 hover:bg-gray-100 px-2.5 py-1 rounded transition-colors text-gray-800 font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#19B6EE]" />
              <span>Open in Tab</span>
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={() => setZoom(prev => Math.max(prev - 15, 60))} className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-600">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-gray-500 font-bold">{zoom}%</span>
            <button onClick={() => setZoom(prev => Math.min(prev + 15, 180))} className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-600">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-gray-200 p-4 overflow-auto flex justify-center items-start">
          <div 
            style={{ width: `${zoom}%`, height: '100%' }}
            className="min-h-[500px] bg-white rounded shadow-md overflow-hidden flex flex-col transition-all duration-150"
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