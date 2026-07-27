import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Play, Pause, Volume2, VolumeX, Maximize, X, Minus, Film } from 'lucide-react';

export default function VideoPlayerWindow({ 
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize, 
  onFocus,
  videoSrc, 
  videoTitle, 
  currentAccent = '#77216F',
  isLightMode = false
}) {
  const nodeRef = useRef(null);
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
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (timeInSeconds) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <Draggable handle=".video-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef}
        onMouseDown={onFocus}
        className={`absolute top-20 left-1/4 w-[540px] border rounded-t-lg shadow-2xl flex flex-col z-30 overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isLightMode 
            ? 'bg-white border-gray-300 text-gray-900' 
            : 'bg-[#1e1e1e] border-[#333333] text-gray-200'
        }`}
      >
        {/* Window Header */}
        <div className={`video-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
          isLightMode 
            ? 'bg-gray-100 border-gray-300 text-gray-800' 
            : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
        }`}>
          <div className="flex items-center space-x-2 font-bold truncate">
            <Film className="w-4 h-4" style={{ color: currentAccent }} />
            <span className="truncate max-w-[380px]">{videoTitle || 'Project Demo — Video Player'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={onMinimize} 
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                isLightMode ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
            >
              <Minus className="w-3 h-3" />
            </button>
            <button onClick={onClose} className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Video Viewport */}
        <div className="relative bg-black group flex items-center justify-center aspect-video">
          <video 
            ref={videoRef}
            src={videoSrc || 'https://www.w3schools.com/html/mov_bbb.mp4'}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {!isPlaying && (
            <div onClick={togglePlay} className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-white/80 border border-gray-300 flex items-center justify-center text-gray-800 hover:scale-110 transition-transform shadow-lg">
                <Play className="w-6 h-6 ml-0.5" style={{ color: currentAccent }} />
              </div>
            </div>
          )}
        </div>

        {/* Controls Bar */}
        <div className={`px-4 py-3 border-t space-y-2 ${
          isLightMode 
            ? 'bg-gray-50 border-gray-200' 
            : 'bg-[#181818] border-[#2d2d2d]'
        }`}>
          {/* Progress / Seek bar */}
          <div 
            onClick={handleSeek}
            className={`w-full h-1.5 rounded-full cursor-pointer relative overflow-hidden group ${
              isLightMode ? 'bg-gray-200' : 'bg-gray-700'
            }`}
          >
            <div 
              className="h-full rounded-full transition-all" 
              style={{ width: `${progress}%`, backgroundColor: currentAccent }}
            />
          </div>

          <div className={`flex justify-between items-center ${isLightMode ? 'text-gray-700' : 'text-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <button onClick={togglePlay} className="hover:opacity-75 transition-opacity">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button onClick={toggleMute} className="hover:opacity-75 transition-opacity">
                {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <div className={`text-[10px] ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <span>
                {formatTime(videoRef.current?.currentTime)} / {formatTime(videoRef.current?.duration)}
              </span>
            </div>

            <button onClick={toggleFullscreen} className="hover:opacity-75 transition-opacity">
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
}