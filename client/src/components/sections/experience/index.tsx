import { forwardRef, useState } from 'react';
import { experienceData } from '../../../data/experience';
import ExperienceNav from './ExperienceNav';
import ExperienceList from './ExperienceList';

interface SectionProps {
  id: string;
}

const Experience = forwardRef<HTMLElement, SectionProps>((props, ref) => {
  const [activeCategory, setActiveCategory] = useState(experienceData[0].category);

  const categories = experienceData.map(group => group.category);
  const activeGroup = experienceData.find(group => group.category === activeCategory);

  return (
    <section 
      id={props.id} 
      ref={ref} 
      className="w-full h-auto md:h-full py-10 px-4 md:px-10 flex flex-col items-center overflow-x-hidden"
    >
      {/* 標題部分 */}
      <div className="w-full max-w-7xl mb-6 md:mb-12 flex-none">
        <h2 className="text-stone-400 text-xs tracking-[0.5em] uppercase font-black text-center md:text-left">
          Experience
        </h2>
      </div>

      {/* 主要內容卡片 */}
      <div className="w-full max-w-7xl bg-white/70 backdrop-blur-sm border border-stone-200 rounded-[24px] md:rounded-[32px] p-6 md:p-12 shadow-sm flex-1 flex flex-col min-h-0 mb-10 md:mb-0">
        
        <div className="flex flex-col md:flex-row gap-0 flex-1 min-h-0">
          
          <ExperienceNav 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="flex-1 mt-6 md:mt-0 md:pl-12 relative min-h-0 overflow-visible md:overflow-hidden">
            {activeGroup && <ExperienceList items={activeGroup.items} />}
          </div>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';
export default Experience;