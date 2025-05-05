import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import '@/styles/index.css';
import '@/styles/tailwind.css';
import Home from '@/pages/Home';

const App: React.FC = () => {
  try {
    return (
      <motion.div
        className="bg-primary min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <Home />
        </Suspense>
      </motion.div>
    );
  } catch (error: any) {
    console.error('App rendering error:', error);
    return (
      <motion.div
        className="bg-primary min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="text-red-500 font-bold text-center">
          An error occurred during rendering. Please check the console for details.
        </div>
      </motion.div>
    );
  }
};

export default App;