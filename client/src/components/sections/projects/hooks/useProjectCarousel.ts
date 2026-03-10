import { useState, useEffect, useCallback, useRef } from 'react';
import type { ProjectItem } from '../../../../data/projects';

export const useProjectCarousel = (projectsData: ProjectItem[]) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [volume, setVolume] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const projectContainerRef = useRef<HTMLDivElement>(null);

  const currentProject = projectsData[currentProjectIndex];
  const isMultiImageProject = currentProject.type !== 'video' && currentProject.image.length > 1;

  // 自動輪播計時器
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentProject.type === 'video' && isIntersecting) {
        videoRef.current?.play().catch(() => {
          console.log("Autoplay blocked, waiting for interaction");
        });
      }
    }, 100);

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    };
  }, [currentProjectIndex, isIntersecting, currentProject.type]);

  // 【手動操作
  const handleManualAction = useCallback((index: number) => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    
    setCurrentProjectIndex(index);
    
    setIsVideoPlaying(false);
    setResetKey((prev) => prev + 1);
  }, []);

  const goToNext = useCallback(() => {
    handleManualAction((currentProjectIndex + 1) % projectsData.length);
  }, [currentProjectIndex, handleManualAction, projectsData.length]);

  const goToPrev = useCallback(() => {
    handleManualAction((currentProjectIndex - 1 + projectsData.length) % projectsData.length);
  }, [currentProjectIndex, handleManualAction, projectsData.length]);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    }
  }, []);

  // 視窗偵測邏輯
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (projectContainerRef.current) observer.observe(projectContainerRef.current);
    return () => observer.disconnect();
  }, []);

  return {
    state: {
      currentProjectIndex,
      isHovering,
      volume,
      isVideoPlaying,
      isIntersecting,
      videoRef,
      projectContainerRef
    },
    actions: {
      setIsHovering,
      setVolume,
      setIsVideoPlaying,
      goToNext,
      goToPrev,
      handleManualAction,
      togglePlay
    }
  };
};