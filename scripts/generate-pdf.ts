import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';
import { PROJECTS, type Project } from '../src/projects';
import { PROJECT_DESCRIPTIONS, type Language } from '../src/i18n';

// 8 Videos definition matching the web
const VIDEOS = [
  {
    id: 1,
    title: "BBC ROSÉ 2024",
    client: "BBC Cervecería",
    year: "2024",
    category: "Commercial / Reel",
    youtubeId: "_SEkK_PBSiM",
    videoUrl: "https://www.youtube.com/shorts/_SEkK_PBSiM"
  },
  {
    id: 2,
    title: "BBC SONIDOS EN LA CUMBRE 2024",
    client: "BBC Cervecería",
    year: "2024",
    category: "Event Reel / Festival",
    youtubeId: "dZKDCL9_Jps",
    videoUrl: "https://www.youtube.com/shorts/dZKDCL9_Jps"
  },
  {
    id: 3,
    title: "BBC TRIQUI TRIQUI 2024",
    client: "BBC Cervecería",
    year: "2024",
    category: "Halloween Promo / Reel",
    youtubeId: "LHpSTJF731o",
    videoUrl: "https://www.youtube.com/shorts/LHpSTJF731o"
  },
  {
    id: 4,
    title: "CLUB COLOMBIA TASCAS 2025",
    client: "Club Colombia",
    year: "2025",
    category: "Event Promo / Reel",
    youtubeId: "79nf-ZPCcig",
    videoUrl: "https://www.youtube.com/shorts/79nf-ZPCcig"
  },
  {
    id: 5,
    title: "HONOR & FALCAO 2026",
    client: "HONOR",
    year: "2026",
    category: "Brand Campaign / Reel",
    youtubeId: "RTkBrNRu3y8",
    videoUrl: "https://www.youtube.com/shorts/RTkBrNRu3y8"
  },
  {
    id: 6,
    title: "HONOR 400 LITE & FALCAO 2025",
    client: "HONOR",
    year: "2025",
    category: "Product Showcase / Reel",
    youtubeId: "8YXsymY2fj0",
    videoUrl: "https://www.youtube.com/shorts/8YXsymY2fj0"
  },
  {
    id: 7,
    title: "HONOR 600 UNBOXING 2026",
    client: "HONOR",
    year: "2026",
    category: "Unboxing / Promo",
    youtubeId: "2SRgsGFfPK4",
    videoUrl: "https://www.youtube.com/shorts/2SRgsGFfPK4"
  },
  {
    id: 8,
    title: "LJ CORPORATE SOLUTIONS 2025",
    client: "LJ Corporate Solutions",
    year: "2025",
    category: "Corporate Video / Reel",
    youtubeId: "aPh28vCpUsY",
    videoUrl: "https://www.youtube.com/shorts/aPh28vCpUsY"
  }
];

