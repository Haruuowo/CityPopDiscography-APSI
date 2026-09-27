# Doton City Pop Discography & Community Vault 🏙️🎵

[![Full-Stack JavaScript & AI Badge](https://img.shields.io/badge/Badge-Full--Stack%20JS%20%26%20AI-blueviolet)](file:///c:/Flutter%20act/citypop-discography/AI-USAGE.md)
[![Security Audit](https://img.shields.io/badge/Security-Lockdown%20100%25-success)](file:///c:/Flutter%20act/citypop-discography/SECURITY-CHECKLIST.md)
[![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-emerald)](file:///c:/Flutter%20act/citypop-discography/supabase/schema.sql)

> **Public Project Repository:** [Haruuowo/CityPopDiscography-APSI (GitHub)](https://github.com/Haruuowo/CityPopDiscography-APSI)  
> **Course Code:** 6APSI — Final Project Submission  

---

## 🌟 Executive Overview

**Doton City Pop Vault** is a production-grade full-stack web application designed to preserve, explore, and share Japanese 1970s and 1980s City Pop vinyl albums. Initiated early during the preliminary cycle, the platform seamlessly couples a high-fidelity React single-page application with a cloud PostgreSQL/Supabase backend.

Users can explore classic vinyl records, filter albums dynamically by mood/vibe, listen to continuous 30-second audio previews across viewports without interrupting playback, and submit community album recommendations directly into the cloud database.

---

## 🛠️ Technology Stack & Architecture

* **Frontend Framework:** React 18, Vite
* **Styling & Design System:** Custom Vanilla CSS Property Tokens (`DOTON_DESIGN_SYSTEM.md`), Glassmorphism Panels, Fluid Responsiveness
* **State Management:** React Hooks (`useState`, `useMemo`, `useEffect`), Custom Audio Context Provider
* **Backend & Database:** Supabase (Cloud PostgreSQL), RESTful API queries via `@supabase/supabase-js`
* **Audio Engine:** HTML5 Audio API with dynamic iTunes / Apple Music preview resolution fallback
* **Security & Isolation:** Environment variable abstraction (`import.meta.env`), Row Level Security (RLS) policies, clean git history

---

## 🔐 Pre-Public Security Lockdown & Verification

In accordance with course security requirements, this repository has been audited and locked down prior to public release:

1. **Environment Variables:** Credentials are excluded via `.gitignore` (`.env` un-tracked). A sanitized template [`.env.example`](file:///c:/Flutter%20act/citypop-discography/.env.example) is provided.
2. **Git Commit History:** Verified zero secrets or connection strings in git history (`git log -p`).
3. **Database Security:** Supabase Row Level Security (RLS) is enabled on all tables (`albums`, `tracks`, `recommendations`) with parameterized client queries.
4. **Security Checklist:** The completed [`SECURITY-CHECKLIST.md`](file:///c:/Flutter%20act/citypop-discography/SECURITY-CHECKLIST.md) is included in the project documentation directory.

---

## 🤖 Full-Stack JavaScript and AI Badge Disclosure

This project was built adhering to the **Builds Full-Stack JavaScript and AI Badge** guidelines. Per requirements:
* **Vibe Coding Ratio:** **65% AI-Assisted / 35% Self-Authored Code** (Exceeds the 20% manual code threshold).
* **Self-Authored Core Systems:** Hand-crafted CSS design system (`DOTON_DESIGN_SYSTEM.md`), Supabase fallback resilience layer (`src/lib/supabaseClient.js`), audio preview resolver (`src/utils/audioResolver.js`), and SQL RLS policies (`supabase/schema.sql`).
* **Full Audit & Prompt Logs:** See [`AI-USAGE.md`](file:///c:/Flutter%20act/citypop-discography/AI-USAGE.md) for full code line references and prompt logs.

---

## 🚀 Local Setup & Installation

### 1. Prerequisites
* Node.js (v18.x or higher)
* npm or yarn

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/Haruuowo/CityPopDiscography-APSI.git
cd CityPopDiscography-APSI
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your Supabase project credentials:
```bash
cp .env.example .env
```
Edit `.env`:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
*(Note: If Supabase credentials are not provided, the application will automatically fall back to the built-in local dataset without crashing).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Build
```bash
npm run build
```

---

## 📁 Repository Structure

```
citypop-discography/
├── .env.example              # Environment variables template with placeholders
├── .gitignore                 # Excludes .env, node_modules, dist
├── AI-USAGE.md                # Full-Stack JS & AI Badge disclosure (35% manual code)
├── SECURITY-CHECKLIST.md     # Pre-public security audit checklist
├── DOTON_DESIGN_SYSTEM.md     # Vanilla CSS design system documentation
├── README.md                  # Project overview & documentation
├── 6APSI/
│   └── student-6apsi-classcode-midterm/
│       ├── project/
│       │   ├── README.md              # Workspace Project README
│       │   ├── REPORT.md              # Project Increment Report
│       │   ├── SECURITY-CHECKLIST.md  # Security Checklist
│       │   ├── AI-USAGE.md            # AI Usage Disclosure
│       │   └── Project_Increment_Report.pdf
│       └── journal/
│           ├── WEEK1_JOURNAL.md       # Week 1 Reflection Journal
│           └── WEEK2_JOURNAL.md       # Week 2 Reflection Journal
├── src/
│   ├── components/            # Header, HeroBanner, FilterBar, AudioPlayerBar, etc.
│   ├── data/                  # Local fallback datasets (citypopData.js)
│   ├── lib/                   # Supabase client & fallback logic (supabaseClient.js)
│   ├── utils/                 # Audio preview URL resolver (audioResolver.js)
│   ├── App.jsx                # Main application & Audio Context provider
│   └── index.css              # Custom CSS design system tokens
└── supabase/
    └── schema.sql             # PostgreSQL tables, relations, and RLS policies
```

---

## 📜 License & Acknowledgments
Academic submission for course **6APSI**. Album cover art and audio preview clips belong to their respective copyright holders and are used strictly for non-commercial educational demonstration purposes.
