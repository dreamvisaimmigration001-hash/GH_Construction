import React, { useState } from 'react';
import { Plus, Minus, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/ghData';

interface ServicesSectionProps {
  onStartProject: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onStartProject }) => {
  const [expandedId, setExpandedId] = useState<string>(SERVICES[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  return (
    <section id="services-section" className="py-24 sm:py-32 bg-[#08090c] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-3">
              <span className="w-2 h-2 bg-[#c8aa7a]" />
              <span>Full-Scope Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#f7f7f5] tracking-tight">
              Our Services
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-base sm:text-lg text-[#d6cebf] max-w-lg font-light leading-relaxed">
            Comprehensive commercial construction solutions from preliminary lease consulting to complex surgical interior execution.
          </p>
        </div>

        {/* Services Architectural Accordion Grid */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {SERVICES.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                id={`service-item-${service.id}`}
                className={`transition-colors ${
                  isExpanded ? 'bg-[#0e1017]' : 'hover:bg-[#0c0d12]'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleExpand(service.id)}
                  className="w-full py-8 px-4 sm:px-8 text-left flex items-start sm:items-center justify-between gap-6 group focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 flex-1">
                    <span className="font-mono text-base tracking-widest text-[#c8aa7a] font-bold">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#f7f7f5] group-hover:text-[#c8aa7a] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#d6cebf] font-light mt-1">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pt-1 sm:pt-0">
                    <div
                      className={`w-10 h-10 border flex items-center justify-center transition-all ${
                        isExpanded
                          ? 'border-[#c8aa7a] text-[#c8aa7a] bg-[#c8aa7a]/10 rotate-90'
                          : 'border-white/[0.15] text-[#d6cebf] group-hover:border-[#c8aa7a] group-hover:text-[#f7f7f5]'
                      }`}
                    >
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Content Panel */}
                {isExpanded && (
                  <div className="px-4 sm:px-8 pb-10 pt-2 sm:pl-24 animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-5 border-t border-white/[0.08]">
                      <div className="lg:col-span-6 space-y-4">
                        <p className="text-base sm:text-lg text-[#d6cebf] font-light leading-relaxed">
                          {service.description}
                        </p>
                        <button
                          onClick={onStartProject}
                          className="inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wider text-[#c8aa7a] hover:text-[#d6ba8c] pt-2 transition-colors"
                        >
                          <span>INQUIREOUT THIS SERVICE</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="lg:col-span-6">
                        <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#c8aa7a] mb-3.5">
                          Key Deliverables & Scope
                        </div>
                        <ul className="space-y-3">
                          {service.deliverables.map((deliv, idx) => (
                            <li
                              key={idx}
                              className="text-sm sm:text-base text-[#f7f7f5] flex items-start gap-3"
                            >
                              <Check className="w-4 h-4 text-[#c8aa7a] shrink-0 mt-0.5" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-8 sm:p-10 bg-[#0e1017] border border-white/[0.1] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#c8aa7a] mb-1.5">
              Custom Requirements?
            </div>
            <h4 className="text-xl sm:text-2xl font-display font-bold text-[#f7f7f5]">
              Every build is tailored to your business model and lease structure.
            </h4>
          </div>
          <button
            onClick={onStartProject}
            className="bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs sm:text-sm tracking-wider uppercase px-7 py-3.5 shrink-0 whitespace-nowrap transition-colors shadow-lg"
          >
            DISCUSS YOUR SCOPE
          </button>
        </div>
      </div>
    </section>
  );
};
