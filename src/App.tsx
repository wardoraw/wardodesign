import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Mail, Instagram, Dribbble, X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ExternalLink, ZoomIn, FileText, Download, Globe } from 'lucide-react';

import { PROJECTS, type Project } from './projects';
import { SmartImage } from './components/SmartImage';
import { ImageLightbox } from './components/ImageLightbox';
import { InteractivePDFModal } from './components/InteractivePDFModal';
import { TRANSLATIONS, PROJECT_DESCRIPTIONS, VIDEO_DESCRIPTIONS, type Language } from './i18n';

// @ts-ignore
import bbcCumbreCover from './assets/images/bbc_cumbre_cover_1783810571802.jpg';
// @ts-ignore
import bbcTriquiCover from './assets/images/bbc_triqui_cover_1783810581147.jpg';
// @ts-ignore
import clubColombiaCover from './assets/images/club_colombia_cover_1783810594350.jpg';

// Mock data for vertical videos
const VIDEOS = [
  {
    id: 1,
    title: "BBC ROSE 2024",
    client: "BBC Cervecería",
    year: "2024",
    category: "Commercial / Reel",
    youtubeId: "_SEkK_PBSiM",
    videoUrl: "https://www.youtube.com/shorts/_SEkK_PBSiM",
    poster: "https://img.youtube.com/vi/_SEkK_PBSiM/maxresdefault.jpg",
    description: "Campaña de lanzamiento para BBC Rosé 2024."
  },
  {
    id: 2,
    title: "BBC SONIDOS EN LA CUMBRE 2024",
    client: "BBC Cervecería",
    year: "2024",
    category: "Event Reel / Festival",
    youtubeId: "dZKDCL9_Jps",
    videoUrl: "https://www.youtube.com/shorts/dZKDCL9_Jps",
    poster: bbcCumbreCover,
    description: "Cobertura de Sonidos en la Cumbre 2024."
  },
  {
    id: 3,
    title: "BBC TRIQUI TRIQUI 2024",
    client: "BBC Cervecería",
    year: "2024",
    category: "Halloween Promo / Reel",
    youtubeId: "LHpSTJF731o",
    videoUrl: "https://www.youtube.com/shorts/LHpSTJF731o",
    poster: bbcTriquiCover,
    description: "Campaña de Halloween BBC Triqui Triqui 2024."
  },
  {
    id: 4,
    title: "Club Colombia Tascas 2025",
    client: "Club Colombia",
    year: "2025",
    category: "Event Promo / Reel",
    youtubeId: "79nf-ZPCcig",
    videoUrl: "https://www.youtube.com/shorts/79nf-ZPCcig",
    poster: clubColombiaCover,
    description: "Promoción de Club Colombia Tascas 2025."
  },
  {
    id: 5,
    title: "HONOR & FALCAO 2026",
    client: "HONOR",
    year: "2026",
    category: "Brand Campaign / Reel",
    youtubeId: "RTkBrNRu3y8",
    videoUrl: "https://www.youtube.com/shorts/RTkBrNRu3y8",
    poster: "https://img.youtube.com/vi/RTkBrNRu3y8/maxresdefault.jpg",
    description: "Campaña de marca HONOR con Radamel Falcao 2026."
  },
  {
    id: 6,
    title: "HONOR 400 Lite & Falcao 2025",
    client: "HONOR",
    year: "2025",
    category: "Product Showcase / Reel",
    youtubeId: "8YXsymY2fj0",
    videoUrl: "https://www.youtube.com/shorts/8YXsymY2fj0",
    poster: "https://img.youtube.com/vi/8YXsymY2fj0/maxresdefault.jpg",
    description: "Presentación de HONOR 400 Lite junto a Falcao 2025."
  },
  {
    id: 7,
    title: "HONOR 600 Unboxing 2026",
    client: "HONOR",
    year: "2026",
    category: "Unboxing / Promo",
    youtubeId: "2SRgsGFfPK4",
    videoUrl: "https://www.youtube.com/shorts/2SRgsGFfPK4",
    poster: "https://img.youtube.com/vi/2SRgsGFfPK4/maxresdefault.jpg",
    description: "Unboxing del nuevo HONOR 600 en 2026."
  },
  {
    id: 8,
    title: "LJ CORPORATE SOLUTIONS 2025",
    client: "LJ Corporate Solutions",
    year: "2025",
    category: "Corporate Video / Reel",
    youtubeId: "aPh28vCpUsY",
    videoUrl: "https://www.youtube.com/shorts/aPh28vCpUsY",
    poster: "https://img.youtube.com/vi/aPh28vCpUsY/maxresdefault.jpg",
    description: "Video corporativo para LJ Corporate Solutions 2025."
  }
];

