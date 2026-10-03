# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

## 1. How I used AI

At least six entries. One per real use. Every entry needs a commit link.

### 2026-08-26 - Audio Player State & Dynamic iTunes Resolver

- **Tool:** Gemini / Claude
- **What I asked for:** A React audio player component and audio preview streaming logic for retro Japanese tracks.
- **What it gave back:** An audio component relying on Spotify Web API preview URLs that returned broken/empty audio streams.
- **What I kept, what I changed, and why:** Because Spotify deprecated open unauthenticated 30-second audio preview endpoints, I had to build my own solution. I engineered a custom dynamic iTunes / Apple Music Search API resolver (`src/utils/audioResolver.js`) that queries track/artist metadata on the fly and lifted the active audio state to `App.jsx` so playback persists across theme switching and modals.
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/129dbfc0124b318226c56b1aac17065f671cfdcf

### 2026-08-26 - Supabase Client & Offline Fallback Layer

- **Tool:** Gemini
- **What I asked for:** A Supabase initialization client and wrapper functions to fetch albums and tracks.
- **What it gave back:** Direct `createClient` calls that threw uncaught runtime errors when `VITE_SUPABASE_URL` was undefined.
- **What I kept, what I changed, and why:** Kept the query builder calls; added `isSupabaseConfigured()` check and automatic fallback to local datasets (`citypopData.js` / `initialAlbums.js`) so the app runs smoothly with zero downtime in demo mode.
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/6cceedb3d8799ccd129d63cc4cdf33b4c5781564

### 2026-09-09 - Discography Multi-Filter & Search Engine

- **Tool:** Claude
- **What I asked for:** React filtering logic to filter albums by artist, vibe tags, search query, and sort order.
- **What it gave back:** A basic `.filter()` function matching only album titles.
- **What I kept, what I changed, and why:** Extended it to perform deep multi-criteria filtering across track titles, artist names, vibe tags, and sorting by release year, rating, and alphabetical order.
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/b1ab0fdf817407604b86312a96900021baa02fee

### 2026-09-21 - CSS Design System & Portfolio Asset Integration

- **Tool:** Gemini
- **What I asked for:** Help modularizing CSS styles and integrating my custom background collage assets from my past HTML class and portfolio.
- **What it gave back:** Hardcoded inline style props and duplicated hex colors inside multiple JSX files.
- **What I kept, what I changed, and why:** Rejected inline styles completely. Built a clean Vanilla CSS custom property token system in `src/index.css` supporting 3 themes (Night, Day, Sunset) and wired up my handcrafted background collage assets (`public/assets/background_images`) and retro typography pairings.
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/5d3467a2f47e2a37865f4760a4b57b411a2af4d6

### 2026-09-27 - YouTube Video Hero Banner & Album Suggestion Modal

- **Tool:** Claude
- **What I asked for:** A responsive hero section with embedded YouTube player and an interactive album suggestion dialog.
- **What it gave back:** A basic iframe container and a form with plain text inputs.
- **What I kept, what I changed, and why:** Added aspect-ratio preserving responsive CSS, email validation, `mailto:` fallback dispatch, and smooth backdrop-blur modal transitions.
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/9667397a3eeac244912fc314bc57fb5c1a637700

### 2026-10-04 - Community Recommendations & Schema Synchronization

- **Tool:** Gemini
- **What I asked for:** React component to submit and render community recommendations with Supabase persistence.
- **What it gave back:** Component posting `name` and `comment` fields directly to Supabase.
- **What I kept, what I changed, and why:** Added field mapping between React state (`recommendedBy`, `comment`) and Supabase schema columns (`user_name`, `note`), plus local storage fallback caching.
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/7aee9febe5cba186c91e6020c11dd6df8c61d805

## 2. Where the AI got it wrong

Three cases. Be specific. If you write that the AI was never wrong, this section
scores zero.

### Case 1 - Suggesting Deprecated Spotify Preview APIs

