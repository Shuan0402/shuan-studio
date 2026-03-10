import React from 'react';

interface ExperienceNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ExperienceNav: React.FC<ExperienceNavProps> = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="md:w-56 flex-none relative border-r border-stone-200 pr-8 overflow-y-auto">
    <div className="space-y-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`block w-full text-left px-5 py-3 rounded-xl transition-all duration-300 font-bold text-sm ${
            activeCategory === cat 
            ? 'bg-stone-800 text-white shadow-md' 
            : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
);

export default ExperienceNav;