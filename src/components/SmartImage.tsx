import React, { useState, useEffect } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
}

const MODULE_PREFIXES = ['1400', 'max_1200', 'source', 'fs', 'disp'];

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  onClick,
  loading = 'lazy'
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [attemptIndex, setAttemptIndex] = useState<number>(0);

  // Sync if src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setStatus('loading');
    setAttemptIndex(0);
  }, [src]);

  const handleError = () => {
    // If it's a Behance project module, try next resolution prefix
    if (src.includes('/project_modules/')) {
      const parts = src.split('/project_modules/');
      if (parts.length > 1) {
        const subparts = parts[1].split('/');
        const filename = subparts.slice(1).join('/');

        // Filter out current prefix
        const currentPrefix = subparts[0];
        const nextPrefixes = MODULE_PREFIXES.filter((p) => p !== currentPrefix);

        if (attemptIndex < nextPrefixes.length) {
          const nextPrefix = nextPrefixes[attemptIndex];
          setAttemptIndex((prev) => prev + 1);
          setCurrentSrc(`https://mir-s3-cdn-cf.behance.net/project_modules/${nextPrefix}/${filename}`);
          return;
        }
      }
    }

    // If all fail
    setStatus('error');
  };

  const handleLoad = () => {
    setStatus('loaded');
  };

  if (status === 'error') {
    return (
      <div className={`w-full bg-neutral-100 rounded-sm p-8 flex flex-col items-center justify-center text-neutral-400 min-h-[220px] ${containerClassName}`}>
        <ImageOff size={28} className="mb-2 opacity-60" />
        <span className="text-xs font-mono uppercase tracking-wider">Imagen no disponible en Behance</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-neutral-100 ${containerClassName} ${onClick ? 'cursor-pointer group' : ''}`}
      onClick={onClick}
    >
      {/* Loading Shimmer Skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 z-0 bg-neutral-100 animate-pulse flex items-center justify-center min-h-[200px]">
          <Loader2 className="w-6 h-6 text-neutral-400 animate-spin opacity-50" />
        </div>
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-auto transition-opacity duration-500 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
};
