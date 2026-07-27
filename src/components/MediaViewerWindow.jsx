import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { 
  X, Minus, Play, Pause, Volume2, VolumeX, Film, Maximize2, 
  ZoomIn, ZoomOut, RotateCw, Image as ImageIcon, Sparkles 
} from 'lucide-react';

export default function MediaViewerWindow({ 
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize, 
  onFocus, 
  mediaTitle = 'Media Preview', 
  mediaSrc = '/demo.mp4',
  mediaType = 'video', // 'video' | 'image' | 'gif'
  currentAccent = '#77216F',
  isLightMode = false,
  zIndex = 25
}) {
  const nodeRef = useRef(null);
  const videoRef = useRef(null);
  
  // Video States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Image/GIF States
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!isOpen || isMinimized) return null;

  // Video Handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * (videoRef.current?.duration || 1);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setProgress(e.target.value);
    }
  };

  // Image Handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleResetImage = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const isVideo = mediaType === 'video';
  const isGif = mediaType === 'gif';

  return (
    <Draggable handle=".media-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef} 
        onMouseDownCapture={onFocus}
        style={{ zIndex }}
        className={`absolute top-16 left-1/4 w-[680px] border rounded-t-lg shadow-2xl flex flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isLightMode 
            ? 'bg-white border-gray-300 text-gray-900' 
            : 'bg-[#181818] border-[#333333] text-gray-200'
        }`}
      >
        {/* Title Bar */}
        <div 
          onMouseDown={onFocus}
          className={`media-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
            isLightMode 
              ? 'bg-gray-100 border-gray-300 text-gray-800' 
              : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold truncate">
            {isVideo ? (
              <Film className="w-4 h-4 text-[#E95420]" />
            ) : isGif ? (
              <Sparkles className="w-4 h-4 text-amber-400" />
            ) : (
              <ImageIcon className="w-4 h-4 text-emerald-400" />
            )}
            <span className="truncate">
              {isVideo ? 'VLC Media Player' : 'Image Viewer'} — {mediaTitle}
            </span>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button 
              onClick={onMinimize} 
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                isLightMode ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
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

        {/* Display Canvas Area */}
        <div className="relative bg-[#0d0d0d] aspect-video flex items-center justify-center overflow-hidden group">
          {isVideo ? (
            <>
              <video
                ref={videoRef}
                src={mediaSrc}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer"
              />
              {!isPlaying && (
                <button 
                  onClick={togglePlay} 
                  className="absolute p-4 rounded-full bg-black/60 text-white hover:scale-110 transition-transform backdrop-blur-sm cursor-pointer"
                >
                  <Play className="w-8 h-8 fill-current ml-0.5" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center overflow-auto p-4">
              <img 
                src={mediaSrc} 
                alt={mediaTitle}
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                  transition: 'transform 0.2s ease-in-out'
                }}
                className="max-w-full max-h-full object-contain select-none"
              />
            </div>
          )}
        </div>

        {/* Custom Toolbar Controls */}
        <div className={`p-3 border-t space-y-2 ${
          isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-[#121212] border-[#252525]'
        }`}>
          {isVideo ? (
            <>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#E95420]"
              />

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={togglePlay} 
                    className={`p-1.5 rounded transition-colors ${
                      isLightMode ? 'hover:bg-gray-200 text-gray-800' : 'hover:bg-[#282828] text-gray-200'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={toggleMute} 
                    className={`p-1.5 rounded transition-colors ${
                      isLightMode ? 'hover:bg-gray-200 text-gray-800' : 'hover:bg-[#282828] text-gray-200'
                    }`}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <button 
                  onClick={() => videoRef.current?.requestFullscreen()}
                  className={`p-1.5 rounded transition-colors ${
                    isLightMode ? 'hover:bg-gray-200 text-gray-800' : 'hover:bg-[#282828] text-gray-200'
                  }`}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between py-0.5">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleZoomIn} 
                  title="Zoom In"
                  className={`p-1.5 rounded transition-colors ${
                    isLightMode ? 'hover:bg-gray-200 text-gray-800' : 'hover:bg-[#282828] text-gray-200'
                  }`}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleZoomOut} 
                  title="Zoom Out"
                  className={`p-1.5 rounded transition-colors ${
                    isLightMode ? 'hover:bg-gray-200 text-gray-800' : 'hover:bg-[#282828] text-gray-200'
                  }`}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleRotate} 
                  title="Rotate 90°"
                  className={`p-1.5 rounded transition-colors ${
                    isLightMode ? 'hover:bg-gray-200 text-gray-800' : 'hover:bg-[#282828] text-gray-200'
                  }`}
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleResetImage} 
                  className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                    isLightMode ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-[#282828] hover:bg-[#333333] text-gray-200'
                  }`}
                >
                  Reset Fit
                </button>
              </div>

              <span className={`text-[11px] font-medium ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
}