import React from 'react';
import { HeroSection } from './HeroSection';
import { IntroductionSection } from './IntroductionSection';
import { FeaturedWorkGrid } from './FeaturedWorkGrid';
import { ServicesSection } from './ServicesSection';
import { WhyGhSection } from './WhyGhSection';
import { PartnersSection } from './PartnersSection';
import { ProjectCtaSection } from './ProjectCtaSection';
import { PROJECTS } from '../data/ghData';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

interface HomeViewProps {
  onStartProject: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartProject }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <HeroSection
        onViewWork={() => navigate('/work')}
        onExploreWork={() => navigate('/work')}
        onStartProject={onStartProject}
        onSelectProject={(id) => navigate(`/work/${id}`)}
      />

      <IntroductionSection
        onLearnMore={() => navigate('/about')}
        onStartProject={onStartProject}
      />

      <FeaturedWorkGrid
        projects={PROJECTS}
        onSelectProject={(id) => navigate(`/work/${id}`)}
        onViewAllProjects={() => navigate('/work')}
      />

      <ServicesSection
        onStartProject={onStartProject}
      />

      <WhyGhSection />

      <PartnersSection />

      <ProjectCtaSection
        onStartProject={onStartProject}
      />
    </motion.div>
  );
};
