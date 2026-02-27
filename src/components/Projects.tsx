// Projects.tsx
import { forwardRef, useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface ProjectItem {
  type: string;
  image: string;
  title: string;
  description: string;
  technologies: string[];
  tags: string[];
  liveLink?: string;
  githubLink?: string;
}

const projectsData: ProjectItem[] = [
  {
    type: 'video',
    image: '/videos/SelfMap.mp4',
    title: 'SelfMap：打造你專屬的旅行地圖',
    description: 'SelfMap 是一個個人化的地理資訊標記平台，旨在讓使用者記錄私房景點、撰寫遊記，並能與旅伴共同協作專屬的地圖。透過直觀的介面，將每一次旅行的足跡與想法轉化為珍貴的回憶地圖。',
    technologies: ['React', 'Firebase', 'MUI', 'Vite', 'ChatGPT 5.1'],
    tags: ['前端開發', '旅遊科技', '地圖協作'],
    liveLink: 'https://shuan0402.github.io/selfMap/',
    githubLink: 'https://github.com/shuan0402/selfMap'
  },
  {
    type: 'image',
    image: '/images/typing-arena-cover.jpg',
    title: 'Typing Arena: 即時打字對戰',
    description: '使用 Socket.IO 實現的即時多人打字對戰遊戲，支援房間創建、排行榜、和不同難度模式。提供流暢的用戶體驗。',
    technologies: ['Socket.IO', 'React', 'Express', 'MongoDB'],
    tags: ['全端開發', '即時通訊', '遊戲'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    type: 'image',
    image: '/images/security-framework.jpg',
    title: '自動化滲透測試框架',
    description: '結合多種開源工具與自研腳本，實現自動化掃描常見漏洞並生成報告的框架。用於內部安全評估與教學。',
    technologies: ['Python', 'Docker', 'Kali Linux Tools', 'Flask'],
    tags: ['資安', '自動化', '滲透測試'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    type: 'image',
    image: '/images/fraud-detection.jpg',
    title: 'AI 詐騙偵測 LINE Bot',
    description: '基於自然語言處理技術，分析 LINE 訊息中的關鍵字與模式，即時預警潛在的詐騙資訊。準確率達 90%。',
    technologies: ['Python', 'FastAPI', 'NLP', 'TensorFlow'],
    tags: ['AI', '機器學習', '自然語言處理', 'LINE Bot'],
    liveLink: '#',
    githubLink: '#',
  },
];

const Projects = forwardRef<HTMLElement, {}>((_, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [isVideoPlaying, setisVideoPlaying] = useState(false);
  const projectContainerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // 1. 自動滾動邏輯
  useEffect(() => {
    if (isVideoPlaying) return; // 影片播放中，不啟動計時器

    const autoScrollInterval = setInterval(() => {
      setCurrentProjectIndex((prevIndex) => 
        (prevIndex + 1) % projectsData.length
      );
    }, 5000); // 改回 5 秒

    return () => clearInterval(autoScrollInterval);
  }, [resetKey, isVideoPlaying]); // 必須包含 isVideoPlaying

  // 2. 統一的手動操作處理函式
  const handleManualAction = useCallback((index: number) => {
    setCurrentProjectIndex(index);
    setisVideoPlaying(false);
    setResetKey(prev => prev + 1);
  }, []);

  const goToNextProject = useCallback(() => {
    const nextIndex = (currentProjectIndex + 1) % projectsData.length;
    handleManualAction(nextIndex);
  }, [currentProjectIndex, handleManualAction]);

  const goToPreviousProject = useCallback(() => {
    const prevIndex = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
    handleManualAction(prevIndex);
  }, [currentProjectIndex, handleManualAction]);

  const handleDotClick = useCallback((index: number) => {
    handleManualAction(index);
  }, [handleManualAction]);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件向上傳遞，避免誤觸外層容器
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.5 } // 當 50% 的組件進入視線時觸發
    );

    if (projectContainerRef.current) {
      observer.observe(projectContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="Projects" 
      ref={ref} 
      className="w-full h-full px-10 flex flex-col items-center py-10 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 標題區 */}
      <div className="w-full max-w-7xl mb-12 flex-none text-left">
        <h2 className="text-stone-400 text-xs tracking-[0.5em] uppercase font-black">
          PROJECTS
        </h2>
      </div>

      {/* 投影片主容器 */}
      <div 
        ref={projectContainerRef}
        className="relative w-full max-w-7xl flex-1 rounded-[32px] overflow-hidden bg-white/70 backdrop-blur-sm border border-stone-200 shadow-sm"
        >
        {/* 內容軌道 */}
        <div 
          className="w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
        >
          {projectsData.map((project, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-full h-full flex"
            >
              {/* 左側：媒體區域 (影片或圖片) */}
              <div className="w-3/4 h-full flex items-center justify-center p-12 relative overflow-hidden bg-stone-100/50">
                {project.type === 'video' ? (
                  <video
                    key={currentProjectIndex}
                    src={project.image}
                    title={project.title}
                    ref={index === currentProjectIndex ? videoRef : null}
                    onClick={togglePlay}
                    className="w-full aspect-video rounded-xl shadow-2xl z-20 cursor-pointer"
                    onPlay={() => setisVideoPlaying(true)}
                    onPause={() => setisVideoPlaying(false)}
                    onEnded={() => {
                      setisVideoPlaying(false);
                      goToNextProject();
                    }}
                    autoPlay={isIntersecting && index === currentProjectIndex}
                    // muted
                  ></video>
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl z-0"
                  />
                )}
              </div>

              {/* 右側：介紹區域 */}
              <div className="w-1/2 h-full p-16 flex flex-col justify-center space-y-8 bg-white/40">
                <div className="space-y-4">
                  <h3 className="text-stone-800 text-4xl font-black tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-stone-500 text-lg leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-stone-400 text-[10px] font-black mb-3 uppercase tracking-[0.2em]">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="bg-blue-50 text-blue-600 border border-blue-100 text-[11px] font-bold px-3 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-stone-400 text-[10px] font-black mb-3 uppercase tracking-[0.2em]">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-stone-100 text-stone-500 border border-stone-200 text-[11px] font-bold px-3 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 右側：按鈕區域 (輕量化設計) */}
                <div className="flex items-center gap-8 pt-6">
                  {/* 實際網頁連結 */}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center text-stone-500 hover:text-stone-900 transition-colors duration-300"
                    >
                      <span className="text-[11px] font-black tracking-[0.2em] uppercase border-b border-transparent group-hover:border-stone-900 pb-0.5 transition-all">
                        Demo
                      </span>
                      <svg className="w-3.5 h-3.5 ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}

                  {/* GitHub 連結 */}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center text-stone-500 hover:text-stone-900 transition-colors duration-300"
                    >
                      <span className="text-[11px] font-black tracking-[0.2em] uppercase border-b border-transparent group-hover:border-stone-900 pb-0.5 transition-all">
                        Github
                      </span>
                      <svg className="w-3.5 h-3.5 ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 左右導航按鈕 (壓在內容上方，Hover 才顯示) */}
        <button
          onClick={goToPreviousProject}
          className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-stone-800 p-4 rounded-full transition-all duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'} z-20 shadow-lg border border-white/50`}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={goToNextProject}
          className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-stone-800 p-4 rounded-full transition-all duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'} z-20 shadow-lg border border-white/50`}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* 底部點點指示器 (壓在內容上方) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentProjectIndex 
                ? 'w-10 h-2 bg-stone-800' 
                : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';
export default Projects;