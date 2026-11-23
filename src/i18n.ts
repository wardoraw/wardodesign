export type Language = 'en' | 'es';

export const PROJECT_DESCRIPTIONS: Record<number, { en: string; es: string }> = {
  1: {
    en: "HONOR 600, bring your image to life with AI. Local launch campaign in Colombia for 2026.",
    es: "HONOR 600, dale vida a tu imagen con AI. Lanzamiento local en Colombia durante 2026."
  },
  2: {
    en: "HONOR Magic8 Lite, Falcao's smartphone. Local launch campaign in Colombia for 2026.",
    es: "HONOR Magic8 Lite, el equipo de Falcao. Lanzamiento local en Colombia durante 2026."
  },
  3: {
    en: "HONOR 400, make it real with AI. Local launch campaign in Colombia for 2025.",
    es: "HONOR 400, hazlo real con AI. Lanzamiento local en Colombia durante 2025."
  },
  4: {
    en: "HONOR Magic7 Lite, the champion built to last. Local launch campaign in Colombia for 2025.",
    es: "HONOR Magic7 Lite, el campeón, creado para durar. Lanzamiento local en Colombia durante 2025."
  },
  5: {
    en: "Ritual is a gastrobar located in Florencia, Caquetá, conceived as a social and sensory sanctuary for a contemporary adult audience seeking to connect through good conversation, signature cocktails, and an ever-evolving culinary experience.",
    es: "Ritual es un gastrobar ubicado en Florencia, Caquetá, concebido como un santuario social y sensorial para un público adulto contemporáneo que busca conectar a través de buena conversación, coctelería de autor y una experiencia gastronómica en constante evolución."
  },
  6: {
    en: "Brand identity and web design developed for LJ Corporate Solutions.",
    es: "Diseño de branding y web para LJ Corporate Solutions."
  },
  7: {
    en: "Brand identity system created for a US-based digital speech therapy brand.",
    es: "Diseño de branding para marca digital situada en Estados Unidos."
  },
  8: {
    en: "Brand identity and visual system developed for Americans Broaster.",
    es: "Proyecto de branding desarrollado para Americans Broaster."
  },
  9: {
    en: "Corporate identity and visual branding developed for MC Electric Contractors.",
    es: "Proyecto de branding desarrollado para MC Electric Contractors."
  },
  10: {
    en: "Visual identity and esports branding created for Morning Glory eSports Team.",
    es: "Proyecto de branding desarrollado para Morning Glory eSports Team."
  },
  11: {
    en: "Comprehensive visual rebranding developed for Media Maratón de Bogotá.",
    es: "Proyecto de rebranding desarrollado para Media Maratón de Bogotá."
  },
  12: {
    en: "Brand identity system created for Orange Pill Agency.",
    es: "Proyecto de branding desarrollado para Orange Pill Agency."
  },
  13: {
    en: "Brand identity and architectural visual language developed for Puerta Urbana.",
    es: "Proyecto de branding desarrollado para Puerta Urbana."
  },
  14: {
    en: "Eco-tourism brand identity developed for Caquetá Birding in the Colombian Amazon.",
    es: "Proyecto de branding desarrollado para Caquetá Birding."
  },
  15: {
    en: "Vibrant gastronomic brand identity developed for Alebrije.",
    es: "Proyecto de branding desarrollado para Alebrije."
  },
  16: {
    en: "Visual design and brand identity developed for Moca Tentaciones.",
    es: "Proyecto de diseño desarrollado para Moca Tentaciones."
  }
};

