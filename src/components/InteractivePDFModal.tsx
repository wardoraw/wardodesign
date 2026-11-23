import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, Play, CheckCircle2, FileText, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { TRANSLATIONS, type Language } from '../i18n';

interface InteractivePDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const VIDEOS_LINKS = [
  { id: 1, title: "BBC ROSÉ 2024", client: "BBC Cervecería", type: "Commercial / Reel 9:16", url: "https://www.youtube.com/shorts/_SEkK_PBSiM" },
  { id: 2, title: "BBC SONIDOS EN LA CUMBRE 2024", client: "BBC Cervecería", type: "Event Reel / Festival", url: "https://www.youtube.com/shorts/dZKDCL9_Jps" },
  { id: 3, title: "BBC TRIQUI TRIQUI 2024", client: "BBC Cervecería", type: "Halloween Promo / Reel", url: "https://www.youtube.com/shorts/LHpSTJF731o" },
  { id: 4, title: "CLUB COLOMBIA TASCAS 2025", client: "Club Colombia", type: "Event Promo / Reel", url: "https://www.youtube.com/shorts/79nf-ZPCcig" },
  { id: 5, title: "HONOR & FALCAO 2026", client: "HONOR", type: "Brand Campaign / Reel", url: "https://www.youtube.com/shorts/RTkBrNRu3y8" },
  { id: 6, title: "HONOR 400 LITE & FALCAO 2025", client: "HONOR", type: "Product Showcase / Reel", url: "https://www.youtube.com/shorts/8YXsymY2fj0" },
  { id: 7, title: "HONOR 600 UNBOXING 2026", client: "HONOR", type: "Unboxing / Promo", url: "https://www.youtube.com/shorts/2SRgsGFfPK4" },
  { id: 8, title: "LJ CORPORATE SOLUTIONS 2025", client: "LJ Corporate Solutions", type: "Corporate Reel", url: "https://www.youtube.com/shorts/aPh28vCpUsY" },
];

export function InteractivePDFModal({ isOpen, onClose, language }: InteractivePDFModalProps) {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'videos' | 'pages'>('info');

  const t = TRANSLATIONS[language].pdfModal;
  const pdfUrl = t.pdfUrl;

  const handleDownload = () => {
    setDownloadStarted(true);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = t.pdfFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadStarted(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-neutral-800 bg-neutral-950/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
                <FileText size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg md:text-xl font-bold text-white">{t.title}</h2>
                  <span className="bg-red-600 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full font-mono">
                    {t.badge}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  {t.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
              title={t.closeTitle}
            >
              <X size={18} />
            </button>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-3 border-b border-neutral-800 bg-neutral-950/40 text-xs font-mono uppercase tracking-wider overflow-x-auto">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-3 px-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'info'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {t.tabInfo}
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`pb-3 px-2 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'videos'
                  ? 'border-red-500 text-white font-bold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Play size={11} className="text-red-500 fill-current" />
              <span>{t.tabVideos}</span>
            </button>
            <button
              onClick={() => setActiveTab('pages')}
              className={`pb-3 px-2 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'pages'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Layers size={11} />
              <span>{t.tabPages}</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-neutral-200">
            {activeTab === 'info' && (
              <div className="space-y-6">
                {/* Feature highlight */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-900 border border-neutral-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white text-xs font-mono font-bold uppercase tracking-wider">
                      <Sparkles size={14} className="text-red-400" />
                      <span>{t.highlightTitle}</span>
                    </div>
                    <p className="text-sm text-neutral-300">
                      {t.highlightDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={handleDownload}
                      className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                    >
                      <Download size={15} />
                      <span>{downloadStarted ? t.downloading : t.downloadBtn}</span>
                    </button>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-neutral-800 text-white font-medium text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-neutral-700 transition-colors cursor-pointer border border-neutral-700"
                    >
                      <ExternalLink size={14} />
                      <span>{t.openBtn}</span>
                    </a>
                  </div>
                </div>

                {/* Key Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 text-white text-xs font-mono font-bold uppercase">
                      <Layers size={13} className="text-white" />
                      <span>{t.card1Title}</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {t.card1Desc}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 text-white text-xs font-mono font-bold uppercase">
                      <CheckCircle2 size={13} className="text-green-400" />
                      <span>{t.card2Title}</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {t.card2Desc}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 text-white text-xs font-mono font-bold uppercase">
                      <Play size={13} className="text-red-500 fill-current" />
                      <span>{t.card3Title}</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {t.card3Desc}
                    </p>
                  </div>
                </div>

                {/* What's inside preview */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    {t.specsTitle}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-neutral-950/40 border border-neutral-800 flex items-center justify-between">
                      <span className="text-neutral-300">{t.specFormatLabel}</span>
                      <span className="text-white font-bold">{t.specFormatValue}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-950/40 border border-neutral-800 flex items-center justify-between">
                      <span className="text-neutral-300">{t.specPagesLabel}</span>
                      <span className="text-white font-bold">{t.specPagesValue}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-950/40 border border-neutral-800 flex items-center justify-between">
                      <span className="text-neutral-300">{t.specImagesLabel}</span>
                      <span className="text-white font-bold">{t.specImagesValue}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-950/40 border border-neutral-800 flex items-center justify-between">
                      <span className="text-neutral-300">{t.specLinksLabel}</span>
                      <span className="text-red-400 font-bold">{t.specLinksValue}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2 border-b border-neutral-800">
                  <span>{t.videosTabHeader}</span>
                  <span>{t.videosCountLabel}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VIDEOS_LINKS.map((video) => (
                    <div
                      key={video.id}
                      className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 flex flex-col justify-between gap-3 group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                          <span>Reel {video.id}</span>
                          <span className="text-neutral-400">{video.client}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 mt-0.5">{video.type}</p>
                      </div>

                      <a
                        href={video.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-between w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:border-red-500/50 hover:bg-red-950/30 transition-all"
                      >
                        <span className="flex items-center gap-1.5">
                          <Play size={10} className="text-red-500 fill-current" />
                          <span>{t.watchOnYoutube}</span>
                        </span>
                        <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-white" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="space-y-3">
                <p className="text-xs font-mono text-neutral-400 pb-2 border-b border-neutral-800">
                  {t.pagesTabHeader}
                </p>

                <div className="space-y-2">
                  {t.pagesSummary.map((page) => (
                    <div
                      key={page.num}
                      className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800 flex items-start gap-3"
                    >
                      <span className="text-xs font-mono font-bold text-red-500 bg-red-950/40 px-2 py-1 rounded border border-red-500/20 shrink-0">
                        {t.pagePrefix} {page.num}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                          {page.title}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">{page.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar with CTA */}
          <div className="p-4 md:p-5 border-t border-neutral-800 bg-neutral-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>{t.footerReady}</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ExternalLink size={13} />
                <span>{t.viewInScreen}</span>
              </a>
              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow flex items-center justify-center gap-2"
              >
                <Download size={14} />
                <span>{downloadStarted ? t.footerDownloading : t.footerDownload}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
