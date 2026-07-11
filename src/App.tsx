import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Mail, Instagram, Dribbble, X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for projects
const PROJECTS = [
  {
    "id": 1,
    "title": "LJ Corporate Solutions | Branding",
    "client": "LJ Corporate Solutions",
    "year": "2026",
    "category": "Branding",
    "image": "https://mir-s3-cdn-cf.behance.net/projects/original/33b656246289107.Y3JvcCwxMDEwLDc5MCwxOTUsMA.png",
    "description": "Proyecto de branding para LJ Corporate Solutions.",
    "gallery": [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/98c697246289107.69c16e524a99b.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1ef662246289107.69c16e5249738.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/4df187246289107.69c16e5249fb7.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cfaaa5246289107.69c16e524caba.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/60d9f0246289107.69c16e524c305.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/96505f246289107.69c16e524c6e4.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b0be8f246289107.69c16e524da47.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a5c321246289107.69c16e524d691.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7afaeb246289107.69c16e524b70a.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2587e0246289107.69c16e524d2d7.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2ce52d246289107.69c16e5249bb6.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/95efc9246289107.69c16e51a90c3.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/98ec72246289107.69c16e51a96a3.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5edd88246289107.69c16e524ddf0.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/70e251246289107.69c16e524ceea.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10a469246289107.69c16e524a517.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f14f85246289107.69c16e524b31c.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/035797246289107.69c16e524aef3.png"
    ],
    "isNew": true
  },
  {
    "id": 2,
    "title": "Bridge to Speech | Branding",
    "client": "Bridge to Speech",
    "year": "2026",
    "category": "Branding",
    "image": "https://mir-s3-cdn-cf.behance.net/projects/original/a1347c246235523.Y3JvcCwxMDA3LDc4OCwxOTcsMA.png",
    "description": "Proyecto de branding para Bridge to Speech.",
    "gallery": [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/4dc2a4246235523.69c02e0c995d1.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/43f2c8246235523.69c02e0c98355.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/157151246235523.69c02e0c97739.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/87a52e246235523.69c02e0c972e6.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/13341d246235523.69c02e0c98b06.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/53d496246235523.69c02e0c97b40.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f340fc246235523.69c02e0c97e80.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/3319cd246235523.69c02e0c9a93b.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/de1a61246235523.69c02e0c9877f.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c9fa7f246235523.69c02e0c9a014.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/4f2ea0246235523.69c02e0c9a4c6.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1cfcb3246235523.69c02e0c9b867.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2a6f24246235523.69c02e0c991e8.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2c211e246235523.69c02e0c99ae4.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a44f5a246235523.69c02e0c9acdf.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5b6ac6246235523.69c02e0c9b465.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9e4ed6246235523.69c02e0c0c713.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2db3df246235523.69c02e0c0cbfc.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c1c388246235523.69c02e0c9b0d9.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7d6b48246235523.69c02e0c98e6f.png"
    ],
    "isNew": true
  },
  {
    "id": 3,
    "title": "Americans Broaster | Branding",
    "client": "Americans Broaster",
    "year": "2025",
    "category": "Branding",
    "image": "https://mir-s3-cdn-cf.behance.net/projects/original/111fcf223997693.Y3JvcCwxMDIyLDgwMCwxODcsMA.jpg",
    "description": "Proyecto de branding para Americans Broaster.",
    "gallery": [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/d9167c223997693.6802f742f41fd.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/622dcc223997693.6802f7430049c.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/14e6ed223997693.6802f742f33bd.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0fc75f223997693.6802f743027c0.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/209a75223997693.6802f74301e09.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a12f11223997693.6802f74300e8d.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a48fcb223997693.6802f743009c1.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/eb0339223997693.6802f742f3d1a.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/e5792c223997693.6802f742f386a.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b7a163223997693.6802f74094507.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/965511223997693.6802f7409406d.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/dd50ac223997693.6802f743022d7.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/3a13f8223997693.6802f7412b285.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1b4364223997693.6802f7412b69e.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/05c990223997693.6802f74301934.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0c61a6223997693.6802f741ca2a5.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7dfacd223997693.6802f741c9e45.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1ffb04223997693.6802f742f2f0d.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/479e44223997693.6802f742f29f1.jpg"
    ],
    "isNew": false
  },
  {
    "id": 4,
    "title": "MC Electric Contractors | Branding",
    "client": "MC Electric Contractors",
    "year": "2024",
    "category": "Branding",
    "image": "https://mir-s3-cdn-cf.behance.net/projects/original/b2dcc6206925051.66d52e7b0fec9.jpg",
    "description": "Proyecto de branding para MC Electric Contractors.",
    "gallery": [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2b234e206925051.66d52dd32ecc2.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b69575206925051.66d52dd326205.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/39ade3206925051.66d52dd327e1a.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1a1169206925051.66d52dd326e5d.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/4ee98d206925051.66d52dd328a79.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/454824206925051.66d52dd32a874.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c5d2b3206925051.66d52dd334193.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f9a72f206925051.66d52dd3282f5.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b31722206925051.66d52dd327604.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ef5043206925051.66d52dd32cc1f.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f18f7a206925051.66d52dd32c29e.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9053c9206925051.66d52dd32d3a6.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/eaece0206925051.66d52dd32e23f.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/6d46ac206925051.66d52dd32db48.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1f93a8206925051.66d52dd32b239.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/557bf9206925051.66d52dd32bc06.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/8f532a206925051.66d52dd328f2b.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b3c518206925051.66d52dd329668.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9d6a17206925051.66d52dd329ffb.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bcac7d206925051.66d52dd3266ff.png"
    ],
    "isNew": false
  },
  {
    "id": 5,
    "title": "Morning Glory eSports Team | Branding",
    "client": "Morning Glory eSports Team",
    "year": "2024",
    "category": "Branding",
    "image": "https://mir-s3-cdn-cf.behance.net/projects/original/65582a195211213.Y3JvcCwxMDA3LDc4OCwxOTcsMA.jpg",
    "description": "Proyecto de branding para Morning Glory eSports Team.",
    "gallery": [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c86a14195211213.660a078d4e2e7.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/49c688195211213.660a078b64bed.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7e2bb0195211213.660a078b648f5.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/26e5af195211213.660a078d50469.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/39310e195211213.660a078d4e655.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9f5ef0195211213.660a078d4eb1d.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b26c15195211213.660a078d4ee4d.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/80b830195211213.660a078c20641.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/623f7c195211213.660a078c20c3a.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/4378bd195211213.660a078c211de.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/fec113195211213.660a078d4fa44.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/11c385195211213.660a078d4f2f9.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/e4152a195211213.660a078d4fea6.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d632a195211213.660a078d4f660.jpg"
    ],
    "isNew": false
  },
  {
    "id": 6,
    "title": "Media Maratón de Bogotá | Rebranding",
    "client": "Media Maratón de Bogotá",
    "year": "2024",
    "category": "Rebranding",
    "image": "https://mir-s3-cdn-cf.behance.net/projects/original/dbe25d188413609.659d4e8d2a065.png",
    "description": "Proyecto de rebranding para Media Maratón de Bogotá.",
    "gallery": [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0885e5188413609.659c055074918.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1f6ed9188413609.659c0550758d1.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/888359188413609.659c05507d880.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/810665188413609.659c05508308e.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/185fc1188413609.659c05507f62f.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/80b6e4188413609.659c05507cc23.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/93db42188413609.659c054c2dfe4.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/e14982188413609.659c054c2ec91.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/6c7b5b188413609.659c05508144f.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a625be188413609.659c055083f06.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2735cd188413609.659c0550785cf.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10de7c188413609.659c05507afb7.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0e9fec188413609.659c054cb564c.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2e27b6188413609.659c054cb65e7.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/6de99e188413609.659c05507e7aa.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f036b3188413609.659c054d49f30.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0c7cfc188413609.659c054d489c8.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/d9ee75188413609.659c055079252.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/37a73d188413609.659c055084eda.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/610d1c188413609.659c0550769c3.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/fd129d188413609.659c0550776a9.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1145a1188413609.659c055086896.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/23bc71188413609.659c0550806f0.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0c3248188413609.659c054de57e1.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ae351c188413609.659c054de4647.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/318124188413609.659c05507bf45.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/832df5188413609.659c05507a0f5.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/229094188413609.659c054e64eb9.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cbfaa9188413609.659c054e65da4.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1a4b85188413609.659c054eebce2.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ff116a188413609.659c054eeca36.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a09800188413609.659c05508210b.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/daa1d6188413609.659c054fab955.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/51b573188413609.659c054fac983.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c9d9b1188413609.659c055085c97.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/6f54e2188413609.659c055073bbc.png"
    ],
    "isNew": false
  },
  {
    "id": 7,
    "title": "Orange Pill Agency | Branding",
    "client": "Orange Pill Agency",
    "year": "2023",
    "category": "Branding",
    "image": "https://mir-s3-cdn-cf.behance.net/projects/original/62ca70178627471.Y3JvcCw5OTcsNzgwLDIwMiww.png",
    "description": "Proyecto de branding para Orange Pill Agency.",
    "gallery": [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/8087d6178627471.64eba010f2b91.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c2642e178627471.64eba010f38c1.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f78013178627471.64eba01100fa6.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9b345b178627471.64eba01106a61.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2bd2ab178627471.64eba011051b5.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bfb4cc178627471.64eba01103655.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/25a61c178627471.64eba00f9d7ff.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/dcc802178627471.64eba00f9c002.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/abfff5178627471.64eba00f9ce88.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/be8d16178627471.64eba011028dc.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bbafb5178627471.64eba0110449b.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/093d00178627471.64eba0110031e.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/519317178627471.64eba01105ec6.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/40505e178627471.64eba01101c5b.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/13fd97178627471.64eba01036869.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/50e258178627471.64eba01034b51.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bae3b3178627471.64eba010336a2.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/6911df178627471.64eba01035f93.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/68c814178627471.64eba0103712e.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/42e028178627471.64eba0103541b.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/d81c24178627471.64eba01034265.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/aab2c6178627471.64eba010f1d1e.png"
    ],
    "isNew": false
  },
  {
    "id": 8,
    "title": "Puerta Urbana | Branding",
    "client": "Puerta Urbana",
    "year": "2023",
    "category": "Branding",
    "image": "https://mir-s3-cdn-cf.behance.net/projects/original/878b98178624943.Y3JvcCwxMTUwLDkwMCwxMjUsMA.png",
    "description": "Proyecto de branding para Puerta Urbana.",
    "gallery": [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/82dde1178624943.64eb947790834.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0b1fda178624943.64eb94778fc2e.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ae6dff178624943.64eb94779353a.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a56c98178624943.64eb94771ae89.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5af7f7178624943.64eb94771bce7.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/d34300178624943.64eb947794dce.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cf72bd178624943.64eb947794190.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/872575178624943.64eb9477913f9.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bb8d56178624943.64eb947792291.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f6128b178624943.64eb94778edc5.png"
    ],
    "isNew": false
  },
  {
    "id": 9,
    "title": "Caquetá Birding | Branding",
    "client": "Caquetá Birding",
    "year": "2022",
    "category": "Branding",
    "image": "https://mir-s3-cdn-cf.behance.net/projects/original/ad2f52151072839.Y3JvcCw4MDEsNjI3LDI3LDk3.png",
    "description": "Proyecto de branding para Caquetá Birding.",
    "gallery": [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/60eea5151072839.63059289057ea.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/699f8f151072839.6305928906818.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7e0434151072839.6305928908a52.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/43c3d4151072839.6305928909266.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5042b2151072839.630592890799f.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2ec8d6151072839.63059289081b9.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/79de5d151072839.6305928907170.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9aaa6e151072839.6305928905fda.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/d9acfd151072839.6305948b23fa9.png"
    ],
    "isNew": false
  },
  {
    "id": 10,
    "title": "Alebrije | Branding",
    "client": "Alebrije",
    "year": "2022",
    "category": "Branding",
    "image": "https://mir-s3-cdn-cf.behance.net/projects/original/32a564150290591.Y3JvcCwxMDIyLDgwMCwxODcsMA.png",
    "description": "Proyecto de branding para Alebrije.",
    "gallery": [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/674d3e150290591.62f716b323753.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/3eafdf150290591.62f716b325b08.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/830c1b150290591.62f716b32411d.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7e44b3150290591.62f716b3254d6.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/45493c150290591.62f716b323c35.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/14d78a150290591.62f716b325035.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/3292a4150290591.62f716b3261f5.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2131ce150290591.62f716b324b74.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2fdaa6150290591.62f716b326d32.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9c3467150290591.62f716b324614.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0f0190150290591.62f716b326848.png"
    ],
    "isNew": false
  },
  {
    "id": 11,
    "title": "Moca Tentaciones",
    "client": "Moca Tentaciones :: Behance",
    "year": "2021",
    "category": "Design",
    "image": "https://mir-s3-cdn-cf.behance.net/projects/original/65062f112784767.Y3JvcCwxMTUwLDkwMCwxMzYsMA.jpg",
    "description": "Proyecto de design para Moca Tentaciones.",
    "gallery": [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f615a0112784767.601ae2330fb1d.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/8dc327112784767.601ae23310f44.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/27dc42112784767.6022b34f4d47d.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/00db94112784767.601ae23314cfd.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/98582a112784767.601ae2331201e.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0472e5112784767.601ae233108a4.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2aa957112784767.601ae23313809.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ebdb6c112784767.601ae233126e2.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d9a48112784767.601ae23311af4.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/99748c112784767.601ae2331030b.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5d95b9112784767.601ae23314790.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/746593112784767.601ae23314209.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f257aa112784767.601ae23313288.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/71db16112784767.601ae23313d71.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/013070112784767.601ae2331142b.jpg"
    ],
    "isNew": false
  }
];

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
    poster: "https://img.youtube.com/vi/dZKDCL9_Jps/maxresdefault.jpg",
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
    poster: "https://img.youtube.com/vi/LHpSTJF731o/maxresdefault.jpg",
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
    poster: "https://img.youtube.com/vi/79nf-ZPCcig/maxresdefault.jpg",
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col gap-4 hover:border-neutral-700 transition-all duration-300"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-neutral-950">
        {video.youtubeId ? (
          <img
            src={video.poster}
            alt={video.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
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
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Play indicator on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
            <Play size={24} fill="currentColor" className="ml-1" />
          </div>
        </div>

        {/* Floating Category Tag */}
        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-bold text-gray-300 border border-white/10">
          {video.category.split('/')[0].trim()}
        </div>
      </div>

      <div className="flex justify-between items-start mt-2">
        <div>
          <h3 className="text-lg font-serif font-medium text-white group-hover:text-gray-300 transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-neutral-400 mt-0.5">{video.client}</p>
        </div>
        <div className="text-right text-xs uppercase tracking-wider text-neutral-500 font-mono">
          <span>{video.year}</span>
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
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | null>(null);

  useEffect(() => {
    if (isMenuOpen || selectedProject || selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen, selectedProject, selectedVideo]);

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
              <a href="#work" onClick={() => setIsMenuOpen(false)} className="hover:italic transition-all">Diseño</a>
              <a href="#videos" onClick={() => setIsMenuOpen(false)} className="hover:italic transition-all">Video</a>
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
              Graphic Creative basado en Bogotá, Colombia. Especializado en Branding, Diseño Web y Dirección de Arte.
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
      <section id="work" className="px-6 py-24 bg-white">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-3xl md:text-5xl font-serif">Proyectos<br/><span className="italic text-gray-400">Seleccionados</span></h2>
          <span className="text-sm uppercase tracking-widest font-medium hidden md:block">(2024 — 2026)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index % 2 === 0 ? 0 : 0.2 }}
              className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/5] mb-6">
                {project.isNew && (
                  <div className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] px-2 py-1 uppercase tracking-widest font-bold">
                    Nuevo
                  </div>
                )}
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{project.year}</p>
                  <p className="text-sm text-gray-500">{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video Work Section */}
      <section id="videos" className="px-6 py-24 bg-black text-white border-b border-neutral-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-2">Creación Audiovisual</span>
            <h2 className="text-3xl md:text-5xl font-serif">Portafolio<br/><span className="italic text-gray-400">de Video</span></h2>
          </div>
          <span className="text-sm uppercase tracking-widest font-mono text-neutral-400 hidden md:block">Contenido en Formato Vertical (9:16)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-full">
          {VIDEOS.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </section>

      {/* About / Manifesto */}
      <section id="about" className="px-6 py-32 md:py-48 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-12"
          >
            "Branding y creatividad enfocado en crear marcas memorables y experiencias únicas"
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-white/20 pt-12">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Ubicación</h4>
              <p className="text-sm leading-relaxed">Bogotá, Colombia.<br/>Disponible para proyectos freelance a nivel global.</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Herramientas</h4>
              <ul className="text-sm leading-relaxed space-y-1">
                <li>Illustrator</li>
                <li>Photoshop</li>
                <li>Adobe Firefly</li>
                <li>Diseño Web</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Experiencia</h4>
              <ul className="text-sm leading-relaxed space-y-1">
                <li><span className="font-medium">HONOR</span> - Digital Designer</li>
                <li><span className="font-medium">Telefónica</span> - Web Designer</li>
                <li><span className="font-medium">Idealidad</span> - Diseñador Gráfico</li>
              </ul>
            </div>
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
              <Dribbble size={16} /> imwardo
            </a>
          </div>
        </div>
        
        <div className="mt-32 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest text-gray-400">
          <p>© 2026 Edward Muñoz</p>
          <p>Graphic Creative</p>
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
            {/* Close Button */}
            <div className="sticky top-0 right-0 p-6 flex justify-end mix-blend-difference text-white z-10 pointer-events-none">
              <button 
                onClick={() => setSelectedProject(null)} 
                className="hover:opacity-70 transition-opacity cursor-pointer pointer-events-auto"
              >
                <X size={32} />
              </button>
            </div>
            
            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 pt-12 pb-32">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-8xl lg:text-9xl font-serif mb-16 leading-[0.9] tracking-tighter relative"
              >
                {selectedProject.title}
                {selectedProject.isNew && (
                  <span className="absolute -top-8 left-0 bg-black text-white text-[10px] px-2 py-1 uppercase tracking-widest font-bold">Nuevo</span>
                )}
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 md:mb-32"
              >
                <div className="md:col-span-4 flex flex-col gap-8 text-xs uppercase tracking-widest text-gray-400">
                  <div>
                    <span className="block text-black font-medium mb-2">Cliente</span>
                    {selectedProject.client}
                  </div>
                  <div>
                    <span className="block text-black font-medium mb-2">Año</span>
                    {selectedProject.year}
                  </div>
                  <div>
                    <span className="block text-black font-medium mb-2">Categoría</span>
                    {selectedProject.category}
                  </div>
                </div>
                <div className="md:col-span-8 text-xl md:text-3xl font-light leading-relaxed text-black">
                  {selectedProject.description}
                </div>
              </motion.div>

              {/* Gallery */}
              <div className="flex flex-col gap-8 md:gap-16">
                {selectedProject.gallery.map((img, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`w-full ${idx % 3 === 1 ? 'md:w-3/4 mx-auto' : idx % 3 === 2 ? 'md:w-2/3 ml-auto' : ''}`}
                  >
                    <img 
                      src={img} 
                      alt={`${selectedProject.title} - Galería ${idx + 1}`} 
                      className="w-full h-auto object-cover bg-gray-100" 
                      referrerPolicy="no-referrer" 
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Back to top / Close */}
              <div className="mt-32 pt-12 border-t border-gray-200 text-center">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-sm uppercase tracking-widest font-medium hover:text-gray-500 transition-colors cursor-pointer"
                >
                  Cerrar Proyecto
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
