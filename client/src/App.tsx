import { useScrollSpy } from './hooks/useScrollSpy';
import { Navbar } from './components/layout/Navbar';
import Home from './components/sections/home/index';
import Experience from './components/sections/experience/index';
import Projects from './components/sections/projects/index';
import ChatAI from './components/sections/chatAI/index';

const TABS = ['Home', 'Experience', 'Projects', 'ChatAI'];

function App() {
  const { activeTab, scrollContainerRef, sectionRefs, scrollToSection } = useScrollSpy(TABS);

  return (
    // 修改處：手機版佔滿全螢幕 (p-0)，電腦版才顯示背景邊距 (md:p-4)
    <div className="h-screen w-screen bg-stone-200 flex items-center justify-center md:p-4 overflow-hidden">
      
      {/* 修改處：手機版拿掉圓角 (rounded-none)，電腦版保留圓角 (md:rounded-3xl) */}
      <div className="w-full max-w-[1440px] h-full md:h-[95vh] bg-stone-100 md:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
        
        <Navbar tabs={TABS} activeTab={activeTab} onTabClick={scrollToSection} />

        <main ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth">
          <Home id="Home" ref={sectionRefs.Home} />
          <Experience id="Experience" ref={sectionRefs.Experience} />
          <Projects id="Projects" ref={sectionRefs.Projects} />
          <ChatAI id="ChatAI" ref={sectionRefs.ChatAI} />
        </main>
        
      </div>
    </div>
  );
}
export default App;