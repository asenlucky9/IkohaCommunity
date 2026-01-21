# Ikoha Community Development — Full Website in Mermaid

Complete Mermaid diagrams to **create** or **document** the full website.  
Use in [Mermaid Live](https://mermaid.live). For very large diagrams, paste one block at a time.

---

## 1. Full website — layout + all pages (overview)

```mermaid
flowchart TB
    subgraph Layout["Every page (layout.tsx)"]
        H[Header]
        B[Banner]
        M[Main]
        F[Footer]
        H --> B --> M --> F
    end

    subgraph Header["Header"]
        H1[Logo + Ikoha Community]
        H2[Nav: Home About Minerals Projects Businesses News Events Contact]
        H3[Contact CTA]
        H4[Mobile menu]
    end

    subgraph Banner["Construction Banner"]
        B1[Site Under Construction]
        B2[ASENOGUAN NIG LTD · Email]
    end

    subgraph Footer["Footer"]
        F1[Brand, logo, Ovia South-West]
        F2[About · Resources · Contact links]
        F3[Copyright · ASENOGUAN]
    end

    subgraph Pages["Main = page content by route"]
        P0[/]
        P1[/about]
        P2[/minerals]
        P3[/projects]
        P4[/businesses]
        P5[/news]
        P6[/events]
        P7[/contact]
        E[error / not-found / loading]
    end

    H --> Header
    B --> Banner
    M --> Pages
    F --> Footer
```

---

## 2. Home page (/) — full structure

```mermaid
flowchart TB
    subgraph Home["/ — Home"]
        H1[Hero full-screen]
        H2[Stats]
        H3[Featured Resources]
        H4[Gallery]
        H5[Administration]
        H6[About blurb]
        H7[CTA]
        H1 --> H2 --> H3 --> H4 --> H5 --> H6 --> H7
    end

    subgraph Hero["Hero"]
        h1a[Bg image + overlay]
        h1b[Welcome to Ikoha Community]
        h1c[Ovia South-West, Edo State, Nigeria]
        h1d[Explore Resources · Learn More]
        h1e[Scroll hint]
    end

    subgraph Stats["Stats — 4 Cards"]
        s1[Agricultural 6+]
        s2[Mineral 1+]
        s3[Water 1+]
        s4[Residents 500+]
    end

    subgraph Feat["Featured Resources — 3 Cards"]
        f1[Cocoa Farms]
        f2[Granite Stone]
        f3[Palm Oil]
        f4[View All Resources]
    end

    subgraph Gallery["Gallery — 4 images"]
        g1[Community Gathering]
        g2[Community Life]
        g3[Community Spirit]
        g4[Life in Ikoha]
    end

    subgraph Admin["Administration"]
        a1[Location Card: Ikoha, LGA, Ward, State, Country, Region]
    end

    subgraph About["About blurb"]
        ab1[About Ikoha text]
        ab2[Quick Facts: Location, Population, Festival]
        ab3[Learn More · Contact Us]
    end

    subgraph CTA["CTA"]
        c1[Invest in Ikoha's Future]
        c2[Contact Us · View Opportunities]
    end

    H1 --> Hero
    H2 --> Stats
    H3 --> Feat
    H4 --> Gallery
    H5 --> Admin
    H6 --> About
    H7 --> CTA
```

---

## 3. About page (/about) — full structure

```mermaid
flowchart TB
    subgraph About["/about"]
        A1[Hero]
        A2[Administration #location]
        A3[Government]
        A4[Traditional Authority]
        A5[Communities]
        A6[Overview]
        A7[CTA cards]
        A1 --> A2 --> A3 --> A4 --> A5 --> A6 --> A7
    end

    subgraph Hero["Hero"]
        ah[About Ikoha Community]
        ah2[Ovia South-West, Edo State, West Africa]
    end

    subgraph Admin["Administration Card #location"]
        ad1[Location: Ikoha, LGA, Ward, State, Country, Region]
        ad2[Google Map iframe]
        ad3[Open in Google Maps link]
    end

    subgraph Gov["Government & Political Representation Card"]
        g1[Governor]
        g2[Chairman]
        g3[Councilor]
    end

    subgraph Trad["Traditional Authority Card"]
        t1[Oba of Benin]
    end

    subgraph Comm["Communities & Settlements"]
        c1[Main: Ikoha Central]
        c2[Satellite: Three Brothers, Adebayo, others]
    end

    subgraph Over["Community Overview Card"]
        o1[Main + satellite summary]
    end

    subgraph CTA["3 CTA Cards"]
        ct1[About Us]
        ct2[Mineral Resources]
        ct3[Contact]
    end

    A1 --> Hero
    A2 --> Admin
    A3 --> Gov
    A4 --> Trad
    A5 --> Comm
    A6 --> Over
    A7 --> CTA
```

---

## 4. Minerals page (/minerals) — full structure

```mermaid
flowchart TB
    subgraph Minerals["/minerals"]
        M1[Hero]
        M2[Intro 3 Cards]
        M3[Agricultural]
        M4[Solid Mineral]
        M5[Water]
        M6[Investment]
        M7[CTA]
        M1 --> M2 --> M3 --> M4 --> M5 --> M6 --> M7
    end

    subgraph Hero["Hero"]
        mh[Minerals & Natural Resources]
        mh2[Ovia South-West, Edo State]
    end

    subgraph Intro["Intro — 3 Cards"]
        i1[Agricultural]
        i2[Solid Mineral]
        i3[Water]
    end

    subgraph Ag["Agricultural — 6 Cards"]
        a1[Cocoa]
        a2[Plantain]
        a3[Palm]
        a4[Coconut]
        a5[Pineapple]
        a6[Timber]
    end

    subgraph Solid["Solid Mineral — 1 Card"]
        s1[Granite Stone]
    end

    subgraph Water["Water — 1 Card"]
        w1[Natural River]
    end

    subgraph Inv["Investment Card"]
        inv[Opportunities · CTA]
    end

    M1 --> Hero
    M2 --> Intro
    M3 --> Ag
    M4 --> Solid
    M5 --> Water
    M6 --> Inv
```

---

## 5. Projects, Businesses, News, Events, Contact — structure

```mermaid
flowchart TB
    subgraph Projects["/projects"]
        P1[PageHero: Community Development Projects]
        P2[Card: Project Dashboard]
        P3[Card: Submit a Project Idea]
        P1 --> P2
        P1 --> P3
    end

    subgraph Businesses["/businesses"]
        B1[PageHero: Local Business Directory]
        B2[Card: Directory]
        B3[Card: Promote Your Business]
        B4[Card: Investment & Partnerships]
        B1 --> B2 & B3 & B4
    end

    subgraph News["/news"]
        N1[PageHero: News]
        N2[Card: Latest News]
        N3[Card: Community Announcements]
        N1 --> N2 & N3
    end

    subgraph Events["/events"]
        E1[Page header: Events & Festivals]
        E2[Card: Ikoha Annual Festival — details]
        E3[Upcoming Events — Card list]
        E4[CTA: Join Us, Contact · View News]
        E1 --> E2 --> E3 --> E4
    end

    subgraph Contact["/contact"]
        C1[PageHero: Contact + MapPin, Phone meta]
        C2[Form: name, email, phone, subject, message, submit]
        C3[Contact info card]
        C1 --> C2 --> C3
    end
```

---

## 6. All routes + sections (flat)

```mermaid
flowchart LR
    subgraph Routes["Routes"]
        R0["/"]
        R1["/about"]
        R2["/minerals"]
        R3["/projects"]
        R4["/businesses"]
        R5["/news"]
        R6["/events"]
        R7["/contact"]
    end

    subgraph HomeSec["/ sections"]
        S01[Hero]
        S02[Stats]
        S03[Featured Resources]
        S04[Gallery]
        S05[Administration]
        S06[About]
        S07[CTA]
    end

    subgraph AboutSec["/about sections"]
        S11[Hero]
        S12[Admin #location+Map]
        S13[Government]
        S14[Traditional]
        S15[Communities]
        S16[Overview]
        S17[CTA cards]
    end

    subgraph MinSec["/minerals sections"]
        S21[Hero]
        S22[Intro 3]
        S23[Agricultural 6]
        S24[Solid 1]
        S25[Water 1]
        S26[Investment]
        S27[CTA]
    end

    R0 --> HomeSec
    R1 --> AboutSec
    R2 --> MinSec
    R3 --> P[PageHero+2 cards]
    R4 --> B[PageHero+3 cards]
    R5 --> N[PageHero+2 cards]
    R6 --> E[Header+Festival+Upcoming+CTA]
    R7 --> C[PageHero+Form+info]
```

---

## 7. Full website — one big diagram (layout + pages + components)

```mermaid
flowchart TB
    subgraph LAYOUT["LAYOUT — all pages"]
        direction TB
        HEAD[Header: Logo, Nav, Contact CTA, Mobile]
        BAN[Construction Banner: Under construction, ASENOGUAN, email]
        MAIN[Main]
        FOOT[Footer: Brand, About, Resources, Contact, Copyright]
        HEAD --> BAN --> MAIN --> FOOT
    end

    subgraph MAIN_PAGES["MAIN CONTENT by route"]
        direction TB

        subgraph HOME["/ — Home"]
            H1[Hero] --> H2[Stats 4] --> H3[Featured 3] --> H4[Gallery 4] --> H5[Admin] --> H6[About] --> H7[CTA]
        end

        subgraph ABOUT["/about"]
            A1[Hero] --> A2[Admin+Map] --> A3[Gov] --> A4[Oba] --> A5[Communities] --> A6[Overview] --> A7[CTA 3]
        end

        subgraph MIN["/minerals"]
            M1[Hero] --> M2[Intro 3] --> M3[Agri 6] --> M4[Solid 1] --> M5[Water 1] --> M6[Invest] --> M7[CTA]
        end

        subgraph OTH["/projects, /businesses, /news"]
            O1[PageHero] --> O2[Cards 2–3]
        end

        subgraph EV["/events"]
            E1[Header] --> E2[Festival Card] --> E3[Upcoming] --> E4[CTA]
        end

        subgraph CONT["/contact"]
            C1[PageHero] --> C2[Form] --> C3[Info]
        end
    end

    subgraph COMP["Components"]
        Header[Header.tsx]
        Banner[layout]
        Footer[Footer.tsx]
        Card[Card.tsx]
        PageHero[PageHero.tsx]
    end

    MAIN --> MAIN_PAGES
    HOME --> Card
    ABOUT --> Card
    MIN --> Card
    EV --> Card
    OTH --> PageHero
    CONT --> PageHero
    LAYOUT --> COMP
```

---

## 8. File → page → sections (create map)

```mermaid
flowchart LR
    subgraph Files["Files"]
        L[layout.tsx]
        P0[page.tsx]
        PA[about/page]
        PM[minerals/page]
        PP[projects/page]
        PB[businesses/page]
        PN[news/page]
        PE[events/page]
        PC[contact/page]
    end

    subgraph Layout["Layout"]
        H[Header]
        B[Banner]
        M[main]
        F[Footer]
    end

    subgraph Home["/"]
        H1[Hero] 
        H2[Stats]
        H3[Feat]
        H4[Gallery]
        H5[Admin]
        H6[About]
        H7[CTA]
    end

    subgraph About["/about"]
        A1[Hero]
        A2[Admin+Map]
        A3[Gov]
        A4[Oba]
        A5[Comm]
        A6[Over]
        A7[CTA]
    end

    L --> Layout
    P0 --> Home
    PA --> About
    PM --> M[Agric+Solid+Water+Invest+CTA]
    PP --> P[PageHero+2]
    PB --> B[PageHero+3]
    PN --> N[PageHero+2]
    PE --> E[Fest+Upcoming+CTA]
    PC --> C[PageHero+Form]
```

---

## 9. Navigation flow (user clicks)

```mermaid
flowchart TD
    Start([User])
    Start --> Header
    Header --> H[/]
    Header --> A[/about]
    Header --> Mi[/minerals]
    Header --> Pr[/projects]
    Header --> B[/businesses]
    Header --> N[/news]
    Header --> E[/events]
    Header --> C[/contact]
    Header --> ContactBtn[/contact]

    H -->|Explore Resources| Mi
    H -->|Learn More| A
    H -->|View All Resources| Mi
    H -->|Learn More About Us| A
    H -->|Contact Us| C
    H -->|View Opportunities| Mi

    A -->|Contact, Minerals, About links| C
    A -->|#location| A

    Mi -->|Links| C

    E -->|Contact Us| C
    E -->|View News| N

    C -->|Submit| FormSent[Form submitted]
```

---

## 10. Component → where used

```mermaid
flowchart LR
    subgraph Card["Card.tsx"]
        card[Card]
    end

    subgraph PageHero["PageHero.tsx"]
        ph[PageHero]
    end

    subgraph PagesUse["Used in"]
        card --> Home
        card --> About
        card --> Minerals
        card --> Events
        card --> Businesses
        card --> News
        card --> Projects
        card --> Contact

        ph --> Businesses
        ph --> News
        ph --> Projects
        ph --> Contact
    end

    subgraph Home["/"]
        h[stats, featured, gallery, admin, about, CTA]
    end

    subgraph About["/about"]
        a[admin, gov, oba, communities, overview, CTAs]
    end

    subgraph Minerals["/minerals"]
        m[intro, agri, solid, water, investment, CTA]
    end

    subgraph Events["/events"]
        e[festival, upcoming, CTA]
    end

    subgraph Others["/businesses, /news, /projects, /contact"]
        o[cards, form]
    end
```

---

## How to use

- **Copy one block** (without the ` ```mermaid ` fence if your tool expects raw Mermaid) into [mermaid.live](https://mermaid.live).
- **Diagram 7** is the most complete single view; if it’s too large, use **1** (overview) plus **2–5** (per-page).
- **Diagram 9** is for navigation/UX; **10** for component usage.

---

*Ikoha Community Development — Full website in Mermaid*
