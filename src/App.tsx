import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroductionSection } from './components/IntroductionSection';
import { FeaturedWorkGrid } from './components/FeaturedWorkGrid';
import { ServicesSection } from './components/ServicesSection';
import { IndustriesSection } from './components/IndustriesSection';
import { WhyGhSection } from './components/WhyGhSection';
import { PartnersSection } from './components/PartnersSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProjectCtaSection } from './components/ProjectCtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectPortfolioView } from './components/ProjectPortfolioView';
import { ProjectDetailView } from './components/ProjectDetailView';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { CareersView } from './components/CareersView';
import { StartProjectModal } from './components/StartProjectModal';
import { PROJECTS } from './data/ghData';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [portfolioCategoryFilter, setPortfolioCategoryFilter] = useState<string>('All');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Scroll to top on view switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProjectId]);

  const handleNavigate = (view: string) => {
    setSelectedProjectId(null);
    if (view === 'contact') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (view === 'testimonials') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (view === 'industries') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('industries-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('industries-section')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setCurrentView(view);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-detail');
  };

  const handleIndustryFilter = (categoryName: string) => {
    setPortfolioCategoryFilter(categoryName);
    setCurrentView('work');
  };

  const selectedProject = selectedProjectId
    ? PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0]
    : null;

  return (
    <div className="min-h-screen bg-[#08090c] text-[#e5e7eb] flex flex-col selection:bg-[#c8aa7a] selection:text-[#08090c]">
      {/* Universal Premium Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onStartProject={() => setIsProjectModalOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <HeroSection
              onViewWork={() => handleNavigate('work')}
              onExploreWork={() => handleNavigate('work')}
              onStartProject={() => setIsProjectModalOpen(true)}
              onSelectProject={handleSelectProject}
            />

            <IntroductionSection
              onLearnMore={() => handleNavigate('about')}
              onStartProject={() => setIsProjectModalOpen(true)}
            />

            <FeaturedWorkGrid
              projects={PROJECTS}
              onSelectProject={handleSelectProject}
              onViewAllProjects={() => handleNavigate('work')}
            />

            <ServicesSection
              onStartProject={() => setIsProjectModalOpen(true)}
            />

            <IndustriesSection
              onSelectIndustryFilter={handleIndustryFilter}
            />

            <WhyGhSection />

            <PartnersSection />

            <TestimonialsSection />

            <ProjectCtaSection
              onStartProject={() => setIsProjectModalOpen(true)}
            />

            <ContactSection />
          </>
        )}

        {currentView === 'work' && (
          <ProjectPortfolioView
            projects={PROJECTS}
            selectedCategory={portfolioCategoryFilter}
            onSelectProject={handleSelectProject}
            onStartProject={() => setIsProjectModalOpen(true)}
          />
        )}

        {currentView === 'project-detail' && selectedProject && (
          <ProjectDetailView
            project={selectedProject}
            allProjects={PROJECTS}
            onBack={() => setCurrentView('work')}
            onSelectProject={handleSelectProject}
            onStartProject={() => setIsProjectModalOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onStartProject={() => setIsProjectModalOpen(true)}
            onViewWork={() => handleNavigate('work')}
          />
        )}

        {currentView === 'services' && (
          <ServicesView
            onStartProject={() => setIsProjectModalOpen(true)}
          />
        )}

        {currentView === 'careers' && (
          <CareersView
            onStartProject={() => setIsProjectModalOpen(true)}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}
      </main>

      {/* Universal Architectural Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInquiry={() => setIsProjectModalOpen(true)}
        onSelectProject={handleSelectProject}
      />

      {/* Modal Dialog */}
      <StartProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
}
