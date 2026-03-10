import React from 'react';
import type { ProjectItem } from '../../../data/projects';

interface ProjectInfoProps {
  project: ProjectItem;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  return (
    <div className="w-full md:w-1/2 h-auto md:h-full p-6 md:p-12 flex flex-col overflow-y-visible md:overflow-y-auto bg-white/60 md:bg-white/40">
      
      {/* 核心內容區 */}
      <div className="md:my-auto space-y-6 md:space-y-8">
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-stone-800 text-2xl md:text-4xl font-black tracking-tight leading-tight">
            {project.title}
          </h3>
          <h4 className="text-stone-800 text-lg md:text-2xl font-black tracking-tight leading-tight">
            {project.subtitle}
          </h4>
          <p className="text-stone-500 text-sm md:text-lg leading-relaxed font-medium">
            {project.description}
          </p>
        </div>
      </div>

      {/* 技術棧與標籤區 */}
      <div className="grid grid-cols-1 gap-6 mt-6 md:mt-8">
        {/* Technologies */}
        <div>
          <h4 className="text-stone-400 text-[10px] font-black mb-2 md:mb-3 uppercase tracking-[0.2em]">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span 
                key={i} 
                className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] md:text-[11px] font-bold px-2.5 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-stone-400 text-[10px] font-black mb-2 md:mb-3 uppercase tracking-[0.2em]">
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span 
                key={i} 
                className="bg-stone-100 text-stone-500 border border-stone-200 text-[10px] md:text-[11px] font-bold px-2.5 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 外部連結按鈕區 */}
      <div className="flex items-center gap-6 md:gap-8 pt-8 md:pt-8 mt-6 md:mt-auto pb-8 md:pb-0">
        {/* Website Link */}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center text-stone-500 hover:text-stone-900 transition-colors duration-300"
          >
            <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase border-b border-transparent group-hover:border-stone-900 pb-0.5 transition-all">
              Website
            </span>
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5 ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        {/* GitHub Link */}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center text-stone-500 hover:text-stone-900 transition-colors duration-300"
          >
            <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase border-b border-transparent group-hover:border-stone-900 pb-0.5 transition-all">
              Github
            </span>
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5 ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;