import React from 'react';

interface SkillTagsProps {
  skills: string[];
}

const SkillTags: React.FC<SkillTagsProps> = ({ skills }) => {
  return (
    <div className="w-full pt-4">
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className="px-6 py-2.5 bg-white border border-stone-200 text-stone-600 text-[13px] font-bold rounded-full shadow-sm hover:border-blue-300 hover:text-blue-600 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillTags;