# Website Redesign & Architecture Proposal
**Client / Project:** Prof. Kwan Min Lee Official Academic Website (`kwanminlee.com`)  
**Prepared by:** Manan Sethia  
**Date:** October 2026  
**Status:** Proposal & Architectural Specification (Awaiting Approval Before Implementation)

---

## 1. Executive Summary & Objectives

Prof. Kwan Min Lee has provided clear, strategic directions for the evolution of his official website ([kwanminlee.com](http://kwanminlee.com/)). This proposal outlines the architectural transformation, visual redesign, and content restructuring to satisfy all five core requirements:

1. **Strict Section Structure:** Align navigation strictly to the established sections on `kwanminlee.com` without adding arbitrary new pages.
2. **"Services" Deletion & "Labs" Consolidation:** Completely remove the legacy "Services" section. Merge "Human-AI Interaction Lab" and "Korean Studies Lab" into a unified **"Labs"** hub page, and introduce a placeholder for the newly co-directed **"Interaction Lab"**.
3. **Homepage Visual Evolution:** Move away from the monochromatic black-and-white aesthetic to a **modern, prestigious academic design** modeled after world-class university and faculty websites (Stanford, MIT, Harvard, NTU).
4. **Dedicated Lab Homepages:** Build rich, standalone homepages for both **HAIL** (`/hail/`) and the **Korean Studies Lab** (`/korean-studies-lab/`), accessible directly from the Labs hub.
5. **Non-Technical Editor Workflow & Training:** Architect the codebase so that Prof. Lee and Jimin (who have limited technical/web development backgrounds) can effortlessly add, edit, or remove publications, talks, awards, and images using **simple Markdown files**, accompanied by a structured training session.

---

## 2. Current Architecture vs. Proposed Modular Architecture

### The Problem with the Current Setup
The current site is bundled into a single monolithic `index.html` file (~217 KB, nearly 3,000 lines) with JavaScript hash-based tab switching.
- **High Risk of Breakage:** If a non-technical editor misses an opening or closing `<div>`, a quotation mark, or a CSS class name, entire pages or navigation layouts collapse.
- **Intimidating for Editors:** Locating where to add a single publication or keynote requires scrolling through thousands of lines of dense HTML code.
- **Hard to Maintain:** Dedicated styling and scripting for individual sections are mixed together.

### The Proposed Architecture: Modular Markdown with Dedicated CSS/JS
Taking inspiration from [manansethia.github.io](https://manansethia.com) (which uses clean, standalone Markdown files with simple frontmatter for each page), we propose decoupling the site into clean, isolated modules:

```
profkwanminlee.github.io/
├── _config.yml                    # Global site metadata, titles, social links
├── _data/
│   └── navigation.yml             # Clean navigation menu definition
├── _layouts/
│   ├── default.html               # Main layout wrapper (header, navbar, footer)
│   ├── home.html                  # Academic hero & homepage layout
│   ├── page.html                  # Standard content layout (CV, Awards, Press, etc.)
│   └── lab.html                   # Dedicated research laboratory layout
├── _includes/
│   ├── masthead.html              # Modern academic header & navigation bar
│   ├── footer.html                # Professional university footer
│   └── lab-card.html              # Modular lab feature card component
├── _pages/                        # Simple, easily editable Markdown files
│   ├── index.md                   # Home / Academic Biography
│   ├── appointments.md            # Appointments & Academic Leadership (/cv/)
│   ├── highly-cited.md            # Highly Cited Treatises & Top Papers (/highly-cited/)
│   ├── labs.md                    # Labs Hub Page (HAIL, KSL, Interaction Lab) (/labs/)
│   ├── deep-thought-innovation.md # Deep Thought Innovation (DTI) Framework
│   ├── awards.md                  # Awards & Fellowships (/awards/)
│   ├── patents.md                 # 10 Granted US Patents (/patents/)
│   ├── keynotes.md                # Keynote Addresses & Invited Talks (/keynotes/)
│   └── press.md                   # Op-Eds & Media Coverage (/press/)
├── labs/                          # Dedicated Lab Sub-Sites
│   ├── hail/                      # Human-AI Interaction Lab
│   │   ├── index.md               # HAIL Homepage (Pillars, People, Demos)
│   │   ├── hail.css               # Dedicated HAIL styles
│   │   └── hail.js                # Dedicated HAIL interactive script
│   ├── korean-studies-lab/        # Contemporary Korea Studies Lab
│   │   ├── index.md               # KSL Homepage (KF Chair, Projects, Events)
│   │   ├── ksl.css                # Dedicated KSL styles
│   │   └── ksl.js                 # Dedicated KSL script
│   └── interaction-lab/           # Interaction Lab (Placeholder)
│       └── index.md               # Co-directed with Prof. Xu Hong (ACDC, CoHASS)
├── assets/
│   ├── css/
│   │   ├── main.css               # Core academic design system & typography
│   │   └── pages/                 # Dedicated page-level stylesheets
│   │       ├── home.css
│   │       ├── labs.css
│   │       └── publications.css
│   └── js/
│       ├── main.js                # Mobile navigation & lightweight interactions
│       └── search.js              # Live search filter for papers / keynotes
└── images/                        # Categorized visual assets & institutional logos
```

### Why this benefits Prof. Lee and Jimin:
1. **Plain Markdown Editing:** To add an award or keynote, Jimin opens `_pages/keynotes.md` or `_pages/awards.md` directly in GitHub or any text editor and adds:
   ```markdown
   ### Keynote Speech at World AI Summit 2026
   - **Date:** November 2026
   - **Venue:** Seoul, South Korea
   - **Topic:** Physical AI & Human Trust
   ```
   No touching raw HTML, no nested `<div>`s, no syntax anxiety.
2. **Zero Build Hassle (Native GitHub Pages):** GitHub Pages automatically compiles Jekyll and Markdown natively on every push. No complicated local builds or command-line setups required for basic content updates.
3. **Decoupled CSS/JS:** Each page can have dedicated style sheets and scripts without global style collisions.

---

## 3. Strict Section Structure Alignment

Per Prof. Lee's explicit directive, we will match the section roster of [kwanminlee.com](http://kwanminlee.com/):

| kwanminlee.com Section | Proposed URL Slug | Status & Action | Description / Content Source |
| :--- | :--- | :--- | :--- |
| **Home (Biography)** | `/` (`/index.html`) | **Updated** | Modern academic hero, chair professorship identity, metrics, bio summary |
| **Appointments** | `/cv/` or `/appointments/` | **Retained** | Academic & corporate career trajectory (chronological by end date) |
| **Highly Cited** | `/highly-cited/` | **Retained** | Foundational papers (*Presence Explicated* etc.) + searchable top publications |
| **Labs** | `/labs/` | **NEW Merged** | Replaces separate links; features HAIL, KSL, and Interaction Lab |
| **Deep Thought Innovation** | `/deep-thought-innovation/` | **Retained** | DT1 (Deep Tech) vs. DT2 (Deep Thought) framework, social simulations, Hallyu |
| **Awards** | `/awards/` | **Retained** | ICA Fellow, CES Best of Innovations, Stanford fellowships, Young Scholar awards |
| **Patents** | `/patents/` | **Retained** | 10 Granted US Patents with direct Google Patents links |
| **Keynotes** | `/keynotes/` | **Retained** | Timeline of presidential, industry, and academic keynote addresses |
| **Services** | — | **DELETED** | Removed completely per the professor's explicit instruction |
| **Press** | `/press/` | **Retained** | Op-ed serialized columns (Kyunghyang Shinmun, Maeil), WSJ, BBC coverage |

> **Note on "People" and "Research":**  
> In the previous prototype, "People" and "Research" were separate top-level navigation links. On `kwanminlee.com`, lab researchers and collaborators belong under the specific Labs (HAIL and KSL), while research frameworks belong under "Deep Thought Innovation" and "Highly Cited". This consolidation streamlines the navigation bar from 9 down to **8 elegant, highly focused tabs**.

---

## 4. Homepage Redesign: Modern Academic Aesthetics

The current prototype's stark black-and-white theme will be elevated to a **distinguished, high-end academic design** that reflects an Endowed Chair Professor and former Samsung Vice President.

### A. Sophisticated Color Palette
Moving away from pure `#000000` monochrome into a tailored academic palette:
- **Canvas / Background:** 
  - *Light Mode / Default:* Pure crisp white (`#FFFFFF`) with subtle warm slate-tinted section backgrounds (`#F8FAFC`).
  - *Dark Mode (Optional Toggle):* Deep Midnight Obsidian (`#0B0F17`) with rich graphite borders (`#1E293B`).
- **Primary Scholarly Tone:** Deep Oxford Navy / Slate (`#0F172A`) for primary body text, titles, and authoritative elements.
- **Institutional Heritage Accent:** **NTU Crimson / Cardinal Red** (`#C8102E` / `#CE1126`), representing Nanyang Technological University and Stanford heritage, used selectively for active tab underlines, badges, links, and key highlights.
- **Prestige Accent:** Subdued Champagne Gold (`#B45309` / `#D97706`) for Endowed Chair badges, ICA Fellow ribbon, and patent milestones.

### B. Typography Hierarchy
- **Editorial Headings:** **Fraunces** or **EB Garamond** (serif) — used on prestigious academic websites to convey scholarly depth, intellectual weight, and timeless elegance.
- **Body & Data:** **Plus Jakarta Sans** or **Inter** (sans-serif) — crisp, highly readable, modern geometric clarity for dates, metrics, and body paragraphs.

### C. Homepage Components
1. **Scholarly Hero Header:**
   - Distinguished portrait of Prof. Lee.
   - Dual-language typography: **Kwan Min Lee** | 이관민 (李寬敏).
   - Official titles: Korea Foundation Endowed Chair Professor in Contemporary Korean Society and New Media; Director of HAIL, UX Lab, and KSL; Former VP of UX at Samsung Electronics.
   - Quick-access scholarly profiles (Google Scholar, ORCID, NTU Official Profile, LinkedIn, Email).
2. **Impact & Scholarly Metrics Ribbon:**
   - Four elevated stat callouts:
     - **~13,000+** Google Scholar Citations
     - **ICA Fellow** (Lifetime Scholarly Achievement)
     - **10 Granted** United States Patents
     - **$12M+ USD** Competitive Research Grants
3. **Core Academic Biography:**
   - Concise, beautifully formatted narrative of academic appointments (Stanford, USC, SKKU, NTU) and corporate innovation leadership (Samsung C-Lab, Smart TV).
4. **Signature Laboratories & Initiatives Spotlight:**
   - Interactive preview cards directing visitors to **HAIL**, **Korean Studies Lab**, and the **DTI Framework**.
5. **Recent Highlights Carousel / Strip:**
   - Keynote at KIA Worldwide HQ, NTU Endowed Chair Ceremony, Stanford/Elsevier Top 2% Scientist honors.

---

## 5. "Labs" Section & Dedicated Lab Homepages

### A. The Labs Hub Page (`/labs/`)
The consolidated Labs page will feature three prominent laboratory divisions:

```
+-------------------------------------------------------------------------+
|                               OUR LABS                                  |
|   Empirical behavioral science, human-AI interaction, and East Asian    |
|   technological culture across Nanyang Technological University.        |
+-------------------------------------------------------------------------+
| [CARD 1: HAIL]               | [CARD 2: KSL]                | [CARD 3]   |
| Human-AI Interaction Lab     | Contemporary Korea Studies   | Interaction|
|                              | Lab (KSL)                    | Lab        |
| Focus: Cognitive Presence,   | Focus: Hallyu Culture, East  | Focus:     |
| Trust in GenAI, Social Sim.  | Asian Media Technologies     | Psychology |
|                              |                              | & Action   |
| [Explore HAIL Lab ->]        | [Explore KSL Lab ->]         | [Coming    |
|                              |                              |  Soon]     |
+-------------------------------------------------------------------------+
```

#### Detailed Lab Profiles on the Hub:
1. **Human-AI Interaction Lab (HAIL):**
   - Direct link to the dedicated `/hail/` sub-site.
   - Quick overview of active projects: multi-agent social simulations, conversational agent UX, explainable AI trust.
2. **Contemporary Korea Studies Lab (KSL):**
   - Direct link to the dedicated `/korean-studies-lab/` sub-site.
   - Overview of the Korea Foundation Chair program, Korean Wave media technology, and international symposia.
3. **Interaction Lab (Placeholder):**
   - **Co-Directors:** Prof. Kwan Min Lee & Prof. Xu Hong (Associate Professor of Psychology).
   - **Institutional Affiliation:** Action and Cognition Development Center (ACDC), College of Humanities, Arts, and Social Sciences (CoHASS), NTU Singapore.
   - **Status Badge:** *In Development / Upcoming Initiatives*.
   - **Mission Summary:** Interdisciplinary hub bridging experimental cognitive psychology, visual perception, and interactive technology design.

---

### B. Dedicated HAIL Homepage (`/hail/`)
Modeled after the live [hail.kwanminlee.com](https://hail.kwanminlee.com/) research portal:
- **Brand Identity:** Dual logo module (NTU Singapore logo + custom HAIL mark).
- **Hero Banner:** "Human AI-Interaction Lab — Exploring the frontiers of human cognition, presence, and intelligent systems."
- **Five Core Research Focus Areas:**
  1. *Human-AI Interaction & UX:* Perceptions of AI agents, virtual influencers, and autonomous vehicles.
  2. *AI-Enhanced Research & Synthetic Societies:* Simulating large-scale populations with LLM agent societies.
  3. *Explainable AI (XAI) & Human Trust:* Calibrating algorithmic transparency and user confidence.
  4. *Immersive AI & Spatial Media:* Behavioral presence in VR, AR, and embodied robotics.
  5. *AI Ethics, Philosophy & Policy:* Human-centric governance frameworks.
- **People & Scholars:**
  - Lab Director: Prof. Kwan Min Lee.
  - Postdoctoral Fellows, Ph.D. Scholars, Research Assistants, and Alumni.
- **Publications & Demonstrations:** Direct links to HAIL conference and journal papers.
- **Join Us / Contact:** Clear instructions for prospective doctoral applicants and postdoctoral researchers.

---

### C. Dedicated Korean Studies Lab Homepage (`/korean-studies-lab/`)
A dedicated academic hub highlighting the Korea Foundation Endowed Chair initiative:
- **Brand Identity:** NTU WKWSCI + Korea Foundation Partnership banner.
- **Core Vision:** Analyzing the confluence of contemporary Korean society, new media technologies, and global cultural diffusion (Hallyu).
- **Key Initiatives:**
  - *Korean Cultural Technologies:* How K-pop, gaming, and digital platforms drive modern East Asian innovation.
  - *Symposia & Special Lectures:* APEC Forum sessions, Korea-Vietnam academic conferences, and visiting scholar masterclasses.
  - *Public Thought Leadership:* Serialized columns in major Korean press (*The Kyunghyang Shinmun*, *Maeil Business Newspaper*).
- **Collaborations & Grants:** Academic partnerships across SNU, Yonsei, SKKU, and international East Asian studies institutes.

---

## 6. Non-Technical Editor Workflow (For Prof. Lee & Jimin)

To ensure that Prof. Lee and Jimin can independently maintain the website without writing code or risking layout damage, we will establish a straightforward **Markdown Editing Standard**:

### Method A: Editing Directly on GitHub (Web Browser)
1. Open the repository on GitHub in any browser.
2. Click into `_pages/` and choose the relevant file (e.g., `keynotes.md`).
3. Click the **Pencil icon (Edit this file)**.
4. Add the new entry using intuitive Markdown:
   ```markdown
   ### Keynote at Global Media Congress 2026
   - **Date:** Dec 10, 2026
   - **Location:** Singapore
   - **Topic:** The Future of Embodied AI
   ```
5. Click **Commit changes**. GitHub Pages will automatically rebuild and publish the live page in ~30 seconds.

### Method B: Adding Images
1. Upload the image file to the `/images/` folder (e.g., `images/talk_2026.jpg`).
2. Reference it in any Markdown page:
   ```markdown
   ![Keynote Presentation](images/talk_2026.jpg)
   ```

### Method C: Adding or Reordering Navigation Tabs
- Simply edit `_data/navigation.yml`:
  ```yaml
  main:
    - title: "Appointments"
      url: /cv/
    - title: "Highly Cited"
      url: /highly-cited/
    - title: "Labs"
      url: /labs/
  ```

---

## 7. Training Session Plan (Jimin & Prof. Lee)

We will schedule a hands-on, 30–45 minute training session covering:

1. **Tour of the Site Structure (10 mins):**
   - How content files are cleanly separated from layout templates.
   - Where text, links, and images live.
2. **Hands-On Content Editing Demo (15 mins):**
   - Adding a new publication to `highly-cited.md`.
   - Adding a new invited talk to `keynotes.md`.
   - Updating bio details on the homepage.
3. **Image Uploading & Formatting (10 mins):**
   - Recommended image dimensions and compression guidelines.
   - Adding portraits or event photos.
4. **Q&A and Sandbox Exercise (10 mins):**
   - Jimin will perform a live edit in a test branch to verify comfort and confidence.
   - A 2-page printable "Cheat Sheet" PDF / Markdown guide will be provided.

---

## 8. Phased Implementation Roadmap

```
[Phase 1: Architecture Setup]
  ├── Initialize Jekyll modular structure (_pages, _includes, _layouts, _data)
  └── Establish clean navigation in _data/navigation.yml (8 core sections)

[Phase 2: Homepage Academic Redesign]
  ├── Implement prestigious academic design system (Oxford Navy, Crimson accent, Serif/Sans typography)
  ├── Build scholarly hero, metrics ribbon, and bio narrative
  └── Validate responsive behavior (desktop, tablet, mobile)

[Phase 3: Content Migration into Markdown]
  ├── Appointments (/cv/)
  ├── Highly Cited (/highly-cited/)
  ├── Deep Thought Innovation (/deep-thought-innovation/)
  ├── Awards (/awards/)
  ├── Patents (/patents/)
  ├── Keynotes (/keynotes/)
  └── Press (/press/)

[Phase 4: Labs Ecosystem Buildout]
  ├── Create Labs Hub Page (/labs/) with three distinct lab cards
  ├── Construct dedicated HAIL Homepage (/hail/)
  ├── Construct dedicated Korean Studies Lab Homepage (/korean-studies-lab/)
  └── Build Interaction Lab placeholder (Co-directed with Prof. Xu Hong)

[Phase 5: Quality Assurance & Training]
  ├── Cross-browser, accessibility, and responsive testing
  ├── Prepare printable non-technical editor handbook
  └── Conduct live training session with Prof. Lee & Jimin
```

---

## 9. Next Steps & Approvals

Please review this proposal:
1. Confirm if the **8-section navigation scheme** aligns with your expectations.
2. Confirm if the proposed **color palette (Oxford Navy + NTU/Stanford Crimson accents + warm off-white canvas)** meets the "high-quality academic website" vision.
3. Once approved, we will begin Phase 1 without disrupting any existing assets.
