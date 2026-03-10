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
      className="w-full h-full py-10 px-10 flex flex-col items-center overflow-hidden"
    >
      <div className="w-full max-w-7xl mb-12 flex-none">
        <h2 className="text-stone-400 text-xs tracking-[0.5em] uppercase font-black">Experience</h2>
      </div>

      <div className="w-full max-w-7xl bg-white/70 backdrop-blur-sm border border-stone-200 rounded-[32px] p-8 md:p-12 shadow-sm flex-1 flex flex-col min-h-0">
        <div className="flex flex-col md:flex-row gap-0 flex-1 min-h-0">
          <ExperienceNav 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="flex-1 md:pl-12 mt-8 md:mt-0 relative min-h-0">
            {activeGroup && <ExperienceList items={activeGroup.items} />}
          </div>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';
export default Experience;