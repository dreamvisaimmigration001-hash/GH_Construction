import React from 'react';
import { PARTNERS_COLLABORATORS } from '../data/ghData';

export const PartnersSection: React.FC = () => {
  return (
    <section id="partners-section" className="py-20 bg-[#08090c] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-3">
            <span>Enduring Collaborations</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#f7f7f5] tracking-tight">
            Trusted by Alberta’s Leading Designers, Landlords & Practitioners
          </h3>
        </div>

        {/* Architectural Partner Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {PARTNERS_COLLABORATORS.map((partner, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-[#0d0f15] border border-white/[0.08] hover:border-[#c8aa7a]/50 transition-colors flex flex-col justify-center text-center group shadow-md"
            >
              <div className="text-lg sm:text-xl font-display font-bold text-[#f7f7f5] group-hover:text-[#c8aa7a] transition-colors">
                {partner.name}
              </div>
              <div className="text-xs font-mono text-[#c8aa7a] uppercase tracking-wider mt-1.5 font-medium">
                {partner.type}
              </div>
              {partner.description && (
                <div className="text-xs sm:text-sm text-[#d6cebf] font-light mt-2 line-clamp-1">
                  {partner.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
