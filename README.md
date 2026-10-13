# 🎬 Capify.ai — AI Caption Behind Subject SaaS Platform

> Built by reverse-engineering **Moonshot (`makemoonshot.co`)** and **Whitestair**.

Capify is a complete production-grade SaaS platform that places captions, gradients, and kinetic typography **behind the subject** in talking-head videos with zero manual rotoscoping.

---

## 🌟 Key Features

1. **Auto-Head Tracking & Smart Crown Placement:**
   - Detects the subject's crown/head level frame-by-frame and places the hero text right behind their head with zero face occlusion.
2. **Organic Video Luminance Blending (Moonshot/Whitestair Secret):**
   - Infuses the background video's natural light and shadow into the text layer, creating the viral fiery copper/smoke texture.
3. **4 Trending Templates (From Whitestair & Moonshot Bundles):**
   - **Estate (Dynamic):** Plus Jakarta Sans 800 + Copper Orange/Red gradient + Montserrat support text.
   - **Luxe:** Montserrat 900 Black + Sky Cyan gradient + Josefin Sans Italic support text.
   - **Creator Yellow:** Bebas Neue tall yellow + Caveat handwritten script.
   - **Editorial Vogue:** High-fashion Playfair Display serif typography.
4. **Interactive Web Studio (Next.js 16 + TailwindCSS):**
   - Drag & drop video upload.
   - 9:16 vertical reel phone simulator.
   - Whisper AI word-level auto-transcription.
   - Realtime progress bar and 1-click MP4 export.
5. **High Performance Backend (FastAPI + FFmpeg):**
   - Streaming pipeline directly piping frames to FFmpeg stdin (no intermediate disk writes).
   - MediaPipe selfie segmentation with smoothstep edge feathering.

---

## 📁 Project Structure

```
capify/
├── backend/
│   ├── server.py              # FastAPI REST API (Upload, Transcribe, Render, Download)
│   ├── behind_caption/        # Core rendering, matting & compositing engine
│   ├── fonts/                 # Original TTF fonts (Plus Jakarta Sans, Montserrat, Josefin, Bebas, Playfair)
│   ├── models/                # MediaPipe selfie segmenter model
│   ├── uploads/               # Temporary user videos
│   └── outputs/               # Final rendered 3D reel MP4s
├── frontend/
│   ├── app/
│   │   ├── page.tsx           # Full Capify Web Studio + Hero + Pricing
│   │   └── layout.tsx
│   ├── package.json
│   └── tailwind.config.ts
└── run_capify.bat             # 1-Click Startup Script
```

---

## 🚀 How to Run Locally

### Option 1: 1-Click Launcher (Windows)
Double-click `run_capify.bat`. It will start:
- Backend API at: `http://localhost:8000`
- Web Studio at: `http://localhost:3000`

### Option 2: Manual Terminal Commands

**Terminal 1 (Backend):**
```bash
cd backend
python -m uvicorn server:app --host 127.0.0.1 --port 8000 --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Open `http://localhost:3000` in your browser!