function VideoCard({ video, onClick, watchLabel }: { video: typeof VIDEOS[0]; onClick: () => void; watchLabel: string; key?: React.Key }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer bg-neutral-900 border border-neutral-800 p-3 rounded-xl flex flex-col justify-between hover:border-neutral-500 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-neutral-950 mb-2.5">
        {video.youtubeId ? (
          <img
            src={video.poster}
            alt={video.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              // Fallback if maxresdefault.jpg is not generated by YouTube
              e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
            }}
          />
        ) : (
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.poster}
            muted
            playsInline
            loop
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
        
        {/* Play indicator on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-85 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-11 h-11 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play size={18} fill="currentColor" className="ml-0.5" />
          </div>
        </div>

        {/* Floating Category Tag */}
        <div className="absolute top-2.5 left-2.5 z-10 bg-black/75 backdrop-blur-md text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-mono text-white border border-white/10">
          Reel 9:16
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
            <span className="truncate max-w-[70%]">{video.client}</span>
            <span>{video.year}</span>
          </div>
          <h3 className="text-sm font-medium text-white group-hover:text-neutral-200 transition-colors line-clamp-1">
            {video.title}
          </h3>
        </div>
        <div className="mt-2 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase">
          <span className="truncate max-w-[65%]">{video.category.split('/')[0].trim()}</span>
          <span className="text-white flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">{watchLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}

function VideoTheaterModal({
  video,
  language,
  onClose,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
}: {
  video: typeof VIDEOS[0];
  language: Language;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const t = TRANSLATIONS[language].videoModal;
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Reset state on video change
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(0);
  }, [video]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-neutral-950 text-white flex flex-col md:grid md:grid-cols-12 overflow-hidden"
    >
      {/* Top Header Row for Close Button */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[120] pointer-events-none">
        <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono pointer-events-auto bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {t.cinemaMode}
        </span>
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer pointer-events-auto"
        >
          <X size={20} />
        </button>
      </div>

      {/* Left / Center: Cinematic Video Player Container (9:16 Aspect) */}
      <div className="md:col-span-7 lg:col-span-8 bg-black flex items-center justify-center relative p-4 pt-24 pb-20 md:p-12">
        {/* Navigation Arrows inside player */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`w-12 h-12 rounded-full bg-neutral-900/60 backdrop-blur-md border border-neutral-800 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all pointer-events-auto ${
              !hasPrev ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`w-12 h-12 rounded-full bg-neutral-900/60 backdrop-blur-md border border-neutral-800 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all pointer-events-auto ${
              !hasNext ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* 9:16 Video Wrapper */}
        <div className="relative h-full max-h-[75vh] md:max-h-[85vh] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900 group">
          {video.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${video.youtubeId}&controls=1&modestbranding=1&rel=0`}
              title={video.title}
              className="w-full h-full object-cover border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <video
                ref={videoRef}
                src={video.videoUrl}
                autoPlay
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-full object-cover cursor-pointer"
                onClick={handlePlayPause}
              />

              {/* Custom Controls HUD overlays */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                {/* Play bar */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-neutral-400">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleProgressBarChange}
                    className="flex-1 accent-white bg-neutral-800 h-1 rounded-lg cursor-pointer range-sm"
                  />
                  <span className="text-[10px] font-mono text-neutral-400">{formatTime(duration)}</span>
                </div>

                {/* Buttons Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePlayPause}
                      className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                    >
                      {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                    </button>
                    <button
                      onClick={handleMuteToggle}
                      className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
                    Reel {video.id}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: Info Panel / Description */}
      <div className="md:col-span-5 lg:col-span-4 bg-neutral-900/50 backdrop-blur-md p-8 md:p-12 flex flex-col justify-between overflow-y-auto border-t md:border-t-0 md:border-l border-neutral-800 h-[40vh] md:h-full">
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-4">{t.details}</span>
            <h3 className="text-xl md:text-2xl font-serif text-white mb-2">{video.title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {VIDEO_DESCRIPTIONS[video.id]?.[language] || video.description}
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-neutral-800 pt-8 text-xs uppercase tracking-widest">
            <div>
              <span className="block text-neutral-500 font-medium mb-1.5 font-mono">{t.client}</span>
              <span className="text-white text-sm">{video.client}</span>
            </div>
            <div>
              <span className="block text-neutral-500 font-medium mb-1.5 font-mono">{t.year}</span>
              <span className="text-white text-sm">{video.year}</span>
            </div>
            <div className="col-span-2">
              <span className="block text-neutral-500 font-medium mb-1.5 font-mono">{t.formatType}</span>
              <span className="text-white text-sm">{video.category}</span>
            </div>
          </div>
        </div>

        {/* Call to Action at the bottom */}
        <div className="border-t border-neutral-800 pt-8 mt-8">
          <p className="text-xs text-neutral-500 leading-relaxed mb-4">
            {t.ctaText}
          </p>
          <a
            href={`mailto:edward40765154@gmail.com?subject=${encodeURIComponent(t.mailtoSubject)}`}
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-white border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-all"
          >
            {t.ctaLink} <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'es' || urlLang === 'en') {
      return urlLang;
    }
    const saved = window.localStorage.getItem('portfolio_lang');
    if (saved === 'es' || saved === 'en') {
      return saved;
    }
  }
  return 'en';
}

export default function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [gridColumns, setGridColumns] = useState<3 | 4>(3);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const t = TRANSLATIONS[language];

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    try {
      window.localStorage.setItem('portfolio_lang', newLang);
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t.meta.description);
    }
  }, [language, t]);

  const categories = ['Todos', 'Branding', 'Campaign', 'Rebranding', 'Videos'];

  const getCategoryCount = (cat: string) => {
    if (cat === 'Todos') return PROJECTS.length;
    if (cat === 'Videos') return VIDEOS.length;
    return PROJECTS.filter(p => p.category.toLowerCase().includes(cat.toLowerCase())).length;
  };

  const filteredProjects = activeCategory === 'Todos'
    ? PROJECTS
    : activeCategory === 'Videos'
    ? []
    : PROJECTS.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#videos') {
        setActiveCategory('Videos');
      } else if (window.location.hash === '#pdf') {
        setIsPdfModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    if (isMenuOpen || selectedProject || selectedVideo || lightboxIndex !== null || isPdfModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen, selectedProject, selectedVideo, lightboxIndex, isPdfModalOpen]);

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIdx = PROJECTS.findIndex(p => p.id === selectedProject.id);
    const nextIdx = currentIdx < PROJECTS.length - 1 ? currentIdx + 1 : 0;
    setSelectedProject(PROJECTS[nextIdx]);
    setLightboxIndex(null);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIdx = PROJECTS.findIndex(p => p.id === selectedProject.id);
    const prevIdx = currentIdx > 0 ? currentIdx - 1 : PROJECTS.length - 1;
    setSelectedProject(PROJECTS[prevIdx]);
    setLightboxIndex(null);
  };

  const handleNextVideo = () => {
    if (!selectedVideo) return;
    const currentIndex = VIDEOS.findIndex((v) => v.id === selectedVideo.id);
    if (currentIndex < VIDEOS.length - 1) {
      setSelectedVideo(VIDEOS[currentIndex + 1]);
    }
  };

  const handlePrevVideo = () => {
    if (!selectedVideo) return;
    const currentIndex = VIDEOS.findIndex((v) => v.id === selectedVideo.id);
    if (currentIndex > 0) {
      setSelectedVideo(VIDEOS[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 mix-blend-difference text-white">
        <a href="#" className="text-sm font-medium tracking-widest uppercase">
          Edward Muñoz
        </a>
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Switcher EN / ES */}
          <div
            className="flex items-center rounded-full border border-white/25 bg-white/10 p-0.5 text-[11px] font-mono uppercase tracking-wider backdrop-blur-sm"
            role="group"
            aria-label="Language switcher"
          >
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-black font-bold'
                  : 'text-white/75 hover:text-white'
              }`}
              title="English version"
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('es')}
              className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                language === 'es'
                  ? 'bg-white text-black font-bold'
                  : 'text-white/75 hover:text-white'
              }`}
              title="Versión en Español"
            >
              ES
            </button>
          </div>

          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white hover:text-black border border-white/25 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer backdrop-blur-sm shadow-xs"
            title={t.nav.pdfTooltip}
          >
            <FileText size={13} className="text-red-400" />
            <span className="hidden md:inline">{t.nav.pdfButton}</span>
            <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">{t.nav.pdfBadge}</span>
          </button>

          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity cursor-pointer px-2 py-1"
          >
            {t.nav.menu}
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-6"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium tracking-widest uppercase">{t.nav.menu}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest border border-white/20 rounded-full p-0.5">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                      language === 'en' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageChange('es')}
                    className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                      language === 'es' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    ES
                  </button>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-5 text-4xl sm:text-6xl md:text-7xl font-serif">
              <a 
                href="#work" 
                onClick={() => {
                  if (activeCategory === 'Videos') setActiveCategory('Todos');
                  setIsMenuOpen(false);
                }} 
                className="hover:italic transition-all"
              >
                {t.nav.design}
              </a>
              <a 
                href="#work" 
                onClick={() => {
                  setActiveCategory('Videos');
                  setIsMenuOpen(false);
                }} 
                className="hover:italic transition-all"
              >
                {t.nav.video} ({VIDEOS.length})
              </a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:italic transition-all">{t.nav.about}</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:italic transition-all">{t.nav.contact}</a>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsPdfModalOpen(true);
                  }}
                  className="text-left flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-mono text-red-400 hover:text-white transition-colors cursor-pointer"
                >
                  <FileText size={22} />
                  <span>{t.nav.menuPdfCta}</span>
                </button>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  {t.nav.menuPdfDesc}
                </p>
              </div>
            </div>

            <div className="flex justify-between text-sm tracking-widest uppercase opacity-50">
              <span>© 2026</span>
              <div className="flex gap-4">
                <a href="https://instagram.com/wardo.doit" target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity">IG</a>
                <a href="https://www.behance.net/imwardo" target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity">BE</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-end px-6 pb-12 md:pb-24 pt-32">
        <div className="max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-9xl font-serif leading-[0.9] tracking-tighter"
          >
            Edward <br/>
            <span className="italic text-gray-400">Muñoz</span> <br/>
            Graphic Creative.
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 md:mt-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <p className="max-w-md text-lg md:text-xl font-light leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-neutral-800 transition-all text-xs font-mono uppercase tracking-wider shadow-sm cursor-pointer border border-neutral-800"
              >
                <FileText size={13} className="text-red-400" />
                <span>{t.hero.pdfCta}</span>
              </button>
              <div className="flex items-center gap-2 text-sm uppercase tracking-widest font-medium text-neutral-600">
                <span>{t.hero.scrollToExplore}</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  ↓
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="px-6 py-20 bg-white relative">
        <div id="videos" className="absolute -top-16" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono block mb-2">
              {activeCategory === 'Videos' 
                ? t.work.eyebrowVideos(VIDEOS.length)
                : t.work.eyebrowProjects(PROJECTS.length)}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif">
              {activeCategory === 'Videos' ? (
                <>{t.work.titleVideosTop} <br/><span className="italic text-gray-400">{t.work.titleVideosAccent}</span></>
              ) : (
                <>{t.work.titleProjectsTop} <br/><span className="italic text-gray-400">{t.work.titleProjectsAccent}</span></>
              )}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 hidden md:block">
              {activeCategory === 'Videos' ? t.work.verticalFormat : '(2021 — 2026)'}
            </span>
            <a
              href="https://www.behance.net/imwardo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
            >
              behance.net/imwardo <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Category Filters & Column View Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-neutral-100">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = getCategoryCount(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-black text-white font-medium shadow-sm scale-105'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black'
                  }`}
                >
                  {cat === 'Videos' && <Play size={10} fill="currentColor" />}
                  <span>{t.work.categories[cat] || cat}</span>
                  <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-neutral-400'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Tools: PDF & Column View Toggle */}
          <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-xs border border-neutral-800 hover:scale-105 active:scale-95"
              title={t.work.downloadPdfTooltip}
            >
              <FileText size={12} className="text-red-400" />
              <span>{t.work.downloadPdf}</span>
              <span className="text-[10px] text-red-300 font-bold hidden md:inline">{t.work.activeLinks}</span>
            </button>

            {/* Column View Toggle for Projects */}
            {activeCategory !== 'Videos' && (
              <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-neutral-500">
                <span className="text-[11px] uppercase tracking-wider mr-1 text-neutral-400">{t.work.viewLabel}</span>
                <button
                  onClick={() => setGridColumns(3)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    gridColumns === 3 ? 'bg-black text-white font-bold' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                  title={t.work.col3Title}
                >
                  3 Col
                </button>
                <button
                  onClick={() => setGridColumns(4)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    gridColumns === 4 ? 'bg-black text-white font-bold' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                  title={t.work.col4Title}
                >
                  4 Col
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content: Videos or Compact Projects Grid */}
        {activeCategory === 'Videos' ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-5 rounded-xl bg-neutral-950 text-white border border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 text-red-500 flex items-center justify-center shrink-0">
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-white">{t.work.videoBannerTitle}</h3>
                    <span className="bg-red-600/40 text-red-300 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-red-500/30 font-mono">
                      {t.work.videoBannerBadge}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">{t.work.videoBannerDesc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <FileText size={13} />
                  <span>{t.work.exportPdfBtn}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {VIDEOS.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  watchLabel={t.work.watchReel}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-x-6 gap-y-8 md:gap-y-10`}>
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.05 }}
                className="group cursor-pointer flex flex-col justify-between"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden bg-neutral-100 rounded-lg aspect-[16/11] mb-3 border border-neutral-200/70 group-hover:border-black/40 transition-all duration-300 shadow-xs group-hover:shadow-md">
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 pointer-events-none">
                    {project.isNew && (
                      <span className="bg-black text-white text-[9px] px-2 py-0.5 uppercase tracking-widest font-bold shadow-sm">
                        {t.work.newBadge}
                      </span>
                    )}
                    <span className="bg-white/95 backdrop-blur-sm text-black text-[9px] px-2 py-0.5 uppercase tracking-widest font-mono shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="bg-black/80 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                      {t.work.photosCount(project.gallery?.length || 1)}
                    </span>
                  </div>

                  <div className="w-full h-full">
                    <SmartImage 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      containerClassName="w-full h-full"
                      loading="lazy"
                      unavailableText={t.smartImage.unavailable}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-start gap-2 pt-0.5">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm md:text-base font-medium truncate group-hover:text-neutral-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-500 truncate">{project.client}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-mono text-neutral-700">{project.year}</p>
                    <p className="text-[10px] font-mono text-neutral-400 uppercase">{project.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* About / Manifesto */}
      <section id="about" className="px-6 py-32 md:py-48 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-6">{t.about.eyebrow}</span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl lg:text-5xl font-serif leading-relaxed mb-12"
          >
            {t.about.quote}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-white/20 pt-12">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-mono">{t.about.locationTitle}</h4>
              <p className="text-sm leading-relaxed text-neutral-300">{t.about.locationLine1}<br/>{t.about.locationLine2}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-mono">{t.about.specialtiesTitle}</h4>
              <ul className="text-sm leading-relaxed space-y-1.5 text-neutral-300">
                {t.about.specialties.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-mono">{t.about.experienceTitle}</h4>
              <ul className="text-sm leading-relaxed space-y-1.5 text-neutral-300">
                {t.about.experience.map((exp, idx) => (
                  <li key={idx}><span className="font-medium text-white">{exp.client}</span> — {exp.role}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6">
            <a 
              href="https://www.behance.net/imwardo" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white hover:border-white hover:bg-white hover:text-black transition-all text-xs uppercase tracking-widest font-mono"
            >
              {t.about.exploreBehance} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section id="contact" className="px-6 py-24 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <h2 className="text-5xl md:text-8xl font-serif mb-8">{t.contact.heading}</h2>
            <a 
              href="mailto:edward40765154@gmail.com" 
              className="inline-flex items-center gap-2 text-xl md:text-2xl border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
            >
              edward40765154@gmail.com <ArrowUpRight size={24} />
            </a>
          </div>
          
          <div className="flex flex-col gap-4">
            <a href="https://instagram.com/wardo.doit" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">
              <Instagram size={16} /> @wardo.doit
            </a>
            <a href="https://www.behance.net/imwardo" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">
              <Dribbble size={16} /> behance.net/imwardo
            </a>
          </div>
        </div>

        {/* Interactive PDF Banner */}
        <div className="max-w-5xl mx-auto mt-16 p-6 sm:p-8 rounded-2xl bg-neutral-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-neutral-800">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest font-bold">
              <FileText size={15} />
              <span>{t.contact.pdfBannerEyebrow}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif">{t.contact.pdfBannerTitle}</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
              {t.contact.pdfBannerDesc}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={t.pdfModal.pdfUrl}
              download={t.pdfModal.pdfFilename}
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest font-mono hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download size={14} />
              <span>{t.contact.downloadPdfBtn}</span>
            </a>
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex-1 sm:flex-none px-5 py-3 rounded-full border border-neutral-700 text-neutral-300 font-mono text-xs uppercase tracking-widest hover:border-white hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{t.contact.viewStructureBtn}</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest text-gray-400">
          <p>© 2026 Edward Muñoz</p>
          <div className="flex items-center gap-4">
            <p>{t.contact.footerRole}</p>
            <button
              onClick={() => handleLanguageChange(language === 'en' ? 'es' : 'en')}
              className="inline-flex items-center gap-1 text-black hover:opacity-60 transition-opacity font-mono cursor-pointer border-b border-black/40 pb-0.5"
            >
              <Globe size={12} />
              <span>{language === 'en' ? 'Ver en Español' : 'View in English'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          >
            {/* Top Navigation Bar */}
            <div className="sticky top-0 left-0 right-0 p-4 md:p-6 bg-white/95 backdrop-blur-md border-b border-neutral-100 flex items-center justify-between z-20">
              <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono uppercase tracking-widest">
                <button
                  onClick={handlePrevProject}
                  className="flex items-center gap-1 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} /> <span className="hidden sm:inline">{t.projectModal.prev}</span>
                </button>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500 font-medium">
                  {PROJECTS.findIndex(p => p.id === selectedProject.id) + 1} / {PROJECTS.length}
                </span>
                <span className="text-neutral-300">|</span>
                <button
                  onClick={handleNextProject}
                  className="flex items-center gap-1 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                >
                  <span className="hidden sm:inline">{t.projectModal.next}</span> <ChevronRight size={16} />
                </button>
              </div>

              <button 
                onClick={() => { setSelectedProject(null); setLightboxIndex(null); }} 
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-600 hover:text-black transition-opacity cursor-pointer p-1"
                aria-label={t.projectModal.closeAria}
              >
                <span className="hidden sm:inline">{t.projectModal.close}</span>
                <X size={24} />
              </button>
            </div>
            
            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 pt-12 pb-32">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif mb-12 md:mb-16 leading-[0.9] tracking-tighter relative"
              >
                {selectedProject.title}
                {selectedProject.isNew && (
                  <span className="absolute -top-7 left-0 bg-black text-white text-[10px] px-2.5 py-1 uppercase tracking-widest font-bold">{t.projectModal.newBadge}</span>
                )}
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 md:mb-28"
              >
                <div className="md:col-span-4 flex flex-col gap-6 text-xs uppercase tracking-widest text-gray-400">
                  <div>
                    <span className="block text-black font-medium mb-1.5 font-mono">{t.projectModal.client}</span>
                    <span className="text-neutral-700">{selectedProject.client}</span>
                  </div>
                  <div>
                    <span className="block text-black font-medium mb-1.5 font-mono">{t.projectModal.year}</span>
                    <span className="text-neutral-700">{selectedProject.year}</span>
                  </div>
                  <div>
                    <span className="block text-black font-medium mb-1.5 font-mono">{t.projectModal.category}</span>
                    <span className="text-neutral-700">{selectedProject.category}</span>
                  </div>
                  <div>
                    <span className="block text-black font-medium mb-1.5 font-mono">{t.projectModal.behanceLink}</span>
                    <a
                      href={selectedProject.behanceUrl || 'https://www.behance.net/imwardo'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-black border-b border-black pb-0.5 hover:opacity-60 transition-opacity font-mono lowercase"
                    >
                      {t.projectModal.viewBehance} <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
                <div className="md:col-span-8 flex flex-col justify-between gap-8">
                  <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-black">
                    {PROJECT_DESCRIPTIONS[selectedProject.id]?.[language] || selectedProject.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={selectedProject.behanceUrl || 'https://www.behance.net/imwardo'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-mono rounded hover:bg-neutral-800 transition-colors w-fit"
                    >
                      {t.projectModal.viewBehance} <ArrowUpRight size={14} />
                    </a>
                    <span className="text-xs font-mono text-neutral-400">
                      {t.projectModal.piecesInGallery(selectedProject.gallery.length)}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Header */}
              <div className="border-t border-neutral-100 pt-10 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-medium">
                  {t.projectModal.galleryHeader(selectedProject.gallery.length)}
                </h3>
                <span className="text-xs font-mono text-neutral-400">
                  {t.projectModal.galleryHint}
                </span>
              </div>

              {/* Gallery Images */}
              <div className="flex flex-col gap-8 md:gap-16">
                {selectedProject.gallery.map((img, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className={`w-full group relative cursor-zoom-in ${idx % 3 === 1 ? 'md:w-5/6 mx-auto' : idx % 3 === 2 ? 'md:w-3/4 ml-auto' : ''}`}
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <div className="relative overflow-hidden rounded-sm shadow-sm bg-neutral-100">
                      <SmartImage 
                        src={img} 
                        alt={t.projectModal.galleryAlt(selectedProject.title, idx + 1)} 
                        className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                        unavailableText={t.smartImage.unavailable}
                      />
                      <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 text-[11px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                        <ZoomIn size={13} /> {t.projectModal.zoom}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Back to top & Navigation at bottom */}
              <div className="mt-28 pt-12 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono">
                  <button
                    onClick={handlePrevProject}
                    className="flex items-center gap-1.5 px-4 py-2.5 border border-neutral-300 rounded hover:border-black transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} /> {t.projectModal.prevProject}
                  </button>
                  <button
                    onClick={handleNextProject}
                    className="flex items-center gap-1.5 px-4 py-2.5 border border-neutral-300 rounded hover:border-black transition-colors cursor-pointer"
                  >
                    {t.projectModal.nextProject} <ChevronRight size={16} />
                  </button>
                </div>

                <button 
                  onClick={() => { setSelectedProject(null); setLightboxIndex(null); }}
                  className="text-xs uppercase tracking-widest font-mono font-medium hover:text-gray-500 transition-colors cursor-pointer"
                >
                  {t.projectModal.backToTop}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal for high-res zoom */}
      {lightboxIndex !== null && selectedProject && (
        <ImageLightbox
          images={selectedProject.gallery}
          currentIndex={lightboxIndex}
          projectTitle={selectedProject.title}
          behanceUrl={selectedProject.behanceUrl}
          language={language}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      )}

      {/* Video Theater Modal Overlay */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoTheaterModal
            video={selectedVideo}
            language={language}
            onClose={() => setSelectedVideo(null)}
            onNext={handleNextVideo}
            onPrev={handlePrevVideo}
            hasPrev={VIDEOS.findIndex((v) => v.id === selectedVideo.id) > 0}
            hasNext={VIDEOS.findIndex((v) => v.id === selectedVideo.id) < VIDEOS.length - 1}
          />
        )}
      </AnimatePresence>

      {/* Interactive PDF Modal */}
      <InteractivePDFModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        language={language}
      />
    </div>
  );
}