- **What it gave me:** AI repeatedly generated API calls to Spotify's Web API expecting `preview_url` fields for 30-second audio playback.
- **What was wrong with it:** Spotify removed and deprecated unauthenticated 30-second track preview URLs (now requiring full OAuth 2.0 user login and Spotify Premium Web Playback SDK streaming). The AI-generated URLs were null or completely unplayable.
- **What I did instead:** I had to design and code my own audio resolution pipeline from scratch (`src/utils/audioResolver.js`). It dynamically queries the Apple Music / iTunes Search API by song and artist name to retrieve authentic 30-second `.m4a` streams, with client-side caching to prevent redundant requests.
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/129dbfc0124b318226c56b1aac17065f671cfdcf

### Case 2 - Hardcoded Inline Styles Instead of Design Tokens

- **What it gave me:** Scattered inline `style={{ ... }}` objects across 6+ React components with hardcoded hex colors and fixed pixel sizes.
- **What was wrong with it:** Broke multi-theme switching, prevented CSS reusability, made responsive breakpoints impossible to manage, and bloated component code.
- **What I did instead:** Extracted all styles into a custom CSS variable design system in `src/index.css` using semantic tokens (`--bg-primary`, `--accent-gold`, `--glass-bg`) and dynamic `data-theme` attributes, incorporating visual assets from my previous portfolio.
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/5d3467a2f47e2a37865f4760a4b57b411a2af4d6

### Case 3 - Fragile Cloud-Only Supabase Client (Crashing on Missing Keys)

- **What it gave me:** Direct `supabase.from(...).select()` calls in components that threw fatal unhandled exceptions when API keys were missing or invalid.
- **What was wrong with it:** Anyone cloning the repository or viewing on GitHub Pages without immediate Supabase configuration saw a completely broken blank screen.
- **What I did instead:** Wrote `isSupabaseConfigured()` in `src/lib/supabaseClient.js` that checks for valid credentials and seamlessly falls back to static seed data (`initialAlbums.js`) and `localStorage` without breaking the UI.
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/2076a3464ce25c6023ce7765060b4cd31705be40

## 3. Who wrote what

At least a fifth of this project is code you wrote yourself. Name it, and explain
it in your own words.

> Group projects: give each member their own heading below, and use your GitHub
> handle as the heading. You are graded on your own section.

### Written by me (Haruuowo)

- **File:** `src/utils/audioResolver.js`
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/129dbfc0124b318226c56b1aac17065f671cfdcf
- **What it does and why it is built this way:** Built entirely by hand to solve the Spotify API deprecation (Spotify no longer offers unauthenticated 30s previews). It dynamically searches the Apple Music / iTunes Search API with fallback track matching, extracts direct audio stream URLs, and maintains an in-memory resolution cache to minimize network calls.

- **File:** `src/index.css` & `DESIGN_SYSTEM.md` (with Portfolio & HTML Class Asset Reuse)
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/5d3467a2f47e2a37865f4760a4b57b411a2af4d6
- **What it does and why it is built this way:** Hand-crafted 600+ lines of Vanilla CSS implementing a custom multi-theme token system (Night, Day, Sunset), glassmorphic backdrop filters, custom scrollbars, and Japanese serif typography rules. I also brought over and adapted aesthetic collage assets (`public/assets/background_images`) and layout structures I previously developed in my personal web portfolio and earlier HTML coursework.

- **File:** `src/lib/supabaseClient.js`
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/2076a3464ce25c6023ce7765060b4cd31705be40
- **What it does and why it is built this way:** Resilient data client that dynamically switches between live Supabase PostgreSQL and local storage fallbacks, ensuring 100% application uptime in both demo and live production modes.

### The AI-written part I understand best

- **File:** `src/data/initialAlbums.js` / `citypopData.js`
- **Commit:** https://github.com/Haruuowo/CityPopDiscography-APSI/commit/bfd9274aaafd812b5f39229ad1684ab882e769c9
- **What it does and why we kept it:** Formatted JavaScript array containing metadata, tracklists, release years, audio preview links, and high-res cover art paths for 21 authentic City Pop albums. AI transformed raw unformatted tracklists into clean JavaScript objects, which I reviewed, verified for historical accuracy, and connected to the album grid and audio engine.
