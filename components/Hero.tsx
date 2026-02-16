
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onShopNow: () => void;
  onOpenAdvisor: () => void;
}

interface Slide {
  id: number;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  stats?: { label: string; value: string };
  ctaType: 'shop' | 'advisor';
}

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: 'Limited Time Offer • Ramadan Special',
    title: 'Upgrade Your Tech, Not Your',
    highlight: 'Debt.',
    description: 'Get premium business-class laptops at up to 70% off. Every device undergoes a 40-point quality check.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
    stats: { label: 'Quality Checks', value: '40+' },
    ctaType: 'shop'
  },
  {
    id: 2,
    badge: 'Deal of the Day • Apple Exclusive',
    title: 'Premium MacBooks starting at',
    highlight: '₹45,999',
    description: 'Experience the power of M1 and M2 chips at unbeatable prices. Certified excellence, guaranteed performance.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    stats: { label: 'Discount', value: '60% OFF' },
    ctaType: 'shop'
  },
  {
    id: 3,
    badge: 'Our Achievement • India\'s Choice',
    title: 'Voted #1 Refurbished Brand in',
    highlight: 'India.',
    description: 'Over 1 Million+ happy customers and 50,000+ tons of e-waste saved. Join the green revolution today.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800',
    stats: { label: 'Happy Users', value: '1M+' },
    ctaType: 'advisor'
  }
];

const Hero: React.FC<HeroProps> = ({ onShopNow, onOpenAdvisor }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative bg-slate-900 overflow-hidden min-h-[600px] flex items-center">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400 rounded-full blur-[120px] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left transition-all duration-700 ease-in-out transform">
            <div key={`badge-${currentSlide}`} className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
              {slide.badge}
            </div>
            <h1 key={`title-${currentSlide}`} className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-slide-up">
              {slide.title} <span className="text-blue-500">{slide.highlight}</span>
            </h1>
            <p key={`desc-${currentSlide}`} className="text-base md:text-lg text-slate-400 mb-10 max-w-xl animate-slide-up animation-delay-200">
              {slide.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={onShopNow}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-95"
              >
                Explore Shop
              </button>
              <button 
                onClick={onOpenAdvisor}
                className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition backdrop-blur-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="text-xl">✨</span> Ask AI Advisor
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative hidden md:block">
             <div key={`image-${currentSlide}`} className="relative z-20 transform -rotate-3 hover:rotate-0 transition duration-1000 animate-zoom-in">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="rounded-3xl shadow-2xl border-4 border-white/10 object-cover aspect-[4/3]"
                />
                
                {/* Stats floaty */}
                {slide.stats && (
                  <div className="absolute -top-6 -right-4 bg-white p-4 rounded-2xl shadow-2xl z-30 animate-bounce">
                    <div className="text-blue-600 font-black text-2xl">{slide.stats.value}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">{slide.stats.label}</div>
                  </div>
                )}
             </div>
             
             {/* Abstract Decorations */}
             <div className="absolute -bottom-10 -left-10 w-40 h-40 border-8 border-blue-500/20 rounded-full"></div>
             <div className="absolute top-1/2 -right-16 w-24 h-24 bg-blue-600/20 rounded-xl blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95) rotate(-3deg); }
          to { opacity: 1; transform: scale(1) rotate(-3deg); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
        .animate-zoom-in { animation: zoomIn 1s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
};

export default Hero;
