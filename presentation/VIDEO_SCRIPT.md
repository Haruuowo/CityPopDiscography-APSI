# Final Project Video Demonstration Script (`VIDEO_SCRIPT.md`)

**Course Code:** 6APSI — Final Project Presentation  
**Target Duration:** 3 to 5 Minutes  
**Format Requirements:** Public Google Drive Link · Face & Voice On-Camera Walkthrough  

---

## 🕒 Video Walkthrough Timeline & Script Outline

### 0:00 – 0:45 | Introduction & Problem Statement
* **Visual:** On-camera greeting (Presenter face visible in camera inset / main window), switching to screen share of City Pop Vault web app.
* **Script:**  
  *"Hello! Welcome to the final project presentation for City Pop Vault, developed for course 6APSI. Japanese 1970s and 80s City Pop has seen a massive global resurgence, but finding structured album discographies with working audio previews and community recommendations is difficult. I built City Pop Vault as a full-stack React and PostgreSQL platform to solve this problem."*

---

### 0:45 – 2:00 | Live App Walkthrough & Core Features
* **Visual:** Interacting with live app at `localhost:5173`.
* **Actions:**
  1. **Multi-Theme Switcher:** Toggle theme dropdown from `Night mode` (dark glassmorphism) to `Sunset mode` and `Day mode`. Show how CSS custom properties dynamically update colors and hero background images without page reload.
  2. **Filter & Search Bar:** Type *"Tatsuro Yamashita"* or *"Miki Matsubara"*, filter by Vibe (*"Midnight Drive"*), and sort by rating.
  3. **Continuous Audio Player:** Click **Play** on a track (e.g. *Plastic Love* or *Stay By Me*). Show the audio player bar sliding up at the bottom. Open an album detail modal while music keeps playing smoothly in the background.
  4. **Community Recommendation Form:** Open **Submit Recommendation**, fill in album details, and click submit. Show the new recommendation card immediately appearing in the feed.

---

### 2:00 – 3:30 | Code Walkthrough & Self-Authored Systems (AI Badge)
* **Visual:** VS Code screen share highlighting key code files.
* **Script & Code Points:**  
  *"Next, let's look at the codebase. Per the Full-Stack JS and AI Badge requirements, at least 20% of the codebase must be self-authored code that I can explain. My project is 35% manually engineered code."*
  * **Design System (`src/index.css`):** *"I hand-coded our CSS token system supporting three dynamic color themes and glassmorphism panels without external frameworks like Tailwind."*
  * **Resilient Data Layer (`src/lib/supabaseClient.js`):** *"I authored `supabaseClient.js` to query Supabase cloud PostgreSQL. Notice `isSupabaseConfigured()`—if API keys are missing or offline, the app seamlessly falls back to our local dataset without crashing."*
  * **Audio Resolver (`src/utils/audioResolver.js`):** *"I engineered a custom iTunes API search resolver that fetches authentic 30-second audio previews dynamically."*

---

### 3:30 – 4:30 | Security Lockdown & Conclusion
* **Visual:** Open `SECURITY-CHECKLIST.md` and `.env.example` in VS Code.
* **Script:**  
  *"Finally, before making our GitHub repository public, I executed a full pre-public security audit. `.env` is listed in `.gitignore`, `.env.example` contains placeholders only, git history is clean of secrets, and Supabase Row Level Security (RLS) policies are active on all tables. Thank you!"*
