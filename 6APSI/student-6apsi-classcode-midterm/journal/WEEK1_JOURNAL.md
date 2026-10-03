# Reflection Journal — Week 1 (`journal/WEEK1_JOURNAL.md`)

**Course Code:** 6APSI — Final Project Submission  
**Project:** City Pop Discography & Community Vault  
**Phase:** Week 1 Progress Submission (15 Points)  
**Date:** September 16, 2026  

---

### 1. Goal for the Week
My goal for Week 1 was to establish the foundation of the **City Pop Vault** platform. Specifically:
* Design a modular React single-page application structure.
* Architect a hand-crafted CSS design system (`DESIGN_SYSTEM.md`) supporting glassmorphism aesthetics and multi-theme switching (`dark`, `white`, `sunset`).
* Implement an HTML5 audio player context supporting persistent, uninterrupted playback across modal dialogs and filter operations.

---

### 2. Strategic Early Start Advantage
Initiating development early in the preliminary cycle was the single best strategic decision made for this project. Starting early provided ample lead time to carefully plan component hierarchy, research audio preview resolution strategies, and build a modular design system without rushing or relying on pre-built UI framework templates. 

This early head-start ensured that core frontend state management (like multi-criteria filter bars and audio track switching) was rock solid before introducing backend database integrations.

---

### 3. What I Did This Week
1. **Design System & Styling:** Authored `DESIGN_SYSTEM.md` using plain Vanilla CSS variables for custom color tokens, glassmorphic panel blurs, gold accents, and fluid grid layouts.
2. **React Component Breakdown:** Built modular components (`Header`, `HeroBanner`, `FilterBar`, `AlbumGrid`, `AlbumCard`, `AlbumDetailModal`, `AudioPlayerBar`, `AddRecModal`).
3. **Audio Resolver Engine:** Created `src/utils/audioResolver.js` to dynamically fetch authentic 30-second audio preview URLs from iTunes/Apple Music APIs.
4. **State Management:** Lifted active track and playing states to `App.jsx` to prevent audio playback from resetting during state re-renders.

---

### 4. What Blocked Me & How I Solved It
* **Obstacle:** Re-rendering parent components (e.g., changing search query or vibe filter) was causing the HTML5 `<audio>` element to unmount and restart playback.
* **Resolution:** Solved by decoupling audio player state into a top-level persistent `AudioPlayerBar` component in `App.jsx`, ensuring that filter adjustments and modal toggles never unmount the active audio DOM element.

---

### 5. Key Learnings & Takeaways
* **CSS Custom Property Tokens:** Plain CSS custom properties (`var(--panel-bg)`, `var(--gold)`) provide extreme flexibility for dynamic theme switching without the overhead of utility frameworks.
* **Component Decoupling:** Lifting shared media player state prevents unwanted UI interruptions, resulting in a smooth user experience.
