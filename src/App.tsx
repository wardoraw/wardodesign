import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ZoomIn,
  Menu,
} from 'lucide-react';

import { PROJECTS, type Project } from './projects';
import { SmartImage } from './components/SmartImage';
import { ImageLightbox } from './components/ImageLightbox';
import {
  TRANSLATIONS,
  PROJECT_DESCRIPTIONS,
  VIDEO_DESCRIPTIONS,
  type Language,
} from './i18n';

// @ts-ignore
import bbcCumbreCover from './assets/images/bbc_cumbre_cover_1783810571802.jpg';
// @ts-ignore
import bbcTriquiCover from './assets/images/bbc_triqui_cover_1783810581147.jpg';
// @ts-ignore
import clubColombiaCover from './assets/images/club_colombia_cover_1783810594350.jpg';

interface VideoReel {
  id: number;
  title: string;
  client: string;
  year: string;
  category: string;
  youtubeId: string;
  videoUrl: string;
  poster: string;
  description: string;
}

const VIDEOS: VideoReel[] = [
  {
    id: 1,
    title: 'BBC ROSE 2024',
    client: 'BBC Cervecería',
    year: '2024',
    category: 'Commercial / Reel',
    youtubeId: '_SEkK_PBSiM',
    videoUrl: 'https://www.youtube.com/shorts/_SEkK_PBSiM',
    poster: 'https://img.youtube.com/vi/_SEkK_PBSiM/maxresdefault.jpg',
    description: 'Campaña de lanzamiento para BBC Rosé 2024.',
  },
  {
    id: 2,
    title: 'BBC SONIDOS EN LA CUMBRE 2024',
    client: 'BBC Cervecería',
    year: '2024',
    category: 'Event Reel / Festival',
    youtubeId: 'dZKDCL9_Jps',
    videoUrl: 'https://www.youtube.com/shorts/dZKDCL9_Jps',
    poster: bbcCumbreCover,
    description: 'Cobertura de Sonidos en la Cumbre 2024.',
  },
  {
    id: 3,
    title: 'BBC TRIQUI TRIQUI 2024',
    client: 'BBC Cervecería',
    year: '2024',
    category: 'Halloween Promo / Reel',
    youtubeId: 'LHpSTJF731o',
    videoUrl: 'https://www.youtube.com/shorts/LHpSTJF731o',
    poster: bbcTriquiCover,
    description: 'Campaña de Halloween BBC Triqui Triqui 2024.',
  },
  {
    id: 4,
    title: 'Club Colombia Tascas 2025',
    client: 'Club Colombia',
    year: '2025',
    category: 'Event Promo / Reel',
    youtubeId: '79nf-ZPCcig',
    videoUrl: 'https://www.youtube.com/shorts/79nf-ZPCcig',
    poster: clubColombiaCover,
    description: 'Promoción de Club Colombia Tascas 2025.',
  },
  {
    id: 5,
    title: 'HONOR & FALCAO 2026',
    client: 'HONOR',
    year: '2026',
    category: 'Brand Campaign / Reel',
    youtubeId: 'RTkBrNRu3y8',
    videoUrl: 'https://www.youtube.com/shorts/RTkBrNRu3y8',
    poster: 'https://img.youtube.com/vi/RTkBrNRu3y8/maxresdefault.jpg',
    description: 'Campaña de marca HONOR con Radamel Falcao 2026.',
  },
  {
    id: 6,
    title: 'HONOR 400 Lite & Falcao 2025',
    client: 'HONOR',
    year: '2025',
    category: 'Product Showcase / Reel',
    youtubeId: '8YXsymY2fj0',
    videoUrl: 'https://www.youtube.com/shorts/8YXsymY2fj0',
    poster: 'https://img.youtube.com/vi/8YXsymY2fj0/maxresdefault.jpg',
    description: 'Presentación de HONOR 400 Lite junto a Falcao 2025.',
  },
  {
    id: 7,
    title: 'HONOR 600 Unboxing 2026',
    client: 'HONOR',
    year: '2026',
    category: 'Unboxing / Promo',
    youtubeId: '2SRgsGFfPK4',
    videoUrl: 'https://www.youtube.com/shorts/2SRgsGFfPK4',
    poster: 'https://img.youtube.com/vi/2SRgsGFfPK4/maxresdefault.jpg',
    description: 'Unboxing del nuevo HONOR 600 en 2026.',
  },
  {
    id: 8,
    title: 'LJ CORPORATE SOLUTIONS 2025',
    client: 'LJ Corporate Solutions',
    year: '2025',
    category: 'Corporate Video / Reel',
    youtubeId: 'aPh28vCpUsY',
    videoUrl: 'https://www.youtube.com/shorts/aPh28vCpUsY',
    poster: 'https://img.youtube.com/vi/aPh28vCpUsY/maxresdefault.jpg',
    description: 'Video corporativo para LJ Corporate Solutions 2025.',
  },
];