const PDF_COPY = {
  en: {
    headerRightLight: "EDITORIAL LOOKBOOK // 2026",
    footerLight: "EDWARD MUÑOZ — GRAPHIC CREATIVE • BRANDING & ART DIRECTION",
    footerDark: "CLICK ANY SMARTPHONE OR BUTTON TO OPEN THE FULL VIDEO ON YOUTUBE.",
    coverEdition: "LIMITED EDITION: 2026 EDITORIAL LOOKBOOK",
    coverLocation: "BOGOTÁ, COLOMBIA • GLOBAL",
    coverEyebrow: "VISUAL DESIGN & VIDEO REELS PORTFOLIO",
    coverTags: "BRANDING // CAMPAIGNS // ART DIRECTION // AUDIOVISUAL",
    coverDesc1: "Complete visual universes for brands looking to stand out across online and offline spaces.",
    coverDesc2: "Specialized in 360° launch campaigns, graphic identity, and high-impact vertical video.",
    coverSec1Tag: "[ 01. VISUAL SECTION ]",
    coverSec1Title: "16 PROJECTS",
    coverSec1L1: "Static case studies presented in a",
    coverSec1L2: "high-resolution lookbook format.",
    coverSec1L3: "HONOR, Ritual, LJ Solutions, MMB.",
    coverSec2Tag: "[ 02. AUDIOVISUAL SECTION ]",
    coverSec2Title: "8 REELS 9:16",
    coverSec2L1: "Interactive smartphone mockups",
    coverSec2L2: "with direct links to YouTube.",
    coverSec2L3: "BBC, Club Colombia, Radamel Falcao.",
    coverSec3Tag: "[ 03. DIRECT CONTACT ]",
    coverNoticeTitle: "INTERACTIVITY & VIDEO PLAYBACK NOTE",
    coverNotice1: "• Design projects are presented with high-resolution static imagery in lookbook scale.",
    coverNotice2: "• Video productions (9:16 Reels) feature active links to watch the full pieces",
    coverNotice3: "  in high definition directly on YouTube Shorts.",
    manifestoHeader: "ABOUT EDWARD MUÑOZ // MANIFESTO",
    manifestoTag: "CREATIVE STATEMENT",
    quoteLines: [
      '"Hi! I\'m Edward, and my focus is branding design. I have designed for accessory brands,',
      'architecture, advertising agencies, beauty, gastronomy, and tourism. In every project, I aim',
      'to build a complete visual universe that helps brands stand out both online and offline."'
    ],
    b1Header: "01 // LOCATION & AVAILABILITY",
    b1Lines: [
      "Available for branding projects,",
      "integrated 360° launch campaigns,",
      "and art direction worldwide.",
      "Remote or on-site collaboration."
    ],
    b2Header: "02 // CREATIVE SPECIALTIES",
    b2Specs: [
      "• Branding & Visual Identity",
      "• 360° Launch Campaigns",
      "• Creative & Art Direction",
      "• Audiovisual Formats & Reels (9:16)",
      "• Web & Digital Design"
    ],
    b3Header: "03 // EXPERIENCE & CLIENTS",
    b3Exps: [
      { client: "HONOR", detail: "Digital & Campaign Designer" },
      { client: "Telefónica", detail: "Web Designer" },
      { client: "BBC & Club Colombia", detail: "Audiovisual Content" },
      { client: "Idealidad", detail: "Graphic Designer" }
    ],
    videoEyebrow: "SMARTPHONE AUDIOVISUAL SHOWCASE",
    videoTitle: "Video Portfolio (9:16 Format)",
    videoHint: "CLICK ANY SMARTPHONE TO WATCH THE FULL VIDEO ON YOUTUBE ↗",
    videoBtn: "▶ WATCH ON YOUTUBE ↗",
    videoPage1Header: "AUDIOVISUAL PORTFOLIO // SMARTPHONE SHOWCASE 1",
    videoPage2Header: "AUDIOVISUAL PORTFOLIO // SMARTPHONE SHOWCASE 2",
    catalogPrefix: "STUDIO CATALOG //",
    newBadge: "NEW",
    photosSuffix: "PHOTOS",
    clientLabel: "CLIENT:",
    yearLabel: "YEAR:",
    fallbackDesc: "Complete graphic universe, visual identity system, and brand applications.",
    cardFooterTags: "ART DIRECTION // IDENTITY SYSTEM // 360° CONTENT",
    lookbookHeaders: [
      "PROJECT LOOKBOOK // HONOR SERIES 01",
      "PROJECT LOOKBOOK // HONOR SERIES 02",
      "PROJECT LOOKBOOK // BRANDING 01",
      "PROJECT LOOKBOOK // BRANDING 02",
      "PROJECT LOOKBOOK // BRANDING 03",
      "PROJECT LOOKBOOK // REBRANDING & AGENCIES",
      "PROJECT LOOKBOOK // BRANDING 04",
      "PROJECT LOOKBOOK // BRANDING 05"
    ],
    contactHeader: "DIRECT CONTACT // INQUIRIES",
    contactHeading: "Let's talk?",
    contactSubtitle: "Let's start building the next visual universe for your brand or campaign.",
    c1Tag: "[ 01 // DIRECT EMAIL ]",
    c1Lines: [
      "Available for branding projects,",
      "360° campaigns, art direction,",
      "and audiovisual production."
    ],
    c1Btn: "SEND DIRECT EMAIL ↗",
    c2Tag: "[ 02 // INSTAGRAM ]",
    c2Lines: [
      "Creative process, launches,",
      "audiovisual coverage, and",
      "real-time vertical reels."
    ],
    c2Btn: "VISIT @WARDO.DOIT ↗",
    c3Tag: "[ 03 // BEHANCE ]",
    c3Lines: [
      "Complete online portfolio with",
      "expanded visual galleries for",
      "every case study."
    ],
    c3Btn: "EXPLORE BEHANCE ↗",
    copyright: "© 2026 EDWARD MUÑOZ — GRAPHIC CREATIVE • BOGOTÁ, COLOMBIA • ALL RIGHTS RESERVED"
  },
  es: {
    headerRightLight: "LOOKBOOK EDITORIAL // 2026",
    footerLight: "EDWARD MUÑOZ — GRAPHIC CREATIVE • BRANDING & ART DIRECTION",
    footerDark: "HAZ CLIC EN CUALQUIER SMARTPHONE O BOTÓN PARA ABRIR EL VIDEO EN YOUTUBE.",
    coverEdition: "EDICIÓN LIMITADA: LOOKBOOK EDITORIAL 2026",
    coverLocation: "BOGOTÁ, COLOMBIA • GLOBAL",
    coverEyebrow: "PORTAFOLIO DE DISEÑO VISUAL & REELS",
    coverTags: "BRANDING // CAMPAÑAS // DIRECCIÓN DE ARTE // AUDIOVISUAL",
    coverDesc1: "Universo visual completo para marcas que buscan trascender en entornos online y offline.",
    coverDesc2: "Especializado en lanzamientos 360°, identidad gráfica y piezas de video de alto impacto.",
    coverSec1Tag: "[ 01. SECCIÓN VISUAL ]",
    coverSec1Title: "16 PROYECTOS",
    coverSec1L1: "Casos de estudio estáticos en",
    coverSec1L2: "formato lookbook de alta resolución.",
    coverSec1L3: "HONOR, Ritual, LJ Solutions, MMB.",
    coverSec2Tag: "[ 02. SECCIÓN AUDIOVISUAL ]",
    coverSec2Title: "8 REELS 9:16",
    coverSec2L1: "Mockups de smartphone interactivos",
    coverSec2L2: "con enlaces directos a YouTube.",
    coverSec2L3: "BBC, Club Colombia, Radamel Falcao.",
    coverSec3Tag: "[ 03. CONTACTO DIRECTO ]",
    coverNoticeTitle: "NOTA DE INTERACTIVIDAD & REPRODUCCIÓN AUDIOVISUAL",
    coverNotice1: "• Los proyectos de diseño se presentan con sus imágenes estáticas en escala lookbook.",
    coverNotice2: "• Las producciones de video (Reels 9:16) cuentan con enlaces activos para reproducir",
    coverNotice3: "  las piezas completas en alta definición directamente en YouTube Shorts.",
    manifestoHeader: "SOBRE EDWARD MUÑOZ // MANIFIESTO",
    manifestoTag: "DECLARACIÓN CREATIVA",
    quoteLines: [
      '"¡Hola! Soy Edward y mi enfoque es el diseño de branding. He diseñado para marcas de accesorios,',
      'arquitectura, agencias de publicidad, belleza, gastronomía y turismo. Busco que en cada proyecto',
      'haya un universo visual completo que le funcione a las marcas para darse a conocer en el mundo online',
      'y en el offline."'
    ],
    b1Header: "01 // UBICACIÓN & DISPONIBILIDAD",
    b1Lines: [
      "Disponible para proyectos de branding,",
      "campañas integradas de lanzamiento y",
      "dirección de arte a nivel global.",
      "Modalidad remota o presencial."
    ],
    b2Header: "02 // ESPECIALIDADES CREATIVAS",
    b2Specs: [
      "• Branding & Identidad Visual",
      "• Campañas de Lanzamiento 360°",
      "• Dirección Creativa & Arte",
      "• Formatos Audiovisuales & Reels (9:16)",
      "• Diseño Web & Digital"
    ],
    b3Header: "03 // TRAYECTORIA & CLIENTES",
    b3Exps: [
      { client: "HONOR", detail: "Digital & Campaign Designer" },
      { client: "Telefónica", detail: "Web Designer" },
      { client: "BBC & Club Colombia", detail: "Contenido Audiovisual" },
      { client: "Idealidad", detail: "Diseñador Gráfico" }
    ],
    videoEyebrow: "SHOWCASE AUDIOVISUAL EN SMARTPHONE",
    videoTitle: "Portafolio de Video (Formato 9:16)",
    videoHint: "TOCA CUALQUIER SMARTPHONE PARA REPRODUCIR EL VIDEO EN YOUTUBE ↗",
    videoBtn: "▶ VER EN YOUTUBE ↗",
    videoPage1Header: "PORTAFOLIO AUDIOVISUAL // SMARTPHONE SHOWCASE 1",
    videoPage2Header: "PORTAFOLIO AUDIOVISUAL // SMARTPHONE SHOWCASE 2",
    catalogPrefix: "CATÁLOGO ESTUDIO //",
    newBadge: "NUEVO",
    photosSuffix: "FOTOS",
    clientLabel: "CLIENTE:",
    yearLabel: "AÑO:",
    fallbackDesc: "Desarrollo completo de universo gráfico, lenguaje visual y aplicaciones de marca.",
    cardFooterTags: "DIRECCIÓN DE ARTE // SISTEMA DE IDENTIDAD // CONTENIDO 360°",
    lookbookHeaders: [
      "LOOKBOOK PROYECTOS // SERIE HONOR 01",
      "LOOKBOOK PROYECTOS // SERIE HONOR 02",
      "LOOKBOOK PROYECTOS // BRANDING 01",
      "LOOKBOOK PROYECTOS // BRANDING 02",
      "LOOKBOOK PROYECTOS // BRANDING 03",
      "LOOKBOOK PROYECTOS // REBRANDING & AGENCIAS",
      "LOOKBOOK PROYECTOS // BRANDING 04",
      "LOOKBOOK PROYECTOS // BRANDING 05"
    ],
    contactHeader: "CONTACTO DIRECTO // CONTRATACIÓN",
    contactHeading: "¿Hablamos?",
    contactSubtitle: "Empecemos a crear el próximo universo visual para tu marca o campaña.",
    c1Tag: "[ 01 // EMAIL DIRECTO ]",
    c1Lines: [
      "Disponible para proyectos de branding,",
      "campañas 360°, consultoría de arte y",
      "producción audiovisual."
    ],
    c1Btn: "ENVIAR CORREO DIRECTO ↗",
    c2Tag: "[ 02 // INSTAGRAM ]",
    c2Lines: [
      "Proceso creativo, lanzamientos,",
      "cobertura audiovisual y formato",
      "reels en tiempo real."
    ],
    c2Btn: "VISITAR @WARDO.DOIT ↗",
    c3Tag: "[ 03 // BEHANCE ]",
    c3Lines: [
      "Portafolio en línea completo con",
      "galería expandida de piezas de",
      "cada caso de estudio."
    ],
    c3Btn: "EXPLORAR BEHANCE ↗",
    copyright: "© 2026 EDWARD MUÑOZ — GRAPHIC CREATIVE • BOGOTÁ, COLOMBIA • TODOS LOS DERECHOS RESERVADOS"
  }
};

