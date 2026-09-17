import React from 'react';
import { motion } from 'motion/react';
import { IndustriesSection } from './IndustriesSection';
import { useNavigate } from 'react-router-dom';

export const IndustriesView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="pt-28 min-h-screen bg-[#08090c]"
    >
      <IndustriesSection
        onSelectIndustryFilter={(category) => {
          navigate('/work', { state: { filter: category } });
        }}
      />
    </motion.div>
  );
};
