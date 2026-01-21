# Ikoha Community Development — Website Look & Framework

How the website **looks** (layout, blocks, structure) and the **tech framework** (stack, components).  
Use the Mermaid blocks in [Mermaid Live](https://mermaid.live) or your docs.

---

## 1. How every page looks (visual layout)

### ASCII wireframe (side view)

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (sticky, white, shadow)                                   │
│  [Logo + "Ikoha Community" | Home About Minerals Projects ...]   │
│  [Contact CTA]                                                    │
├─────────────────────────────────────────────────────────────────┤
│  CONSTRUCTION BANNER (gold / secondary)                           │
│  [🚧 Site Under Construction · Developed by ASENOGUAN · Email]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  MAIN (page content, max-w-7xl, px-4 sm:px-6 lg:px-8)            │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Hero or PageHero or Title block                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Section 1 (e.g. stats, cards, text)                         │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Section 2 …                                                 │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Optional CTA                                                │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER (gradient primary-dark → primary, white text)            │
│  [Brand | About | Resources | Contact]  [Copyright · ASENOGUAN]  │
└─────────────────────────────────────────────────────────────────┘
```

### Mermaid — page structure (blocks)

```mermaid
flowchart TB
    subgraph Page["Every page (visual order top → bottom)"]
        H[Header: Logo, Nav, Contact CTA]
        B[Construction Banner]
        M[Main content]
        F[Footer: Brand, About, Resources, Contact, Copyright]
    end

    H --> B
    B --> M
    M --> F

    subgraph MainContent["Main = one of these page types"]
        Home[Home layout]
        Inner[Inner layout e.g. About]
        Hero[PageHero layout e.g. Businesses, News, Projects]
        Form[Form layout e.g. Contact]
    end

    M --> MainContent
```

---

## 2. Page templates (how each page type looks)

### Home

```
┌─ Hero (full viewport, bg image + overlay) ─────────────────────┐
│  "Welcome to Ikoha Community"                                  │
│  Ovia South-West, Edo State, Nigeria                           │
│  [Explore Resources] [Learn More]                              │
│  scroll hint                                                    │
├─ Stats (4 cards: Agricultural, Mineral, Water, Residents) ─────┤
├─ Featured Resources (3 cards: Cocoa, Granite, Palm Oil) ───────┤
├─ Community Gallery (2–4 images) ───────────────────────────────┤
├─ Administration (Chairman, Gov, Councilor, Oba cards) ──────────┤
├─ About blurb + CTA ────────────────────────────────────────────┤
└─ Final CTA (primary bg, buttons) ──────────────────────────────┘
```

### Inner page (e.g. About)

```
┌─ Hero block (gradient primary, title, subtitle) ────────────────┐
│  "About Ikoha Community" · Ovia South-West …                    │
├─ Sections (Cards, text, images, map) ───────────────────────────┤
│  - Ikoha Administration (with #location)                        │
│  - Main + satellite communities                                 │
│  - Leadership (Chairman, Governor, Councilor, Oba)              │
│  - Map (Google) + link                                          │
└─ (optional CTA) ────────────────────────────────────────────────┘
```

### PageHero page (Businesses, News, Projects)

```
┌─ PageHero (gradient primary, icon, title, description) ─────────┐
│  [icon] Title · short description                               │
├─ Body (cards, list, or custom sections) ────────────────────────┤
└─ Optional CTA ──────────────────────────────────────────────────┘
```

### Contact

```
┌─ Title / small hero ────────────────────────────────────────────┐
├─ Contact form (name, email, subject, message, submit) ───────────┤
└─ (optional) info / map ──────────────────────────────────────────┘
```

### Mermaid — page templates

```mermaid
flowchart TD
    subgraph Home["Home"]
        H1[Hero full-screen]
        H2[Stats 4]
        H3[Featured Resources 3]
        H4[Gallery]
        H5[Administration]
        H6[About blurb]
        H7[CTA]
        H1 --> H2 --> H3 --> H4 --> H5 --> H6 --> H7
    end

    subgraph Inner["Inner e.g. About"]
        I1[Hero block]
        I2[Sections + Cards + Map]
        I1 --> I2
    end

    subgraph PageHero["PageHero e.g. Businesses, News, Projects"]
        P1[PageHero]
        P2[Body]
        P1 --> P2
    end

    subgraph Contact["Contact"]
        C1[Title]
        C2[Form]
        C1 --> C2
    end
```

---

## 3. Tech / framework stack

### Mermaid — framework layers

```mermaid
flowchart TB
    subgraph App["App layer"]
        Next[Next.js 14+ App Router]
        React[React]
        TS[TypeScript]
    end

    subgraph UI["UI / styling"]
        TW[Tailwind CSS]
        BS[Bootstrap 5 minimal]
        FM[Framer Motion]
        AOS[AOS]
    end

    subgraph Assets["Assets & fonts"]
        Lucide[Lucide React icons]
        Inter[Inter]
        Poppins[Poppins]
    end

    subgraph Host["Hosting"]
        Netlify[Netlify]
    end

    Next --> React
    Next --> TS
    Next --> TW
    Next --> BS
    Next --> FM
    Next --> AOS
    Next --> Lucide
    Next --> Inter
    Next --> Poppins
    Next --> Netlify
```

### Stack table

| Layer | Technology | Role |
|-------|------------|------|
| **Framework** | Next.js 14+ (App Router) | Routing, SSR, layout |
| **Language** | TypeScript | Typing |
| **Styling** | Tailwind CSS | Utility classes, theme (primary, secondary, accent) |
| **UI library** | Bootstrap 5 (minimal) | Grid, some components (container off) |
| **Motion** | Framer Motion | Header, cards, hero, mobile menu |
| **Scroll effects** | AOS | fade-up, fade-in on scroll |
| **Icons** | Lucide React | Nav, stats, sections |
| **Fonts** | Inter (body), Poppins (headings) | Google Fonts |
| **Deploy** | Netlify | `netlify.toml`, Next.js plugin |

---

## 4. Component building blocks

### Mermaid — components

```mermaid
flowchart LR
    subgraph Layout["Layout"]
        Header[Header]
        Banner[Banner]
        Footer[Footer]
    end

    subgraph UI["UI"]
        Card[Card]
        PageHero[PageHero]
    end

    subgraph HeaderParts["Header contains"]
        Logo[Logo + name]
        Nav[Nav: Home, About, Minerals, Projects, Businesses, News, Events, Contact]
        CTA[Contact CTA]
        Mobile[Mobile menu]
    end

    subgraph FooterParts["Footer contains"]
        Brand[Brand, logo, location]
        AboutL[About links]
        ResL[Resources links]
        ContactL[Contact links]
        Copy[Copyright, ASENOGUAN]
    end

    Header --> Logo & Nav & CTA & Mobile
    Footer --> Brand & AboutL & ResL & ContactL & Copy
```

### Component list

| Component | File | What it does |
|-----------|------|--------------|
| **Header** | `Header.tsx` | Sticky; logo, nav (8 links + icons), Contact CTA; mobile menu (Framer). |
| **Construction Banner** | `layout.tsx` | Gold bar: “Site Under Construction”, short text, ASENOGUAN, email. |
| **Footer** | `Footer.tsx` | Gradient primary; Brand, About, Resources, Contact; copyright, ASENOGUAN. |
| **Card** | `Card.tsx` | White, rounded, shadow, hover; used for stats, resources, leadership, etc. |
| **PageHero** | `PageHero.tsx` | Gradient primary, optional icon/eyebrow, title, description; used on Businesses, News, Projects. |

---

## 5. Design tokens (look & feel)

| Token | Value | Use |
|-------|--------|-----|
| **primary** | `#2D5016` | Buttons, nav active, footer, hero, links. |
| **primary-light** | `#4A7C2A` | Gradients, highlights. |
| **primary-dark** | `#1A3009` | Footer top, darker gradients. |
| **secondary** | `#D4AF37` | Construction banner, accents, CTAs. |
| **secondary-light** | `#E5C866` | Softer gold. |
| **secondary-dark** | `#B8941F` | Hover, borders. |
| **accent** | `#1E3A8A` | Government/official, some icons. |
| **max-width** | `max-w-7xl` | Main content. |
| **padding** | `px-4 sm:px-6 lg:px-8` | Page horizontal. |
| **body font** | Inter | General text. |
| **heading font** | Poppins | h1–h6. |

---

## 6. One-screen “how it looks” (Mermaid)

```mermaid
flowchart TB
    subgraph Screen["What you see on screen (top to bottom)"]
        direction TB
        A["▬▬▬ HEADER (white, sticky) ▬▬▬"]
        B["▬▬ BANNER (gold) ▬▬"]
        C["▬▬▬▬▬▬ MAIN ▬▬▬▬▬▬"]
        D["▬▬▬ FOOTER (green gradient) ▬▬▬"]
    end

    A --> B --> C --> D

    subgraph MainZoom["Main: hero / sections / cards / CTA"]
        C1[Hero or PageHero]
        C2[Sections]
        C3[Cards / lists]
        C4[CTA]
        C1 --> C2 --> C3 --> C4
    end

    C --> MainZoom
```

---

## 7. File → “look” mapping

| What you see | Comes from |
|--------------|------------|
| Header on all pages | `layout.tsx` → `Header.tsx` |
| Gold construction bar | `layout.tsx` (inline) |
| Footer on all pages | `layout.tsx` → `Footer.tsx` |
| Home hero, stats, gallery, admin | `app/page.tsx` |
| About hero, leadership, map | `app/about/page.tsx` |
| Businesses/News/Projects top block | `PageHero` in each `page.tsx` |
| Cards (stats, resources, people) | `Card.tsx` in each page |
| Colors, spacing | `tailwind.config.js`, `globals.css` |

---

*Ikoha Community Development — Website look and framework*
