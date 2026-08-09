import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { 
  X, Minus, Folder, FileText, ChevronLeft, ChevronRight, 
  LayoutGrid, List, Monitor, Download, Music, Image, Video, 
  Briefcase, User, Archive, GraduationCap, Trash2, Link, 
  Terminal, Mail, FileCode, Globe 
} from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

export default function DolphinWindow({ 
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize, 
  activeTab, 
  setActiveTab, 
  onFileOpen, 
  onTextEditorOpen,
  onTerminalOpen,
  onBrowserOpen,
  onMediaOpen,
  onContactOpen,
  isLightMode,
  onFocus,
  zIndex = 25
}) {
  const nodeRef = useRef(null);
  const isMobile = useIsMobile(768);

  const [history, setHistory] = useState(['about']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  const navigateTo = (tabId, addToHistory = true) => {
    setActiveTab(tabId);
    if (addToHistory) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(tabId);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setActiveTab(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setActiveTab(history[newIndex]);
    }
  };

  if (!isOpen) return null;

  const places = [
    { id: 'about', name: 'Home (~)', icon: User },
    { id: 'projects', name: 'Projects', icon: Folder },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'downloads', name: 'Downloads', icon: Download },
    { id: 'pictures', name: 'Pictures', icon: Image },
    { id: 'videos', name: 'Videos', icon: Video },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'trash', name: 'Trash', icon: Trash2 },
  ];

  const directoryContents = {
    about: [
      { name: '00_START_HERE.sh', type: 'file', ext: 'Shell Script', icon: Terminal, color: 'text-emerald-500' },
      { name: 'About_Me.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
      { name: 'Projects', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500', target: 'projects' },
      { name: 'Experience', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500', target: 'experience' },
      { name: 'Education', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500', target: 'education' },
      { name: 'Technical_Skills.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
      { name: 'Osama_Kahsay_CV.pdf', type: 'file', ext: 'PDF Document', icon: FileText, color: 'text-red-500' },
      { name: 'GitHub.url', type: 'file', ext: 'Web Link', icon: Globe, color: 'text-blue-400', url: 'https://github.com/osamakahsay' },
      { name: 'Contact_Me', type: 'file', ext: 'Contact Info', icon: Mail, color: 'text-sky-400' },
    ],
    projects: [
      { name: '00_PROJECT_INDEX.sh', type: 'file', ext: 'Shell Script', icon: Terminal, color: 'text-emerald-500' },
      { name: 'Secure_Supply_Chain', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500' },
      { name: 'Vault_OIDC_Secrets', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500', badge: 'In progress' },
      { name: 'Falco_Runtime_Security', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500', target: 'falco_runtime_security' },
      { name: 'Kubernetes_GitOps', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500' },
      { name: 'Terraform_OPA_Guardrails', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500' },
      { name: 'CI_Security_Pipeline', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500' },
      { name: 'MK_Delivery', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500', target: 'mk_delivery_project' },
      { name: 'ICT_Resource_System', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500' },
      { name: 'GitHub.url', type: 'file', ext: 'Web Link', icon: Globe, color: 'text-blue-400', url: 'https://github.com/osamakahsay' },
    ],
    falco_runtime_security: [
      { name: 'Project_Overview.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
      { name: 'Architecture.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'Evidence.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'Demo.mp4', type: 'file', ext: 'Video File', icon: Video, color: 'text-blue-500' },
      { name: 'GitHub.url', type: 'file', ext: 'Web Link', icon: Globe, color: 'text-blue-400', url: 'https://github.com/osamakahsay' },
    ],
    mk_delivery_project: [
      { name: 'Role_and_Overview.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
      { name: 'App_Home.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'Restaurant_View.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'Product_Demo.mp4', type: 'file', ext: 'Video File', icon: Video, color: 'text-blue-500' },
      { name: 'Google_Play.url', type: 'file', ext: 'Web Link', icon: Globe, color: 'text-blue-400', url: 'https://play.google.com' },
    ],
    experience: [
      { name: 'Experience_Timeline.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'MK_Delivery', type: 'dir', ext: 'Folder', icon: Folder, color: 'text-amber-500', target: 'mk_delivery_project' },
      { name: 'Mekelle_University_ICT.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
    ],
    education: [
      { name: 'Education_Timeline.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'HDBW_MSc_Cybersecurity.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
      { name: 'Bachelors_Degree.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
      { name: 'Master_Thesis_Ideas.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
      { name: 'FABA_Concept_Architecture.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
    ],
    documents: [
      { name: 'Osama_Kahsay_CV_EN.pdf', type: 'file', ext: 'PDF Document', icon: FileText, color: 'text-red-500' },
      { name: 'Osama_Kahsay_CV_DE.pdf', type: 'file', ext: 'PDF Document', icon: FileText, color: 'text-red-500' },
      { name: 'Master_Thesis_Ideas.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
      { name: 'FABA_Concept_Architecture.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
    ],
    downloads: [
      { name: 'Osama_Kahsay_CV_EN.pdf', type: 'file', ext: 'PDF Document', icon: FileText, color: 'text-red-500' },
      { name: 'Osama_Kahsay_CV_DE.pdf', type: 'file', ext: 'PDF Document', icon: FileText, color: 'text-red-500' },
    ],
    pictures: [
      { name: 'Osama_Kahsay.jpg', type: 'file', ext: 'JPG Image', icon: Image, color: 'text-purple-500' },
      { name: 'GitOps_Architecture.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'ArgoCD_Synchronized.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'OPA_Policy_Rejection.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'Falco_Alert.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'Kubernetes_Cluster.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'MK_Delivery.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
      { name: 'FABA_Concept_Architecture.png', type: 'file', ext: 'PNG Image', icon: Image, color: 'text-purple-500' },
    ],
    videos: [
      { name: 'Portfolio_Tour.mp4', type: 'file', ext: 'Video File', icon: Video, color: 'text-blue-500' },
      { name: 'GitOps_Self_Healing.mp4', type: 'file', ext: 'Video File', icon: Video, color: 'text-blue-500' },
      { name: 'Falco_Detection.mp4', type: 'file', ext: 'Video File', icon: Video, color: 'text-blue-500' },
      { name: 'MK_Delivery_Demo.mp4', type: 'file', ext: 'Video File', icon: Video, color: 'text-blue-500' },
      { name: 'Hobby_Video.mp4', type: 'file', ext: 'Video File', icon: Video, color: 'text-blue-500' },
      { name: 'Favourite_Videos.url', type: 'file', ext: 'Web Link', icon: Globe, color: 'text-blue-400', url: 'https://youtube.com' },
    ],
    music: [
      { name: 'Focus_Playlist.url', type: 'file', ext: 'Music Playlist', icon: Music, color: 'text-pink-500', url: 'https://spotify.com' },
      { name: 'Favourite_Music.url', type: 'file', ext: 'Music Playlist', icon: Music, color: 'text-pink-500', url: 'https://spotify.com' },
      { name: 'About_These_Playlists.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-emerald-500' },
    ],
    trash: [
      { name: 'generic_portfolio_template.zip', type: 'file', ext: 'Archive', icon: Archive, color: 'text-gray-400' },
      { name: 'hardcoded_passwords.txt', type: 'file', ext: 'Text Document', icon: FileText, color: 'text-gray-400' },
      { name: 'final_final_CV_v12.pdf', type: 'file', ext: 'PDF Document', icon: FileText, color: 'text-gray-400' },
    ]
  };

  const currentItems = directoryContents[activeTab] || [];
  const isMobileListView = isMobile || viewMode === 'list';

  const handleSidebarClick = (id) => navigateTo(id);

  const handleItemAction = (item) => {
    if (item.type === 'dir' && item.target) {
      navigateTo(item.target);
    } else if (item.type === 'dir') {
      const slug = item.name.toLowerCase();
      if (directoryContents[slug]) {
        navigateTo(slug);
      }
    } else if (item.name === 'Contact_Me' || item.ext === 'Contact Info') {
      if (onContactOpen) onContactOpen();
    } else if (item.name.endsWith('.pdf')) {
      if (onFileOpen) onFileOpen('cv.pdf');
    } else if (item.name.endsWith('.sh')) {
      if (onTerminalOpen) onTerminalOpen(item.name);
    } else if (item.name.endsWith('.txt') || item.name.endsWith('.json')) {
      if (onTextEditorOpen) onTextEditorOpen(item.name);
    } else if (item.name.endsWith('.png') || item.name.endsWith('.jpg') || item.name.endsWith('.jpeg')) {
      if (onMediaOpen) onMediaOpen(item.name, 'Sample_image.png', 'image');
    } else if (item.name.endsWith('.mp4')) {
      if (onMediaOpen) onMediaOpen(item.name, 'sample_video.mp4', 'video');
    } else if (item.name.endsWith('.url') || item.url) {
      if (onBrowserOpen) {
        onBrowserOpen('https://github.com/osamakahsay');
      } else {
        window.open('https://github.com/osamakahsay', '_blank');
      }
    }
  };

  const getItemInteractions = (item) => {
    if (isMobile) {
      return { onClick: () => handleItemAction(item) };
    }
    return { onDoubleClick: () => handleItemAction(item) };
  };

  return (
    <Draggable handle=".ubuntu-header" nodeRef={nodeRef} disabled={isMobile}>
      <div 
        ref={nodeRef} 
        onMouseDownCapture={onFocus}
        onPointerDownCapture={onFocus}
        style={{ display: isMinimized ? 'none' : 'flex', zIndex: isMobile ? 100 : zIndex }}
        className={`border shadow-2xl flex-col overflow-hidden font-mono text-xs select-none backdrop-blur-md ${
          isMobile ? 'fixed inset-0 w-full h-[100dvh] rounded-none' : 'absolute top-20 left-1/2 -translate-x-1/2 w-[740px] h-[520px] rounded-t-lg'
        } ${
          isLightMode ? 'bg-[#fafafa] text-gray-800 border-gray-300' : 'bg-[#1e1e1e]/95 text-gray-200 border-[#333333]'
        }`}
      >
        {/* Header */}
        <div 
          onMouseDown={onFocus}
          onPointerDown={onFocus}
          className={`ubuntu-header cursor-move px-4 py-2.5 border-b flex justify-between items-center ${
            isLightMode ? 'bg-[#e5e5e5] border-gray-300 text-gray-900' : 'bg-[#111111] border-[#2b2b2b] text-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold">
            <Folder className="w-4 h-4 text-[#E95420]" />
            <span>Files — /home/guest/{activeTab}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button onClick={onMinimize} className={`rounded-full flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'} ${
              isLightMode ? 'bg-gray-300 hover:bg-gray-400 text-gray-800' : 'bg-[#333333] hover:bg-[#444444] text-gray-300'
            }`}>
              <Minus className="w-3 h-3" />
            </button>
            <button onClick={onClose} className={`rounded-full bg-[#E95420] hover:bg-red-600 text-white flex items-center justify-center transition-colors ${isMobile ? 'p-2' : 'w-5 h-5'}`}>
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className={`px-3 py-2 border-b flex items-center justify-between text-[11px] ${
          isLightMode ? 'bg-[#f0f0f0] border-gray-300 text-gray-700' : 'bg-[#181818] border-[#2b2b2b] text-gray-300'
        }`}>
          <div className="flex items-center space-x-3 flex-1 mr-3">
            <div className={`flex items-center space-x-1 border rounded overflow-hidden shrink-0 ${
              isLightMode ? 'bg-white border-gray-300' : 'bg-[#222222] border-[#333333]'
            }`}>
              <button onClick={handleBack} disabled={historyIndex === 0} className={`p-1.5 transition-colors ${
                historyIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-black/5'
              }`}>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div className={`w-[1px] h-4 ${isLightMode ? 'bg-gray-300' : 'bg-[#333333]'}`} />
              <button onClick={handleForward} disabled={historyIndex === history.length - 1} className={`p-1.5 transition-colors ${
                historyIndex === history.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-black/5'
              }`}>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className={`flex-1 flex items-center space-x-1 border px-3 py-1.5 rounded shadow-inner overflow-x-auto ${
              isLightMode ? 'bg-white border-gray-300 text-gray-800' : 'bg-[#141414] border-[#333333] text-gray-300'
            }`}>
              <span onClick={() => handleSidebarClick('about')} className="hover:underline cursor-pointer">home</span>
              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
              <span onClick={() => handleSidebarClick('about')} className="hover:underline cursor-pointer">guest</span>
              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="text-[#E95420] font-semibold capitalize truncate">{activeTab}</span>
            </div>
          </div>

          <div className={`flex items-center space-x-1 border rounded p-0.5 shrink-0 ${
            isLightMode ? 'bg-white border-gray-300' : 'bg-[#222222] border-[#333333]'
          }`}>
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded transition-colors ${
              viewMode === 'grid' ? 'bg-[#E95420] text-white' : isLightMode ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white'
            }`}>
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded transition-colors ${
              viewMode === 'list' ? 'bg-[#E95420] text-white' : isLightMode ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white'
            }`}>
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Explorer Content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Sidebar */}
          <div className={`w-36 sm:w-44 border-r p-1.5 sm:p-2 space-y-0.5 overflow-y-auto shrink-0 ${
            isLightMode ? 'bg-[#eaeaea] border-gray-300' : 'bg-[#141414] border-[#2b2b2b]'
          }`}>
            <div className="text-[10px] text-gray-500 font-bold px-2 py-1 uppercase tracking-wider">Places</div>
            {places.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarClick(item.id)}
                  className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded transition-colors text-left ${
                    activeTab === item.id 
                      ? 'bg-[#E95420] text-white font-bold shadow' 
                      : isLightMode ? 'text-gray-700 hover:bg-black/5' : 'text-gray-300 hover:bg-[#252525]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Directory Viewer */}
          <div className={`flex-1 p-4 md:p-6 overflow-y-auto ${
            isLightMode ? 'bg-[#ffffff] text-gray-900' : 'bg-[#1e1e1e] text-gray-200'
          }`}>
            {activeTab === 'about' && (
              <div className={`mb-5 pb-3 border-b ${isLightMode ? 'border-gray-200' : 'border-[#333333]'}`}>
                <h3 className="text-sm font-bold text-[#E95420] mb-1">Home Directory (~/guest)</h3>
                <p className={`text-xs leading-relaxed ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
                  Welcome to my interactive DevSecOps desktop environment. Double click files to open editors/viewers or folders to explore further.
                </p>
              </div>
            )}

            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">Contents</div>
            
            {currentItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 space-y-2">
                <Folder className="w-10 h-10 mx-auto opacity-30" />
                <div>This folder is empty</div>
              </div>
            ) : isMobileListView ? (
              <div className={`flex flex-col space-y-2 ${isLightMode ? 'text-gray-900' : 'text-gray-200'}`}>
                {currentItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      {...getItemInteractions(item)}
                      className={`flex flex-row items-center space-x-3 w-full p-2.5 border-b transition-colors cursor-pointer group select-none ${
                        isLightMode ? 'hover:bg-gray-50 border-gray-200' : 'hover:bg-white/5 border-[#2a2a2a]'
                      }`}
                    >
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.color} shrink-0`} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[13px] font-medium transition-colors break-words ${isLightMode ? 'text-gray-800' : 'text-gray-200'}`}>
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase font-semibold shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {item.ext}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {currentItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      {...getItemInteractions(item)}
                      className={`p-2 rounded-lg flex flex-col items-center text-center space-y-1.5 transition-all cursor-pointer group select-none relative ${
                        isLightMode ? 'hover:bg-gray-100' : 'hover:bg-white/5'
                      }`}
                    >
                      {item.badge && (
                        <span className="absolute top-1 right-1 text-[8px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase font-semibold z-10">
                          {item.badge}
                        </span>
                      )}
                      <Icon className={`w-10 h-10 ${item.color} group-hover:scale-105 transition-transform drop-shadow shrink-0`} />
                      <span className={`text-[11px] font-medium w-full group-hover:text-[#E95420] transition-colors break-words leading-tight line-clamp-2 ${
                        isLightMode ? 'text-gray-800' : 'text-gray-200'
                      }`} title={item.name}>
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={`border rounded-lg overflow-hidden ${
                isLightMode ? 'border-gray-300 bg-white' : 'border-[#333333] bg-[#141414]'
              }`}>
                <div className={`grid grid-cols-12 px-3 py-2 text-[10px] font-bold uppercase border-b ${
                  isLightMode ? 'bg-gray-100 border-gray-300 text-gray-600' : 'bg-[#1c1c1c] border-[#333333] text-gray-400'
                }`}>
                  <div className="col-span-8">Name</div>
                  <div className="col-span-4">Type</div>
                </div>
                <div className={`divide-y ${isLightMode ? 'divide-gray-200' : 'divide-[#222222]'}`}>
                  {currentItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        {...getItemInteractions(item)}
                        className={`grid grid-cols-12 px-3 py-2 items-center cursor-pointer transition-colors group select-none ${
                          isLightMode ? 'hover:bg-gray-50' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="col-span-8 flex items-center space-x-2.5 min-w-0">
                          <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
                          <span className={`group-hover:text-[#E95420] transition-colors font-medium truncate ${
                            isLightMode ? 'text-gray-800' : 'text-gray-200'
                          }`} title={item.name}>
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase font-semibold shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="col-span-4 text-gray-400 text-[11px] truncate">
                          {item.ext}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
}