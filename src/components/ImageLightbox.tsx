import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  projectTitle: string;
  behanceUrl?: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  projectTitle,
  behanceUrl,
  onClose,
  onNavigate
}) => {
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(images.length - 1);
    }
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col justify-between"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 text-white z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              {projectTitle}
            </span>
            <span className="text-xs font-mono text-neutral-500">|</span>
            <span className="text-xs font-mono text-neutral-300">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {behanceUrl && (
              <a
                href={behanceUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
              >
                Behance <ExternalLink size={12} />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800 cursor-pointer"
              aria-label="Cerrar visor"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Center image with arrows */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 select-none overflow-hidden">
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 z-10 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full transition-all border border-neutral-700 hover:scale-105 cursor-pointer"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <motion.img
            key={currentImage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            src={currentImage}
            alt={`${projectTitle} - Imagen ${currentIndex + 1}`}
            referrerPolicy="no-referrer"
            className="max-h-[82vh] max-w-[92vw] w-auto h-auto object-contain rounded shadow-2xl"
          />

          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 z-10 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full transition-all border border-neutral-700 hover:scale-105 cursor-pointer"
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Bottom thumbnail strip if multiple images */}
        {images.length > 1 && (
          <div className="px-6 py-3 overflow-x-auto flex items-center justify-center gap-2 border-t border-neutral-900 bg-black/60">
            {images.slice(0, 16).map((thumb, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`relative w-12 h-12 flex-shrink-0 overflow-hidden rounded transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'ring-2 ring-white scale-105'
                    : 'opacity-40 hover:opacity-80'
                }`}
              >
                <img
                  src={thumb}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {images.length > 16 && (
              <span className="text-[11px] font-mono text-neutral-500 pl-2">
                +{images.length - 16} más
              </span>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