// Helper to fetch video thumbnails (local or YouTube)
async function getThumbnailBase64(youtubeId: string): Promise<string | null> {
  const localMap: Record<string, string> = {
    "dZKDCL9_Jps": path.resolve(process.cwd(), "src/assets/images/bbc_cumbre_cover_1783810571802.jpg"),
    "LHpSTJF731o": path.resolve(process.cwd(), "src/assets/images/bbc_triqui_cover_1783810581147.jpg"),
    "79nf-ZPCcig": path.resolve(process.cwd(), "src/assets/images/club_colombia_cover_1783810594350.jpg"),
  };

  if (localMap[youtubeId] && fs.existsSync(localMap[youtubeId])) {
    try {
      const data = fs.readFileSync(localMap[youtubeId]);
      return `data:image/jpeg;base64,${data.toString('base64')}`;
    } catch {
      // fallback
    }
  }

  try {
    const urls = [
      `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
    ];
    for (const u of urls) {
      try {
        const res = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          return `data:image/jpeg;base64,${buf.toString('base64')}`;
        }
      } catch {
        continue;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

interface ImageAsset {
  b64: string;
  format: 'JPEG' | 'PNG';
}

// Helper to fetch static images of projects
async function getProjectStaticImage(p: Project): Promise<ImageAsset | null> {
  let url = p.image;
  if (url.endsWith('.gif') || url.includes('.gif')) {
    const staticCandidate = p.gallery?.find(g => g.endsWith('.jpg') || g.endsWith('.jpeg') || g.endsWith('.png'));
    if (staticCandidate) {
      url = staticCandidate;
    }
  }

  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      const isPng = res.headers.get("content-type")?.includes("png") || url.endsWith(".png");
      const format = isPng ? "PNG" : "JPEG";
      return {
        b64: `data:image/${format.toLowerCase()};base64,${buf.toString('base64')}`,
        format
      };
    }
  } catch (err) {
    console.error(`Error loading image for project ${p.id} (${p.title}):`, err);
  }
  return null;
}

interface PreloadedAssets {
  videoThumbnails: Map<number, string | null>;
  projectImages: Map<number, ImageAsset | null>;
}

async function preloadAllAssets(): Promise<PreloadedAssets> {
  console.log("Preloading video thumbnails...");
  const videoThumbnails = new Map<number, string | null>();
  for (const v of VIDEOS) {
    const b64 = await getThumbnailBase64(v.youtubeId);
    videoThumbnails.set(v.id, b64);
  }

  console.log("Preloading 16 static project images for lookbook...");
  const projectImages = new Map<number, ImageAsset | null>();
  for (const p of PROJECTS) {
    const imgData = await getProjectStaticImage(p);
    projectImages.set(p.id, imgData);
    console.log(`- Project ${p.id}: ${p.title} -> ${imgData ? imgData.format : 'FALLBACK'}`);
  }

  return { videoThumbnails, projectImages };
}

export async function generateInteractivePDF(
  lang: Language = 'en',
  preloaded?: PreloadedAssets
): Promise<Buffer> {
  const assets = preloaded || (await preloadAllAssets());
  const { videoThumbnails, projectImages } = assets;
  const copy = PDF_COPY[lang];

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const PAGE_W = 297;
  const PAGE_H = 210;
  const TOTAL_PAGES = 13;

  // Brutalist Header & Footer generator for light pages
  const drawBrutalistHeaderFooterLight = (sectionCode: string, sectionTitle: string, pageNum: number) => {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, PAGE_W, 16, 'F');
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1.2);
    doc.line(16, 16, PAGE_W - 16, 16);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text("EDWARD MUÑOZ", 16, 11);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(140, 140, 140);
    doc.text(`[ ${sectionCode} ]`, 54, 11);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(sectionTitle.toUpperCase(), 76, 11);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(copy.headerRightLight, PAGE_W - 75, 11);

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1.2);
    doc.line(16, PAGE_H - 12, PAGE_W - 16, PAGE_H - 12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(80, 80, 80);
    doc.text(copy.footerLight, 16, PAGE_H - 6.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`PAGE ${String(pageNum).padStart(2, '0')} / ${String(TOTAL_PAGES).padStart(2, '0')}`, PAGE_W - 40, PAGE_H - 6.5);
  };

  // Brutalist Header & Footer generator for dark pages
  const drawBrutalistHeaderFooterDark = (sectionCode: string, sectionTitle: string, pageNum: number) => {
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, PAGE_W, 16, 'F');
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1.2);
    doc.line(16, 16, PAGE_W - 16, 16);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text("EDWARD MUÑOZ", 16, 11);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 0, 51);
    doc.text(`[ ${sectionCode} ]`, 54, 11);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(sectionTitle.toUpperCase(), 76, 11);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 0, 51);
    doc.text("▶ INTERACTIVE VIDEO REELS (9:16)", PAGE_W - 85, 11);

    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1.2);
    doc.line(16, PAGE_H - 12, PAGE_W - 16, PAGE_H - 12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(180, 180, 180);
    doc.text(copy.footerDark, 16, PAGE_H - 6.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(`PAGE ${String(pageNum).padStart(2, '0')} / ${String(TOTAL_PAGES).padStart(2, '0')}`, PAGE_W - 40, PAGE_H - 6.5);
  };

  // ==========================================
  // PAGE 1: MONUMENTAL BRUTALIST COVER
  // ==========================================
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(2.5);
  doc.rect(12, 12, PAGE_W - 24, PAGE_H - 24, 'S');

  doc.setFillColor(0, 0, 0);
  doc.rect(12, 12, PAGE_W - 24, 12, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("EDWARD MUÑOZ // GRAPHIC CREATIVE", 18, 20);
  doc.text(copy.coverEdition, 110, 20);
  doc.text(copy.coverLocation, PAGE_W - 68, 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text(copy.coverEyebrow, 22, 40);

  doc.setFont("times", "bold");
  doc.setFontSize(58);
  doc.setTextColor(0, 0, 0);
  doc.text("EDWARD", 22, 62);

  doc.setFont("times", "italic");
  doc.setTextColor(120, 120, 120);
  doc.text("MUÑOZ", 22, 82);

  doc.setFont("times", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("CREATIVE.", 22, 102);

  doc.setFillColor(0, 0, 0);
  doc.rect(22, 110, 140, 2, 'F');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(copy.coverTags, 22, 120);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(70, 70, 70);
  doc.text(copy.coverDesc1, 22, 128);
  doc.text(copy.coverDesc2, 22, 134);

  const rightX = 180;
  const rightW = PAGE_W - 12 - rightX;
  doc.setFillColor(10, 10, 10);
  doc.rect(rightX, 24, rightW, PAGE_H - 36, 'F');

  doc.setDrawColor(30, 30, 30);
  doc.setLineWidth(0.5);
  doc.line(rightX, 80, PAGE_W - 12, 80);
  doc.line(rightX, 140, PAGE_W - 12, 140);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 0, 51);
  doc.text(copy.coverSec1Tag, rightX + 8, 36);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(copy.coverSec1Title, rightX + 8, 48);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(180, 180, 180);
  doc.text(copy.coverSec1L1, rightX + 8, 56);
  doc.text(copy.coverSec1L2, rightX + 8, 62);
  doc.text(copy.coverSec1L3, rightX + 8, 68);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 0, 51);
  doc.text(copy.coverSec2Tag, rightX + 8, 94);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(copy.coverSec2Title, rightX + 8, 106);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(180, 180, 180);
  doc.text(copy.coverSec2L1, rightX + 8, 114);
  doc.text(copy.coverSec2L2, rightX + 8, 120);
  doc.text(copy.coverSec2L3, rightX + 8, 126);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(copy.coverSec3Tag, rightX + 8, 154);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(200, 200, 200);
  doc.text("edward40765154@gmail.com", rightX + 8, 164);
  doc.text("behance.net/imwardo", rightX + 8, 171);
  doc.text("@wardo.doit (Instagram)", rightX + 8, 178);

  doc.setFillColor(245, 245, 245);
  doc.rect(22, 148, 146, 38, 'F');
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.8);
  doc.rect(22, 148, 146, 38, 'S');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(0, 0, 0);
  doc.text(copy.coverNoticeTitle, 28, 158);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);
  doc.text(copy.coverNotice1, 28, 166);
  doc.text(copy.coverNotice2, 28, 172);
  doc.text(copy.coverNotice3, 28, 178);

  // ==========================================
  // PAGE 2: MANIFESTO & ABOUT
  // ==========================================
  doc.addPage();
  drawBrutalistHeaderFooterDark("01", copy.manifestoHeader, 2);

  doc.setFillColor(10, 10, 10);
  doc.rect(0, 16, PAGE_W, PAGE_H - 28, 'F');

  doc.setFillColor(18, 18, 18);
  doc.rect(16, 24, PAGE_W - 32, 60, 'F');
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(1);
  doc.rect(16, 24, PAGE_W - 32, 60, 'S');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 0, 51);
  doc.text(copy.manifestoTag, 24, 34);

  doc.setFont("times", "italic");
  doc.setFontSize(14.5);
  doc.setTextColor(255, 255, 255);
  copy.quoteLines.forEach((line, idx) => {
    doc.text(line, 24, 46 + idx * 9);
  });

  const bColW = (PAGE_W - 32 - 16) / 3;
  const bColY = 92;
  const bColH = 88;

  // Block 1: Location
  doc.setFillColor(18, 18, 18);
  doc.rect(16, bColY, bColW, bColH, 'F');
  doc.setDrawColor(40, 40, 40);
  doc.rect(16, bColY, bColW, bColH, 'S');

  doc.setFillColor(0, 0, 0);
  doc.rect(16, bColY, bColW, 10, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(copy.b1Header, 22, bColY + 7);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("BOGOTÁ, COLOMBIA", 22, bColY + 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(170, 170, 170);
  copy.b1Lines.forEach((line, idx) => {
    doc.text(line, 22, bColY + 32 + idx * 7);
  });

  // Block 2: Specialties
  const b2X = 16 + bColW + 8;
  doc.setFillColor(18, 18, 18);
  doc.rect(b2X, bColY, bColW, bColH, 'F');
  doc.setDrawColor(40, 40, 40);
  doc.rect(b2X, bColY, bColW, bColH, 'S');

  doc.setFillColor(0, 0, 0);
  doc.rect(b2X, bColY, bColW, 10, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(copy.b2Header, b2X + 6, bColY + 7);

  let bsy = bColY + 22;
  for (const s of copy.b2Specs) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(220, 220, 220);
    doc.text(s, b2X + 6, bsy);
    bsy += 11;
  }

  // Block 3: Experience
  const b3X = 16 + (bColW * 2) + 16;
  doc.setFillColor(18, 18, 18);
  doc.rect(b3X, bColY, bColW, bColH, 'F');
  doc.setDrawColor(40, 40, 40);
  doc.rect(b3X, bColY, bColW, bColH, 'S');

  doc.setFillColor(0, 0, 0);
  doc.rect(b3X, bColY, bColW, 10, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(copy.b3Header, b3X + 6, bColY + 7);

  let bey = bColY + 22;
  for (const ex of copy.b3Exps) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(ex.client, b3X + 6, bey);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(160, 160, 160);
    doc.text(ex.detail, b3X + 6, bey + 5);
    bey += 13.5;
  }

  // ==========================================
  // HELPER: RENDER 4 VIDEOS IN SMARTPHONE FRAMES (Pages 3 & 4)
  // ==========================================
  const renderSmartphoneVideoPage = (pageNum: number, title: string, slice: typeof VIDEOS) => {
    doc.addPage();
    drawBrutalistHeaderFooterDark("02", title, pageNum);

    doc.setFillColor(10, 10, 10);
    doc.rect(0, 16, PAGE_W, PAGE_H - 28, 'F');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 0, 51);
    doc.text(copy.videoEyebrow, 18, 25);

    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(copy.videoTitle, 18, 32);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(copy.videoHint, PAGE_W - 145, 32);

    const phoneW = 56;
    const phoneH = 120;
    const phoneGap = (PAGE_W - 36 - (phoneW * 4)) / 3;
    const phoneY = 38;

    slice.forEach((video, i) => {
      const phoneX = 18 + i * (phoneW + phoneGap);

      // 1. Phone Outer Chassis
      doc.setFillColor(25, 25, 25);
      doc.roundedRect(phoneX, phoneY, phoneW, phoneH, 5, 5, 'F');
      doc.setDrawColor(65, 65, 65);
      doc.setLineWidth(0.8);
      doc.roundedRect(phoneX, phoneY, phoneW, phoneH, 5, 5, 'S');

      // Volume buttons accent
      doc.setFillColor(80, 80, 80);
      doc.rect(phoneX - 0.8, phoneY + 20, 0.8, 8, 'F');
      doc.rect(phoneX - 0.8, phoneY + 32, 0.8, 8, 'F');
      doc.rect(phoneX + phoneW, phoneY + 25, 0.8, 12, 'F');

      // 2. Phone Screen Bezel
      const screenX = phoneX + 3;
      const screenY = phoneY + 3;
      const screenW = phoneW - 6;
      const screenH = phoneH - 6;

      doc.setFillColor(0, 0, 0);
      doc.roundedRect(screenX, screenY, screenW, screenH, 3, 3, 'F');

      // 3. Video Thumbnail inside Screen
      const thumb = videoThumbnails.get(video.id);
      if (thumb) {
        try {
          doc.addImage(thumb, 'JPEG', screenX, screenY, screenW, screenH, undefined, 'FAST');
        } catch {
          // ignore
        }
      }

      // 4. Dynamic Island / Speaker Notch
      doc.setFillColor(0, 0, 0);
      doc.roundedRect(phoneX + (phoneW / 2) - 8, phoneY + 5, 16, 3.5, 1.5, 1.5, 'F');
      doc.setFillColor(20, 20, 20);
      doc.circle(phoneX + (phoneW / 2) + 4, phoneY + 6.8, 0.8, 'F');

      // 5. Video Scrim at bottom of screen
      doc.setFillColor(0, 0, 0);
      doc.roundedRect(screenX, screenY + screenH - 26, screenW, 26, 0, 0, 'F');

      // Central Play Button
      doc.setFillColor(255, 0, 51);
      doc.circle(phoneX + (phoneW / 2), phoneY + (phoneH / 2) - 4, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("▶", phoneX + (phoneW / 2) - 2.5, phoneY + (phoneH / 2) - 1.2);

      // Playhead progress bar
      doc.setFillColor(60, 60, 60);
      doc.rect(screenX + 4, screenY + screenH - 20, screenW - 8, 1, 'F');
      doc.setFillColor(255, 0, 51);
      doc.rect(screenX + 4, screenY + screenH - 20, (screenW - 8) * 0.45, 1, 'F');

      // Video Info in phone overlay
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(255, 255, 255);
      const titleLines = doc.splitTextToSize(video.title, screenW - 6);
      doc.text(titleLines[0] || video.title, screenX + 3, screenY + screenH - 12);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.5);
      doc.setTextColor(200, 200, 200);
      doc.text(`${video.client} • ${video.year}`, screenX + 3, screenY + screenH - 6.5);

      // Bottom Button below smartphone
      const btnY = phoneY + phoneH + 4;
      doc.setFillColor(255, 0, 51);
      doc.roundedRect(phoneX, btnY, phoneW, 9, 1.5, 1.5, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text(copy.videoBtn, phoneX + (phoneW / 2) - 16, btnY + 6);

      // CLICKABLE LINK HOTSPOT
      doc.link(phoneX, phoneY, phoneW, phoneH + 15, { url: video.videoUrl });
    });
  };

  renderSmartphoneVideoPage(3, copy.videoPage1Header, VIDEOS.slice(0, 4));
  renderSmartphoneVideoPage(4, copy.videoPage2Header, VIDEOS.slice(4, 8));

  // ==========================================
  // HELPER: RENDER 2 LARGE LOOKBOOK PROJECTS PER PAGE (Pages 5 to 12)
  // ==========================================
  const renderLookbookTwoProjectsPage = (
    pageNum: number,
    sectionTitle: string,
    p1: Project,
    p2: Project,
    idx1: number,
    idx2: number
  ) => {
    doc.addPage();
    drawBrutalistHeaderFooterLight("03", sectionTitle, pageNum);

    doc.setFillColor(255, 255, 255);
    doc.rect(0, 16, PAGE_W, PAGE_H - 28, 'F');

    const cardW = (PAGE_W - 32 - 12) / 2;
    const cardH = 164;
    const cardY = 22;

    const projectsToRender = [
      { p: p1, idx: idx1, x: 16 },
      { p: p2, idx: idx2, x: 16 + cardW + 12 }
    ];

    projectsToRender.forEach(({ p, idx, x }) => {
      doc.setFillColor(252, 252, 252);
      doc.rect(x, cardY, cardW, cardH, 'F');
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.8);
      doc.rect(x, cardY, cardW, cardH, 'S');

      doc.setFillColor(0, 0, 0);
      doc.rect(x, cardY, cardW, 8, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(255, 255, 255);
      doc.text(`${copy.catalogPrefix} [${String(idx).padStart(2, '0')}/16]`, x + 4, cardY + 5.5);
      doc.text(`${p.year} • ${p.category.toUpperCase()}`, x + cardW - 38, cardY + 5.5);

      const imgX = x + 4;
      const imgY = cardY + 12;
      const imgW = cardW - 8;
      const imgH = 80;

      doc.setFillColor(240, 240, 240);
      doc.rect(imgX, imgY, imgW, imgH, 'F');

      const imgData = projectImages.get(p.id);
      if (imgData) {
        try {
          doc.addImage(imgData.b64, imgData.format, imgX, imgY, imgW, imgH, undefined, 'FAST');
        } catch (err) {
          console.error(`Failed to embed lookbook image for project ${p.id}:`, err);
        }
      }

      let bx = imgX + 3;
      if (p.isNew) {
        doc.setFillColor(0, 0, 0);
        doc.rect(bx, imgY + 3, 16, 5, 'F');
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6);
        doc.setTextColor(255, 255, 255);
        doc.text(copy.newBadge, bx + 2.5, imgY + 6.8);
        bx += 18;
      }

      doc.setFillColor(255, 255, 255);
      doc.rect(bx, imgY + 3, 26, 5, 'F');
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.rect(bx, imgY + 3, 26, 5, 'S');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6);
      doc.setTextColor(0, 0, 0);
      doc.text(p.category.toUpperCase(), bx + 2.5, imgY + 6.8);

      doc.setFillColor(0, 0, 0);
      doc.rect(imgX + imgW - 22, imgY + 3, 19, 5, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.setTextColor(255, 255, 255);
      doc.text(`${p.gallery?.length || 1} ${copy.photosSuffix}`, imgX + imgW - 20.5, imgY + 6.8);

      const infoY = imgY + imgH + 6;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(130, 130, 130);
      doc.text(`${copy.clientLabel} ${p.client.toUpperCase()}`, imgX, infoY);
      doc.text(`${copy.yearLabel} ${p.year}`, imgX + imgW - 20, infoY);

      doc.setFont("times", "bold");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      const titleLines = doc.splitTextToSize(p.title, imgW);
      doc.text(titleLines.slice(0, 2), imgX, infoY + 8);

      const divY = infoY + (titleLines.slice(0, 2).length * 6) + 4;
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.line(imgX, divY, imgX + imgW, divY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      const desc = PROJECT_DESCRIPTIONS[p.id]?.[lang] || p.description || copy.fallbackDesc;
      const descLines = doc.splitTextToSize(desc, imgW);
      doc.text(descLines.slice(0, 4), imgX, divY + 6);

      const tagY = cardY + cardH - 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(140, 140, 140);
      doc.text(copy.cardFooterTags, imgX, tagY);
    });
  };

  for (let i = 0; i < 8; i++) {
    renderLookbookTwoProjectsPage(
      5 + i,
      copy.lookbookHeaders[i],
      PROJECTS[i * 2],
      PROJECTS[i * 2 + 1],
      i * 2 + 1,
      i * 2 + 2
    );
  }

  // ==========================================
  // PAGE 13: BRUTALIST CLOSING & CONTACT
  // ==========================================
  doc.addPage();
  drawBrutalistHeaderFooterLight("04", copy.contactHeader, 13);

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 16, PAGE_W, PAGE_H - 28, 'F');

  doc.setFont("times", "bold");
  doc.setFontSize(54);
  doc.setTextColor(0, 0, 0);
  doc.text(copy.contactHeading, 20, 48);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.text(copy.contactSubtitle, 20, 60);

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1.5);
  doc.line(20, 68, PAGE_W - 20, 68);

  const contactW = (PAGE_W - 40 - 24) / 3;
  const contactY = 78;
  const contactH = 92;

  // Card 1: Email
  doc.setFillColor(10, 10, 10);
  doc.rect(20, contactY, contactW, contactH, 'F');
  doc.setDrawColor(0, 0, 0);
  doc.rect(20, contactY, contactW, contactH, 'S');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 0, 51);
  doc.text(copy.c1Tag, 28, contactY + 16);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("edward40765154", 28, contactY + 30);
  doc.text("@gmail.com", 28, contactY + 38);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(180, 180, 180);
  copy.c1Lines.forEach((line, idx) => {
    doc.text(line, 28, contactY + 52 + idx * 6);
  });

  doc.setFillColor(255, 255, 255);
  doc.rect(28, contactY + 72, contactW - 16, 12, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(0, 0, 0);
  doc.text(copy.c1Btn, 34, contactY + 80);
  doc.link(20, contactY, contactW, contactH, { url: "mailto:edward40765154@gmail.com" });

  // Card 2: Instagram
  const c2X = 20 + contactW + 12;
  doc.setFillColor(248, 248, 248);
  doc.rect(c2X, contactY, contactW, contactH, 'F');
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1);
  doc.rect(c2X, contactY, contactW, contactH, 'S');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  doc.text(copy.c2Tag, c2X + 8, contactY + 16);

  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("@wardo.doit", c2X + 8, contactY + 34);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 90);
  copy.c2Lines.forEach((line, idx) => {
    doc.text(line, c2X + 8, contactY + 52 + idx * 6);
  });

  doc.setFillColor(0, 0, 0);
  doc.rect(c2X + 8, contactY + 72, contactW - 16, 12, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(copy.c2Btn, c2X + 16, contactY + 80);
  doc.link(c2X, contactY, contactW, contactH, { url: "https://instagram.com/wardo.doit" });

  // Card 3: Behance
  const c3X = 20 + (contactW * 2) + 24;
  doc.setFillColor(248, 248, 248);
  doc.rect(c3X, contactY, contactW, contactH, 'F');
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1);
  doc.rect(c3X, contactY, contactW, contactH, 'S');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  doc.text(copy.c3Tag, c3X + 8, contactY + 16);

  doc.setFont("times", "bold");
  doc.setFontSize(15);
  doc.setTextColor(0, 0, 0);
  doc.text("behance.net/imwardo", c3X + 8, contactY + 34);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 90);
  copy.c3Lines.forEach((line, idx) => {
    doc.text(line, c3X + 8, contactY + 52 + idx * 6);
  });

  doc.setFillColor(0, 0, 0);
  doc.rect(c3X + 8, contactY + 72, contactW - 16, 12, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(copy.c3Btn, c3X + 18, contactY + 80);
  doc.link(c3X, contactY, contactW, contactH, { url: "https://www.behance.net/imwardo" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(copy.copyright, 20, PAGE_H - 18);

  return Buffer.from(doc.output('arraybuffer'));
}

async function run() {
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log("Generating bilingual Brutalist Lookbook PDFs (EN & ES)...");
  const assets = await preloadAllAssets();

  const enPath = path.join(publicDir, 'Edward_Munoz_Interactive_Portfolio_2026_EN.pdf');
  const enBuffer = await generateInteractivePDF('en', assets);
  fs.writeFileSync(enPath, enBuffer);
  console.log(`English PDF generated at ${enPath} (${(enBuffer.length / (1024 * 1024)).toFixed(2)} MB, 13 pages)`);

  const esPath = path.join(publicDir, 'Edward_Munoz_Portafolio_Interactivo_2026.pdf');
  const esBuffer = await generateInteractivePDF('es', assets);
  fs.writeFileSync(esPath, esBuffer);
  console.log(`Spanish PDF generated at ${esPath} (${(esBuffer.length / (1024 * 1024)).toFixed(2)} MB, 13 pages)`);
}

if (process.argv[1] && process.argv[1].endsWith('generate-pdf.ts')) {
  run().catch(console.error);
}
