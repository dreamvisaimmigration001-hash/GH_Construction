import React, { useState } from 'react';
import { Search, MapPin, Eye, ArrowUpRight, Filter } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/ghData';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

interface ProjectPortfolioViewProps {
  onStartProject: () => void;
}

export const ProjectPortfolioView: React.FC<ProjectPortfolioViewProps> = ({
  onStartProject,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>(location.state?.filter || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: string[] = [
    'All',
    'Healthcare & Medical',
    'Commercial',
    'Restaurant',
    'Retail'
  ];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory =
      activeCategory === 'All' ||
      proj.category === activeCategory ||
      (activeCategory === 'Healthcare & Medical' && proj.category.includes('Healthcare'));

    const matchesSearch =
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.scope.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      id="portfolio-page" 
      className="pt-28 pb-28 bg-[#08090c] min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Header */}
        <div className="border-b border-white/[0.08] pb-12 mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-3">
            <span className="w-2 h-2 bg-[#c8aa7a]" />
            <span>Commercial & Clinical Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-[#f7f7f5] tracking-tight">
            Our Completed Projects
          </h1>
          <p className="text-lg sm:text-xl text-[#d6cebf] font-light mt-4 max-w-3xl leading-relaxed">
            Explore authentic commercial construction, dental & medical clinics, corporate offices, and specialty retail interiors built by GH Construction across Scarborough.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/[0.08]">
          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-3 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider transition-all border ${
                  activeCategory === cat
                    ? 'bg-[#c8aa7a] border-[#c8aa7a] text-[#08090c] shadow-lg shadow-[#c8aa7a]/15'
                    : 'bg-[#0d0f15] border-white/[0.1] text-[#d6cebf] hover:text-[#f7f7f5] hover:border-[#c8aa7a]/50'
                }`}
              >
                {cat}
                {cat === 'All' && ` (${PROJECTS.length})`}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a39d91]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, scope..."
              className="w-full pl-10 pr-4 py-3 bg-[#0d0f15] border border-white/[0.1] focus:border-[#c8aa7a] text-base sm:text-sm text-[#f7f7f5] placeholder-[#6b7280] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#a39d91] hover:text-[#f7f7f5]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Project Results Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center border border-white/[0.08] p-8 bg-[#0d0f15]">
            <p className="text-xl text-[#f7f7f5] font-display">No projects found matching your filter.</p>
            <p className="text-sm text-[#a39d91] mt-2">Try resetting the category filter or searching for another term.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-6 px-6 py-3 bg-[#141822] text-sm text-[#c8aa7a] border border-white/[0.15] hover:border-[#c8aa7a]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                id={`portfolio-card-${proj.id}`}
                onClick={() => navigate(`/work/${proj.id}`)}
                className="group cursor-pointer bg-[#0d0f15] border border-white/[0.08] hover:border-[#c8aa7a]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-[#08090c]">
                    <img
                      src={proj.heroImage}
                      alt={`GH Construction - ${proj.name}`}
                      className="w-full h-full object-cover filter brightness-[0.8] group-hover:scale-105 group-hover:brightness-[0.95] transition-all duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#08090c]/90 px-3 py-1.5 text-xs font-mono text-[#c8aa7a] border border-white/[0.15] font-semibold">
                      {proj.category}
                    </div>

                    <div className="absolute inset-0 bg-[#08090c]/0 group-hover:bg-[#08090c]/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="px-4 py-2.5 bg-[#08090c]/90 text-[#f7f7f5] text-xs sm:text-sm font-mono uppercase tracking-wider border border-[#c8aa7a] flex items-center gap-2 shadow-xl">
                        <Eye className="w-4 h-4 text-[#c8aa7a]" />
                        <span>View Case Study ({proj.images.length} Photos)</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-[#f7f7f5] group-hover:text-[#c8aa7a] transition-colors">
                        {proj.name}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-[#a39d91] group-hover:text-[#c8aa7a] transition-colors" />
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#d6cebf] font-mono">
                      <MapPin className="w-3.5 h-3.5 text-[#c8aa7a]" />
                      <span>{proj.location}</span>
                    </div>

                    <p className="text-sm sm:text-base text-[#d6cebf] font-light leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>

                    {/* Scope Pills */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {proj.scope.slice(0, 3).map((s, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono bg-[#141822] text-[#d6cebf] px-2.5 py-1 border border-white/[0.08]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer link */}
                <div className="px-7 py-4 border-t border-white/[0.08] bg-[#090b10] flex items-center justify-between text-xs sm:text-sm font-mono">
                  <span className="text-[#a39d91]">{proj.images.length} Gallery Photos</span>
                  <span className="text-[#c8aa7a] font-medium group-hover:underline">Explore Details &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Callout */}
        <div className="mt-20 p-8 sm:p-14 bg-[#0d0f15] border border-white/[0.1] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#f7f7f5]">
              Planning a commercial interior or clinic in Scarborough?
            </h3>
            <p className="text-base sm:text-lg text-[#d6cebf] font-light max-w-2xl">
              From dental clinics and surgical operatories to corporate headquarters, we deliver with experience, precision, and business alignment.
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
    </motion.div>
  );
};
