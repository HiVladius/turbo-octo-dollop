import React from 'react';
import { motion } from 'framer-motion';

export const NotFound: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img 
        src="/src/assets/logo1.jpg" 
        alt="Logo" 
        className="w-32 h-32 mb-4" 
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        
      />
      <motion.h1 
        className="text-6xl font-bold text-red-500 mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.p 
        className="text-2xl text-gray-700 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Page Not Found
      </motion.p>
      <motion.a 
        href="/" 
        className="text-blue-500 hover:underline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Go back to Home
      </motion.a>
    </motion.div>
  );
};

