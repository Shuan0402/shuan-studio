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

        {/* 主要捲動區塊 */}
        <main 
          ref={scrollContainerRef} 
          className="flex-1 overflow-y-auto p-12 md:p-24 scroll-smooth"
        >
          <div className="max-w-5xl mx-auto space-y-32">
            
            {/* Section: Home */}
            <section id="Home" ref={sectionRefs.Home} className="min-h-screen flex flex-col items-center pt-20 pb-32">
              <div className="flex flex-col md:flex-row gap-16 items-start justify-center">
                {/* 左側：頭像卡片區 */}
                <div className="flex-none relative">
                  <div className="p-8 flex flex-col items-center">
                    {/* 圓形頭像 */}
                    <div className="w-56 h-56 rounded-full border-[10px] border-stone-800 flex items-center justify-center overflow-hidden bg-white shadow-inner mb-8">
                      <span className="text-stone-300 font-bold tracking-widest text-xl">PHOTO</span>
                    </div>
                    
                    {/* 姓名 */}
                    <h2 className="text-stone-800 text-2xl font-bold mb-2">何穎宣 (Ho Ying-Xuan)</h2>
                  </div>
                </div>

                {/* 右側：文字介紹區 */}
                <div className="flex-1 space-y-8 pt-6">
                  <header>
                    <h2 className="text-stone-800 text-2xl font-bold mb-2">About Me</h2>
                    <p className="text-stone-500 text-xl font-bold mt-4">
                      Software Engineer Intern Candidate
                    </p>
                  </header>

                  <div className="max-w-2xl">
                    <p className="text-stone-500 leading-relaxed font-medium">
                      TODO
                    </p>
                  </div>

                  {/* 社群圖示 */}
                  <div className="flex space-x-6 text-2xl text-stone-700">
                    <a href="mailto:shuan114164510@gapp.nthu.edu.tw" className="hover:text-blue-600 transition-colors">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                    <a href="tel:0905068174" className="hover:text-blue-600 transition-colors">
                      <FontAwesomeIcon icon={faPhone} />
                    </a>
                    <a href="https://github.com/Shuan0402" target="_blank" className="hover:text-blue-600 transition-colors">
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://linkedin.com/in/穎宣-何-4a2844356/" target="_blank" className="hover:text-blue-600 transition-colors">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
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