export const VIDEO_DESCRIPTIONS: Record<number, { en: string; es: string }> = {
  1: {
    en: "Launch campaign for BBC Rosé 2024 in 9:16 vertical format.",
    es: "Campaña de lanzamiento para BBC Rosé 2024."
  },
  2: {
    en: "Audiovisual coverage and official reel for Sonidos en la Cumbre 2024 festival.",
    es: "Cobertura de Sonidos en la Cumbre 2024."
  },
  3: {
    en: "Halloween promotional campaign for BBC Triqui Triqui 2024.",
    es: "Campaña de Halloween BBC Triqui Triqui 2024."
  },
  4: {
    en: "Promotional reel for Club Colombia Tascas 2025 gastronomic experience.",
    es: "Promoción de Club Colombia Tascas 2025."
  },
  5: {
    en: "National brand campaign for HONOR featuring Radamel Falcao 2026.",
    es: "Campaña de marca HONOR con Radamel Falcao 2026."
  },
  6: {
    en: "Product showcase for HONOR 400 Lite alongside Radamel Falcao 2025.",
    es: "Presentación de HONOR 400 Lite junto a Falcao 2025."
  },
  7: {
    en: "Dynamic unboxing and feature showcase of the new HONOR 600 in 2026.",
    es: "Unboxing del nuevo HONOR 600 en 2026."
  },
  8: {
    en: "Corporate brand reel for LJ Corporate Solutions 2025.",
    es: "Video corporativo para LJ Corporate Solutions 2025."
  }
};

