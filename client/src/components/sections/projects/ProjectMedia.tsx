import React, { useEffect } from 'react';
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
    <div className="w-full md:w-5/8 h-auto md:h-full flex items-center justify-center p-6 md:p-12 relative group overflow-hidden bg-stone-100/50">
      
      {project.type === 'video' ? (
        <div className="relative w-full aspect-video z-20">
          <video
            key={project.title}
            src={`${import.meta.env.BASE_URL}${project.image[0].replace(/^\//, '')}`}
            ref={videoRef}
            onClick={onTogglePlay}
            className="w-full h-full rounded-xl shadow-xl md:shadow-2xl cursor-pointer object-contain md:object-cover"
            onPlay={() => onVideoPlay(true)}
            onPause={() => onVideoPlay(false)}
            onEnded={onVideoEnd}
            autoPlay={isIntersecting && isActive}
            muted={volume === 0}
            playsInline
          />

          {/* 音量控制條 */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 md:p-2 rounded-full transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100">
            <div className="flex items-center group/volume overflow-hidden max-w-[32px] md:max-w-[40px] hover:max-w-[150px] transition-all duration-500 ease-in-out">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="w-20 md:w-24 h-1 mx-2 md:mx-3 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>

          {/* 播放圖標 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-full border border-white/20">
               <svg className="w-6 h-6 md:w-8 md:h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
               </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full aspect-video z-20">
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <ImageCarousel 
                images={project.image} 
                title={project.title} 
                isActive={isActive} 
                onComplete={onVideoEnd}
            />
            </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMedia;