import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Play, Pause, Volume2, VolumeX, Maximize, X, Minus, Film } from 'lucide-react';

export default function VideoPlayerWindow({ isOpen, isMinimized, onClose, onMinimize, videoSrc, videoTitle, currentAccent }) {
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
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
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

  return (
    <Draggable handle=".video-header" nodeRef={nodeRef}>
      <div 
        ref={nodeRef} 
        className="absolute top-20 left-1/4 w-[540px] bg-[#1e1e1e]/95 backdrop-blur-md border border-[#333333] rounded-t-lg shadow-2xl flex flex-col z-30 overflow-hidden font-mono text-xs select-none"
      >
        {/* Window Header */}
        <div className="video-header cursor-move bg-[#111111] px-4 py-2.5 border-b border-[#2b2b2b] flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-200 font-bold truncate">
            <Film className="w-4 h-4" style={{ color: currentAccent }} />
            <span className="truncate max-w-[380px]">{videoTitle || 'Project Demo — Video Player'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={onMinimize} className="w-5 h-5 rounded-full bg-[#333333] hover:bg-[#444444] text-gray-300 flex items-center justify-center transition-colors">
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
            src={videoSrc || 'https://www.w3schools.com/html/mov_bbb.mp4'} // Default sample video if none provided
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Center Play Overlay on Pause */}
          {!isPlaying && (
            <div onClick={togglePlay} className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-0.5" style={{ color: currentAccent }} />
              </div>
            </div>
          )}
        </div>

        {/* Custom Video Controls Bar */}
        <div className="bg-[#141414] px-4 py-3 border-t border-[#262626] space-y-2">
          {/* Progress / Seek bar */}
          <div 
            onClick={handleSeek}
            className="w-full h-1.5 bg-[#333333] rounded-full cursor-pointer relative overflow-hidden group"
          >
            <div 
              className="h-full rounded-full transition-all" 
              style={{ width: `${progress}%`, backgroundColor: currentAccent }}
            />
          </div>

          <div className="flex justify-between items-center text-gray-300">
            <div className="flex items-center space-x-3">
              <button onClick={togglePlay} className="hover:text-white transition-colors">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button onClick={toggleMute} className="hover:text-white transition-colors">
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-[10px] text-gray-400">
              {videoRef.current && !isNaN(videoRef.current.duration) ? (
                <span>
                  {Math.floor(videoRef.current.currentTime / 60)}:{Math.floor(videoRef.current.currentTime % 60).toString().padStart(2, '0')} / {Math.floor(videoRef.current.duration / 60)}:{Math.floor(videoRef.current.duration % 60).toString().padStart(2, '0')}
                </span>
              ) : (
                <span>0:00 / 1:00</span>
              )}
            </div>

            <button onClick={toggleFullscreen} className="hover:text-white transition-colors">
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
}