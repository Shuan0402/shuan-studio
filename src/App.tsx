import { useState, useRef, useEffect } from 'react';

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
    if (target && scrollContainerRef.current) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 3. 自動偵測捲動位置並更新標籤 (Scroll Spy)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observerOptions = {
      root: container,
      rootMargin: '-20% 0px -70% 0px', // 偵測區塊是否在螢幕偏上方的位置
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

    // 開始觀察每個 Section
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
                    onClick={() => setActiveTab(tab)}
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

        {/* 4. 內容區塊：設定 overflow-y-auto，當內容超過紙張高度時會出現滾動條 */}
        <main className="flex-1 overflow-y-auto p-12 md:p-20 scrollbar-hide">
          {/* 這裡是你的分頁內容 */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'Home' && (
              <section className="flex flex-col items-center text-center space-y-8">
                <div className="w-40 h-40 bg-stone-200 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-stone-400 font-bold">
                  PHOTO
                </div>
                <div>
                  <h1 className="text-5xl font-black text-stone-800 tracking-tight mb-4">
                    何穎宣 <span className="text-stone-300 font-light">/ He Ying-Xuan</span>
                  </h1>
                  <p className="text-lg text-stone-500 font-medium italic">
                    「專注於後端開發與 AI 應用實作，致力於透過自動化測試提升軟體品質。」
                  </p>
                </div>
                
                {/* 增加一些測試文字來測試滾動效果 */}
                <div className="h-[500px] w-full bg-stone-200/30 rounded-xl flex items-center justify-center text-stone-400">
                   滾動測試區塊 (Scroll Test)
                </div>
              </section>
            )}
            
            {/* 這裡之後可以串接你的學歷資料 */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;