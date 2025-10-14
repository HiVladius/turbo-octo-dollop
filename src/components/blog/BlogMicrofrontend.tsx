import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface BlogMicrofrontendProps {
  isOpen: boolean;
  onClose: () => void;
}

// URL del blog según el ambiente
// Development: http://localhost:4200
// Staging: https://porfolio-vlad-staging.web.app/blog
// Production: https://porfolio-vlad.web.app/blog
const BLOG_URL = import.meta.env.VITE_BLOG_URL || 'http://localhost:4200';
// const BLOG_URL = 'http://localhost:4200'

export const BlogMicrofrontend: React.FC<BlogMicrofrontendProps> = ({ isOpen, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && iframeRef.current) {
      setIsLoading(true);
    }
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const openInNewTab = () => {
    window.open(BLOG_URL, '_blank');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-6xl h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-600 to-red-600">
          <h2 className="text-xl font-bold text-white">Preview Blog</h2>
          <div className="flex gap-2">
            <button
              onClick={openInNewTab}
              className="p-2 text-white hover:bg-amber-300 hover:bg-opacity-20 rounded-lg transition-colors"
              title="Abrir en nueva pestaña"
            >
              <ExternalLink size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-amber-300 hover:bg-opacity-20 rounded-lg transition-colors"
              title="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600 font-medium">Cargando blog...</p>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          src={BLOG_URL}
          className="w-full h-[calc(100%-64px)] border-0"
          title="Angular Blog"
          onLoad={handleIframeLoad}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </motion.div>
    </motion.div>
  );
};
