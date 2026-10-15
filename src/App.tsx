import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Mail, Instagram, Dribbble, X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ExternalLink, ZoomIn } from 'lucide-react';

import { PROJECTS, type Project } from './projects';
import { SmartImage } from './components/SmartImage';
import { ImageLightbox } from './components/ImageLightbox';

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

function VideoCard({ video, onClick }: { video: typeof VIDEOS[0]; onClick: () => void; key?: React.Key }) {
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
          <span className="text-white flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">Ver Reel →</span>
        </div>
      </div>
    </motion.div>
  );
}

function VideoTheaterModal({
  video,
  onClose,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
}: {
  video: typeof VIDEOS[0];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
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
          Modo Cine
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
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-4">Detalles del Video</span>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-neutral-800 pt-8 text-xs uppercase tracking-widest">
            <div>
              <span className="block text-neutral-500 font-medium mb-1.5 font-mono">Cliente</span>
              <span className="text-white text-sm">{video.client}</span>
            </div>
            <div>
              <span className="block text-neutral-500 font-medium mb-1.5 font-mono">Año</span>
              <span className="text-white text-sm">{video.year}</span>
            </div>
            <div className="col-span-2">
              <span className="block text-neutral-500 font-medium mb-1.5 font-mono">Formato & Tipo</span>
              <span className="text-white text-sm">{video.category}</span>
            </div>
          </div>
        </div>

        {/* Call to Action at the bottom */}
        <div className="border-t border-neutral-800 pt-8 mt-8">
          <p className="text-xs text-neutral-500 leading-relaxed mb-4">
            ¿Buscas crear una campaña de alto impacto en formato vertical? Conectemos para crear contenido optimizado para tu marca.
          </p>
          <a
            href="mailto:edward40765154@gmail.com?subject=Interes en Portafolio de Video"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-white border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-all"
          >
            Hablemos del Proyecto <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [gridColumns, setGridColumns] = useState<3 | 4>(3);

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
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    if (isMenuOpen || selectedProject || selectedVideo || lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen, selectedProject, selectedVideo, lightboxIndex]);

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
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white">
        <a href="#" className="text-sm font-medium tracking-widest uppercase">
          Edward Muñoz
        </a>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity cursor-pointer"
        >
          Menú
        </button>
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
              <span className="text-sm font-medium tracking-widest uppercase">Menú</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="hover:opacity-70 transition-opacity cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 text-5xl md:text-7xl font-serif">
              <a 
                href="#work" 
                onClick={() => {
                  if (activeCategory === 'Videos') setActiveCategory('Todos');
                  setIsMenuOpen(false);
                }} 
                className="hover:italic transition-all"
              >
                Diseño
              </a>
              <a 
                href="#work" 
                onClick={() => {
                  setActiveCategory('Videos');
                  setIsMenuOpen(false);
                }} 
                className="hover:italic transition-all"
              >
                Video ({VIDEOS.length})
              </a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:italic transition-all">Sobre Mí</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:italic transition-all">Contacto</a>
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
              Graphic Creative basado en Bogotá, Colombia. Especializado en Branding, Campañas de Lanzamiento y Dirección de Arte.
            </p>
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest font-medium">
              <span>Scroll para explorar</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ↓
              </motion.div>
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
                ? `Portafolio Audiovisual (${VIDEOS.length} Videos Verticales)`
                : `Portafolio Behance (${PROJECTS.length} Proyectos Seleccionados)`}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif">
              {activeCategory === 'Videos' ? (
                <>Contenido en <br/><span className="italic text-gray-400">Video & Reels</span></>
              ) : (
                <>Proyectos <br/><span className="italic text-gray-400">Seleccionados</span></>
              )}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 hidden md:block">
              {activeCategory === 'Videos' ? 'Formato Vertical (9:16)' : '(2021 — 2026)'}
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
                  <span>{cat}</span>
                  <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-neutral-400'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Column View Toggle for Projects */}
          {activeCategory !== 'Videos' && (
            <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-neutral-500 self-end sm:self-auto">
              <span className="text-[11px] uppercase tracking-wider mr-2 text-neutral-400">Vista:</span>
              <button
                onClick={() => setGridColumns(3)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  gridColumns === 3 ? 'bg-black text-white font-bold' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
                title="3 columnas por fila"
              >
                3 Col
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  gridColumns === 4 ? 'bg-black text-white font-bold' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
                title="4 columnas por fila (ultra compacto)"
              >
                4 Col
              </button>
            </div>
          )}
        </div>

        {/* Content: Videos or Compact Projects Grid */}
        {activeCategory === 'Videos' ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">Portafolio Audiovisual & Reels (9:16)</h3>
                  <p className="text-xs text-neutral-500">8 producciones verticales para marcas como BBC Cervecería, Club Colombia, HONOR & Falcao y LJ Corporate Solutions.</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider self-start sm:self-auto">
                Haz clic en cualquier video para reproducir
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {VIDEOS.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
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
                        Nuevo
                      </span>
                    )}
                    <span className="bg-white/95 backdrop-blur-sm text-black text-[9px] px-2 py-0.5 uppercase tracking-widest font-mono shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="bg-black/80 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                      {project.gallery?.length || 1} fotos
                    </span>
                  </div>

                  <div className="w-full h-full">
                    <SmartImage 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      containerClassName="w-full h-full"
                      loading="lazy"
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
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-6">Sobre Edward Muñoz</span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl lg:text-5xl font-serif leading-relaxed mb-12"
          >
            "¡Hola! Soy Edward y mi enfoque es el diseño de branding. He diseñado para marcas de accesorios, arquitectura, agencias de publicidad, belleza, gastronomía y turismo. Busco que en cada proyecto haya un universo visual completo que le funcione a las marcas para darse a conocer en el mundo online y en el offline."
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-white/20 pt-12">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-mono">Ubicación</h4>
              <p className="text-sm leading-relaxed text-neutral-300">Bogotá, Colombia.<br/>Disponible para proyectos de branding, campañas y dirección creativa a nivel global.</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-mono">Especialidades</h4>
              <ul className="text-sm leading-relaxed space-y-1.5 text-neutral-300">
                <li>• Branding & Identidad Visual</li>
                <li>• Campañas de Lanzamiento 360°</li>
                <li>• Dirección Creativa & Arte</li>
                <li>• Formatos Audiovisuales & Reels</li>
                <li>• Diseño Web & Digital</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-mono">Experiencia</h4>
              <ul className="text-sm leading-relaxed space-y-1.5 text-neutral-300">
                <li><span className="font-medium text-white">HONOR</span> — Digital & Campaign Designer</li>
                <li><span className="font-medium text-white">Telefónica</span> — Web Designer</li>
                <li><span className="font-medium text-white">BBC & Club Colombia</span> — Contenido Audiovisual</li>
                <li><span className="font-medium text-white">Idealidad</span> — Diseñador Gráfico</li>
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
              Explorar Behance Completo <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section id="contact" className="px-6 py-24 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <h2 className="text-5xl md:text-8xl font-serif mb-8">¿Hablamos?</h2>
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
        
        <div className="mt-32 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest text-gray-400">
          <p>© 2026 Edward Muñoz</p>
          <p>Graphic Creative — Bogotá, Colombia</p>
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
                  <ChevronLeft size={16} /> <span className="hidden sm:inline">Anterior</span>
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
                  <span className="hidden sm:inline">Siguiente</span> <ChevronRight size={16} />
                </button>
              </div>

              <button 
                onClick={() => { setSelectedProject(null); setLightboxIndex(null); }} 
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-600 hover:text-black transition-opacity cursor-pointer p-1"
                aria-label="Cerrar modal"
              >
                <span className="hidden sm:inline">Cerrar</span>
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
                  <span className="absolute -top-7 left-0 bg-black text-white text-[10px] px-2.5 py-1 uppercase tracking-widest font-bold">Nuevo</span>
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
                    <span className="block text-black font-medium mb-1.5 font-mono">Cliente</span>
                    <span className="text-neutral-700">{selectedProject.client}</span>
                  </div>
                  <div>
                    <span className="block text-black font-medium mb-1.5 font-mono">Año</span>
                    <span className="text-neutral-700">{selectedProject.year}</span>
                  </div>
                  <div>
                    <span className="block text-black font-medium mb-1.5 font-mono">Categoría</span>
                    <span className="text-neutral-700">{selectedProject.category}</span>
                  </div>
                  <div>
                    <span className="block text-black font-medium mb-1.5 font-mono">Enlace en Behance</span>
                    <a
                      href={selectedProject.behanceUrl || 'https://www.behance.net/imwardo'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-black border-b border-black pb-0.5 hover:opacity-60 transition-opacity font-mono lowercase"
                    >
                      Ver en Behance oficial <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
                <div className="md:col-span-8 flex flex-col justify-between gap-8">
                  <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-black">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={selectedProject.behanceUrl || 'https://www.behance.net/imwardo'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-mono rounded hover:bg-neutral-800 transition-colors w-fit"
                    >
                      Ver en Behance oficial <ArrowUpRight size={14} />
                    </a>
                    <span className="text-xs font-mono text-neutral-400">
                      {selectedProject.gallery.length} piezas en esta galería
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Gallery Header */}
              <div className="border-t border-neutral-100 pt-10 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-medium">
                  Galería del Proyecto ({selectedProject.gallery.length} piezas / imágenes)
                </h3>
                <span className="text-xs font-mono text-neutral-400">
                  Haz clic en cualquier imagen para ver en pantalla completa
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
                        alt={`${selectedProject.title} - Galería ${idx + 1}`} 
                        className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500" 
                      />
                      <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 text-[11px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                        <ZoomIn size={13} /> Ampliar
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
                    <ChevronLeft size={16} /> Proyecto Anterior
                  </button>
                  <button
                    onClick={handleNextProject}
                    className="flex items-center gap-1.5 px-4 py-2.5 border border-neutral-300 rounded hover:border-black transition-colors cursor-pointer"
                  >
                    Siguiente Proyecto <ChevronRight size={16} />
                  </button>
                </div>

                <button 
                  onClick={() => { setSelectedProject(null); setLightboxIndex(null); }}
                  className="text-xs uppercase tracking-widest font-mono font-medium hover:text-gray-500 transition-colors cursor-pointer"
                >
                  Volver al Inicio ↑
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
          onClose={() => setLightboxIndex(null)}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      )}

      {/* Video Theater Modal Overlay */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoTheaterModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
            onNext={handleNextVideo}
            onPrev={handlePrevVideo}
            hasPrev={VIDEOS.findIndex((v) => v.id === selectedVideo.id) > 0}
            hasNext={VIDEOS.findIndex((v) => v.id === selectedVideo.id) < VIDEOS.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
