// Projects.tsx
import { forwardRef, useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface ProjectItem {
  image: string;
  title: string;
  description: string;
  technologies: string[];
  tags: string[];
  link?: string;
}

const projectsData: ProjectItem[] = [
  {
    image: '/images/selfmap-cover.jpg',
    title: 'selfMap: 互動式數據可視化',
    description: '一個基於 D3.js 實現的地理數據可視化工具，用於展示人口、經濟等分佈數據。使用者可根據篩選條件實時探索不同區域的數據變化。',
    technologies: ['D3.js', 'React', 'Node.js', 'PostgreSQL'],
    tags: ['前端開發', '數據可視化', '地理資訊'],
    link: '#',
  },
  {
    image: '/images/typing-arena-cover.jpg',
    title: 'Typing Arena: 即時打字對戰',
    description: '使用 Socket.IO 實現的即時多人打字對戰遊戲，支援房間創建、排行榜、和不同難度模式。提供流暢的用戶體驗。',
    technologies: ['Socket.IO', 'React', 'Express', 'MongoDB'],
    tags: ['全端開發', '即時通訊', '遊戲'],
    link: '#',
  },
  {
    image: '/images/security-framework.jpg',
    title: '自動化滲透測試框架',
    description: '結合多種開源工具與自研腳本，實現自動化掃描常見漏洞並生成報告的框架。用於內部安全評估與教學。',
    technologies: ['Python', 'Docker', 'Kali Linux Tools', 'Flask'],
    tags: ['資安', '自動化', '滲透測試'],
    link: '#',
  },
  {
    image: '/images/fraud-detection.jpg',
    title: 'AI 詐騙偵測 LINE Bot',
    description: '基於自然語言處理技術，分析 LINE 訊息中的關鍵字與模式，即時預警潛在的詐騙資訊。準確率達 90%。',
    technologies: ['Python', 'FastAPI', 'NLP', 'TensorFlow'],
    tags: ['AI', '機器學習', '自然語言處理', 'LINE Bot'],
    link: '#',
  },
];

const Projects = forwardRef<HTMLElement, {}>((_, ref) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [resetKey, setResetKey] = useState(0); // 關鍵：用於重置計時器的狀態

  const projectContainerRef = useRef<HTMLDivElement>(null);

  // 1. 自動滾動邏輯：依賴 resetKey
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      setCurrentProjectIndex((prevIndex) => 
        (prevIndex + 1) % projectsData.length
      );
    }, 5000); // 每 5 秒自動滾動

    // 當 resetKey 改變時，會先執行 clearInterval，再重新開啟一個 5 秒計時
    return () => clearInterval(autoScrollInterval);
  }, [resetKey]); 

  // 2. 統一的手動操作處理函式
  const handleManualAction = useCallback((index: number) => {
    setCurrentProjectIndex(index);
    setResetKey(prev => prev + 1); // 改變 Key 來重置 useEffect 裡的計時器
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
              {/* 左側：圖片區域 (黃色區域) */}
              <div className="w-1/2 h-full flex items-center justify-center p-12 relative overflow-hidden bg-stone-100/50">
                 <img 
                    src={project.image} 
                    alt={project.title} 
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl z-0"
                 />
              </div>

              {/* 右側：介紹區域 (藍色區域) */}
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

                {project.link && (
                  <div className="pt-4">
                    <a 
                      href={project.link} 
                      className="group inline-flex items-center text-stone-800 font-black text-sm tracking-widest uppercase"
                    >
                      Explore Project
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                )}
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