function VideoCard({
  video,
  index,
  onClick,
  watchLabel,
}: {
  video: VideoReel;
  index: number;
  onClick: () => void;
  watchLabel: string;
  key?: React.Key;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.04 }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-neutral-200/70 border border-black/[0.06]">
        <img
          src={video.poster}
          alt={video.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          onError={(e) => {
            e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#f8f8f7]/95 text-[#0e0e0e] flex items-center justify-center opacity-90 md:opacity-0 md:group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 shadow-md">
            <Play size={16} fill="currentColor" className="ml-0.5" />
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-sm font-medium tracking-tight text-[#0e0e0e] group-hover:text-neutral-600 transition-colors truncate">
            {video.title}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5 truncate">
            {video.client} · {video.category.split('/')[0].trim()}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="block font-mono text-xs tabular-nums text-neutral-600">
            {video.year}
          </span>
          <span className="block font-mono text-[11px] text-neutral-400 group-hover:text-[#0e0e0e] transition-colors mt-0.5">
            {watchLabel}
          </span>
        </div>
      </div>
    </motion.article>
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
  video: VideoReel;
  language: Language;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const t = TRANSLATIONS[language].videoModal;
  const closeText = TRANSLATIONS[language].nav.close;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-[#0B0B0B] text-[#f5f5f3] flex flex-col md:grid md:grid-cols-12 overflow-hidden"
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 px-6 md:px-10 h-16 flex justify-between items-center z-[120] border-b border-white/[0.08] bg-[#0B0B0B]/85 backdrop-blur-md">
        <span className="text-xs uppercase tracking-[0.14em] text-neutral-400 font-mono">
          {t.cinemaMode} · {String(video.id).padStart(2, '0')} / {String(VIDEOS.length).padStart(2, '0')}
        </span>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-neutral-300 hover:text-white transition-colors cursor-pointer"
        >
          <span>{closeText}</span>
          <X size={16} />
        </button>
      </div>

      {/* Left: 9:16 Video Player */}
      <div className="md:col-span-7 lg:col-span-8 bg-[#050505] flex items-center justify-center relative px-6 pt-20 pb-8 md:py-24">
        <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            aria-label="Previous reel"
            className={`w-10 h-10 rounded-full border border-white/15 bg-[#0B0B0B]/80 flex items-center justify-center text-white transition-all pointer-events-auto ${
              !hasPrev
                ? 'opacity-25 cursor-not-allowed'
                : 'hover:bg-white hover:text-[#0e0e0e] cursor-pointer'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Next reel"
            className={`w-10 h-10 rounded-full border border-white/15 bg-[#0B0B0B]/80 flex items-center justify-center text-white transition-all pointer-events-auto ${
              !hasNext
                ? 'opacity-25 cursor-not-allowed'
                : 'hover:bg-white hover:text-[#0e0e0e] cursor-pointer'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="relative h-[50vh] md:h-[78vh] aspect-[9/16] rounded-lg overflow-hidden border border-white/10 bg-black shadow-2xl">
          <iframe
            key={video.youtubeId}
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&loop=1&playlist=${video.youtubeId}&controls=1&modestbranding=1&rel=0`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {/* Right: Production Notes */}
      <div className="md:col-span-5 lg:col-span-4 bg-[#0B0B0B] p-6 md:p-12 md:pt-24 flex flex-col justify-between overflow-y-auto border-t md:border-t-0 md:border-l border-white/[0.08]">
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.14em] font-mono text-neutral-500 block mb-3">
              {t.details}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-[#f5f5f3]">
              {video.title}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed mt-3">
              {VIDEO_DESCRIPTIONS[video.id]?.[language] || video.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-6">
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-[0.12em] text-neutral-500 mb-1">
                {t.client}
              </span>
              <span className="text-sm text-[#f5f5f3]">{video.client}</span>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-[0.12em] text-neutral-500 mb-1">
                {t.year}
              </span>
              <span className="text-sm font-mono tabular-nums text-[#f5f5f3]">
                {video.year}
              </span>
            </div>
            <div className="col-span-2">
              <span className="block text-[11px] font-mono uppercase tracking-[0.12em] text-neutral-500 mb-1">
                {t.formatType}
              </span>
              <span className="text-sm text-[#f5f5f3]">{video.category}</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={video.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-[#f5f5f3] border-b border-white/40 pb-1 hover:border-white transition-colors"
            >
              <span>{t.watchYoutube}</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-6 mt-8">
          <p className="text-xs text-neutral-400 leading-relaxed mb-4">
            {t.ctaText}
          </p>
          <a
            href={`mailto:edward40765154@gmail.com?subject=${encodeURIComponent(
              t.mailtoSubject
            )}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#f5f5f3] hover:text-neutral-300 transition-colors"
          >
            <span>{t.ctaLink}</span>
            <ArrowUpRight size={16} />
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
    try {
      const saved = window.localStorage.getItem('portfolio_lang');
      if (saved === 'es' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
  }
  return 'en';
}

export default function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoReel | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [gridColumns, setGridColumns] = useState<3 | 4>(3);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language];
  const featuredProject = PROJECTS[0];

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

  const categories = ['Todos', 'Campaign', 'Branding', 'Rebranding', 'Videos'];

  const getCategoryCount = (cat: string) => {
    if (cat === 'Todos') return PROJECTS.length;
    if (cat === 'Videos') return VIDEOS.length;
    return PROJECTS.filter((p) =>
      p.category.toLowerCase().includes(cat.toLowerCase())
    ).length;
  };

  const filteredProjects =
    activeCategory === 'Todos'
      ? PROJECTS
      : activeCategory === 'Videos'
      ? []
      : PROJECTS.filter((p) =>
          p.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

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
    if (
      isMenuOpen ||
      selectedProject ||
      selectedVideo ||
      lightboxIndex !== null
    ) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, selectedProject, selectedVideo, lightboxIndex]);

  useEffect(() => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [selectedProject?.id]);

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIdx = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const nextIdx = currentIdx < PROJECTS.length - 1 ? currentIdx + 1 : 0;
    setSelectedProject(PROJECTS[nextIdx]);
    setLightboxIndex(null);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIdx = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const prevIdx = currentIdx > 0 ? currentIdx - 1 : PROJECTS.length - 1;
    setSelectedProject(PROJECTS[prevIdx]);
    setLightboxIndex(null);
  };

  useEffect(() => {
    if (!selectedProject || lightboxIndex !== null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      } else if (e.key === 'ArrowRight') {
        handleNextProject();
      } else if (e.key === 'ArrowLeft') {
        handlePrevProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, lightboxIndex]);

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

  const scrollToWork = (category?: string) => {
    if (category) {
      setActiveCategory(category);
    } else if (activeCategory === 'Videos') {
      setActiveCategory('Todos');
    }
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f7] text-[#0e0e0e] font-sans selection:bg-[#0e0e0e] selection:text-[#f8f8f7]">
      {/* Minimalist Top Bar — Strict 3-Zone Contract */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-[#f8f8f7]/90 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto h-full px-6 md:px-10 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="font-display text-sm font-semibold tracking-[-0.015em] text-[#0e0e0e] whitespace-nowrap shrink-0"
          >
            Edward Muñoz
          </a>

          {/* Zone 2: Clean Center Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8"
          >
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToWork('Todos');
              }}
              className="text-sm text-neutral-600 hover:text-[#0e0e0e] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.work}
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToWork('Videos');
              }}
              className="text-sm text-neutral-600 hover:text-[#0e0e0e] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.reels}
            </a>
            <a
              href="#about"
              className="text-sm text-neutral-600 hover:text-[#0e0e0e] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.about}
            </a>
            <a
              href="#contact"
              className="text-sm text-neutral-600 hover:text-[#0e0e0e] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e0e0e] text-[#f8f8f7] text-xs font-medium tracking-wide hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight size={13} />
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label={t.nav.menu}
              className="md:hidden inline-flex items-center gap-1.5 text-sm font-medium text-[#0e0e0e] cursor-pointer"
            >
              <Menu size={18} />
              <span>{t.nav.menu}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#0B0B0B] text-[#f5f5f3] flex flex-col justify-between p-6"
          >
            <div className="flex items-center justify-between h-12">
              <span className="font-display text-sm font-semibold tracking-tight">
                Edward Muñoz
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label={t.nav.close}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.14em] text-neutral-300 hover:text-white cursor-pointer"
              >
                <span>{t.nav.close}</span>
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 font-display text-4xl font-medium tracking-tight">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  scrollToWork('Todos');
                }}
                className="hover:text-neutral-400 transition-colors"
              >
                {t.nav.work}
              </a>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  scrollToWork('Videos');
                }}
                className="hover:text-neutral-400 transition-colors"
              >
                {t.nav.reels}
              </a>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-neutral-400 transition-colors"
              >
                {t.nav.about}
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-neutral-400 transition-colors"
              >
                {t.nav.contact}
              </a>
            </nav>

            <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`cursor-pointer transition-colors ${
                    language === 'en' ? 'text-white font-medium' : 'hover:text-white'
                  }`}
                >
                  EN
                </button>
                <span className="text-neutral-600">/</span>
                <button
                  onClick={() => handleLanguageChange('es')}
                  className={`cursor-pointer transition-colors ${
                    language === 'es' ? 'text-white font-medium' : 'hover:text-white'
                  }`}
                >
                  ES
                </button>
              </div>
              <div className="flex items-center gap-5">
                <a
                  href="https://www.behance.net/imwardo"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Behance
                </a>
                <a
                  href="https://instagram.com/wardo.doit"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section — Minimalist Split-Screen Gallery Monograph */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 pb-16 md:pt-28 md:pb-24">
        {/* Quiet top editorial line + typographic EN / ES switch */}
        <div className="flex items-center justify-between gap-4 pb-8 mb-10 border-b border-black/[0.08] text-xs font-mono text-neutral-500">
          <span>
            {t.hero.location} · {t.hero.role}
          </span>
          <div
            className="flex items-center gap-2 tracking-wider"
            role="group"
            aria-label="Language"
          >
            <button
              onClick={() => handleLanguageChange('en')}
              className={`cursor-pointer transition-colors ${
                language === 'en'
                  ? 'text-[#0e0e0e] font-medium underline underline-offset-4'
                  : 'text-neutral-400 hover:text-[#0e0e0e]'
              }`}
            >
              EN
            </button>
            <span className="text-neutral-300">/</span>
            <button
              onClick={() => handleLanguageChange('es')}
              className={`cursor-pointer transition-colors ${
                language === 'es'
                  ? 'text-[#0e0e0e] font-medium underline underline-offset-4'
                  : 'text-neutral-400 hover:text-[#0e0e0e]'
              }`}
            >
              ES
            </button>
          </div>
        </div>

        {/* 12-Col Asymmetric Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between py-1">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[1.04] tracking-[-0.03em] font-medium text-[#0e0e0e] text-balance"
              >
                {t.hero.headlineLead}{' '}
                <span className="font-serif italic font-normal text-neutral-500">
                  {t.hero.headlineAccent}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="mt-7 max-w-xl text-base md:text-lg text-neutral-600 leading-relaxed font-normal"
              >
                {t.hero.subtitle}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToWork('Todos');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0e0e0e] text-[#f8f8f7] text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowUpRight size={15} />
              </a>

              <a
                href="https://www.behance.net/imwardo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-[#0e0e0e] border-b border-black/20 hover:border-[#0e0e0e] pb-0.5 transition-colors"
              >
                <span>{t.hero.secondaryCta}</span>
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </div>

          {/* Right Featured Release Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            onClick={() => setSelectedProject(featuredProject)}
            className="lg:col-span-5 group cursor-pointer flex flex-col"
          >
            <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] overflow-hidden rounded-lg bg-neutral-200/70 border border-black/[0.06]">
              <SmartImage
                src={featuredProject.image}
                alt={featuredProject.title}
                loading="eager"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                containerClassName="w-full h-full"
                unavailableText={t.smartImage.unavailable}
              />
            </div>

            <div className="mt-3 flex items-baseline justify-between gap-4 text-xs">
              <div className="min-w-0 truncate">
                <span className="font-mono uppercase tracking-wider text-neutral-400">
                  {t.hero.featuredLabel}
                </span>
                <span className="mx-2 text-neutral-300">·</span>
                <span className="font-medium text-[#0e0e0e] group-hover:text-neutral-600 transition-colors">
                  {featuredProject.title}
                </span>
              </div>
              <span className="font-mono tabular-nums text-neutral-500 shrink-0">
                {featuredProject.year}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Hairline Key Facts Strip */}
        <div className="mt-16 pt-8 border-t border-black/[0.08] grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.hero.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="font-display text-2xl md:text-3xl font-medium tracking-tight tabular-nums text-[#0e0e0e]">
                {metric.value}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Work & Reels Section */}
      <section
        id="work"
        className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28 border-t border-black/[0.08] relative"
      >
        <div id="videos" className="absolute -top-20" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-[-0.025em] text-[#0e0e0e]">
              {activeCategory === 'Videos'
                ? t.work.sectionTitleVideos
                : t.work.sectionTitleProjects}
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              {activeCategory === 'Videos'
                ? t.work.sectionSubtitleVideos(VIDEOS.length)
                : t.work.sectionSubtitleProjects(filteredProjects.length)}
            </p>
          </div>

          <a
            href="https://www.behance.net/imwardo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.12em] text-neutral-600 hover:text-[#0e0e0e] transition-colors self-start md:self-auto"
          >
            <span>behance.net/imwardo</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Minimalist Underline Filter Tabs & View Controls */}
        <div className="mt-10 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-black/[0.08]">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar -mb-px">
            {categories.map((cat) => {
              const count = getCategoryCount(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-3.5 text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 border-b-2 ${
                    isActive
                      ? 'border-[#0e0e0e] text-[#0e0e0e] font-medium'
                      : 'border-transparent text-neutral-500 hover:text-[#0e0e0e]'
                  }`}
                >
                  <span>{t.work.categories[cat] || cat}</span>
                  <span className="font-mono text-[11px] tabular-nums text-neutral-400">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {activeCategory !== 'Videos' && (
            <div className="flex items-center gap-5 pb-3.5 text-xs font-mono text-neutral-500 shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`cursor-pointer transition-colors ${
                    viewMode === 'grid'
                      ? 'text-[#0e0e0e] font-medium'
                      : 'hover:text-[#0e0e0e]'
                  }`}
                >
                  {t.work.viewGrid}
                </button>
                <span className="text-neutral-300">/</span>
                <button
                  onClick={() => setViewMode('list')}
                  className={`cursor-pointer transition-colors ${
                    viewMode === 'list'
                      ? 'text-[#0e0e0e] font-medium'
                      : 'hover:text-[#0e0e0e]'
                  }`}
                >
                  {t.work.viewList}
                </button>
              </div>

              {viewMode === 'grid' && (
                <div className="hidden lg:flex items-center gap-2 pl-5 border-l border-black/[0.1]">
                  <button
                    onClick={() => setGridColumns(3)}
                    title={t.work.col3Title}
                    className={`cursor-pointer tabular-nums transition-colors ${
                      gridColumns === 3
                        ? 'text-[#0e0e0e] font-medium'
                        : 'text-neutral-400 hover:text-[#0e0e0e]'
                    }`}
                  >
                    03
                  </button>
                  <span className="text-neutral-300">/</span>
                  <button
                    onClick={() => setGridColumns(4)}
                    title={t.work.col4Title}
                    className={`cursor-pointer tabular-nums transition-colors ${
                      gridColumns === 4
                        ? 'text-[#0e0e0e] font-medium'
                        : 'text-neutral-400 hover:text-[#0e0e0e]'
                    }`}
                  >
                    04
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content: Reels, Grid, or Index */}
        {activeCategory === 'Videos' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {VIDEOS.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                watchLabel={t.work.watchReel}
                onClick={() => setSelectedVideo(video)}
              />
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              gridColumns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            } gap-x-7 gap-y-12`}
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.04 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Unobstructed Artwork Frame — Zero Floating Badges */}
                <div className="relative overflow-hidden rounded-lg bg-neutral-200/60 aspect-[16/10] border border-black/[0.06]">
                  <SmartImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    containerClassName="w-full h-full"
                    loading="lazy"
                    unavailableText={t.smartImage.unavailable}
                  />
                </div>

                {/* Clean Typographic Caption */}
                <div className="mt-3.5 flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[15px] font-medium tracking-[-0.01em] text-[#0e0e0e] group-hover:text-neutral-600 transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500 truncate">
                      <span>{project.client}</span>
                      <span className="mx-1.5 text-neutral-300">·</span>
                      <span>{project.category}</span>
                      {project.videoEmbedUrl && (
                        <>
                          <span className="mx-1.5 text-neutral-300">·</span>
                          <span className="font-mono text-[#0e0e0e]">
                            {t.work.tvcLabel}
                          </span>
                        </>
                      )}
                      {project.isNew && (
                        <>
                          <span className="mx-1.5 text-neutral-300">·</span>
                          <span className="font-medium text-[#0e0e0e]">
                            {t.work.newLabel}
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="text-right shrink-0 font-mono tabular-nums">
                    <span className="block text-xs text-neutral-600">
                      {project.year}
                    </span>
                    <span className="block text-[11px] text-neutral-400 mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          /* Swiss Editorial Index View */
          <div className="w-full">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-black/[0.12] font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400">
              <div className="col-span-5">{t.work.indexHeaders.project}</div>
              <div className="col-span-3">{t.work.indexHeaders.client}</div>
              <div className="col-span-2">{t.work.indexHeaders.discipline}</div>
              <div className="col-span-2 text-right">{t.work.indexHeaders.year}</div>
            </div>

            <div className="divide-y divide-black/[0.08]">
              {filteredProjects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="w-full text-left grid grid-cols-12 gap-4 py-4 items-center hover:bg-black/[0.025] transition-colors cursor-pointer group px-2 -mx-2 rounded-md"
                >
                  <div className="col-span-9 md:col-span-5 flex items-center gap-4 min-w-0">
                    <span className="font-mono text-xs tabular-nums text-neutral-400 w-6 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="hidden sm:block w-14 h-9 rounded overflow-hidden bg-neutral-200/70 border border-black/[0.06] shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="font-display text-sm md:text-base font-medium text-[#0e0e0e] group-hover:text-neutral-600 transition-colors truncate block">
                        {project.title}
                      </span>
                      <span className="md:hidden text-xs text-neutral-500 block truncate">
                        {project.client} · {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:block col-span-3 text-sm text-neutral-600 truncate">
                    {project.client}
                  </div>

                  <div className="hidden md:block col-span-2 text-xs font-mono text-neutral-500 truncate">
                    {project.category}
                    {project.videoEmbedUrl ? ` · ${t.work.tvcLabel}` : ''}
                  </div>

                  <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-3 font-mono text-xs tabular-nums text-neutral-600">
                    <span>{project.year}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-neutral-400 group-hover:text-[#0e0e0e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* About / Manifesto — Matte Obsidian Editorial Contrast */}
      <section id="about" className="bg-[#0B0B0B] text-[#f5f5f3]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 block mb-8">
            {t.about.eyebrow}
          </span>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
            className="font-serif text-2xl sm:text-3xl md:text-[2.6rem] leading-[1.32] font-normal text-[#f5f5f3] max-w-4xl text-balance"
          >
            {t.about.quote}
          </motion.p>

          <div className="mt-16 pt-12 border-t border-white/[0.12] grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 mb-4">
                {t.about.locationTitle}
              </h3>
              <p className="text-sm leading-relaxed text-[#a3a3a0]">
                <span className="text-[#f5f5f3] block mb-1">
                  {t.about.locationLine1}
                </span>
                {t.about.locationLine2}
              </p>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 mb-4">
                {t.about.specialtiesTitle}
              </h3>
              <ul className="space-y-2 text-sm text-[#a3a3a0]">
                {t.about.specialties.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 mb-4">
                {t.about.experienceTitle}
              </h3>
              <ul className="space-y-2 text-sm text-[#a3a3a0]">
                {t.about.experience.map((exp) => (
                  <li key={exp.client}>
                    <span className="text-[#f5f5f3] font-medium">
                      {exp.client}
                    </span>{' '}
                    — {exp.role}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/[0.08]">
            <a
              href="https://www.behance.net/imwardo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-[#f5f5f3] border-b border-white/35 pb-1 hover:border-white transition-colors"
            >
              <span>{t.about.exploreBehance}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact & Minimalist Footer */}
      <footer id="contact" className="bg-[#f8f8f7] text-[#0e0e0e]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 block mb-5">
                {t.contact.eyebrow}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.06] text-[#0e0e0e] text-balance max-w-2xl">
                {t.contact.heading}
              </h2>

              <div className="mt-10">
                <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400 mb-2">
                  {t.contact.emailLabel}
                </span>
                <a
                  href="mailto:edward40765154@gmail.com"
                  className="inline-flex items-center gap-2 font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#0e0e0e] border-b border-black/25 hover:border-[#0e0e0e] pb-1 transition-colors"
                >
                  <span>edward40765154@gmail.com</span>
                  <ArrowUpRight size={22} />
                </a>
              </div>
            </div>

            <div className="md:col-span-4 md:flex md:flex-col md:items-end">
              <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400 mb-3">
                {t.contact.socialLabel}
              </span>
              <div className="flex flex-col md:items-end gap-2.5 text-sm">
                <a
                  href="https://www.behance.net/imwardo"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-[#0e0e0e] transition-colors"
                >
                  <span>Behance</span>
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href="https://instagram.com/wardo.doit"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-[#0e0e0e] transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>© 2026 Edward Muñoz</span>
              <span className="text-neutral-300">·</span>
              <span>{t.contact.footerRole}</span>
            </div>

            <button
              onClick={() =>
                handleLanguageChange(language === 'en' ? 'es' : 'en')
              }
              className="self-start sm:self-auto text-neutral-600 hover:text-[#0e0e0e] underline underline-offset-4 cursor-pointer transition-colors"
            >
              {t.contact.switchLang}
            </button>
          </div>
        </div>
      </footer>

      {/* Project Detail Monograph Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            ref={modalScrollRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#f8f8f7] overflow-y-auto"
          >
            {/* Sticky Monograph Header */}
            <div className="sticky top-0 z-20 bg-[#f8f8f7]/95 backdrop-blur-md border-b border-black/[0.08]">
              <div className="max-w-[1160px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs font-mono">
                  <button
                    onClick={handlePrevProject}
                    className="inline-flex items-center gap-1 text-neutral-600 hover:text-[#0e0e0e] transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={15} />
                    <span className="hidden sm:inline">{t.projectModal.prev}</span>
                  </button>
                  <span className="text-neutral-400 tabular-nums">
                    {String(
                      PROJECTS.findIndex((p) => p.id === selectedProject.id) + 1
                    ).padStart(2, '0')}{' '}
                    / {String(PROJECTS.length).padStart(2, '0')}
                  </span>
                  <button
                    onClick={handleNextProject}
                    className="inline-flex items-center gap-1 text-neutral-600 hover:text-[#0e0e0e] transition-colors cursor-pointer"
                  >
                    <span className="hidden sm:inline">{t.projectModal.next}</span>
                    <ChevronRight size={15} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setLightboxIndex(null);
                  }}
                  aria-label={t.projectModal.closeAria}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-neutral-600 hover:text-[#0e0e0e] transition-colors cursor-pointer"
                >
                  <span>{t.projectModal.close}</span>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Project Content */}
            <div className="max-w-[1160px] mx-auto px-6 md:px-10 pt-12 pb-24">
              {/* Header & Metadata */}
              <div className="max-w-3xl">
                {selectedProject.isNew && (
                  <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 mb-3">
                    {t.projectModal.newLabel}
                  </span>
                )}
                <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.08] text-[#0e0e0e]">
                  {selectedProject.title}
                </h1>
                <p className="mt-5 text-base md:text-lg text-neutral-600 leading-relaxed">
                  {PROJECT_DESCRIPTIONS[selectedProject.id]?.[language] ||
                    selectedProject.description}
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-black/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1">
                    {t.projectModal.client}
                  </span>
                  <span className="text-[#0e0e0e] font-medium">
                    {selectedProject.client}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1">
                    {t.projectModal.year}
                  </span>
                  <span className="font-mono tabular-nums text-[#0e0e0e]">
                    {selectedProject.year}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1">
                    {t.projectModal.category}
                  </span>
                  <span className="text-[#0e0e0e]">
                    {selectedProject.category}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1">
                    {t.projectModal.behanceLink}
                  </span>
                  <a
                    href={selectedProject.behanceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#0e0e0e] border-b border-black/25 hover:border-[#0e0e0e] pb-0.5 transition-colors"
                  >
                    <span>{t.projectModal.viewBehance}</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* Embedded Official TVC Video (for TVC projects) */}
              {selectedProject.videoEmbedUrl && (
                <div className="mt-14">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">
                      {t.projectModal.tvcTitle}
                    </span>
                  </div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black border border-black/[0.08]">
                    <iframe
                      src={selectedProject.videoEmbedUrl}
                      title={`${selectedProject.title} — ${t.projectModal.tvcTitle}`}
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Visual Archive Gallery */}
              <div className="mt-14">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-8 border-b border-black/[0.08]">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">
                    {t.projectModal.galleryHeader(
                      (selectedProject.gallery || [selectedProject.image]).length
                    )}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {t.projectModal.galleryHint}
                  </span>
                </div>

                <div className="space-y-6">
                  {(selectedProject.gallery && selectedProject.gallery.length > 0
                    ? selectedProject.gallery
                    : [selectedProject.image]
                  ).map((imgUrl, idx) => (
                    <div
                      key={`${selectedProject.id}-${idx}`}
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative overflow-hidden rounded-lg bg-neutral-200/50 border border-black/[0.06] cursor-zoom-in"
                    >
                      <SmartImage
                        src={imgUrl}
                        alt={t.projectModal.galleryAlt(
                          selectedProject.title,
                          idx + 1
                        )}
                        loading={idx < 2 ? 'eager' : 'lazy'}
                        className="w-full h-auto block"
                        containerClassName="w-full"
                        unavailableText={t.smartImage.unavailable}
                      />
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#0e0e0e]/85 text-[#f8f8f7] px-3 py-1.5 rounded-full text-[11px] font-mono inline-flex items-center gap-1.5 pointer-events-none">
                        <ZoomIn size={12} />
                        <span>{t.projectModal.zoom}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Modal Navigation */}
              <div className="mt-16 pt-8 border-t border-black/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.12em]">
                <button
                  onClick={handlePrevProject}
                  className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-[#0e0e0e] transition-colors cursor-pointer"
                >
                  <ChevronLeft size={15} />
                  <span>{t.projectModal.prevProject}</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setLightboxIndex(null);
                  }}
                  className="text-neutral-400 hover:text-[#0e0e0e] transition-colors cursor-pointer"
                >
                  {t.projectModal.backToTop}
                </button>

                <button
                  onClick={handleNextProject}
                  className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-[#0e0e0e] transition-colors cursor-pointer"
                >
                  <span>{t.projectModal.nextProject}</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {selectedProject && lightboxIndex !== null && (
          <ImageLightbox
            images={
              selectedProject.gallery && selectedProject.gallery.length > 0
                ? selectedProject.gallery
                : [selectedProject.image]
            }
            initialIndex={lightboxIndex}
            title={selectedProject.title}
            language={language}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

      {/* Video Theater Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoTheaterModal
            video={selectedVideo}
            language={language}
            onClose={() => setSelectedVideo(null)}
            onNext={handleNextVideo}
            onPrev={handlePrevVideo}
            hasPrev={VIDEOS.findIndex((v) => v.id === selectedVideo.id) > 0}
            hasNext={
              VIDEOS.findIndex((v) => v.id === selectedVideo.id) <
              VIDEOS.length - 1
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}
