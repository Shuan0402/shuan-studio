import React from 'react';
import type { ExperienceItem } from '../../../data/experience';

const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => (
  <div className="group bg-white/60 border border-stone-100 px-8 py-4 rounded-2xl hover:shadow-sm transition-all">
    <div className="flex justify-between items-baseline mb-4">
      <h4 className="text-stone-800 font-black text-lg group-hover:text-blue-600 transition-colors">
        {item.title}
      </h4>
      <span className="text-stone-400 font-mono text-[11px] uppercase shrink-0 ml-4">
        {item.period}
      </span>
    </div>
    <p className="text-stone-500 text-sm leading-relaxed font-medium">
      {item.desc}
    </p>
  </div>
);

const ExperienceList: React.FC<{ items: ExperienceItem[] }> = ({ items }) => (
  <div 
    className="animate-fadeIn h-full overflow-y-auto pr-4 custom-scrollbar"
    style={{
      maskImage: 'linear-gradient(to bottom, transparent, black 30px, black calc(100% - 30px), transparent)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 30px, black calc(100% - 30px), transparent)'
    }}
  >
    <div className="grid gap-4 py-8"> {/* 增加 py-8 讓遮罩效果更自然 */}
      {items.map((item, idx) => (
        <ExperienceCard key={idx} item={item} />
      ))}
    </div>
  </div>
);

export default ExperienceList;