import React from 'react';
import { Shield, Award, Users, TrendingUp, Headphones, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { WHY_GH_PILLARS, COMPANY_INFO } from '../data/ghData';

export const WhyGhSection: React.FC = () => {
  const icons = [
    <Award key="exp" className="w-5 h-5 text-[#c49a62]" />,
    <Shield key="knw" className="w-5 h-5 text-[#c49a62]" />,
    <Users key="rel" className="w-5 h-5 text-[#c49a62]" />,
    <TrendingUp key="biz" className="w-5 h-5 text-[#c49a62]" />,
    <Headphones key="sup" className="w-5 h-5 text-[#c49a62]" />,
    <CheckCircle2 key="qua" className="w-5 h-5 text-[#c49a62]" />,
    <MessageSquare key="com" className="w-5 h-5 text-[#c49a62]" />,
    <Clock key="tim" className="w-5 h-5 text-[#c49a62]" />
  ];

  return (
    <section id="why-gh-section" className="py-24 sm:py-32 bg-[#060709] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-3">
            <span className="w-2 h-2 bg-[#c8aa7a]" />
            <span>The GH Distinction</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#f7f7f5] tracking-tight">
            Why Partner With GH Construction
          </h2>
          <p className="text-base sm:text-lg text-[#d6cebf] font-light mt-4 leading-relaxed">
            Founded on direct accountability and an understanding of commercial operations, we execute builds where engineering rigor meets business outcomes.
          </p>
        </div>

        {/* 8 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_GH_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-[#0d0f15] border border-white/[0.08] hover:border-[#c8aa7a]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 border border-white/[0.12] group-hover:border-[#c8aa7a] flex items-center justify-center mb-6 bg-[#08090c] transition-colors">
                  {icons[idx]}
                </div>

                <div className="text-xs font-mono text-[#c8aa7a] uppercase tracking-widest mb-2 font-semibold">
                  0{idx + 1}
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#f7f7f5] mb-3 group-hover:text-[#c8aa7a] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm sm:text-base text-[#d6cebf] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="w-8 h-[2px] bg-white/[0.15] group-hover:bg-[#c8aa7a] transition-colors mt-8" />
            </div>
          ))}
        </div>

        {/* Quotes Callout Banner */}
        <div className="mt-12 p-6 sm:p-12 bg-[#0e1017] border border-white/[0.1] relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-3xl">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#c8aa7a] block mb-2 sm:mb-3 font-semibold">
                Guiding Principle
              </span>
              <blockquote className="text-lg sm:text-2xl lg:text-3xl font-serif italic text-[#f7f7f5] leading-snug">
                “You can be sure we are hiring the right people, because it is our name on the line. We feel confident we can get the job done to our client’s high standards.”
              </blockquote>
              <div className="text-xs sm:text-sm text-[#d6cebf] font-mono mt-3 sm:mt-4">
                Terry & Nadder Jomha • GH Construction Leadership
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <div className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 bg-[#08090c] border border-white/[0.15] text-center shadow-md">
                <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#c8aa7a]">Company Motto</div>
                <div className="text-sm sm:text-lg font-display font-bold text-[#f7f7f5] mt-1">{COMPANY_INFO.motto}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
