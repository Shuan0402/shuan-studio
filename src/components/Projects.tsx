// Projects.tsx
import { forwardRef, useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface ProjectItem {
  type: string;
  image: string[];
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  tags: string[];
  liveLink?: string;
  githubLink?: string;
}

const projectsData: ProjectItem[] = [
  {
    type: 'image',
    image: ['images/RANsomCheck_1.png', 'images/RANsomCheck_2.png', 'images/RANsomCheck_3.png'],
    title: 'RANsomCheck',
    subtitle: '基於深度學習的勒索病毒偵測平台',
    description: '開發基於 Transformer 的勒索病毒偵測模型 。透過動態分析 API 序列擷取行為特徵，準確率達 0.9994。並整合 React 與 Flask 打造即時網頁安全性分析平台 。',
    technologies: [
      'PyTorch',
      'Transformer',
      'React',
      'Flask',
      'TypeScript',
    ],
    tags: ['IEA/AIE 2025', '國科會大專生計畫', '專題競賽佳作', '勒索病毒偵測', '深度學習', '自然語言處理', '多人協作'],
    liveLink: 'https://link.springer.com/chapter/10.1007/978-981-96-8892-0_10',
    githubLink: 'https://github.com/Shuan0402/RANsomCheck'
  },
  {
    type: 'image',
    image: [
      'images/reddit_1.png',
      'images/reddit_2.png',
      'images/reddit_3.png',
      'images/reddit_4.png',
      'images/reddit_5.png',
      'images/reddit_6.png'
    ],
    title: 'Reddit Sentiment Analysis',
    subtitle: '基於 BERT 與 Bi-LSTM 的社群情感分析',
    description: '結合 Reddit API 與深度學習模型，針對不同 Subreddit 的大量評論進行情感傾向分析。系統整合 BERT 模型達成 95% 以上的辨識準確率，並透過 Observable 提供互動式數據視覺化，揭示社群網路中的情緒動態與分佈。',
    technologies: ['BERT', 'Bi-LSTM', 'Python', 'NLTK', 'Observable', 'Weights & Biases'],
    tags: ['自然語言處理', '情感分析', '數據視覺化', '多人協作'],
    liveLink: 'https://kiri487.github.io/2024-Spring-NLP-Reddit-Sentiment-Analysis/',
    githubLink: 'https://github.com/Kiri487/2024-Spring-NLP-Reddit-Sentiment-Analysis'
  },
  {
    type: 'video',
    image: ['videos/fb_scam_hunter.mp4'], 
    title: 'FB Scam Hunter',
    subtitle: '臉書詐騙廣告即時標記工具',
    description: 'FB Scam Hunter 是一款用於辨識臉書詐騙廣告的瀏覽器擴充元件。它能自動擷取 Facebook 廣告內容 ，透過後端 XGBoost 模型進行語意分析與風險判定，並在網頁上即時以紅框標註疑似詐騙的貼文。',
    technologies: ['FastAPI', 'XGBoost Classifier', 'Python', 'NLP', 'Chrome Extension V3','Feature Engineering'],
    tags: ['資訊安全', 'AIS3 Hackathon', '機器學習', '防詐工具', '多人協作'],
    liveLink: 'https://www.youtube.com/watch?v=PMrFTh-90as',
    githubLink: 'https://github.com/Shuan0402/FB_ScamHunter_backend'
  },
  {
    type: 'video',
    image: ['videos/SelfMap.mp4'],
    title: 'SelfMap',
    subtitle: '打造你專屬的旅行地圖',
    description: 'SelfMap 是一個個人化的地理資訊標記平台，旨在讓使用者記錄私房景點、撰寫遊記，並能與旅伴共同協作專屬的地圖。透過直觀的介面，將每一次旅行的足跡與想法轉化為珍貴的回憶地圖。',
    technologies: ['React', 'Firebase', 'MUI', 'Vite', 'ChatGPT 5.1'],
    tags: ['前端開發', '旅遊科技', '地圖協作', 'Vibe Coding', '獨立開發'],
    liveLink: 'https://shuan0402.github.io/selfMap/',
    githubLink: 'https://github.com/shuan0402/selfMap'
  },
  {
    type: 'image',
    image: ['images/elecookie_1.png', 'images/elecookie_2.png', 'images/elecookie_3.png', 'images/elecookie_4.png', 'images/elecookie_5.png', 'images/elecookie_6.png'],
    title: 'Elecookie',
    subtitle: '多角色餅乾電商平台',
    description: '基於 React 與 ASP.NET Core 開發的餅乾購物網站。支援會員、員工及管理員等多重身份權限，具備完整的購物車、訂單追蹤、店家商品管理及追蹤功能。',
    technologies: ['React.js', 'ASP.NET Core', 'PostgreSQL', 'Entity Framework Core'],
    tags: ['電商開發', '全端開發', '資料庫設計', '權限管理', '多人協作'],
    githubLink: 'https://github.com/Zch720/NTUT_112_1_DatabaseProject_backend'
  },
  {
    type: 'video',
    image: ['videos/boxbob.mp4'],
    title: 'BoxBob',
    subtitle: '2D 益智推箱子遊戲',
    description: '於物件導向程式設計課程開發的 2D 益智遊戲。利用課程提供之 C++/MFC 遊戲引擎框架，實作 16 個地圖關卡讀取、角色移動與碰撞偵測演算法、遊戲狀態機切換以及音效觸發邏輯。',
    technologies: ['C++', 'MFC', 'Win32 API', 'GDI+'],
    tags: ['遊戲開發', '物件導向', '益智遊戲', '多人協作'],
    liveLink: 'https://youtu.be/WznII5vH8jw',
    githubLink: 'https://github.com/Kiri487/2022-Spring-OOPL'
  },
  {
    type: 'video',
    image: ['videos/onchained.mp4'],
    title: 'OnChainED',
    subtitle: '區塊鏈學習認證平台',
    description: '專為教育機構設計的去中心化證書系統，結合 W3C VC 標準與 IPFS 永久存證技術。學生能自主管理具國際認可的數位證明，並支援雇主透過 QR Code 進行無須中心化伺服器的即時驗證。',
    technologies: ['React', 'MetaMask', 'DID/VC', 'SpruceID', 'IPFS/Arweave', 'Ethereum/Polygon'],
    tags: ['Web3', '區塊鏈', '去中心化身份', '教育科技', '多人協作'],
    githubLink: 'https://github.com/Shuan0402/OnChainED'
  },
  {
    type: 'video',
    image: ['videos/click-clack.mp4'],
    title: 'ClickClack',
    subtitle: 'AI 智慧打字練習平台',
    description: 'ClickClack 是一個結合生成式 AI 與文件分析技術的打字訓練網頁。使用者能透過 AI 創意寫手生成專屬文章，或上傳 PDF/PPTX 進行重點提取與擴充練習。',
    technologies: ['React 18', 'Zustand', 'Tailwind CSS', 'Node.js/Python API', 'Vite', 'LLM'],
    tags: ['前端開發', 'AI 應用', '效能工具', 'EdTech', '獨立開發'],
    liveLink: 'https://shuan0402.github.io/click-clack/',
    githubLink: 'https://github.com/shuan0402/click-clack/'
  },
  {
    type: 'image',
    image: ['images/article_reader.png'],
    title: 'ArticleReader',
    subtitle: '智慧朗讀助手 (WIP)',
    description: '結合 Flutter 跨平台開發與 Python Selenium 自動化技術。系統能精準解析網頁文章段落、自動導航至下一章節，並透過後端 API 提供精確到段落的書籤恢復功能。',
    technologies: ['Flutter', 'Python', 'Selenium', 'FastAPI', 'TTS'],
    tags: ['跨平台應用', '自動化技術', '混合架構', '軟體工程', '獨立開發'],
    githubLink: 'https://github.com/Shuan0402/ArticleReader'
  },
  {
    type: 'image',
    image: ["images/note_generator_1.png", "images/note_generator_2.png"],
    title: 'note_generator',
    subtitle: '個人化筆跡合成文本平台 (WIP)',
    description: '這是一款結合圖像處理與文本分析的桌面應用程式。使用者可以上傳自己的真實手寫字跡，系統會自動分析 .txt 文本並將其轉化為具有自然隨機感的手寫筆記圖片。支援多樣本字跡採集、隨機位移模擬。',
    technologies: ["Python 3.10", "Tkinter", "Pillow (PIL)", "WSLg", "Pathlib"],
    tags: ["圖像合成", "自動化工具", "桌面應用程式開發", "手寫筆記模擬", '多人協作'],
    githubLink: 'https://github.com/Shuan0402/Note_generator'
  },
  {
    type: 'image',
    image: ['images/random_food_1.png', 'images/random_food_2.png', 'images/random_food_3.png'],
    title: 'Ntut_RandomFood',
    subtitle: '北科大校園美食隨機抽選系統 (WIP)',
    description: '專為北科大學生設計的午餐決策工具。整合校園周邊餐廳清單，具備流暢的側邊選單動畫與隨機結果產生邏輯，並採用深綠色系專業設計。',
    technologies: ['JavaScript (ES6)', 'HTML5', 'CSS3 Animations'],
    tags: ['工具軟體', '原生網頁', '校園應用', '前端開發', '多人協作'],
    liveLink: 'https://shuan0402.github.io/Ntut_RandomFood/',
    githubLink: 'https://github.com/Shuan0402/Ntut_RandomFood'
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
  const currentProject = projectsData[currentProjectIndex];
  const isMultiImageProject = currentProject.type !== 'video' && currentProject.image.length > 1;
  const [volume, setVolume] = useState(1);

  // 1. 自動滾動邏輯
  useEffect(() => {
    if (isVideoPlaying || isMultiImageProject) return;

    const autoScrollInterval = setInterval(() => {
      setCurrentProjectIndex((prevIndex) => 
        (prevIndex + 1) % projectsData.length
      );
    }, 5000);

    return () => clearInterval(autoScrollInterval);
  }, [resetKey, isVideoPlaying]);

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
    e.stopPropagation();
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
      { threshold: 0.5 }
    );

    if (projectContainerRef.current) {
      observer.observe(projectContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const ImageCarousel = ({ 
    images, 
    title, 
    isActive, 
    onComplete 
  }: { 
    images: string[]; 
    title: string; 
    isActive: boolean; 
    onComplete: () => void 
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 邏輯 1：只負責計時切換索引
    useEffect(() => {
      if (!isActive || images.length <= 1) {
        setCurrentIndex(0);
        return;
      }

      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          return prevIndex === images.length - 1 ? -1 : prevIndex + 1;
        });
      }, 2000); 

      return () => clearInterval(timer);
    }, [images.length, isActive]);

    // 邏輯 2：當索引變成 -1 時，代表播完了，此時再通知父組件 (安全做法)
    useEffect(() => {
      if (currentIndex === -1) {
        setCurrentIndex(0);
        onComplete(); 
      }
    }, [currentIndex, onComplete]);

    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
        {images.map((img, index) => {
          const safeSrc = img 
            ? (img.startsWith('http') ? img : `${import.meta.env.BASE_URL}${img.replace(/^\//, '')}`)
            : '';

          return (
            <img
              key={index}
              src={safeSrc}
              alt={`${title} - ${index}`}
              className={`absolute transition-opacity duration-1000 ease-in-out max-w-full max-h-full object-contain ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          );
        })}
      </div>
    );
  };

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
              <div className="w-5/8 h-full flex items-center justify-center p-12 relative group overflow-hidden bg-stone-100/50">
                {project.type === 'video' ? (
                  <div className="relative w-full aspect-video z-20">
                    <video
                      key={currentProjectIndex}
                      src={project.image[0] ? `${import.meta.env.BASE_URL}${project.image[0].replace(/^\//, '')}` : ''}
                      title={project.title}
                      ref={(el) => {
                        if (index === currentProjectIndex) {
                          videoRef.current = el;
                          if (el) el.volume = volume;
                        }
                      }}
                      onClick={togglePlay}
                      className="w-full h-full rounded-xl shadow-2xl cursor-pointer object-cover"
                      onPlay={() => setisVideoPlaying(true)}
                      onPause={() => setisVideoPlaying(false)}
                      onEnded={() => {
                        setisVideoPlaying(false);
                        goToNextProject();
                      }}
                      autoPlay={isIntersecting && index === currentProjectIndex}
                    ></video>

                    {/* 音量滑軌控制項 */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <div className="flex items-center group/volume overflow-hidden max-w-[40px] hover:max-w-[150px] transition-all duration-500 ease-in-out">
                        <svg className="w-5 h-5 text-white ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                        
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={volume}
                          onChange={(e) => {
                            const newVolume = parseFloat(e.target.value);
                            setVolume(newVolume);
                            if (videoRef.current) videoRef.current.volume = newVolume;
                          }}
                          className="w-24 h-1 mx-3 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <ImageCarousel 
                    images={project.image} 
                    title={project.title} 
                    isActive={index === currentProjectIndex}
                    onComplete={goToNextProject}
                  />
                )}
              </div>

              {/* 右側：介紹區域 */}
              <div className="w-1/2 h-full p-15 flex flex-col overflow-y-auto bg-white/40">
                <div className="my-auto space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-stone-800 text-4xl font-black tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    <h4 className="text-stone-800 text-2xl font-black tracking-tight leading-tight">
                      {project.subtitle}
                    </h4>
                    <p className="text-stone-500 text-lg leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>
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
                        Website
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