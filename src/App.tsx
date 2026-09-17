import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProjectPortfolioView } from './components/ProjectPortfolioView';
import { ProjectDetailWrapper } from './components/ProjectDetailWrapper';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { CareersView } from './components/CareersView';
import { IndustriesView } from './components/IndustriesView';
import { TestimonialsView } from './components/TestimonialsView';
import { ContactView } from './components/ContactView';
import { StartProjectModal } from './components/StartProjectModal';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export default function App() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#08090c] text-[#e5e7eb] flex flex-col selection:bg-[#c8aa7a] selection:text-[#08090c]">
        {/* Universal Premium Navigation */}
        <Navbar
          onStartProject={() => setIsProjectModalOpen(true)}
        />

        {/* Main Content Areas */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeView onStartProject={() => setIsProjectModalOpen(true)} />} />
            <Route path="/about" element={<AboutView onStartProject={() => setIsProjectModalOpen(true)} />} />
            <Route path="/work" element={<ProjectPortfolioView onStartProject={() => setIsProjectModalOpen(true)} />} />
            <Route path="/work/:id" element={<ProjectDetailWrapper onStartProject={() => setIsProjectModalOpen(true)} />} />
            <Route path="/services" element={<ServicesView onStartProject={() => setIsProjectModalOpen(true)} />} />
            <Route path="/careers" element={<CareersView onStartProject={() => setIsProjectModalOpen(true)} />} />
            <Route path="/industries" element={<IndustriesView />} />
            <Route path="/testimonials" element={<TestimonialsView />} />
            <Route path="/contact" element={<ContactView />} />
          </Routes>
        </main>

        {/* Universal Architectural Footer */}
        <Footer
          onOpenInquiry={() => setIsProjectModalOpen(true)}
        />

        {/* Modal Dialog */}
        <StartProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
        />
      </div>
    </Router>
  );
}
