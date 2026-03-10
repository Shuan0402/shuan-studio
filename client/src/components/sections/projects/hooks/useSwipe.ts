import { useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
}

export const useSwipe = ({ onSwipeLeft, onSwipeRight, threshold = 50 }: SwipeHandlers) => {
  const touchRef = useRef<{ startX: number; endX: number }>({ startX: 0, endX: 0 });

  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current.startX = e.targetTouches[0].clientX;
    touchRef.current.endX = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchRef.current.endX = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    const { startX, endX } = touchRef.current;
    const distance = startX - endX;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
    
    touchRef.current = { startX: 0, endX: 0 };
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};