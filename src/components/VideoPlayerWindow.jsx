import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Play, Pause, Volume2, VolumeX, Film, Maximize2 } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

export default function VideoPlayerWindow({ 
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize, 
  onFocus, 
  videoTitle = 'Demo Reel / Research Overview', 
  videoSrc = '/sample_video.mp4',
  currentAccent = '#77216F',
  isLightMode = false,
  zIndex = 25
}) {
  const nodeRef = useRef(null);
  const isMobile = useIsMobile(768);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen || isMinimized) return null;

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

  return (
    <Draggable handle=".video-header" nodeRef={nodeRef} disabled={isMobile}>
      <div 
        ref={nodeRef} 
        onMouseDownCapture={onFocus}
        onPointerDownCapture={onFocus}
        style={{ zIndex: isMobile ? 100 : zIndex }}
        className={`border shadow-2xl flex flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isMobile ? 'fixed inset-0 w-full h-[100dvh] rounded-none' : 'absolute top-20 left-1/4 w-[680px] rounded-t-lg'
        } ${
          isLightMode 
            ? 'bg-white border-gray-300 text-gray-900' 
            : 'bg-[#181818] border-[#333333] text-gray-200'
        }`}
      >
        {/* Title Bar */}
        <div 
          onMouseDown={onFocus}
          onPointerDown={onFocus}
          className={`video-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
            isLightMode 
              ? 'bg-gray-100 border-gray-300 text-gray-800' 
              : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold truncate">
            <Film className="w-4 h-4 text-[#E95420]" />
            <span className="truncate">VLC Media Player — {videoTitle}</span>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
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

        {/* Video Screen Area */}
        <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden group">
          <video
            ref={videoRef}
            src={videoSrc}
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
        </div>

        {/* Custom Video Controls */}
        <div className={`p-3 border-t space-y-2 ${
          isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-[#121212] border-[#252525]'
        }`}>
          {/* Progress Bar */}
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
        </div>
      </div>
    </Draggable>
  );
}
