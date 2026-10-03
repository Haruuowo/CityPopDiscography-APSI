# Final Project Presentation Slides (`SLIDES.md`)

**Project Name:** City Pop Discography & Community Vault  
**Course Code:** 6APSI — Final Project Presentation (100 Points)  
**Public Repository:** [Haruuowo/CityPopDiscography-APSI](https://github.com/Haruuowo/CityPopDiscography-APSI)  

---

## Slide 1: Title & Introduction
* **Header:** City Pop Vault — 🏙️ Japanese Vinyl Discography & Community Recommendations
* **Subtitle:** Full-Stack JavaScript (React, Vite, Node/Express, Supabase PostgreSQL)
* **Presenter:** Student Final Presentation (Course 6APSI)
* **Visual:** High-resolution screenshot of City Pop Vault dark mode hero banner with Mariya Takeuchi vinyl cover frame.

---

## Slide 2: The Problem & Vision
* **The Problem:** 
  * Classic 1970s and 1980s Japanese City Pop music is dispersed across fragmented forums, making album discovery difficult for new listeners.
  * Restricted streaming previews (e.g., Spotify API preview deprecation) break audio exploration on many web platforms.
* **The Solution:** 
  * A unified, high-fidelity digital discography vault that categorizes albums by mood/vibe (Midnight Drive, Beach Sunset, Retro Synth).
  * Persistent HTML5 audio player providing continuous 30-second audio previews resolved dynamically via Apple Music / iTunes APIs.
  * Real-time community recommendation submissions backed by cloud PostgreSQL database.

---

## Slide 3: Technical Stack & System Architecture
* **Frontend:** React 18, Vite, Lucide Icons, Custom CSS Custom Properties Design System (`DESIGN_SYSTEM.md`) supporting 3 color themes (`dark`, `white`, `sunset`).
* **Backend & Database:** Supabase (Cloud PostgreSQL) with `albums`, `tracks`, and `recommendations` relational schemas.
* **Resilience Layer:** `supabaseClient.js` hybrid query wrapper with automated fallback to `citypopData.js` during network offline states.
* **Audio Resolver:** Dynamic iTunes Search API lookup matching track titles to authentic `.m4a` 30-second clips.

---

## Slide 4: Security Lockdown & Pre-Public Compliance
* **Credential Isolation:** `.env` listed in `.gitignore` (un-tracked); `.env.example` shipped with non-sensitive template placeholders.
* **Git History Cleanse:** Verified zero secrets or database strings in git history (`git log -p`).
* **Database Row Level Security (RLS):** Policies enforced on all Supabase tables (`CREATE POLICY "Allow public insert"`).
* **Completed Checklist:** Completed [`SECURITY-CHECKLIST.md`](file:///c:/Flutter%20act/citypop-discography/SECURITY-CHECKLIST.md) verifying 100% security readiness.

---

## Slide 5: Challenges & Technical Debugging
* **Challenge 1 (Persistent Audio Context):** Initial state updates during search filtering caused the audio element to unmount.
  * *Fix:* Lifted audio player state to top-level `AudioPlayerBar` in `App.jsx`.
* **Challenge 2 (Supabase RLS Violation `Error 42501`):** Public form posts were blocked by PostgreSQL access rules.
  * *Fix:* Defined explicit Row Level Security insert policies in SQL schema.
* **Challenge 3 (PostgreSQL Array Type Mismatch):** Genre inputs as strings failed against `genre TEXT[]` columns.
  * *Fix:* Formatted inputs as native SQL array literals (`ARRAY['Beach Sunset', 'City Pop']`).

---

## Slide 6: Vibe Coding Ratio & AI Badge Disclosure
* **Full-Stack JS and AI Badge:** 100% compliant with badge standards.
* **Vibe Coding Breakdown:** **35% Self-Authored Code / 65% AI-Assisted Code** (Exceeds required 20% manual code threshold).
* **Self-Authored Systems:** Custom CSS tokens, audio resolver algorithms, Supabase fallback resilience layer, state lifting, and RLS security policies. (See [`AI-USAGE.md`](file:///c:/Flutter%20act/citypop-discography/AI-USAGE.md)).

---

## Slide 7: Live Demonstration Summary & Future Roadmap
* **Live Demo Flow:**
  1. Exploring discography filter bar & theme switcher (`dark` -> `sunset` -> `day`).
  2. Playing track previews continuously while switching modals.
  3. Submitting a new community recommendation to Supabase cloud.
* **Future Roadmap:**
  * Add user authentication door (Firebase / Cloudflare Zero Trust Access).
  * Expand vinyl record marketplace integration.
