#City Pop Discography & Community Vault

[![Full-Stack JavaScript & AI Badge](https://img.shields.io/badge/Badge-Full--Stack%20JS%20%26%20AI-blueviolet)](file:///c:/Flutter%20act/citypop-discography/AI-USAGE.md)
[![Security Audit](https://img.shields.io/badge/Security-Lockdown%20100%25-success)](file:///c:/Flutter%20act/citypop-discography/SECURITY-CHECKLIST.md)
[![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-emerald)](file:///c:/Flutter%20act/citypop-discography/supabase/schema.sql)

> **Public GitHub Repository:** [Haruuowo/CityPopDiscography-APSI](https://github.com/Haruuowo/CityPopDiscography-APSI)  
> **Course Code:** 6APSI — Final Project Submission  
> **Workspace Copy:** `6APSI/student-6apsi-classcode-midterm/project/README.md`  

---

## 1. Overview

**Doton City Pop Vault** is an interactive full-stack web application created to preserve, showcase, and celebrate 1970s and 1980s Japanese City Pop, Funk, AOR, and Boogie vinyl albums. 

The application solves the problem of discovering rare Japanese vinyl music by offering a centralized, curated digital sanctuary where music enthusiasts can filter records by mood or vibe, play continuous 30-second audio previews across viewports, explore authentic high-res album covers, and request new album additions. It is built for retro music lovers, vinyl collectors, and fans of late-night Tokyo aesthetic culture.

---

## 2. Setup and Installation

Follow these steps in order to set up and run the project from scratch on your local machine:

### Step 1: Prerequisites & Tooling
Make sure you have the following installed on your operating system:
* **Node.js**: `v18.0.0` or higher (Recommended: Node `v20.x` or `v24.x`)
* **npm**: `v9.0.0` or higher (comes bundled with Node.js)
* **Git**: `v2.x` or higher

### Step 2: Clone the Repository
Open your terminal or command prompt and clone the project repository:
```bash
git clone https://github.com/Haruuowo/CityPopDiscography-APSI.git
cd CityPopDiscography-APSI
```

### Step 3: Install Project Dependencies
Install all required Node.js packages (`react`, `react-dom`, `@supabase/supabase-js`, `lucide-react`, `vite`):
```bash
npm install
```

### Step 4: Environment and Configuration
The project uses environment variables to communicate securely with Supabase. 
> ⚠️ **Security Notice:** Never commit real API keys or credentials to public git repositories. Real keys are stored in `.env`, which is strictly ignored by `.gitignore`.

1. Copy the sanitized template file `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` in your code editor and populate your environment variables:
   ```env
   # Supabase Credentials (Required for Cloud Sync; fallback active if unconfigured)
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
   *(Note: If Supabase keys are omitted or invalid, the application automatically falls back to the built-in local dataset `citypopData.js` without breaking).*

### Step 5: Database Setup and Seeding (Supabase PostgreSQL)
1. Log into your **[Supabase Console](https://supabase.com/dashboard)** and create a new project.
2. Navigate to **SQL Editor** $\rightarrow$ **New Query**.
3. Open [`supabase/schema.sql`](file:///c:/Flutter%20act/citypop-discography/supabase/schema.sql) from this repository, copy its contents, paste into the SQL Editor, and click **Run**.
4. This script automatically creates the `albums`, `tracks`, `recommendations`, and `subscribers` tables, configures foreign key relationships, enables Row Level Security (RLS), and seeds the initial 21 authentic Japanese vinyl albums.

---

## 3. How to Run It

Start the Vite local development server by executing:

```bash
npm run dev
```

### Expected Output & First Screen
When the development server starts, your terminal will display:
```
  VITE v6.4.3  ready in 1200 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open **`http://localhost:5173/`** in your browser. You should see:
- Sticky glassmorphic header navigation with theme switcher dropdown.
- Full-width hero banner with a 500px featured YouTube video player (`https://youtu.be/VtRIRJ0tBRc`), project description, and newsletter subscription box.
- *"This week's Recommendation!"* 4-column album ribbon.
- Interactive Filter Bar and live album counter badge (**Showing 21 of 21 Albums**).
- 21 authentic vinyl album cards with high-res cover art, release year, ratings, and genre tags.

---

## 4. Features and Usage

### Primary User Flow Walkthrough

1. **Multi-Theme Switching (Night, Day, Sunset)**:
   - Click the theme selector dropdown in the top-right header to switch between **Night mode** (dark glassmorphism), **Day mode** (warm light tone), and **Sunset mode** (deep orange-amber glow).

2. **Album Filtering & Instant Search**:
   - Use the search bar to search albums by title, artist name, or song titles.
   - Select an artist filter (e.g. *Anri*, *Taeko Ohnuki*, *Toshiki Kadomatsu*) or vibe tag (e.g. *Midnight Drive*, *Beach Sunset*, *Boogie*).
   - Change sorting criteria (*Highest Rating*, *Newest First*, *Oldest First*, *Alphabetical*).

3. **Persistent HTML5 Audio Player**:
   - Click **View →** on any album card or open the album detail modal.
   - Click the play button next to any track. The persistent bottom audio player bar will appear and play a 30-second audio preview.
   - Navigate across filters, switch themes, or open modals while playback continues uninterrupted in the background.

4. **Featured Video Header & Newsletter Subscription**:
   - Watch the featured City Pop YouTube stream in the header section.
   - Enter your email address in the newsletter form to receive weekly discography updates. The app validates email syntax, persists subscriptions in `localStorage`, and syncs to Supabase `subscribers`.

5. **Ask What Album To Add Next Modal (`SuggestAlbumModal`)**:
   - Click the **"Ask what album to add next"** button in the hero or header section.
   - Enter your suggested album title, artist, notes, and optional contact email. The modal submits your request and offers a direct `mailto:CityRecords@gmail.com` dispatch option.

6. **Community Recommendations**:
   - Share reviews and recommendations for your favorite albums. Submissions update the UI in real time and store to Supabase / `localStorage`.

### Database Tables & Endpoints

| Database Table / Path | Method | Purpose & Action |
| :--- | :---: | :--- |
| `albums` | `SELECT` | Fetches full album catalog ordered by rating or release year. |
| `tracks` | `SELECT` | Fetches tracklists, track numbers, highlight flags, and audio preview URLs. |
| `recommendations` | `SELECT` / `INSERT` | Fetches community listener reviews and posts new user recommendations. |
| `subscribers` | `INSERT` | Records new newsletter subscriber emails and subscription timestamps. |

---

## 5. Project Structure

```
citypop-discography/
├── .env.example              # Environment variables template with placeholders
├── .gitignore                 # Excludes .env, node_modules, dist
├── AI-USAGE.md                # Full-Stack JS & AI Badge disclosure (35% manual code)
├── SECURITY-CHECKLIST.md     # Pre-public security audit checklist (100% completed)
├── DOTON_DESIGN_SYSTEM.md     # Custom Vanilla CSS design system property tokens
├── README.md                  # Root documentation guide
├── REPORT.md                  # Project Increment Report
├── Project_Increment_Report.pdf # Formatted PDF increment report artifact
├── 6APSI/
│   └── student-6apsi-classcode-midterm/
│       ├── project/
│       │   ├── README.md              # Workspace copy of project README
│       │   ├── REPORT.md              # Workspace Project Increment Report
│       │   ├── SECURITY-CHECKLIST.md  # Workspace Security Checklist
│       │   ├── AI-USAGE.md            # Workspace AI Usage Disclosure
│       │   └── Project_Increment_Report.pdf
│       └── journal/
│           ├── WEEK1_JOURNAL.md       # Week 1 Reflection Journal
│           └── WEEK2_JOURNAL.md       # Week 2 Reflection Journal
├── src/
│   ├── components/            # Header, HeroBanner, FilterBar, AudioPlayerBar, SuggestAlbumModal, AddRecModal, etc.
│   ├── data/                  # Authentic Japanese City Pop datasets (citypopData.js)
│   ├── lib/                   # Supabase client & fallback resilience layer (supabaseClient.js)
│   ├── utils/                 # Dynamic iTunes / Apple Music audio resolver (audioResolver.js)
│   ├── App.jsx                # Main React application & Audio Context controller
│   └── index.css              # Hand-crafted CSS design system tokens
└── supabase/
    └── schema.sql             # PostgreSQL tables, relations, constraints, and RLS policies
```

---

## 6. Screenshots

### Main Application Dashboard & Video Hero Banner
![Doton City Pop Vault Main Interface](file:///c:/Flutter%20act/citypop-discography/presentation/assets/hero_banner_preview.png)

### Album Grid & Filtering Interface
![Album Grid & Filter Controls](file:///c:/Flutter%20act/citypop-discography/presentation/assets/album_grid_preview.png)

### Persistent Audio Player Bar & Track Playback
![Persistent Bottom Audio Player](file:///c:/Flutter%20act/citypop-discography/presentation/assets/audio_player_preview.png)

---

## 7. Known Issues and Next Steps

### Honest Assessment of Known Issues
1. **Audio Preview Region Availability**: 30-second audio previews rely on the Apple Music / iTunes Search API. A few rare Japanese regional master releases may occasionally experience regional playback restrictions or fallback to search lookup.
2. **Spotify Integration Limitations**: Clicking "Spotify ↗" in the audio player redirects to Spotify search (`open.spotify.com/search/...`) rather than direct embedded playback, because full Web Playback SDK streaming requires active user OAuth authentication.

### Planned Next Steps
- **User Authentication**: Add user login and profile management via Supabase Auth so users can bookmark favorite albums and build custom playlists.
- **Full Spotify Web API OAuth**: Implement full OAuth token exchange to enable full-track playback via Spotify Web Playback SDK for Premium Spotify subscribers.

---

## 8. Security Checklist Confirmation

This repository includes a fully completed [`SECURITY-CHECKLIST.md`](file:///c:/Flutter%20act/citypop-discography/SECURITY-CHECKLIST.md) in the project directory prior to public release. All 13 security items (including `.env` git isolation, clean commit history, Supabase Row Level Security policies, and parameterized queries) have been verified and documented with empirical evidence.

---

## 9. AI Usage Credit Line

> 🤖 **AI Credit Disclosure:** This project was developed following the **Full-Stack JavaScript and AI Badge** guidelines. The codebase achieves a **35% Self-Authored Code / 65% AI-Assisted Code** distribution. Core architecture, design system CSS tokens, dynamic audio resolver algorithms, Supabase fallback resilience logic, and SQL RLS policies were manually engineered. For line-by-line file references and prompt logs, see [`AI-USAGE.md`](file:///c:/Flutter%20act/citypop-discography/AI-USAGE.md).

---

## 📜 License & Acknowledgments

Academic submission for course **6APSI**. Album cover artwork and audio preview clips belong to their respective copyright holders and are used under non-commercial educational fair use guidelines.
