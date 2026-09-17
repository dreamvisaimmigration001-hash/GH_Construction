import React, { useState } from 'react';
import { ArrowUpRight, Check, Activity, Building, Coffee, ShoppingBag, Home } from 'lucide-react';
import { INDUSTRIES } from '../data/ghData';

interface IndustriesSectionProps {
  onSelectIndustryFilter: (categoryName: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onSelectIndustryFilter,
}) => {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);
  const activeIndustry = INDUSTRIES.find((i) => i.id === activeTab) || INDUSTRIES[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'healthcare':
        return <Activity className="w-4 h-4 text-[#c49a62]" />;
      case 'commercial':
        return <Building className="w-4 h-4 text-[#c49a62]" />;
      case 'restaurant':
        return <Coffee className="w-4 h-4 text-[#c49a62]" />;
      case 'retail':
        return <ShoppingBag className="w-4 h-4 text-[#c49a62]" />;
      case 'residential':
        return <Home className="w-4 h-4 text-[#c49a62]" />;
      default:
        return <Building className="w-4 h-4 text-[#c49a62]" />;
    }
  };

  return (
    <section id="industries-section" className="py-24 sm:py-32 bg-[#08090c] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-3">
            <span className="w-2 h-2 bg-[#c8aa7a]" />
            <span>Sectors & Specializations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#f7f7f5] tracking-tight">
            Industries We Build For
          </h2>
          <p className="text-base sm:text-lg text-[#d6cebf] font-light mt-4 leading-relaxed">
            Commercial environments possess unique operational, regulatory, and mechanical demands. We bring deep sector-specific insight to every project.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center overflow-x-auto pb-4 mb-8 border-b border-white/[0.08] space-x-2 sm:space-x-4 no-scrollbar">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              id={`industry-tab-${ind.id}`}
              onClick={() => setActiveTab(ind.id)}
              className={`px-5 py-3.5 text-sm sm:text-base font-display font-bold tracking-wide whitespace-nowrap transition-all border flex items-center gap-2.5 ${
                activeTab === ind.id
                  ? 'bg-[#141822] border-[#c8aa7a] text-[#f7f7f5] shadow-lg'
                  : 'bg-[#0e1017] border-white/[0.08] text-[#a39d91] hover:text-[#f7f7f5] hover:border-white/[0.18]'
              }`}
            >
              {getIcon(ind.id)}
              <span>{ind.name}</span>
            </button>
          ))}
        </div>

        {/* Active Industry Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#0e1017] border border-white/[0.1] p-5 sm:p-10 shadow-xl">
          {/* Left Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-[#c8aa7a]">
                <span>{activeIndustry.subtitle}</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#f7f7f5]">
                {activeIndustry.name}
              </h3>
              <p className="text-base sm:text-lg text-[#d6cebf] font-light leading-relaxed">
                {activeIndustry.description}
              </p>
            </div>

            <div className="space-y-3 pt-5 border-t border-white/[0.08]">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#c8aa7a]">
                Technical & Regulatory Specialization
              </div>
              <ul className="space-y-2.5">
                {activeIndustry.keyConsiderations.map((item, idx) => (
                  <li key={idx} className="text-sm sm:text-base text-[#f7f7f5] flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#c8aa7a] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#a39d91] block mb-1">
                  Featured GH Projects
                </span>
                <span className="text-sm sm:text-base text-[#f7f7f5] font-semibold">
                  {activeIndustry.featuredProjects.join(', ')}
                </span>
              </div>

              <button
                id={`industry-view-projects-${activeIndustry.id}`}
                onClick={() => onSelectIndustryFilter(activeIndustry.name)}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-[#141822] hover:bg-[#c8aa7a] text-[#f7f7f5] hover:text-[#08090c] text-xs sm:text-sm font-display font-bold uppercase tracking-wider transition-colors border border-white/[0.12] shadow-md"
              >
                <span>FILTER PORTFOLIO</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative aspect-[16/11] lg:aspect-auto overflow-hidden bg-[#08090c] border border-white/[0.08] min-h-[320px]">
            <img
              src={activeIndustry.coverImage}
              alt={`${activeIndustry.name} Commercial Build by GH Construction`}
              className="w-full h-full object-cover filter brightness-[0.7] hover:scale-105 transition-transform duration-700"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-xs sm:text-sm font-mono text-[#d6cebf] bg-[#08090c]/95 p-3 border border-white/[0.1]">
              GH Construction Authentic Project Build • {activeIndustry.name}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
