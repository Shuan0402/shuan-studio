import { useState, useRef, useEffect } from 'react';
import type { RefObject } from 'react';

export function useScrollSpy(tabs: string[]) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const sectionRefs = tabs.reduce((acc, tab) => {
    acc[tab] = useRef<HTMLElement>(null);
    return acc;
  }, {} as Record<string, RefObject<HTMLElement | null>>);

  const scrollToSection = (tab: string) => {
    const target = sectionRefs[tab]?.current;
    const container = scrollContainerRef.current;
    if (target && container) {
      const scrollTarget = target.offsetTop;
      container.scrollTo({ top: scrollTarget, behavior: 'smooth' });
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { root: container, rootMargin: '-150px 0px -70% 0px' }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

  return { activeTab, scrollContainerRef, sectionRefs, scrollToSection };
}