# Doton Design System

A short, fixed set of decisions — **tokens** (colour, type, spacing), and the **reusable components** that use them — tailored for the **Doton City Pop Vault** platform. Every screen in the application adheres strictly to these design system guidelines.

---

## Step A: Choose your styling approach (3 min)

**My approach:** Plain CSS / CSS Custom Properties (CSS Variables) with Modular Theme Support (`dark`, `white`, `sunset`) & Glassmorphism design tokens.

---

## Step B: Colour tokens (6 min)

| Token | Role | Color Hex / Value | Notes |
| :--- | :--- | :--- | :--- |
| `--bg` | Page background | `#0A0A0F` (Dark)<br>`#D8D4CA` (White)<br>`#1E1A16` (Sunset) | Main canvas background across active theme |
| `--white` | High-contrast body text, headings | `#F4F4F4` | Primary readable text color |
| `--muted` | Subtitles, secondary descriptions | `#9D9DAE` | De-emphasized text and artist names |
| `--dim` | Neutral metadata, secondary labels | `#92929F` | Contextual information |
| `--faint` | Muted captions, subtle dividers | `#61616F` | Structure outlines & timestamps |
| `--darker` | Deep background accents, dark text | `#5C5C6C` | Footer secondary details |
| `--gold` | Links, primary buttons, active states, brand accent | `#E8D9B8` | Warm gold brand signature accent |
| `--glass` | Cards, panels, modal overlays | `rgba(255, 255, 255, 0.04)` | Translucent glassmorphism surface fill |
| `--border` | Card borders, section dividers | `rgba(255, 255, 255, 0.08)` | Subtle 1px structural separation line |
| `--bdgold` | Active border highlights, focus rings | `rgba(232, 217, 184, 0.25)` | Glowing interactive highlight color |
| `--header-bg` | Floating header backdrop | `rgba(10, 10, 15, 0.75)` | Translucent frosted navigation backdrop |

---

## Step C: Type scale (6 min)

*Font Families:* **Syne** (Headings / Display), **DM Sans** (Body Content), **JetBrains Mono** (Technical Metadata / Timestamps)

| Style | Size | Weight | Used for |
| :--- | :--- | :--- | :--- |
| **Hero Heading (H1)** | 36px – 48px | Bold (800) | Main hero banner titles and high-impact headlines (`Syne`) |
| **Section Heading (H2)** | 24px – 32px | Bold (700) | Section headers, modal titles, page section titles (`Syne`) |
| **Card Title (H3)** | 18px – 20px | SemiBold (600) | Album card titles, modal subheaders (`Syne`) |
| **Body Text** | 15px – 16px | Regular (400) | Main descriptions, track list details, review content (`DM Sans`) |
| **Small / Metadata** | 12px – 13px | Medium (500) | Year badges, track durations, genre tags, audio controls (`JetBrains Mono` / `DM Sans`) |

---

## Step D: Spacing rule (4 min)

| Rule | Value | Description |
| :--- | :--- | :--- |
| **Tight spacing** | `8px` | Gap between tags, icon-to-text spacing, compact button padding |
| **Standard spacing** | `16px` – `24px` | Card internal padding, grid gap spacing, modal container padding |
| **Section spacing** | `32px` – `48px` | Vertical spacing between Hero, Filter bar, Album grid, and Recommendations |
| **Screen edge padding** | `24px` | Outer margin container padding across phone, tablet, and desktop views |

---

## Step E: Reusable components (6 min)

| Component | Level | Appears on | Props |
| :--- | :--- | :--- | :--- |
| **Button** | Atom | Header, HeroBanner, FilterBar, Modals, Cards | `variant` (`gold`, `glass`, `ghost`), `children`, `onClick`, `disabled` |
| **Input / SearchBar** | Atom | FilterBar, AddRecModal | `value`, `placeholder`, `onChange`, `name`, `type` |
| **ThemeSelector** | Atom | Header | `theme`, `setTheme` |
| **Header / Navigation** | Molecule | All screens (Top fixed bar) | `theme`, `setTheme`, `searchQuery`, `setSearchQuery`, `dataSource` |
| **HeroBanner** | Molecule | Explore / Main screen top | `albumCount`, `onAddClick` |
| **FilterBar** | Molecule | Explore / Main screen | `searchQuery`, `setSearchQuery`, `selectedArtist`, `setSelectedArtist`, `yearRange`, `setYearRange`, `selectedVibe`, `setSelectedVibe`, `sortBy`, `setSortBy` |
| **AlbumCard** | Molecule | AlbumGrid | `album`, `onSelect`, `onPlayTrack` |
| **AlbumGrid** | Organism | Explore / Main screen | `albums`, `onSelectAlbum`, `onPlayTrack` |
| **AlbumDetailModal** | Organism | Album click modal | `album`, `onClose`, `onPlayTrack`, `currentTrack`, `isPlaying`, `onRecommendClick` |
| **AudioPlayerBar** | Organism | Fixed bottom bar during playback | `currentTrack`, `album`, `isPlaying`, `onTogglePlay`, `onNextTrack`, `onPrevTrack`, `onClose` |
| **AddRecModal** | Organism | Submit recommendation popup | `isOpen`, `onClose`, `onSubmit`, `prefilledAlbum` |
| **RecommendationCard**| Molecule | RecommendationSection | `recommendation` |

---

## Step F: Responsive plan (5 min)

### Below 480px — Phone
* Single-column grid layouts (`grid-template-columns: 1fr`)
* Stacked controls in the search & filter bar
* Full-screen or bottom-sheet modals with scrollable track lists
* Compact fixed floating audio player bar at the screen bottom
* 16px screen edge padding, strict prevention of horizontal scrolling

### 481px–768px — Tablet
* Adaptive 2-column album grid (`grid-template-columns: repeat(2, 1fr)`)
* Multi-line wrapped filter bar layout
* Contained modal popups with 24px edge padding
* Tighter component padding for optimal viewports

### Above 768px — Desktop
* Multi-column auto-fill responsive grid (`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`)
* Inline single-line horizontal filter bar with range sliders and dropdowns
* Centered glassmorphism modal dialog overlays
* Full expanded floating audio player with interactive progress & volume control

---

## Accessibility check (before you build)

- [x] **4.5:1 text contrast minimum**: `#F4F4F4` text on `#0A0A0F` background yields a 17.4:1 contrast ratio; accent gold `#E8D9B8` yields 13.5:1 contrast ratio.
- [x] **Semantic buttons/links/navigation**: Built using standard HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<button>`, `<input>`, `<select>`).
- [x] **Meaningful image alt text**: Album art and hero graphics include descriptive `alt` tags (e.g. `alt="Album Cover for City Pop Discography"`).
- [x] **Labeled form inputs**: Form inputs include associated `<label>` text or explicit `aria-label` attributes for screen readers.
- [x] **Visible keyboard focus**: All interactive elements display a visible focus outline (`outline: 2px solid var(--bdgold)`).
