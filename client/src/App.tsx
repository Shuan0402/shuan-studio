import { useScrollSpy } from './hooks/useScrollSpy';
import { Navbar } from './components/layout/Navbar';
import Home from './components/Home';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ChatAI from './components/ChatAI';

const TABS = ['Home', 'Experience', 'Projects', 'ChatAI'];

function App() {
  const { activeTab, scrollContainerRef, sectionRefs, scrollToSection } = useScrollSpy(TABS);

  return (
    <div className="h-screen w-screen bg-stone-200 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-[1440px] h-[95vh] bg-stone-100 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
        
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