export const TRANSLATIONS = {
  en: {
    meta: {
      title: "Edward Muñoz | Graphic Creative",
      description: "Portfolio of Edward Muñoz, Graphic Creative based in Bogotá, Colombia. Specialized in Branding, Launch Campaigns, and Art Direction."
    },
    nav: {
      pdfButton: "Interactive PDF",
      pdfTooltip: "Download Interactive Portfolio PDF with direct video links",
      pdfBadge: "8 Videos ↗",
      menu: "Menu",
      design: "Design",
      video: "Video",
      about: "About",
      contact: "Contact",
      menuPdfCta: "Download Lookbook PDF (13 Pages) ↗",
      menuPdfDesc: "Brutalist Lookbook: 16 static design works and 8 videos with direct YouTube links."
    },
    hero: {
      subtitle: "Graphic Creative based in Bogotá, Colombia. Specialized in Branding, Launch Campaigns, and Art Direction.",
      pdfCta: "Interactive PDF ↗",
      scrollToExplore: "Scroll to explore"
    },
    work: {
      eyebrowVideos: (count: number) => `Audiovisual Portfolio (${count} Vertical Videos)`,
      eyebrowProjects: (count: number) => `Behance Portfolio (${count} Selected Projects)`,
      titleVideosTop: "Video Content &",
      titleVideosAccent: "Vertical Reels",
      titleProjectsTop: "Selected",
      titleProjectsAccent: "Projects",
      verticalFormat: "Vertical Format (9:16)",
      categories: {
        Todos: "All",
        Branding: "Branding",
        Campaign: "Campaign",
        Rebranding: "Rebranding",
        Videos: "Videos"
      } as Record<string, string>,
      downloadPdf: "Download PDF",
      downloadPdfTooltip: "Download Interactive Portfolio PDF with video links",
      activeLinks: "• Active Links",
      viewLabel: "View:",
      col3Title: "3 columns per row",
      col4Title: "4 columns per row (ultra compact)",
      videoBannerTitle: "Audiovisual Portfolio & Reels (9:16)",
      videoBannerBadge: "Active YouTube Links",
      videoBannerDesc: "8 vertical productions for BBC Cervecería, Club Colombia, HONOR & Falcao, and LJ Solutions.",
      exportPdfBtn: "Export Interactive PDF",
      newBadge: "New",
      photosCount: (count: number) => `${count} photos`,
      watchReel: "Watch Reel →"
    },
    about: {
      eyebrow: "About Edward Muñoz",
      quote: '"Hi! I\'m Edward, and my focus is branding design. I have designed for accessory brands, architecture, advertising agencies, beauty, gastronomy, and tourism. In every project, I aim to build a complete visual universe that helps brands stand out both online and offline."',
      locationTitle: "Location",
      locationLine1: "Bogotá, Colombia.",
      locationLine2: "Available for branding, launch campaigns, and creative direction projects worldwide.",
      specialtiesTitle: "Specialties",
      specialties: [
        "• Branding & Visual Identity",
        "• 360° Launch Campaigns",
        "• Creative & Art Direction",
        "• Audiovisual Formats & Reels",
        "• Web & Digital Design"
      ],
      experienceTitle: "Experience",
      experience: [
        { client: "HONOR", role: "Digital & Campaign Designer" },
        { client: "Telefónica", role: "Web Designer" },
        { client: "BBC & Club Colombia", role: "Audiovisual Content" },
        { client: "Idealidad", role: "Graphic Designer" }
      ],
      exploreBehance: "Explore Full Behance"
    },
    contact: {
      heading: "Let's talk?",
      pdfBannerEyebrow: "2026 Interactive Digital Portfolio PDF",
      pdfBannerTitle: "Prefer to review or share the portfolio as a PDF?",
      pdfBannerDesc: "Download the 13-page Brutalist Lookbook edition: 16 high-resolution static design showcases and 8 interactive smartphone video frames linked to YouTube Shorts.",
      downloadPdfBtn: "Download PDF (8.6 MB)",
      viewStructureBtn: "View Structure",
      footerRole: "Graphic Creative — Bogotá, Colombia"
    },
    projectModal: {
      prev: "Previous",
      next: "Next",
      close: "Close",
      closeAria: "Close modal",
      newBadge: "New",
      client: "Client",
      year: "Year",
      category: "Category",
      behanceLink: "Behance Link",
      viewBehance: "View official Behance",
      piecesInGallery: (count: number) => `${count} pieces in this gallery`,
      galleryHeader: (count: number) => `Project Gallery (${count} pieces / images)`,
      galleryHint: "Click any image to view fullscreen",
      zoom: "Zoom",
      prevProject: "Previous Project",
      nextProject: "Next Project",
      backToTop: "Back to Top ↑",
      galleryAlt: (title: string, idx: number) => `${title} - Gallery ${idx}`
    },
    videoModal: {
      cinemaMode: "Cinema Mode",
      details: "Video Details",
      client: "Client",
      year: "Year",
      formatType: "Format & Type",
      ctaText: "Looking to create a high-impact vertical campaign? Let's connect to craft optimized content for your brand.",
      ctaLink: "Let's Discuss Your Project",
      mailtoSubject: "Inquiry regarding Video Portfolio"
    },
    lightbox: {
      closeAria: "Close viewer",
      prevAria: "Previous image",
      nextAria: "Next image",
      imageAlt: (title: string, idx: number) => `${title} - Image ${idx}`,
      moreCount: (count: number) => `+${count} more`
    },
    smartImage: {
      unavailable: "Image unavailable on Behance"
    },
    pdfModal: {
      pdfUrl: "/Edward_Munoz_Interactive_Portfolio_2026_EN.pdf",
      pdfFilename: "Edward_Munoz_Interactive_Portfolio_2026_EN.pdf",
      title: "Interactive Portfolio PDF",
      badge: "With Video Links",
      subtitle: "Brutalist Lookbook • 16 large-format works • 8 smartphone video frames with links",
      closeTitle: "Close",
      tabInfo: "Overview & Download",
      tabVideos: "Video Links (8)",
      tabPages: "Structure (13 Pages)",
      highlightTitle: "Brutalist Lookbook + Smartphone Frames + Linked Videos",
      highlightDesc: "Preserves the exact editorial identity of the website. All 16 projects are presented with crisp high-resolution static imagery, and the 8 vertical video productions include direct interactive links to watch the full reels on YouTube.",
      downloading: "Downloading...!",
      downloadBtn: "Download PDF (8.6 MB)",
      openBtn: "Open",
      card1Title: "Web-Faithful Design",
      card1Desc: "Consistent serif typography, monumental cover, dark manifesto, brutalist catalog badges ('New', category, photo count), and closing contact cards.",
      card2Title: "16 Static Showcases",
      card2Desc: "Every branding and campaign case study embeds its real high-definition static artwork in a generous two-up lookbook layout.",
      card3Title: "Exclusive Video Links",
      card3Desc: "Only the 8 vertical video productions feature active clickable hotspots pointing directly to YouTube Shorts for full playback.",
      specsTitle: "Document Technical Specifications:",
      specFormatLabel: "Document Format:",
      specFormatValue: "A4 Landscape (297 x 210 mm)",
      specPagesLabel: "Page Count:",
      specPagesValue: "13 Lookbook Pages",
      specImagesLabel: "Static Project Artworks:",
      specImagesValue: "16 Large-Format Works",
      specLinksLabel: "Full Video Hyperlinks:",
      specLinksValue: "8 YouTube Links",
      videosTabHeader: "Direct Links to Full YouTube Videos (Pages 3 & 4 of PDF):",
      videosCountLabel: "8 Reels",
      watchOnYoutube: "Watch on YouTube",
      pagesTabHeader: "Breakdown of the 13 pages included in the Brutalist Lookbook PDF:",
      pagePrefix: "Page",
      footerReady: "Compiled and ready to download (8.6 MB • English Edition)",
      viewInScreen: "View Fullscreen",
      footerDownloading: "Downloading...",
      footerDownload: "Download PDF",
      pagesSummary: [
        { num: "01", title: "Monumental Brutalist Cover", desc: "Monolithic black graphic block with typographic coordinates, 2026 edition mark, and portfolio index." },
        { num: "02", title: "Manifesto & Experience", desc: "All-black canvas featuring an editorial quote and three brutalist blocks: Location, Specialties, and Clients (HONOR, Telefónica, BBC)." },
        { num: "03", title: "Smartphone Showcase — Videos 1 to 4", desc: "BBC Rosé, BBC Cumbre, BBC Triqui Triqui, and Club Colombia Tascas reels framed inside smartphones with active YouTube Shorts links." },
        { num: "04", title: "Smartphone Showcase — Videos 5 to 8", desc: "HONOR & Falcao 2026, HONOR 400 Lite, HONOR 600 Unboxing, and LJ Solutions reels inside smartphones with active YouTube Shorts links." },
        { num: "05", title: "Lookbook — HONOR 600 & HONOR Magic8 Lite", desc: "Editorial spreads [01/16] and [02/16] with large-scale static visuals, client metadata, and art direction details." },
        { num: "06", title: "Lookbook — HONOR 400 & HONOR Magic7 Lite", desc: "Editorial spreads [03/16] and [04/16] showcasing product renders and high-definition launch visuals." },
        { num: "07", title: "Lookbook — Ritual & LJ Corporate Solutions", desc: "Editorial spreads [05/16] and [06/16] highlighting gastrobar branding and corporate identity systems." },
        { num: "08", title: "Lookbook — Bridge to Speech & Americans Broaster", desc: "Editorial spreads [07/16] and [08/16] featuring US digital brand identity and gastronomic visual design." },
        { num: "09", title: "Lookbook — MC Electric & Morning Glory eSports", desc: "Editorial spreads [09/16] and [10/16] covering industrial corporate branding and competitive gaming aesthetics." },
        { num: "10", title: "Lookbook — Media Maratón de Bogotá & Orange Pill Agency", desc: "Editorial spreads [11/16] and [12/16] presenting large-scale sports rebranding and creative agency identity." },
        { num: "11", title: "Lookbook — Puerta Urbana & Caquetá Birding", desc: "Editorial spreads [13/16] and [14/16] highlighting architectural branding and Amazon eco-tourism identity." },
        { num: "12", title: "Lookbook — Alebrije & Moca Tentaciones", desc: "Editorial spreads [15/16] and [16/16] featuring Mexican culinary identity and artisanal bakery design." },
        { num: "13", title: "Let's Talk? — Brutalist Closing & Contact", desc: "Final page with monumental serif typography, direct email, and professional social links (Instagram & Behance)." }
      ]
    }
  },
  es: {
    meta: {
      title: "Edward Muñoz | Graphic Creative",
      description: "Portafolio de Edward Muñoz, Graphic Creative en Bogotá, Colombia. Especializado en Branding, Campañas de Lanzamiento y Dirección de Arte."
    },
    nav: {
      pdfButton: "PDF Interactivo",
      pdfTooltip: "Descargar Portafolio en PDF Interactivo con links a videos",
      pdfBadge: "8 Videos ↗",
      menu: "Menú",
      design: "Diseño",
      video: "Video",
      about: "Sobre Mí",
      contact: "Contacto",
      menuPdfCta: "Descargar Lookbook PDF (13 Págs) ↗",
      menuPdfDesc: "Lookbook Brutalista: 16 obras gráficas estáticas y 8 videos con enlaces directos a YouTube."
    },
    hero: {
      subtitle: "Graphic Creative basado en Bogotá, Colombia. Especializado en Branding, Campañas de Lanzamiento y Dirección de Arte.",
      pdfCta: "PDF Interactivo ↗",
      scrollToExplore: "Scroll para explorar"
    },
    work: {
      eyebrowVideos: (count: number) => `Portafolio Audiovisual (${count} Videos Verticales)`,
      eyebrowProjects: (count: number) => `Portafolio Behance (${count} Proyectos Seleccionados)`,
      titleVideosTop: "Contenido en",
      titleVideosAccent: "Video & Reels",
      titleProjectsTop: "Proyectos",
      titleProjectsAccent: "Seleccionados",
      verticalFormat: "Formato Vertical (9:16)",
      categories: {
        Todos: "Todos",
        Branding: "Branding",
        Campaign: "Campaign",
        Rebranding: "Rebranding",
        Videos: "Videos"
      } as Record<string, string>,
      downloadPdf: "Descargar PDF",
      downloadPdfTooltip: "Descargar Portafolio en PDF Interactivo con links a videos",
      activeLinks: "• Links Activos",
      viewLabel: "Vista:",
      col3Title: "3 columnas por fila",
      col4Title: "4 columnas por fila (ultra compacto)",
      videoBannerTitle: "Portafolio Audiovisual & Reels (9:16)",
      videoBannerBadge: "YouTube Links Activos",
      videoBannerDesc: "8 producciones verticales para BBC Cervecería, Club Colombia, HONOR & Falcao y LJ Solutions.",
      exportPdfBtn: "Exportar en PDF Interactivo",
      newBadge: "Nuevo",
      photosCount: (count: number) => `${count} fotos`,
      watchReel: "Ver Reel →"
    },
    about: {
      eyebrow: "Sobre Edward Muñoz",
      quote: '"¡Hola! Soy Edward y mi enfoque es el diseño de branding. He diseñado para marcas de accesorios, arquitectura, agencias de publicidad, belleza, gastronomía y turismo. Busco que en cada proyecto haya un universo visual completo que le funcione a las marcas para darse a conocer en el mundo online y en el offline."',
      locationTitle: "Ubicación",
      locationLine1: "Bogotá, Colombia.",
      locationLine2: "Disponible para proyectos de branding, campañas y dirección creativa a nivel global.",
      specialtiesTitle: "Especialidades",
      specialties: [
        "• Branding & Identidad Visual",
        "• Campañas de Lanzamiento 360°",
        "• Dirección Creativa & Arte",
        "• Formatos Audiovisuales & Reels",
        "• Diseño Web & Digital"
      ],
      experienceTitle: "Experiencia",
      experience: [
        { client: "HONOR", role: "Digital & Campaign Designer" },
        { client: "Telefónica", role: "Web Designer" },
        { client: "BBC & Club Colombia", role: "Contenido Audiovisual" },
        { client: "Idealidad", role: "Diseñador Gráfico" }
      ],
      exploreBehance: "Explorar Behance Completo"
    },
    contact: {
      heading: "¿Hablamos?",
      pdfBannerEyebrow: "Portafolio Digital en PDF Interactivo 2026",
      pdfBannerTitle: "¿Prefieres revisar o enviar el portafolio en PDF?",
      pdfBannerDesc: "Descarga la edición Lookbook Brutalista de 13 páginas: 16 obras gráficas estáticas en alta resolución y 8 videos en marcos smartphone interactivos con hipervínculos a YouTube Shorts.",
      downloadPdfBtn: "Descargar PDF (8.6 MB)",
      viewStructureBtn: "Ver Estructura",
      footerRole: "Graphic Creative — Bogotá, Colombia"
    },
    projectModal: {
      prev: "Anterior",
      next: "Siguiente",
      close: "Cerrar",
      closeAria: "Cerrar modal",
      newBadge: "Nuevo",
      client: "Cliente",
      year: "Año",
      category: "Categoría",
      behanceLink: "Enlace en Behance",
      viewBehance: "Ver en Behance oficial",
      piecesInGallery: (count: number) => `${count} piezas en esta galería`,
      galleryHeader: (count: number) => `Galería del Proyecto (${count} piezas / imágenes)`,
      galleryHint: "Haz clic en cualquier imagen para ver en pantalla completa",
      zoom: "Ampliar",
      prevProject: "Proyecto Anterior",
      nextProject: "Siguiente Proyecto",
      backToTop: "Volver al Inicio ↑",
      galleryAlt: (title: string, idx: number) => `${title} - Galería ${idx}`
    },
    videoModal: {
      cinemaMode: "Modo Cine",
      details: "Detalles del Video",
      client: "Cliente",
      year: "Año",
      formatType: "Formato & Tipo",
      ctaText: "¿Buscas crear una campaña de alto impacto en formato vertical? Conectemos para crear contenido optimizado para tu marca.",
      ctaLink: "Hablemos del Proyecto",
      mailtoSubject: "Interes en Portafolio de Video"
    },
    lightbox: {
      closeAria: "Cerrar visor",
      prevAria: "Imagen anterior",
      nextAria: "Imagen siguiente",
      imageAlt: (title: string, idx: number) => `${title} - Imagen ${idx}`,
      moreCount: (count: number) => `+${count} más`
    },
    smartImage: {
      unavailable: "Imagen no disponible en Behance"
    },
    pdfModal: {
      pdfUrl: "/Edward_Munoz_Portafolio_Interactivo_2026.pdf",
      pdfFilename: "Edward_Munoz_Portafolio_Interactivo_2026.pdf",
      title: "Portafolio en PDF Interactivo",
      badge: "Con Links a Videos",
      subtitle: "Lookbook Brutalista • 16 obras en gran formato • 8 videos en marcos smartphone con enlace",
      closeTitle: "Cerrar",
      tabInfo: "Resumen & Descarga",
      tabVideos: "Links de Video (8)",
      tabPages: "Estructura (13 Páginas)",
      highlightTitle: "Lookbook Brutalista + Marcos Smartphone + Videos Conectados",
      highlightDesc: "Mantiene exactamente la identidad visual de la web. Los 16 proyectos se presentan con sus imágenes estáticas reales de alta definición, y las 8 producciones de video incluyen links interactivos directos a YouTube para reproducir los videos completos.",
      downloading: "¡Descargando...!",
      downloadBtn: "Descargar PDF (8.6 MB)",
      openBtn: "Abrir",
      card1Title: "Diseño Fiel a la Web",
      card1Desc: "Misma tipografía serif, portadas, manifiesto oscuro, cuadrículas con etiquetas (\"Nuevo\", categoría, número de fotos) y sección de contacto.",
      card2Title: "16 Imágenes Estáticas",
      card2Desc: "Todas las piezas de branding y campañas incorporan sus imágenes visuales reales en alta definición dentro de cada ficha técnica.",
      card3Title: "Links Exclusivos a Videos",
      card3Desc: "Únicamente los 8 videos verticales cuentan con hipervínculos activos directos a YouTube Shorts para ver las producciones completas.",
      specsTitle: "Especificaciones Técnicas del Documento:",
      specFormatLabel: "Formato del Documento:",
      specFormatValue: "A4 Apaisado (297 x 210 mm)",
      specPagesLabel: "Número de Páginas:",
      specPagesValue: "13 Páginas Lookbook",
      specImagesLabel: "Imágenes Estáticas de Proyectos:",
      specImagesValue: "16 Obras en Gran Formato",
      specLinksLabel: "Hipervínculos a Videos Completos:",
      specLinksValue: "8 Enlaces a YouTube",
      videosTabHeader: "Listado de Enlaces a Videos Completos en YouTube (Páginas 3 y 4 del PDF):",
      videosCountLabel: "8 Reels",
      watchOnYoutube: "Ver en YouTube",
      pagesTabHeader: "Resumen de las 13 páginas que conforman el PDF Lookbook Brutalista:",
      pagePrefix: "Pág",
      footerReady: "Archivo compilado y listo para descargar (8.6 MB • Edición Español)",
      viewInScreen: "Ver en Pantalla",
      footerDownloading: "Descargando...",
      footerDownload: "Descargar PDF",
      pagesSummary: [
        { num: "01", title: "Portada Monumental Brutalista", desc: "Bloque negro monolítico con coordenadas tipográficas, año 2026 y badge de edición de portafolio." },
        { num: "02", title: "Manifiesto & Trayectoria", desc: "Canvas oscuro con cita editorial monumental y tres bloques de impacto: Ubicación, Especialidades y Trayectoria (HONOR, Telefónica, BBC)." },
        { num: "03", title: "Showcase Smartphone — Videos 1 al 4", desc: "Reels de BBC Rosé, BBC Cumbre, BBC Triqui Triqui y Club Colombia Tascas presentados en marcos de smartphone con enlaces activos a YouTube Shorts." },
        { num: "04", title: "Showcase Smartphone — Videos 5 al 8", desc: "Reels de HONOR & Falcao 2026, HONOR 400 Lite, HONOR 600 Unboxing y LJ Solutions en marcos de smartphone con enlaces activos a YouTube Shorts." },
        { num: "05", title: "Lookbook — HONOR 600 & HONOR Magic8 Lite", desc: "Fichas editoriales [01/16] y [02/16] con imágenes estáticas de gran escala, especificaciones de cliente y dirección de arte." },
        { num: "06", title: "Lookbook — HONOR 400 & HONOR Magic7 Lite", desc: "Fichas editoriales [03/16] y [04/16] con renders de producto y visuales de campaña de alta definición." },
        { num: "07", title: "Lookbook — Ritual & LJ Corporate Solutions", desc: "Fichas editoriales [05/16] y [06/16] de branding y sistemas de diseño corporativo con piezas estáticas reales." },
        { num: "08", title: "Lookbook — Bridge to Speech & Americans Broaster", desc: "Fichas editoriales [07/16] y [08/16] con diseño de identidad bilingüe y branding gastronómico." },
        { num: "09", title: "Lookbook — MC Electric & Morning Glory eSports", desc: "Fichas editoriales [09/16] y [10/16] con piezas visuales para sector industrial y estética gamer/esports." },
        { num: "10", title: "Lookbook — Media Maratón de Bogotá & Orange Pill Agency", desc: "Fichas editoriales [11/16] y [12/16] con identidades deportivas masivas y branding de agencia." },
        { num: "11", title: "Lookbook — Puerta Urbana & Caquetá Birding", desc: "Fichas editoriales [13/16] y [14/16] con identidad arquitectónica y aviturismo en la Amazonía." },
        { num: "12", title: "Lookbook — Alebrije & Moca Tentaciones", desc: "Fichas editoriales [15/16] y [16/16] con identidad gastronómica mexicana y repostería artesanal." },
        { num: "13", title: "¿Hablamos? — Cierre & Contacto Brutalista", desc: "Página final con tipografía serif monumental, correo oficial y accesos a redes profesionales (Instagram & Behance)." }
      ]
    }
  }
};
