# Midterm Reflection Journal: Full-Stack Web Development

**Document:** 4 of 4 (Midterm Retrospective)  
**Course Code:** 6APSI  
**Project:** Doton City Pop Discography & Community Vault  
**Date:** September 20, 2026  

---

### 1. Frontend Architecture & Prelim Continuity
> **Note:** As I previously submitted a Prelim Reflection Journal covering early JavaScript and React UI foundations, this journal focuses predominantly on backend architecture, Node/Express REST APIs, and PostgreSQL/Supabase integration.

Building the **Doton City Pop Vault** platform required translating core JavaScript concepts and React component architecture into a production-grade full-stack web application. Establishing a modular design system (`DOTON_DESIGN_SYSTEM.md`) using plain CSS custom properties enabled seamless visual consistency and multi-theme switching (`dark`, `white`, `sunset`) across all viewports. The primary frontend challenge involved managing synchronized state across multi-criteria filter bars while maintaining persistent HTML5 audio preview playback across modal dialogs without triggering unwanted component re-renders.

---

### 2. Backend Architecture: Node, Express, & REST APIs
Transitioning to backend development introduced fundamental concepts in server lifecycle management, HTTP protocol specifications, and RESTful API contracts. My most instructive technical hurdle occurred when integrating the React recommendation submission form with our Node/Express REST backend server.

During preliminary backend testing, my `POST /api/recommendations` endpoint executed flawlessly in Postman, returning a `201 Created` HTTP status code and returning the inserted payload. However, submitting identical data from the React frontend form resulted in a silent `400 Bad Request` failure and null database entries. Investigating this disparity revealed two core integration breakdowns:

1. **Missing Request Headers:** The React `fetch()` request omitted `'Content-Type': 'application/json'`, causing the payload to transmit as an unparsed body stream.
2. **Middleware Pipeline Ordering:** The Express application lacked `app.use(express.json())` prior to mounting API route handlers, leaving `req.body` undefined.
3. **CORS Policy Preflight:** Asynchronous `fetch()` requests from the Vite development server (`localhost:5173`) to the Express backend (`localhost:3000`) were blocked by browser preflight rules until mounting the `cors` middleware with explicit origin parameters.

Resolving these failures reinforced the absolute necessity of explicit request header verification, middleware pipeline ordering, and cross-origin resource sharing (CORS) setup when coupling decoupled client and server environments.

---

### 3. Database Design & Supabase Troubleshooting: Manual Data Workflows
Transitioning from flat client-side JSON files to PostgreSQL transformed my understanding of relational data modeling, schema integrity, and database security. In `schema.sql`, I architected a relational database schema comprising `albums`, `tracks`, and `recommendations` tables.

During implementation, I encountered significant integration obstacles connecting automated REST API endpoints directly with Supabase's live client environment due to asynchronous initialization timeouts and environment variable configuration mismatches (`VITE_SUPABASE_URL`). To overcome this without stalling project progress, I adopted a hands-on manual workflow while still using Supabase as our core PostgreSQL database:

* **Manual Schema & Data Seeding:** I manually executed the SQL schema migrations directly inside Supabase's SQL editor, establishing primary-foreign key relationships (`tracks.album_id` referencing `albums.id` with `ON DELETE CASCADE`). I then manually populated and verified seed datasets for 15+ City Pop albums and track lists inside Supabase's table editor.
* **Hybrid Data Layer:** Rather than relying blindly on automated client sync, I wrote explicit Supabase JS queries (`supabase.from('albums').select('*, tracks(*)')`) paired with local state fallbacks (`CITY_POP_ALBUMS`) to ensure zero app downtime during API network disruptions.

Additionally, handling PostgreSQL data types revealed key constraints: inserting genre selections as comma-separated strings (e.g., `"Beach Sunset, City Pop"`) failed against PostgreSQL's strict `genre TEXT[]` array column until I formatted inputs as native array structures (`ARRAY['Beach Sunset', 'City Pop']`). Furthermore, initial public insert attempts triggered PostgreSQL error `42501: new row violates row-level security policy`, which I resolved by defining explicit Row Level Security policies (`CREATE POLICY "Allow public insert" ON public.recommendations FOR INSERT WITH CHECK (true);`).

---

### 4. Honest AI Utilization & Code Craftsmanship Breakdown
Rather than relying on unguided "vibe coding" where AI generates unchecked output, I used AI strictly as a pair-programming multiplier. My codebase reflects a **70% Manual Craftsmanship / 30% AI Assistance** distribution:

* **Manual Engineering (70%):** Hand-crafted the modular CSS design system (`DOTON_DESIGN_SYSTEM.md`), React audio player context & state lifting, multi-criteria filter algorithms, manual Supabase SQL schema migrations, RLS security rules, Express middleware stack, and cross-origin fetch headers.
* **AI Pair-Programming (30%):** Accelerated generation of repetitive CSS glassmorphism custom property templates, drafted raw SQL seed scripts for 15+ classic City Pop albums with authentic iTunes audio preview links, and parsed complex async `useEffect` stack traces.

AI assistance had clear pitfalls that required manual intervention. AI initially recommended an overly complex Redux state tree for managing floating audio playback, which introduced redundant boilerplate; refactoring to a lightweight React Context provider proved far more maintainable. AI also suggested raw SQL query strings that bypassed Supabase's JS method chaining (`.from('albums').select('*, tracks(*)')`). While AI accelerated routine syntax generation, resolving CORS preflight errors, PostgreSQL array constraints, and manual Supabase data workflows required hands-on, methodical debugging.

---

### 5. Live Demonstration & Video Submission Package
The project walk-through and live feature demonstration (covering audio preview playback, filter bar operations, dynamic theme switching, manual Supabase table verification, and recommendation submission into PostgreSQL) is documented in the video submission link included with this project submission package.
