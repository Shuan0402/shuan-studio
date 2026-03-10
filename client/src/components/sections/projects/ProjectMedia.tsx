import React, { useRef, useEffect } from 'react';
import ImageCarousel from './ImageCarousel';
import type { ProjectItem } from '../../../data/projects';

interface ProjectMediaProps {
  project: ProjectItem;
  isActive: boolean;
  isIntersecting: boolean;
  volume: number;
  setVolume: (v: number) => void;
  onVideoEnd: () => void;
  onVideoPlay: (playing: boolean) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onTogglePlay: (e: React.MouseEvent) => void;
}

const ProjectMedia: React.FC<ProjectMediaProps> = ({
  project,
  isActive,
  isIntersecting,
  volume,
  setVolume,
  onVideoEnd,
  onVideoPlay,
  videoRef,
  onTogglePlay
}) => {
  
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume, isActive, videoRef]);

  return (
    <div className="w-5/8 h-full flex items-center justify-center p-12 relative group overflow-hidden bg-stone-100/50">
      {project.type === 'video' ? (
        <div className="relative w-full aspect-video z-20">
          <video
            key={project.title}
            src={`${import.meta.env.BASE_URL}${project.image[0].replace(/^\//, '')}`}
            ref={videoRef}
            onClick={onTogglePlay}
            className="w-full h-full rounded-xl shadow-2xl cursor-pointer object-cover"
            onPlay={() => onVideoPlay(true)}
            onPause={() => onVideoPlay(false)}
            onEnded={onVideoEnd}
            autoPlay={isIntersecting && isActive}
            muted={volume === 0}
          />

          <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100">
            <div className="flex items-center group/volume overflow-hidden max-w-[40px] hover:max-w-[150px] transition-all duration-500 ease-in-out">
              <svg className="w-5 h-5 text-white ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                onMouseDown={(e) => e.stopPropagation()}
                className="w-24 h-1 mx-3 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20">
               <svg className="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
               </svg>
            </div>
          </div>
        </div>
      ) : (
        <ImageCarousel 
          images={project.image} 
          title={project.title} 
          isActive={isActive} 
          onComplete={onVideoEnd}
        />
      )}
    </div>
  );
};

export default ProjectMedia;