
import React, { useState } from 'react';

interface ProductCarouselProps {
  images: string[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
        <img 
          src={images[activeIndex]} 
          alt={`Product View ${activeIndex + 1}`} 
          className="w-full h-full object-contain p-4 transition-opacity duration-300"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous Image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next Image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </>
        )}

        {/* Counter Overlay */}
        <div className="absolute bottom-4 right-4 bg-slate-900/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Grid */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`flex-shrink-0 w-20 h-20 bg-white rounded-lg border-2 transition-all overflow-hidden ${
              activeIndex === idx ? 'border-blue-600 scale-105 shadow-md' : 'border-slate-100 opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
