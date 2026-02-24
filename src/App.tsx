import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

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
          className="flex-1 overflow-y-auto p-12 md:p-24 scroll-smooth relative" // 加入 relative
        >
          <div className="max-w-5xl mx-auto space-y-32">
            
            {/* Section: Home */}
            <section 
              id="Home" 
              ref={sectionRefs.Home} 
              className="h-full flex items-center justify-center relative pt-12 pb-12"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-24 w-full max-w-6xl px-10">
                
                {/* 左側：大頭貼卡片區 */}
                <div className="flex flex-col items-center flex-none -mt-10">
                  <div className="relative group">
                    <div className="w-64 h-64 rounded-full border-[12px] border-stone-800 flex items-center justify-center overflow-hidden bg-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                      <span className="text-stone-300 font-bold tracking-widest text-xl">PHOTO</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <h1 className="text-3xl font-black text-stone-800 tracking-tight">
                      何穎宣 <span className="text-stone-400 font-light text-2xl ml-2">(Ho Ying-Xuan)</span>
                    </h1>
                  </div>
                </div>

                {/* 右側：文字介紹與標籤區 */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-6">
                    <h2 className="text-stone-800 text-5xl font-black tracking-tighter">About Me</h2>
                    <p className="text-blue-600 text-2xl font-extrabold tracking-tight">
                      Software Engineer Intern Candidate
                    </p>
                    
                    <div className="max-w-2xl text-stone-500 leading-relaxed font-medium text-lg">
                      大學畢業於 <span className="text-stone-900 font-bold">國立台北科技大學 電資學士班 資訊工程組</span>。<br />
                      目前就讀於 <span className="text-stone-900 font-bold">國立清華大學資訊安全研究所</span>。 <br />
                      致力於 AI 應用與軟體開發。
                    </div>
                  </div>

                  {/* 聯絡圖標 */}
                  <div className="flex space-x-4 text-2xl text-stone-700">
                    <div className="relative group/mail">
                      <a href="mailto:shuan114164510@gapp.nthu.edu.tw" className="hover:text-blue-600 transition-colors">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </a>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover/mail:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-stone-800 text-white text-[11px] py-1 px-3 rounded shadow-lg">
                        shuan114164510@gapp.nthu.edu.tw
                      </div>
                    </div>

                    <div className="relative group/phone">
                      <a href="tel:+886905068174" className="hover:text-blue-600 transition-colors">
                        <FontAwesomeIcon icon={faPhone} />
                      </a>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover/phone:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-stone-800 text-white text-[11px] py-1 px-3 rounded shadow-lg">
                        0905068174
                      </div>
                    </div>

                    <a href="https://github.com/Shuan0402" className="hover:text-blue-600 transition-colors"><FontAwesomeIcon icon={faGithub} /></a>
                    <a href="#https://www.linkedin.com/in/穎宣-何-4a2844356/" className="hover:text-blue-600 transition-colors"><FontAwesomeIcon icon={faLinkedin} /></a>
                  </div>

                  {/* Skills 標籤 */}
                  <div className="w-full pt-4">
                    <div className="flex flex-wrap gap-3">
                      {[
                        'Python', 'C++', 'JavaScript', 'React/Vue', 
                        'Node.js/Flask', '自動化測試 (CI/CD)', 
                        'AI/LLM 應用', '軟體品質管理', 'Git 版本控制'
                      ].map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-6 py-2.5 bg-white border border-stone-200 text-stone-600 text-[13px] font-bold rounded-full shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
              </div>
            </section>

            {/* Section: Projects */}
            <section id="Projects" ref={sectionRefs.Projects} className="min-h-[80vh]">
              <h2 className="text-stone-400 text-xs tracking-[0.5em] uppercase font-bold mb-12">Featured Projects</h2>
              <div className="h-96 bg-stone-200/50 rounded-3xl border-2 border-dashed border-stone-300 flex items-center justify-center text-stone-400 font-bold uppercase tracking-widest">
                Project Showcase Coming Soon
              </div>
            </section>

            {/* Section: Experience */}
            <section id="Experience" ref={sectionRefs.Experience} className="min-h-[80vh]">
              <h2 className="text-stone-400 text-xs tracking-[0.5em] uppercase font-bold mb-12">Work & Education</h2>
              <div className="space-y-12">
                 {/* 這裡之後填入清華大學與實習經歷 */}
                 <div className="h-64 bg-stone-200/30 rounded-3xl"></div>
              </div>
            </section>

            {/* Section: Contact */}
            <section id="Contact" ref={sectionRefs.Contact} className="min-h-[60vh]">
              <h2 className="text-stone-400 text-xs tracking-[0.5em] uppercase font-bold mb-12 text-center">Contact</h2>
              <div className="text-center text-3xl font-bold text-stone-800">
                Let's work together.
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;