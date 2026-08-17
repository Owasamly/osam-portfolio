import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, FileText, Download, ZoomIn, ZoomOut, ExternalLink } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

export default function PdfViewerWindow({ 
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize, 
  onFocus, 
  pdfFile = 'docs/CV_EN.pdf',
  currentAccent = '#77216F',
  isLightMode = false,
  zIndex = 25
}) {
  const nodeRef = useRef(null);
  const isMobile = useIsMobile(768);
  const [zoom, setZoom] = useState(100);

  if (!isOpen) return null;

  const getPdfPath = (filename) => {
    if (!filename) return '/docs/CV_EN.pdf';
    return `/${filename.replace(/^\/+/, '')}`;
  };

  const fileUri = getPdfPath(pdfFile);

  return (
    <Draggable handle=".pdf-header" nodeRef={nodeRef} disabled={isMobile}>
      <div 
        ref={nodeRef} 
        onMouseDownCapture={onFocus}
        onPointerDownCapture={onFocus}
        style={{ display: isMinimized ? 'none' : 'flex', zIndex: isMobile ? 100 : zIndex }}
        className={`border shadow-2xl flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isMobile ? 'fixed inset-0 w-full h-[100dvh] rounded-none' : 'absolute top-16 left-1/3 w-[720px] h-[620px] rounded-t-lg'
        } ${
          isLightMode 
            ? 'bg-white border-gray-300 text-gray-900' 
            : 'bg-[#1e1e1e] border-[#333333] text-gray-200'
        }`}
      >
        <div 
          onMouseDown={onFocus}
          onPointerDown={onFocus}
          className={`pdf-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
            isLightMode 
              ? 'bg-gray-100 border-gray-300 text-gray-800' 
              : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold">
            <FileText className="w-4 h-4" style={{ color: currentAccent }} />
            <span>Document Viewer — {pdfFile}</span>
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

        <div className={`px-3 py-1.5 border-b flex items-center justify-between text-[11px] ${
          isLightMode 
            ? 'bg-gray-50 border-gray-200 text-gray-700' 
            : 'bg-[#181818] border-[#2d2d2d] text-gray-300'
        }`}>
          <div className="flex items-center space-x-2">
            <a 
              href={fileUri} 
              download 
              className={`flex items-center space-x-1.5 border px-2.5 py-1 rounded transition-colors font-medium ${
                isLightMode 
                  ? 'bg-white border-gray-300 hover:bg-gray-100 text-gray-800' 
                  : 'bg-[#252525] border-[#3d3d3d] hover:bg-[#303030] text-gray-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" style={{ color: currentAccent }} />
              <span>Download File</span>
            </a>
            <a 
              href={fileUri} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center space-x-1.5 border px-2.5 py-1 rounded transition-colors font-medium ${
                isLightMode 
                  ? 'bg-white border-gray-300 hover:bg-gray-100 text-gray-800' 
                  : 'bg-[#252525] border-[#3d3d3d] hover:bg-[#303030] text-gray-200'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#19B6EE]" />
              <span>Open in Tab</span>
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setZoom(prev => Math.max(prev - 15, 60))} 
              className={`p-1 rounded transition-colors ${
                isLightMode ? 'hover:bg-gray-200 text-gray-600' : 'hover:bg-[#2d2d2d] text-gray-300'
              }`}
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className={`text-[10px] font-bold ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>{zoom}%</span>
            <button 
              onClick={() => setZoom(prev => Math.min(prev + 15, 180))} 
              className={`p-1 rounded transition-colors ${
                isLightMode ? 'hover:bg-gray-200 text-gray-600' : 'hover:bg-[#2d2d2d] text-gray-300'
              }`}
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className={`flex-1 p-4 overflow-auto flex justify-center items-start ${
          isLightMode ? 'bg-gray-200' : 'bg-[#121212]'
        }`}>
          <div 
            style={{ width: `${zoom}%`, height: '100%' }}
            className={`min-h-[500px] rounded shadow-md overflow-hidden flex flex-col transition-all duration-150 ${
              isLightMode ? 'bg-white' : 'bg-[#1e1e1e]'
            }`}
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
