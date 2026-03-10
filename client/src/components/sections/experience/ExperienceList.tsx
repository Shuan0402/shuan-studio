import React from 'react';
import type { ExperienceItem } from '../../../data/experience';

const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => (
  <div className="group bg-white/60 border border-stone-100 px-6 md:px-8 py-4 rounded-2xl hover:shadow-sm transition-all">
    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-3 md:mb-4 gap-1 md:gap-4">
      <h4 className="text-stone-800 font-black text-base md:text-lg group-hover:text-blue-600 transition-colors">
        {item.title}
      </h4>
      <span className="text-stone-400 font-mono text-[10px] md:text-[11px] uppercase">
        {item.period}
      </span>
    </div>
    <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-medium">
      {item.desc}
    </p>
  </div>
);

const ExperienceList: React.FC<{ items: ExperienceItem[] }> = ({ items }) => (
  <div 
    className="animate-fadeIn h-auto md:h-full overflow-y-visible md:overflow-y-auto md:pr-4 custom-scrollbar"
    style={{
      maskImage: 'linear-gradient(to bottom, transparent, black 30px, black calc(100% - 30px), transparent)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 30px, black calc(100% - 30px), transparent)'
    }}
  >
    <div className="grid gap-4 py-4 md:py-8">
      {items.map((item, idx) => (
        <ExperienceCard key={idx} item={item} />
      ))}
    </div>
  </div>
);

export default ExperienceList;