import React, { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  title: string;
  isActive: boolean;
  onComplete: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, title, isActive, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive || images.length <= 1) {
      setCurrentIndex(0);
      return;
    }
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? -1 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length, isActive]);

  useEffect(() => {
    if (currentIndex === -1) {
      setCurrentIndex(0);
      onComplete();
    }
  }, [currentIndex, onComplete]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.startsWith('http') ? img : `${import.meta.env.BASE_URL}${img.replace(/^\//, '')}`}
          alt={`${title} - ${index}`}
          className={`absolute transition-opacity duration-1000 ease-in-out max-w-full max-h-full object-contain ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;