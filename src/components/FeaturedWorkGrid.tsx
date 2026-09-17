import React from 'react';
import { ArrowUpRight, MapPin, Eye } from 'lucide-react';
import { Project } from '../types';

interface FeaturedWorkGridProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onViewAllProjects: () => void;
}

export const FeaturedWorkGrid: React.FC<FeaturedWorkGridProps> = ({
  projects,
  onSelectProject,
  onViewAllProjects,
}) => {
  // Select key authentic projects with varied layouts
  const primaryProject = projects.find((p) => p.id === 'synapse') || projects[0];
  const sideProject1 = projects.find((p) => p.id === 'stratica-dermatology') || projects[1];
  const sideProject2 = projects.find((p) => p.id === 'bcmb') || projects[2];
  const wideProject = projects.find((p) => p.id === 'vine-arts') || projects[3];
  const midProject1 = projects.find((p) => p.id === 'felice-cafe') || projects[4];
  const midProject2 = projects.find((p) => p.id === 'parkland-dental') || projects[5];
  const midProject3 = projects.find((p) => p.id === 'juriscorp-law') || projects[6];

  return (
    <section id="featured-work-section" className="py-24 sm:py-32 bg-[#08090c] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-3">
              <span className="w-2 h-2 bg-[#c8aa7a]" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#f7f7f5] tracking-tight">
              Featured Commercial Work
            </h2>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-6">
            <p className="text-sm sm:text-base text-[#d6cebf] max-w-md font-light hidden sm:block leading-relaxed">
              Intricate healthcare interiors, prestige corporate offices, and specialty commercial spaces built across Alberta.
            </p>
            <button
              id="featured-view-all-btn"
              onClick={onViewAllProjects}
              className="px-6 py-3.5 border border-white/[0.18] hover:border-[#c8aa7a] bg-white/[0.03] hover:bg-white/[0.08] text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-[#f7f7f5] hover:text-[#c8aa7a] transition-all flex items-center gap-2.5 group whitespace-nowrap"
            >
              <span>EXPLORE ALL 20 BUILDS</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Editorial Asymmetrical Grid */}
        <div className="space-y-8">
          {/* Row 1: Large Dominant Feature (8 cols) + 2 Stacked Cards (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Primary Large Hero Card */}
            <div
              id={`featured-card-${primaryProject.id}`}
              onClick={() => onSelectProject(primaryProject.id)}
              className="lg:col-span-8 group cursor-pointer relative bg-[#0e1017] border border-white/[0.08] hover:border-[#c8aa7a]/60 overflow-hidden flex flex-col justify-end min-h-[460px] sm:min-h-[540px] transition-colors duration-300"
            >
              <img
                src={primaryProject.heroImage}
                alt={primaryProject.name}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.55] group-hover:scale-[1.02] group-hover:brightness-[0.7] transition-all duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/40 to-transparent" />

              <div className="relative z-10 p-6 sm:p-10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 bg-[#08090c]/90 border border-[#c8aa7a]/40 text-[#c8aa7a]">
                    {primaryProject.category}
                  </span>
                  <span className="text-sm text-[#d6cebf] flex items-center gap-1.5 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#c8aa7a]" />
                    {primaryProject.location}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#f7f7f5] group-hover:text-[#c8aa7a] transition-colors flex items-center justify-between">
                  <span>{primaryProject.name}</span>
                  <div className="w-11 h-11 border border-white/[0.18] group-hover:border-[#c8aa7a] flex items-center justify-center text-[#f7f7f5] group-hover:text-[#c8aa7a] transition-colors shrink-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </h3>

                <p className="text-base sm:text-lg text-[#d6cebf] max-w-2xl font-light line-clamp-2 leading-relaxed">
                  {primaryProject.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  {primaryProject.scope.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-[#d6cebf] bg-[#141720]/90 px-3 py-1.5 border border-white/[0.08]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Stacked Column (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Card 1: Stratica Dermatology */}
              <div
                id={`featured-card-${sideProject1.id}`}
                onClick={() => onSelectProject(sideProject1.id)}
                className="group cursor-pointer relative bg-[#0e1017] border border-white/[0.08] hover:border-[#c8aa7a]/60 overflow-hidden flex-1 min-h-[250px] flex flex-col justify-end p-7 transition-colors duration-300"
              >
                <img
                  src={sideProject1.heroImage}
                  alt={sideProject1.name}
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.52] group-hover:scale-[1.03] group-hover:brightness-[0.68] transition-all duration-700 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/30 to-transparent" />

                <div className="relative z-10 space-y-2.5">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#c8aa7a]">
                    {sideProject1.category}
                  </div>
                  <h4 className="text-2xl font-display font-bold text-[#f7f7f5] group-hover:text-[#c8aa7a] transition-colors flex items-center justify-between">
                    <span>{sideProject1.name}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <div className="text-sm text-[#d6cebf] font-mono">
                    {sideProject1.location}
                  </div>
                </div>
              </div>

              {/* Card 2: BCMB Corporate */}
              <div
                id={`featured-card-${sideProject2.id}`}
                onClick={() => onSelectProject(sideProject2.id)}
                className="group cursor-pointer relative bg-[#0e1017] border border-white/[0.08] hover:border-[#c8aa7a]/60 overflow-hidden flex-1 min-h-[250px] flex flex-col justify-end p-7 transition-colors duration-300"
              >
                <img
                  src={sideProject2.heroImage}
                  alt={sideProject2.name}
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.52] group-hover:scale-[1.03] group-hover:brightness-[0.68] transition-all duration-700 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/30 to-transparent" />

                <div className="relative z-10 space-y-2.5">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#c8aa7a]">
                    {sideProject2.category}
                  </div>
                  <h4 className="text-2xl font-display font-bold text-[#f7f7f5] group-hover:text-[#c8aa7a] transition-colors flex items-center justify-between">
                    <span>{sideProject2.name}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <div className="text-sm text-[#d6cebf] font-mono">
                    {sideProject2.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Wide Architectural Banner (Vine Arts) */}
          <div
            id={`featured-card-${wideProject.id}`}
            onClick={() => onSelectProject(wideProject.id)}
            className="group cursor-pointer relative bg-[#0e1017] border border-white/[0.08] hover:border-[#c8aa7a]/60 overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10 transition-colors duration-300"
          >
            <img
              src={wideProject.heroImage}
              alt={wideProject.name}
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.48] group-hover:scale-[1.02] group-hover:brightness-[0.65] transition-all duration-700 ease-out"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/40 to-transparent" />

            <div className="relative z-10 max-w-3xl space-y-3.5">
              <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 bg-[#08090c]/90 border border-[#c8aa7a]/40 text-[#c8aa7a]">
                {wideProject.category} • Feature Build
              </span>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#f7f7f5] group-hover:text-[#c8aa7a] transition-colors flex items-center gap-3">
                <span>{wideProject.name}</span>
                <ArrowUpRight className="w-6 h-6 opacity-60 group-hover:opacity-100" />
              </h3>
              <p className="text-base sm:text-lg text-[#d6cebf] font-light leading-relaxed">
                {wideProject.description}
              </p>
              <div className="text-sm text-[#a39d91] font-mono pt-1">
                {wideProject.location}
              </div>
            </div>
          </div>

          {/* Row 3: 3 Column Editorial Trio (Felice Cafe, Parkland Dental, Juriscorp Law) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[midProject1, midProject2, midProject3].map((proj) => (
              <div
                key={proj.id}
                id={`featured-card-${proj.id}`}
                onClick={() => onSelectProject(proj.id)}
                className="group cursor-pointer bg-[#0e1017] border border-white/[0.08] hover:border-[#c8aa7a]/60 overflow-hidden flex flex-col h-full transition-colors duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={proj.heroImage}
                    alt={proj.name}
                    className="w-full h-full object-cover filter brightness-[0.72] group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-[#08090c]/90 px-3 py-1.5 text-xs font-mono text-[#c8aa7a] border border-white/[0.08]">
                    {proj.category}
                  </div>
                  <div className="absolute inset-0 bg-[#08090c]/0 group-hover:bg-[#08090c]/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-4 py-2 bg-[#08090c]/95 text-[#f7f7f5] text-xs sm:text-sm font-mono uppercase tracking-wider border border-[#c8aa7a] flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#c8aa7a]" />
                      View Gallery
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3.5">
                  <div>
                    <h4 className="text-xl font-display font-bold text-[#f7f7f5] group-hover:text-[#c8aa7a] transition-colors flex items-center justify-between">
                      <span>{proj.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </h4>
                    <p className="text-sm text-[#d6cebf] font-light mt-2 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs sm:text-sm font-mono text-[#a39d91]">
                    <span>{proj.location}</span>
                    <span className="text-[#c8aa7a] font-medium">Case Study &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Link */}
        <div className="mt-12 sm:mt-16 text-center px-2">
          <button
            id="featured-bottom-view-all"
            onClick={onViewAllProjects}
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-10 py-4 sm:py-5 bg-[#0e1017] hover:bg-[#141720] border border-white/[0.14] hover:border-[#c8aa7a] text-[#f7f7f5] hover:text-[#c8aa7a] text-xs sm:text-sm font-display font-bold uppercase tracking-wider sm:tracking-widest transition-all shadow-xl max-w-full text-center"
          >
            <span>VIEW ALL 20 FEATURED PROJECTS IN PORTFOLIO</span>
            <ArrowUpRight className="w-4 h-4 text-[#c8aa7a] shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
