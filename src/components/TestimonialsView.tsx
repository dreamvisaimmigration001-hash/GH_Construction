import React from 'react';
import { motion } from 'motion/react';
import { TestimonialsSection } from './TestimonialsSection';

export const TestimonialsView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="pt-28 min-h-screen bg-[#08090c]"
    >
      <TestimonialsSection />
    </motion.div>
  );
};
