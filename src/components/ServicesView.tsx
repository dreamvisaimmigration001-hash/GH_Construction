import React from 'react';
import { ArrowUpRight, Check, Shield, FileCheck, Layers, Wrench, DollarSign, DraftingCompass } from 'lucide-react';
import { SERVICES } from '../data/ghData';

interface ServicesViewProps {
  onStartProject: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onStartProject }) => {
  return (
    <div id="services-page" className="pt-28 pb-28 bg-[#08090c] min-h-screen text-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl border-b border-white/[0.08] pb-16 mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-3">
            <span className="w-2 h-2 bg-[#c8aa7a]" />
            <span>Comprehensive Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-[#f7f7f5] tracking-tight">
            Commercial Construction & Consulting Services
          </h1>
          <p className="text-lg sm:text-xl text-[#d6cebf] font-light mt-6 leading-relaxed max-w-3xl">
            From initial space vetting and lease negotiation to precision interior engineering and zero-downtime clinic modifications.
          </p>
        </div>

        {/* 8 Services Architectural Grid */}
        <div className="space-y-12">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="p-8 sm:p-12 bg-[#0d0f15] border border-white/[0.08] hover:border-[#c8aa7a]/50 transition-colors shadow-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-5 space-y-3">
                  <span className="font-mono text-xs sm:text-sm text-[#c8aa7a] font-semibold tracking-widest block">
                    SERVICE // {service.number}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#f7f7f5]">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#c8aa7a] font-mono">
                    {service.tagline}
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <p className="text-base sm:text-lg text-[#d6cebf] font-light leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-6 border-t border-white/[0.08]">
                    <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#a39d91] mb-4 font-semibold">
                      Included Deliverables & Scope
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.deliverables.map((deliv, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#d6cebf]">
                          <Check className="w-5 h-5 text-[#c8aa7a] shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Callout */}
        <div className="mt-20 p-8 sm:p-14 bg-[#0d0f15] border border-white/[0.1] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#c8aa7a] block mb-2 font-semibold">
              Ready to Discuss?
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#f7f7f5]">
              Schedule a Pre-Construction Consultation
            </h3>
            <p className="text-base sm:text-lg text-[#d6cebf] font-light mt-2 max-w-2xl">
              Have your lease drafts or space options reviewed by our construction leadership.
            </p>
          </div>

          <button
            onClick={onStartProject}
            className="w-full lg:w-auto px-7 sm:px-10 py-4 sm:py-5 bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-sm sm:text-base tracking-wider uppercase transition-all shadow-xl shadow-[#c8aa7a]/15 text-center"
          >
            START A PROJECT INQUIRY
          </button>
        </div>
      </div>
    </div>
  );
};
