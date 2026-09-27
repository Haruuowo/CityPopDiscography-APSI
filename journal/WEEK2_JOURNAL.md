# Reflection Journal — Week 2 (`journal/WEEK2_JOURNAL.md`)

**Course Code:** 6APSI — Final Project Submission  
**Project:** Doton City Pop Discography & Community Vault  
**Phase:** Week 2 Progress Submission (15 Points)  
**Date:** September 23, 2026  

---

### 1. Goal for the Week
My primary goals for Week 2 were backend cloud integration and pre-public repository security lockdown:
* Connect the React frontend to a live Supabase PostgreSQL database while maintaining a seamless local fallback layer.
* Enforce PostgreSQL Row Level Security (RLS) policies on all tables.
* Execute a complete security audit of git commit history and environment variables.
* Complete `SECURITY-CHECKLIST.md` and document manual code craftsmanship in `AI-USAGE.md`.

---

### 2. What I Did This Week
1. **Supabase Integration & Fallback Layer:** Authored `src/lib/supabaseClient.js` with `fetchAlbums()`, `fetchRecommendations()`, and `postRecommendation()`. Built dynamic detection (`isSupabaseConfigured()`) that falls back to `citypopData.js` if database environment variables are omitted or offline.
2. **PostgreSQL Relational Schema:** Designed and deployed `albums`, `tracks`, and `recommendations` tables with foreign key relations and cascade deletions in `supabase/schema.sql`.
3. **Pre-Public Security Lockdown:** Excluded `.env` in `.gitignore`, provided placeholder `.env.example`, audited git history (`git log -p`), verified Supabase Row Level Security (RLS) insert policies, and completed `SECURITY-CHECKLIST.md`.
4. **AI Badge Documentation:** Authored `AI-USAGE.md`, verifying **35% Self-Authored Code / 65% AI-Assisted Code** ratio for the Full-Stack JS and AI Badge.

---

### 3. What Blocked Me & How I Solved It
* **Obstacle 1 (PostgreSQL RLS Error `42501`):** Submitting recommendations from the React app triggered `new row violates row-level security policy`.
  * **Resolution:** Solved by executing `CREATE POLICY "Allow public insert" ON public.recommendations FOR INSERT WITH CHECK (true);` in Supabase's SQL Editor.
* **Obstacle 2 (Git Security History Check):** Ensuring no API keys or connection strings were ever committed in past commits.
  * **Resolution:** Ran `git log -p | Select-String -Pattern "password|secret|api[_-]?key|postgres://"` across full git commit history to confirm 100% clean status.

---

### 4. Key Learnings & Takeaways
* **Pre-Public Security Lockdown:** Automated scanners scan new public GitHub repositories within minutes. Checking `.env` isolation, RLS rules, and git history before going public is mandatory.
* **Resilient Data Architecture:** Building local fallback logic ensures the frontend remains fully functional even during cloud API outages.
* **Pair-Programming AI Balance:** Strategic AI assistance accelerates boilerplate generation, but core security, data fallback logic, and design system tokens require hands-on engineering craftsmanship.
