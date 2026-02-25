import { useState, useRef, useEffect } from 'react';

import Home from './components/Home';
import Experience from './components/Experience';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const tabs = ['Home', 'Projects', 'Experience', 'Contact'];

  // 1. 建立各個段落的 Ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = {
    Home: useRef<HTMLElement>(null),
    Projects: useRef<HTMLElement>(null),
    Experience: useRef<HTMLElement>(null),
    Contact: useRef<HTMLElement>(null),
  };

  // 2. 點擊標籤捲動到對應位置
  const scrollToSection = (tab: string) => {
    const target = sectionRefs[tab as keyof typeof sectionRefs].current;
    const container = scrollContainerRef.current;

    if (target && container) {
      // 取得目標元素相對於容器的垂直距離
      const paddingOffset = 100; 
      const targetOffset = target.offsetTop - paddingOffset;

      // 手動執行容器捲動
      container.scrollTo({
        top: targetOffset,
        behavior: 'smooth',
      });
      
      // 點擊時也手動設定一次 ActiveTab，確保反應即時
      setActiveTab(tab); 
    }
  };

  // 3. 自動偵測捲動位置並更新標籤 (Scroll Spy)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observerOptions = {
      root: container,
      rootMargin: '-20% 0px -100% 0px', // 偵測區塊是否在螢幕偏上方的位置
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) setActiveTab(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-screen w-screen bg-stone-200 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-[1440px] h-[95vh] bg-stone-100 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
        {/* bar */}
        <nav className="relative bg-stone-50/80 backdrop-blur-md flex-none z-50">
          <div className="flex justify-center items-center py-5">
            <ul className="flex space-x-12 text-[13px] text-stone-500 font-bold tracking-[0.15em] uppercase">
              {tabs.map((tab) => (
                <li key={tab} className="relative">
                  <button
                    onClick={() => scrollToSection(tab)}
                    className={`transition-colors cursor-pointer ${
                      activeTab === tab ? 'text-blue-600' : 'text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    {tab}
                  </button>

                  {activeTab === tab && (
                    <div className="absolute left-0 right-0 bottom-[-21px] h-[4px] bg-blue-600 z-10"></div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="w-[90%] border-b-2 border-stone-200/80"></div>
          </div>
        </nav>

        {/* 主要捲動區塊 */}
        <main 
          ref={scrollContainerRef} 
          className="flex-1 overflow-y-auto relative scroll-smooth h-full"
        >
          {/* <div className="max-w-5xl mx-auto space-y-32"> */}
            
            {/* Section: Home */}
            <Home ref={sectionRefs.Home} />

            {/* Section: Experience */}
            <Experience ref={sectionRefs.Experience} />

        </main>
      </div>
    </div>
  );
}

export default App;