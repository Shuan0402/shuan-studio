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

  useEffect(() => {
    const playVideo = async () => {
      if (currentProject.type === 'video' && isIntersecting && videoRef.current) {
        try {
          await videoRef.current.play();
          setIsVideoPlaying(true);
        } catch (err) {
          console.warn("Autoplay blocked or video error:", err);
        }
      }
    };

    const timeoutId = setTimeout(playVideo, 150);

    return () => {
      clearTimeout(timeoutId);
      if (videoRef.current) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    };
  }, [currentProjectIndex, isIntersecting, currentProject.type]);

  useEffect(() => {
    if (isVideoPlaying || isHovering) return;

    const autoScrollTimer = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projectsData.length);
    }, 5000);

    return () => clearInterval(autoScrollTimer);
  }, [isVideoPlaying, isHovering, projectsData.length, resetKey]);

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
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (projectContainerRef.current) {
      observer.observe(projectContainerRef.current);
    }

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
      projectContainerRef,
      resetKey
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