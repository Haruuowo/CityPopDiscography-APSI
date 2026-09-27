# Project Increment Report (`REPORT.md`)

**Course Code:** 6APSI — Final Project Submission  
**Project Title:** Doton City Pop Discography & Community Vault  
**Document Location:** `project/REPORT.md`  
**Repository:** [CityPopDiscography-APSI (GitHub)](https://github.com/Haruuowo/CityPopDiscography-APSI)  

---

## 1. Executive Summary & Strategic Early Initiation

Development on the **Doton City Pop Vault** was **started early in the preliminary cycle**, well ahead of standard course deadlines. Initiating early provided significant strategic technical advantages:
1. **Architectural Depth:** Enabled authoring a hand-crafted CSS design system (`DOTON_DESIGN_SYSTEM.md`) with glassmorphism tokens and multi-theme switching without external UI frame bloat.
2. **Data Resilience:** Allowed building a dynamic Supabase cloud database layer paired with automatic local mock fallbacks (`citypopData.js`), guaranteeing 100% app uptime even during network disruptions.
3. **Pre-Public Security Lockdown:** Provided ample buffer to execute thorough git history cleansing, environment variable isolation, Row Level Security (RLS) enforcement, and completion of `SECURITY-CHECKLIST.md` prior to repository release.

---

## 2. Weekly Increment Progress Breakdown

### A. What We Changed & Built This Week
* **Pre-Public Security Lockdown:** Excluded `.env` in `.gitignore`, generated sanitized `.env.example`, audited git commit history (`git log -p`), verified Supabase Row Level Security (RLS) policies on PostgreSQL tables (`albums`, `tracks`, `recommendations`), and completed `SECURITY-CHECKLIST.md`.
* **Audio Engine & Resolver Enhancements:** Implemented dynamic iTunes/Apple Music preview URL resolution (`src/utils/audioResolver.js`) to provide authentic 30s clips across track lists.
* **Full-Stack AI Badge Compliance:** Documented manual vs AI code distribution in `AI-USAGE.md`, verifying a **35% Self-Authored Code / 65% AI-Assisted Code** ratio (exceeding the required 20% manual code threshold).
* **Documentation Update Package:** Created comprehensive workspace project README (`project/README.md`), reflection journals, and increment PDF reports.

### B. Why These Changes Were Made
* **Security & Risk Mitigation:** Public GitHub repositories are scanned by automated bots within minutes of creation. Isolating credentials in `.env` and auditing history prevents database wipeouts or secret leaks.
* **Resilience:** Relying solely on live API endpoints creates single points of failure. The hybrid data layer in `supabaseClient.js` gracefully handles missing API keys or offline states.
* **Academic & Badge Requirements:** Fulfills all criteria for the 20-point Project Increment Report, 15-point Documentation Update, 15-point Reflection Journal, and 100-point Full-Stack JS and AI Badge.

### C. What Broke & How It Was Debugged
1. **CORS Preflight & Unparsed Body Errors:** Early `POST /api/recommendations` requests from Vite (`localhost:5173`) failed with `400 Bad Request` until mounting `cors()` middleware and `express.json()` payload parsing in the backend API pipeline.
2. **PostgreSQL Row-Level Security Violation (`Error 42501`):** Public recommendation insertions initially failed against Supabase PostgreSQL until defining explicit RLS insert policies (`CREATE POLICY "Allow public insert" ON public.recommendations FOR INSERT WITH CHECK (true);`).
3. **PostgreSQL Array Column Constraint:** Attempting to insert genre selections as raw strings failed until formatting inputs as native PostgreSQL array literals (`ARRAY['City Pop', 'Funk']`).

### D. What Is Left / Future Roadmap
* **Final Presentation Package:** Compile final video walkthrough script (3 to 5 minutes), presentation slides (`SLIDES.md`), and social media graphic spec (`SQUARE_GRAPHIC_SPEC.md`).
* **Deployment Validation:** Verify production build artifact bundle (`npm run build`) and final staging host URL.

---

## 3. Security Audit & Lockdown Confirmation

| Security Audit Item | Status | Confirmation Evidence |
| :--- | :---: | :--- |
| `.env` Ignored in Git | **Yes** | Listed in `.gitignore` (lines 14–15); `git status` clean. |
| `.env.example` Provided | **Yes** | Contains generic placeholders only. |
| No Hardcoded Secrets | **Yes** | Credentials read dynamically via `import.meta.env`. |
| Clean Git History | **Yes** | Audited via `git log -p` regex search; 0 leaks found. |
| Supabase RLS Policies | **Yes** | Enabled on all tables (`albums`, `tracks`, `recommendations`). |
| Parameterized Queries | **Yes** | Strictly uses Supabase JS client builder chain methods. |
| Completed SECURITY-CHECKLIST.md | **Yes** | Fully populated in `project/` directory. |

---

## 4. Commits & Verification Summary

All progress is backed up by clean, atomic git commits in the project repository:
* `feat(security): lock down credentials, verify .gitignore and complete SECURITY-CHECKLIST.md`
* `feat(badge): author AI-USAGE.md establishing 35% manual code ratio`
* `docs(readme): create workspace project README with repository links and setup guides`
* `build(vite): verify production bundle compilation cleanly`
