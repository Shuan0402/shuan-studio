import React from 'react';

interface ExperienceNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ExperienceNav: React.FC<ExperienceNavProps> = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="w-full md:w-56 flex-none relative border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0 md:pr-8 overflow-x-auto md:overflow-y-auto scrollbar-hide">
    <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-4 min-w-max md:min-w-0">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`whitespace-nowrap px-5 py-2.5 md:py-3 rounded-xl transition-all duration-300 font-bold text-xs md:text-sm ${
            activeCategory === cat 
            ? 'bg-stone-800 text-white shadow-md scale-105 md:scale-100' 
            : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100 md:hover:bg-transparent'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
);

export default ExperienceNav;