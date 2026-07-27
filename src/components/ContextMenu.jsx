import React, { useEffect, useRef } from 'react';
import { Terminal, Settings, Folder, RefreshCw, Monitor } from 'lucide-react';

export default function ContextMenu({ position, onClose, onOpenApp, isLightMode }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  if (!position) return null;

  const menuItems = [
    { label: 'Open Terminal', icon: Terminal, action: () => onOpenApp('terminal') },
    { label: 'Open Files', icon: Folder, action: () => onOpenApp('files') },
    { label: 'Display Settings', icon: Settings, action: () => onOpenApp('settings') },
    { label: 'Change Background', icon: Monitor, action: () => onOpenApp('settings') },
    { label: 'Reload OS', icon: RefreshCw, action: () => window.location.reload() },
  ];

  return (
    <div
      ref={menuRef}
      style={{ top: position.y, left: position.x }}
      className={`fixed z-50 w-48 rounded-lg border shadow-xl py-1 text-xs font-sans select-none ${
        isLightMode
          ? 'bg-[#f6f6f6]/95 border-gray-300 text-gray-800'
          : 'bg-[#2d2d2d]/95 border-[#444444] text-gray-100 backdrop-blur-md'
      }`}
    >
      {menuItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              item.action();
              onClose();
            }}
            className="w-full px-3 py-1.5 text-left flex items-center space-x-2.5 transition-colors cursor-pointer hover:bg-[#E95420] hover:text-white"
          >
            <Icon className="w-3.5 h-3.5 opacity-80" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}