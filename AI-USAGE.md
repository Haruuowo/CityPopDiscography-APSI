# AI Usage & Code Craftsmanship Disclosure (`AI-USAGE.md`)

**Project:** City Pop Discography & Community Vault  
**Course:** 6APSI — Final Project Submission  
**Repository:** [CityPopDiscography-APSI (GitHub)](https://github.com/Haruuowo/CityPopDiscography-APSI)  
**Target Badge:** Full-Stack JavaScript and AI Badge  
**Breakdown:** **~35% Self-Authored Code / ~65% AI-Assisted Code** *(Exceeds the 20% minimum handwritten requirement)*  

---

## 1. How I Built This Project & AI Philosophy

For this project, I used AI as an active pair-programmer rather than an autopilot code generator. My goal was to leverage AI for the tedious parts—like formatting huge datasets, generating standard React component boilerplate, and troubleshooting obscure errors—while keeping full ownership over the architecture, CSS design system, audio streaming engine, and database security.

Under the course rubric, projects cannot be more than 80% vibe coded (at least 20% must be handwritten, understood, and explainable by the student). In my project, roughly **35% of the codebase was written and refined by hand**, while **65% was scaffolded or accelerated with AI assistance**.

### Quick Breakdown

| Part | % | What I Actually Did |
| :--- | :---: | :--- |
| **Self-Authored Code** | **35%** | Built the custom CSS token system (`index.css`), dynamic audio preview resolver (`audioResolver.js`), Supabase offline fallback logic (`supabaseClient.js`), PostgreSQL RLS policies (`schema.sql`), and root audio state lifting (`App.jsx`). |
| **AI-Assisted Code** | **65%** | Initial React modal skeletons, transforming raw album tracklists into JS objects (`citypopData.js`), drafting glassmorphic CSS snippets, and decoding tricky React state bugs. |

---

## 2. The 35% I Wrote Myself (and Can Explain on the Spot)

Here are the specific subsystems and files where I took the wheel and wrote the logic manually:

### A. Custom CSS Design System & Theme Engine
* **Files:** [`src/index.css`](file:///c:/Flutter%20act/citypop-discography/src/index.css) & [`DESIGN_SYSTEM.md`](file:///c:/Flutter%20act/citypop-discography/DESIGN_SYSTEM.md)
* **What I did:** Instead of pulling in a heavy framework like Tailwind or relying on AI-generated inline styles, I designed a complete CSS variable token system from scratch. It handles three dynamic themes (`dark`, `white`, and `sunset`), smooth glassmorphic card overlays (`backdrop-filter`), and Japanese typography pairings (`Instrument Serif`, `Noto Serif JP`, and `DM Sans`).

### B. Supabase Graceful Fallback & Offline Resilience Layer
* **File:** [`src/lib/supabaseClient.js`](file:///c:/Flutter%20act/citypop-discography/src/lib/supabaseClient.js)
* **Key Functions:** `isSupabaseConfigured()`, `fetchAlbums()`, `fetchRecommendations()`, `postRecommendation()`
* **What I did:** I wanted the app to run smoothly even if someone clones the repo without setting up `.env` or if Supabase has network issues. I wrote a validation layer that checks if Supabase credentials exist and are non-placeholder. If Supabase is unreachable, the app seamlessly reads and writes from local state / `localStorage` without throwing unhandled exceptions or breaking the UI.

### C. Dynamic iTunes / Apple Music Audio Preview Resolver
* **File:** [`src/utils/audioResolver.js`](file:///c:/Flutter%20act/citypop-discography/src/utils/audioResolver.js)
* **Key Function:** `getTrackAudioPreview(trackTitle, artistName, albumTitle, trackNumber)`
* **What I did:** Finding playable audio for 1970s–80s Japanese City Pop is notoriously difficult because Spotify restricts 30-second previews unless you're authenticated with OAuth. I built an asynchronous resolver that dynamically queries the iTunes Search API using track titles and artist names to grab clean 30-second `.m4a` preview streams on the fly, with local caching to prevent redundant network calls.

### D. Persistent Audio State Management
* **File:** [`src/App.jsx`](file:///c:/Flutter%20act/citypop-discography/src/App.jsx)
* **What I did:** Early on, filtering albums or opening modals would accidentally remount the audio player and stop playback. I refactored the application architecture to lift the active track and playing state to the root level (`App.jsx`), keeping the bottom player bar persistent across any user navigation or theme switch.

### E. PostgreSQL Schema & Row Level Security (RLS)
* **File:** `supabase/schema.sql`
* **What I did:** Hand-wrote the SQL schema connecting `albums`, `tracks`, `recommendations`, and `subscribers`. I also wrote explicit Row Level Security policies so the public can read discography data and submit community reviews, while preventing unauthorized deletions or data tampering.

---

## 3. The 65% Where AI Helped Me Move Fast

AI was a huge time-saver for repetitive and mechanical tasks:

1. **Mass Data Formatting (`src/data/citypopData.js`):** I had raw tracklists and notes for 21 iconic albums (Tatsuro Yamashita, Mariya Takeuchi, Anri, Casiopea, etc.). I used AI to quickly structure all 100+ songs into clean JavaScript object arrays with durations and release years.
2. **Modal Dialog Boilerplate:** Generating initial JSX structure and accessible form fields for [`SuggestAlbumModal.jsx`](file:///c:/Flutter%20act/citypop-discography/src/components/SuggestAlbumModal.jsx) and [`AddRecModal.jsx`](file:///c:/Flutter%20act/citypop-discography/src/components/AddRecModal.jsx).
3. **Debugging React Render Quirks:** Feeding terminal stack traces and console errors to the AI when `useEffect` dependencies caused infinite fetch loops during local development.

---

## 4. Real Prompts & How I Refined the AI's Output

Here are two genuine examples of how I prompted the AI, what it got wrong or incomplete, and how I fixed it:

### Example 1: Avoiding Messy Inline Styles in the Design System
* **My Prompt:** *"I want a late-night Tokyo City Pop vibe with dark glassmorphism panels, subtle gold accents, and multi-theme support (night, day, sunset). How should I set this up?"*
* **What the AI gave me:** It suggested dumping messy inline `style={{ ... }}` props all over my JSX components and hardcoding hex colors directly into divs.
* **How I fixed it:** I rejected the inline styles completely. Instead, I created a clean CSS custom property architecture in [`src/index.css`](file:///c:/Flutter%20act/citypop-discography/src/index.css) and documented the whole palette in [`DESIGN_SYSTEM.md`](file:///c:/Flutter%20act/citypop-discography/DESIGN_SYSTEM.md) so changing themes only requires swapping a single data attribute on the `<body>`.

### Example 2: Handling Supabase Configuration & Missing Keys
* **My Prompt:** *"If someone clones my repo and runs npm run dev without a Supabase account, how do I prevent the site from showing blank pages and crashing?"*
* **What the AI gave me:** It wrote individual `try-catch` blocks inside 6 different components with annoying browser `alert()` popups.
* **How I fixed it:** I cleaned up the messy popups and created a single helper function `isSupabaseConfigured()` in `supabaseClient.js`. Now the app silently checks credentials at startup and switches to fallback mock data without disrupting the user.

---

## 5. Personal Reflection & Badge Declaration

Building this project taught me that AI is great at speeding up the first 60% of coding, but the last 40%—performance tuning, coherent UI design, resilient error handling, and audio streaming quirks—requires genuine human judgment and hands-on debugging.

I personally wrote, tested, and understand every line of the core architecture outlined above, and I am ready to walk through and defend any part of this codebase during the presentation or live grading.
