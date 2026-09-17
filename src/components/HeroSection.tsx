import React from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  MapPin,
} from "lucide-react";
import { COMPANY_INFO, PROJECTS } from "../data/ghData";

interface HeroSectionProps {
  onViewWork?: () => void;
  onExploreWork?: () => void;
  onStartProject?: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewWork,
  onExploreWork,
  onStartProject,
  onSelectProject,
}) => {
  const handleViewWork = onViewWork || onExploreWork || (() => {});
  const handleStartProject = onStartProject || (() => {});
  const handleSelectProj = onSelectProject || (() => {});

  // Hero featured project: Synapse or Parkland
  const featuredHero = PROJECTS.find((p) => p.id === "synapse") || PROJECTS[0];

  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] sm:min-h-[94vh] flex flex-col justify-end pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Background Architectural Image with Fine Vignette & Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={featuredHero.heroImage}
          alt="GH Construction Project - Synapse Commercial Healthcare Interior"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.18] scale-[1.01] transition-transform duration-1000 ease-out"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/70 to-[#08090c]/30" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#08090c]/40 to-[#08090c]/90 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Tagline / Meta Indicator - Fully responsive to prevent mobile overflow */}
        <div className="inline-flex max-w-full items-center gap-2.5 py-2 px-3.5 sm:px-5 bg-[#0d0f15]/90 border border-white/[0.12] mb-6 sm:mb-8 backdrop-blur-md">
          <span className="w-2 h-2 bg-[#c8aa7a] shrink-0" />
          <span className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-wider sm:tracking-[0.2em] text-[#d6cebf]">
            Commercial General Contracting • Scarborough • Est. 2008
          </span>
        </div>

        {/* Primary Headline */}
        <div className="max-w-4xl">
          <h1
            id="hero-main-title"
            className="text-3xl sm:text-6xl lg:text-7xl font-display font-bold text-[#f7f7f5] tracking-tight leading-[1.08] mb-4 sm:mb-6"
          >
            Spaces Built <br />
            <span className="text-[#c8aa7a] font-light italic font-serif">
              Around Your Business.
            </span>
          </h1>

          <p
            id="hero-subhead"
            className="text-base sm:text-xl lg:text-2xl text-[#d6cebf] max-w-3xl font-light leading-relaxed mb-8 sm:mb-10"
          >
            {COMPANY_INFO.subheadline}
          </p>
        </div>

        {/* Actions & Meta Badges */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-2 pb-10 sm:pb-12 border-b border-white/[0.08]">
          <button
            id="hero-cta-view-work"
            onClick={handleViewWork}
            className="bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-sm tracking-wider uppercase px-7 sm:px-8 py-3.5 sm:py-4 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] shadow-xl shadow-[#c8aa7a]/15"
          >
            <span>VIEW OUR WORK</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            id="hero-cta-start-project"
            onClick={handleStartProject}
            className="border border-white/[0.18] hover:border-[#c8aa7a] bg-[#0d0f15]/80 hover:bg-[#0d0f15] text-[#f7f7f5] hover:text-[#c8aa7a] font-display font-bold text-sm tracking-wider uppercase px-7 sm:px-8 py-3.5 sm:py-4 flex items-center justify-center gap-2.5 transition-all duration-200 backdrop-blur-sm"
          >
            <span>START A PROJECT</span>
          </button>

          {/* Quick Hero Project Tag */}
          <button
            id="hero-featured-tag"
            onClick={() => handleSelectProj("synapse")}
            className="sm:ml-auto flex items-center gap-3.5 px-4 sm:px-5 py-3 sm:py-3.5 bg-[#0d0f15]/90 hover:bg-[#131620] border border-white/[0.1] hover:border-[#c8aa7a]/50 text-left transition-colors group cursor-pointer"
          >
            <div className="w-1 h-9 bg-[#c8aa7a] shrink-0" />
            <div>
              <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#c8aa7a]">
                Featured Build
              </div>
              <div className="text-sm sm:text-base font-display font-bold text-[#f7f7f5] group-hover:text-[#c8aa7a] flex items-center gap-2">
                <span>Synapse Medical Center</span>
                <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            </div>
          </button>
        </div>

        {/* Factual Value Ribbons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 pt-6 text-sm text-[#d6cebf]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#c8aa7a] shrink-0" />
            <div>
              <span className="font-semibold text-[#f7f7f5] block text-xs sm:text-base">
                Winter 2008
              </span>
              <span className="text-[11px] sm:text-xs text-[#a39d91]">
                Established Foundation
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#c8aa7a] shrink-0" />
            <div>
              <span className="font-semibold text-[#f7f7f5] block text-xs sm:text-base">
                A-Z Delivery
              </span>
              <span className="text-[11px] sm:text-xs text-[#a39d91]">
                General Contracting
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#c8aa7a] shrink-0" />
            <div>
              <span className="font-semibold text-[#f7f7f5] block text-xs sm:text-base">
                Scarborough
              </span>
              <span className="text-[11px] sm:text-xs text-[#a39d91]">
                Commercial & Clinical
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-2 h-2 bg-[#c8aa7a] shrink-0" />
            <div>
              <span className="font-semibold text-[#f7f7f5] block font-display text-xs sm:text-base">
                Big Enough to Serve
              </span>
              <span className="text-[11px] sm:text-xs text-[#a39d91]">
                Small Enough to Care
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
