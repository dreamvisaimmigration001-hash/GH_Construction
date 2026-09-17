import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/ghData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const active = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials-section" className="py-24 sm:py-32 bg-[#060709] border-b border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-3">
              <span className="w-2 h-2 bg-[#c8aa7a]" />
              <span>Client & Collaborator Voices</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#f7f7f5] tracking-tight">
              Authentic Experiences
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <span className="text-sm font-mono text-[#d6cebf] mr-2">
              0{currentIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              id="testimonial-prev-btn"
              onClick={handlePrev}
              className="w-12 h-12 border border-white/[0.15] hover:border-[#c8aa7a] text-[#d6cebf] hover:text-[#f7f7f5] flex items-center justify-center transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={handleNext}
              className="w-12 h-12 border border-white/[0.15] hover:border-[#c8aa7a] text-[#d6cebf] hover:text-[#f7f7f5] flex items-center justify-center transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Display */}
        <div className="bg-[#0d0f15] border border-white/[0.1] p-6 sm:p-12 lg:p-16 relative shadow-xl">
          <Quote className="w-10 h-10 sm:w-14 sm:h-14 text-[#c8aa7a]/25 mb-6 sm:mb-8" />

          <blockquote className="text-xl sm:text-3xl lg:text-4xl font-serif italic text-[#f7f7f5] leading-relaxed mb-8 sm:mb-10 tracking-tight">
            “{active.quote}”
          </blockquote>

          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-lg sm:text-xl font-display font-bold text-[#c8aa7a]">
                {active.author}
              </div>
              <div className="text-sm text-[#d6cebf] font-mono mt-1">
                {active.role} • {active.organization}
              </div>
            </div>

            {/* Quick Indicators */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 transition-all duration-300 ${
                    currentIndex === idx ? 'w-10 bg-[#c8aa7a]' : 'w-2.5 bg-white/[0.15] hover:bg-white/[0.3]'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sub-grid of other testimonials for high scannability */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {TESTIMONIALS.filter((_, idx) => idx !== currentIndex).slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => {
                const foundIdx = TESTIMONIALS.findIndex((t) => t.id === item.id);
                if (foundIdx !== -1) setCurrentIndex(foundIdx);
              }}
              className="p-7 bg-[#090b0f] border border-white/[0.08] hover:border-[#c8aa7a]/60 cursor-pointer transition-colors flex flex-col justify-between shadow-md"
            >
              <p className="text-sm sm:text-base text-[#d6cebf] line-clamp-4 font-serif italic leading-relaxed mb-5">
                “{item.quote}”
              </p>
              <div className="pt-3.5 border-t border-white/[0.08]">
                <div className="text-sm sm:text-base font-display font-bold text-[#f7f7f5]">
                  {item.author}
                </div>
                <div className="text-xs sm:text-sm font-mono text-[#c8aa7a] truncate mt-1">
                  {item.organization}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
