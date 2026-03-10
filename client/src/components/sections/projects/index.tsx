import { forwardRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { projectsData } from '../../../data/projects';
import ProjectMedia from './ProjectMedia';
import ProjectInfo from './ProjectInfo';
import { useProjectCarousel } from './hooks/useProjectCarousel';

interface SectionProps {
  id: string;
}

const Projects = forwardRef<HTMLElement, SectionProps>((props, ref) => {
  const { state, actions } = useProjectCarousel(projectsData);

  return (
    <section 
      id={props.id} 
      ref={ref} 
      className="w-full h-full px-10 flex flex-col items-center py-10 overflow-hidden"
      onMouseEnter={() => actions.setIsHovering(true)}
      onMouseLeave={() => actions.setIsHovering(false)}
    >
      <div className="w-full max-w-7xl mb-12 flex-none text-left">
        <h2 className="text-stone-400 text-xs tracking-[0.5em] uppercase font-black">PROJECTS</h2>
      </div>

      <div 
        ref={state.projectContainerRef}
        className="relative w-full max-w-7xl flex-1 rounded-[32px] overflow-hidden bg-white/70 backdrop-blur-sm border border-stone-200 shadow-sm"
      >
        <div 
          className="w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${state.currentProjectIndex * 100}%)` }}
        >
          {projectsData.map((project, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full flex">
              <ProjectMedia 
                project={project}
                isActive={index === state.currentProjectIndex}
                isIntersecting={state.isIntersecting}
                volume={state.volume}
                setVolume={actions.setVolume}
                onVideoEnd={actions.goToNext}
                onVideoPlay={actions.setIsVideoPlaying}
                videoRef={index === state.currentProjectIndex ? state.videoRef : { current: null }}
                onTogglePlay={actions.togglePlay}
              />
              <ProjectInfo project={project} />
            </div>
          ))}
        </div>

        {/* 導航按鈕 */}
        <button
          onClick={actions.goToPrev}
          className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-stone-800 p-4 rounded-full transition-all duration-500 ${state.isHovering ? 'opacity-100' : 'opacity-0'} z-30 shadow-lg border border-white/50`}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={actions.goToNext}
          className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-stone-800 p-4 rounded-full transition-all duration-500 ${state.isHovering ? 'opacity-100' : 'opacity-0'} z-30 shadow-lg border border-white/50`}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* 底部指示器 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-30">
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => actions.handleManualAction(index)}
              className={`transition-all duration-500 rounded-full ${
                index === state.currentProjectIndex ? 'w-10 h-2 bg-stone-800' : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
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