import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, MapPin, Check, X, ChevronLeft, ChevronRight, Share2, Layers } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'motion/react';

interface ProjectDetailViewProps {
  project: Project;
  allProjects: Project[];
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
  onStartProject: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  allProjects,
  onBack,
  onSelectProject,
  onStartProject,
}) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Find related projects in the same industry or category
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && (p.category === project.category || p.industry === project.industry))
    .slice(0, 3);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % project.images.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        activeLightboxIndex === 0 ? project.images.length - 1 : activeLightboxIndex - 1
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      id="project-detail-view" 
      className="pt-24 pb-28 bg-[#08090c] min-h-screen text-[#e5e7eb]"
    >
      {/* Top Back Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-white/[0.08]">
        <button
          id="detail-back-button"
          onClick={onBack}
          className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] hover:text-[#c8aa7a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-4 text-xs sm:text-sm font-mono text-[#a39d91]">
          <span className="hidden sm:inline">Project Case Study</span>
          <span className="text-[#c8aa7a] font-medium">• {project.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[48vh] sm:h-[65vh] min-h-[340px] sm:min-h-[440px] max-h-[640px] w-full overflow-hidden bg-[#08090c]">
        <img
          src={project.heroImage}
          alt={`GH Construction - ${project.name}`}
          className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.1]"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-widest px-3.5 py-1.5 bg-[#08090c]/90 border border-[#c8aa7a]/60 text-[#c8aa7a] mb-3 sm:mb-4 font-semibold">
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-display font-bold text-[#f7f7f5] tracking-tight">
            {project.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-base text-[#d6cebf] font-mono mt-3 sm:mt-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#c8aa7a]" />
              <span>{project.location}</span>
            </div>
            {project.clientType && (
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#c8aa7a]" />
                <span>{project.clientType}</span>
              </div>
            )}
            <div className="text-[#a39d91]">
              General Contractor: GH Construction Ltd.
            </div>
          </div>
        </div>
      </div>

      {/* Project Breakdown Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-white/[0.08] pb-16">
          {/* Left Column: Narrative & Scope */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#c8aa7a] mb-2 font-medium">
                Project Overview
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#f7f7f5]">
                Intricate Interior Construction & Precision Delivery
              </h2>
            </div>

            <p className="text-base sm:text-xl text-[#d6cebf] font-light leading-relaxed">
              {project.description}
            </p>

            {/* Scope Checklist */}
            <div className="p-6 sm:p-8 bg-[#0d0f15] border border-white/[0.08] space-y-5 shadow-lg">
              <h3 className="text-lg sm:text-xl font-display font-bold text-[#f7f7f5] uppercase tracking-wide">
                Construction Scope & Technical Execution
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {project.scope.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#d6cebf]">
                    <Check className="w-5 h-5 text-[#c8aa7a] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Factual Value Statement */}
            <div className="border-l-2 border-[#c8aa7a] pl-6 py-2">
              <p className="text-base sm:text-lg text-[#d6cebf] font-serif italic leading-relaxed">
                “Each job we undertake is approached with care and individualized attention. We stand behind our people and workmanship and guarantee unparalleled satisfaction each and every time.”
              </p>
              <div className="text-xs sm:text-sm font-mono text-[#f7f7f5] mt-2">
                GH Construction Ltd. • General Contracting Standards
              </div>
            </div>
          </div>

          {/* Right Column: Project Meta Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-7 bg-[#0d0f15] border border-white/[0.1] space-y-5 shadow-xl">
              <div className="text-sm sm:text-base font-mono uppercase tracking-widest text-[#f7f7f5] border-b border-white/[0.08] pb-3 font-semibold">
                Project Specifications
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-mono">
                <div>
                  <span className="text-[#a39d91] block mb-1">Project Name:</span>
                  <span className="text-[#f7f7f5] font-semibold text-sm sm:text-base">{project.name}</span>
                </div>

                <div>
                  <span className="text-[#a39d91] block mb-1">Industry Sector:</span>
                  <span className="text-[#c8aa7a] font-semibold text-sm sm:text-base">{project.category}</span>
                </div>

                <div>
                  <span className="text-[#a39d91] block mb-1">Location:</span>
                  <span className="text-[#f7f7f5] text-sm sm:text-base">{project.location}</span>
                </div>

                <div>
                  <span className="text-[#a39d91] block mb-1">General Contracting:</span>
                  <span className="text-[#f7f7f5] text-sm sm:text-base">GH Construction Ltd.</span>
                </div>

                <div>
                  <span className="text-[#a39d91] block mb-1">Photographs in Gallery:</span>
                  <span className="text-[#f7f7f5] text-sm sm:text-base">{project.images.length} High-Res Images</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <button
                  id="detail-inquire-project"
                  onClick={onStartProject}
                  className="w-full py-4 bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-[#c8aa7a]/15"
                >
                  <span>INQUIRE ABOUT SIMILAR BUILD</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Authentic Project Gallery */}
        <div className="pt-16 pb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#c8aa7a] mb-2 font-semibold">
                Documented Craftsmanship
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-[#f7f7f5]">
                Project Gallery ({project.images.length} Authentic Photos)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#d6cebf] font-mono mt-2 sm:mt-0">
              Click any photo to view full-screen high resolution
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((imgUrl, idx) => (
              <div
                key={idx}
                id={`gallery-thumb-${idx}`}
                onClick={() => openLightbox(idx)}
                className="group cursor-pointer relative aspect-[4/3] bg-[#0d0f15] border border-white/[0.08] hover:border-[#c8aa7a]/50 overflow-hidden shadow-md"
              >
                <img
                  src={imgUrl}
                  alt={`${project.name} - Construction detail ${idx + 1}`}
                  className="w-full h-full object-cover filter brightness-[0.8] group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#08090c]/0 group-hover:bg-[#08090c]/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="px-3.5 py-2 bg-[#08090c]/90 border border-[#c8aa7a] text-xs sm:text-sm font-mono text-[#f7f7f5]">
                    Enlarge Image
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 text-xs font-mono bg-[#08090c]/85 text-[#d6cebf] px-2.5 py-1 border border-white/[0.08]">
                  0{idx + 1} / {project.images.length}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="pt-16 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#c8aa7a] mb-1 font-semibold">
                  Sector Continuity
                </div>
                <h3 className="text-xl sm:text-3xl font-display font-bold text-[#f7f7f5]">
                  Related {project.category} Builds
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectProject(rel.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer bg-[#0d0f15] border border-white/[0.08] hover:border-[#c8aa7a]/50 p-6 transition-colors shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-[#08090c]">
                    <img
                      src={rel.heroImage}
                      alt={rel.name}
                      className="w-full h-full object-cover filter brightness-[0.75] group-hover:scale-105 transition-transform"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-xs font-mono text-[#c8aa7a] uppercase tracking-wider mb-1.5 font-medium">
                    {rel.category}
                  </div>
                  <h4 className="text-lg sm:text-xl font-display font-bold text-[#f7f7f5] group-hover:text-[#c8aa7a] transition-colors flex items-center justify-between">
                    <span>{rel.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                  </h4>
                  <p className="text-xs sm:text-sm text-[#d6cebf] mt-1.5 font-mono">
                    {rel.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Lightbox */}
      {activeLightboxIndex !== null && (
        <div
          id="project-lightbox"
          className="fixed inset-0 z-50 bg-[#08090c]/98 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="text-base sm:text-lg font-display font-bold text-[#f7f7f5] flex items-center gap-3">
              <span>{project.name}</span>
              <span className="text-xs sm:text-sm font-mono text-[#c8aa7a]">
                [{activeLightboxIndex + 1} of {project.images.length}]
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2 text-[#a39d91] hover:text-[#f7f7f5] border border-white/[0.12] hover:border-[#c8aa7a] transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Image */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={project.images[activeLightboxIndex]}
              alt={`${project.name} detail`}
              className="max-h-[82vh] max-w-full object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />

            {/* Lightbox navigation arrows */}
            <button
              onClick={prevLightbox}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-4 bg-[#08090c]/80 border border-white/[0.12] hover:border-[#c8aa7a] text-[#f7f7f5] transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={nextLightbox}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-4 bg-[#08090c]/80 border border-white/[0.12] hover:border-[#c8aa7a] text-[#f7f7f5] transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center text-xs sm:text-sm font-mono text-[#d6cebf] pt-3 border-t border-white/[0.08]">
            {project.name} • Authentic GH Construction Build Photo • Use Arrow Keys or Buttons to Navigate
          </div>
        </div>
      )}
    </motion.div>
  );
};
