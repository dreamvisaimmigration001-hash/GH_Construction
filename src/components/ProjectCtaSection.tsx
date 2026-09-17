import React from 'react';
import { ArrowUpRight, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO, PROJECTS } from '../data/ghData';

interface ProjectCtaSectionProps {
  onStartProject: () => void;
}

export const ProjectCtaSection: React.FC<ProjectCtaSectionProps> = ({ onStartProject }) => {
  // Use authentic project image for background: Vivid Prosthodontics or Mirror Lake
  const bgProject = PROJECTS.find((p) => p.id === 'vivid-prosthodontics') || PROJECTS[0];

  return (
    <section id="project-cta-banner" className="relative py-20 sm:py-36 overflow-hidden border-b border-white/[0.08]">
      {/* Background with Dark Architectural Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgProject.heroImage}
          alt="GH Construction Commercial Interior"
          className="w-full h-full object-cover filter brightness-[0.32] contrast-[1.2]"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090c]/95 via-[#08090c]/85 to-[#08090c]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a]">
            <span className="w-2 h-2 bg-[#c8aa7a]" />
            <span>Next Steps</span>
          </div>

          <h2 className="text-3xl sm:text-6xl lg:text-7xl font-display font-bold text-[#f7f7f5] tracking-tight leading-[1.08]">
            Your New Space <br />
            <span className="text-[#c8aa7a]">Awaits.</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#d6cebf] font-light leading-relaxed max-w-2xl">
            Whether you are vetting a lease, planning a multi-chair medical clinic, or undertaking an intricate corporate interior, we bring experience, precision, and business alignment to every square foot.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              id="cta-banner-start-project"
              onClick={onStartProject}
              className="bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-sm sm:text-base tracking-wider uppercase px-8 sm:px-10 py-4 sm:py-5 flex items-center justify-center gap-3 transition-all shadow-2xl shadow-[#c8aa7a]/20"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

          </div>

          <div className="pt-8 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#d6cebf] font-mono">
            <span>• Edmonton, Scarborough</span>
            <span>• Commercial General Contracting</span>
            <span>• Est. Winter 2008</span>
          </div>
        </div>
      </div>
    </section>
  );
};
