# Ikoha Community Development — Human / User Diagrams

Mermaid diagrams from a **human (user) perspective**: who uses the app, what they do, and how they move through it.  
Use in [Mermaid Live](https://mermaid.live) or your docs.

---

## 1. User roles and what they can do

```mermaid
flowchart LR
    subgraph Actors["People"]
        V[Visitor]
        M[Member]
        A[Admin]
    end

    subgraph VisitorActions["Visitor can"]
        V1[View Home]
        V2[Read About]
        V3[Browse Minerals]
        V4[Browse Projects]
        V5[Browse Businesses]
        V6[Read News]
        V7[View Events]
        V8[Submit Contact]
    end

    subgraph MemberActions["Member can (planned)"]
        M1[All Visitor actions]
        M2[Profile / account]
    end

    subgraph AdminActions["Admin can (planned)"]
        A1[All above]
        A2[Manage minerals]
        A3[Manage projects]
        A4[Manage businesses]
        A5[Manage news]
        A6[Manage events]
        A7[Manage documents]
        A8[Manage community info]
        A9[View contact inquiries]
    end

    V --> V1 & V2 & V3 & V4 & V5 & V6 & V7 & V8
    M --> M1 & M2
    A --> A1 & A2 & A3 & A4 & A5 & A6 & A7 & A8 & A9
```

---

## 2. User journey — Visitor (typical path)

```mermaid
flowchart TD
    Start([Person arrives at site])
    Banner[Sees: Site under construction]
    Home[Lands on Home]
    Browse[Reads hero, stats, resources, gallery]
    Choose[Chooses where to go]
    About[About: history, leadership, map]
    Minerals[Minerals: resources]
    Projects[Projects: development]
    Businesses[Businesses: directory]
    News[News: updates]
    Events[Events: festivals]
    Contact[Contact: form]
    Submit[Submits message or question]
    End([Leaves or returns])

    Start --> Home
    Home --> Banner
    Home --> Browse
    Browse --> Choose
    Choose --> About & Minerals & Projects & Businesses & News & Events
    About --> Contact
    Minerals --> Contact
    Projects --> Contact
    Businesses --> Contact
    News --> Contact
    Events --> Contact
    Contact --> Submit
    Submit --> End
    Choose --> Contact
```

---

## 3. User journey — Simple (one path)

```mermaid
journey
    title Visitor journey
    section Land
      Opens website: 5: Visitor
      Reads construction banner: 3: Visitor
      Scrolls Home: 5: Visitor
    section Explore
      Clicks About: 4: Visitor
      Reads leadership & map: 4: Visitor
    section Act
      Clicks Contact: 5: Visitor
      Fills and submits form: 4: Visitor
    section End
      Leaves or browses more: 5: Visitor
```

---

## 4. Use case style — Actors and actions

```mermaid
flowchart TB
    subgraph Visitor["Visitor (no login)"]
        direction TB
        v1[View Home, About, Minerals, Projects]
        v2[View Businesses, News, Events]
        v3[Submit Contact form]
        v4[View map on About]
    end

    subgraph Admin["Admin (logged in, planned)"]
        direction TB
        a1[Log in to admin]
        a2[Create / edit minerals, projects, businesses]
        a3[Create / edit news, events]
        a4[Upload documents]
        a5[Edit community info]
        a6[View and respond to contact inquiries]
    end

    Person((Person))
    Person --> Visitor
    Person -->|"has role"| Admin
```

---

## 5. Who does what (matrix style in Mermaid)

```mermaid
flowchart LR
    subgraph CanDo["What humans can do"]
        C1[View public pages]
        C2[Submit contact form]
        C3[Manage content]
        C4[Read inquiries]
    end

    V[Visitor]
    A[Admin]

    V --> C1
    V --> C2
    A --> C1
    A --> C2
    A --> C3
    A --> C4
```

---

## 6. Human → Page → Action (flow)

```mermaid
flowchart TD
    H([Human])
    H --> P1[Home]
    H --> P2[About]
    H --> P3[Minerals]
    H --> P4[Projects]
    H --> P5[Businesses]
    H --> P6[News]
    H --> P7[Events]
    H --> P8[Contact]

    P1 --> A1[Read, scroll, click links]
    P2 --> A2[Read, view map, click Contact]
    P3 --> A3[Read list, filter later]
    P4 --> A4[Read list, filter later]
    P5 --> A5[Read directory]
    P6 --> A6[Read articles]
    P7 --> A7[Read events, dates]
    P8 --> A8[Fill form, submit]

    A8 --> O([Message sent])
```

---

## 7. Simple “human in the loop” (high level)

```mermaid
flowchart LR
    Human([Person])
    Site[Ikoha Website]
    Contact[Contact form]
    DB[(Database / Inbox)]

    Human -->|visits| Site
    Human -->|fills| Contact
    Contact -->|saves| DB
    Human -->|gets reply| Human
```

---

## 8. Persona / user types (text in nodes)

```mermaid
flowchart TD
    subgraph Users["Users of the platform"]
        U1["Visitor\n(General public)\n- Browse\n- Contact"]
        U2["Member\n(Registered, planned)\n- Browse\n- Account"]
        U3["Admin\n(Staff)\n- All content\n- Inquiries"]
    end

    Platform[Ikoha Community Development]
    U1 & U2 & U3 --> Platform
```

---

## How to use

- Paste any ` ```mermaid ` block into [mermaid.live](https://mermaid.live) to edit or export PNG/SVG.
- **Journey** (section 3): Mermaid `journey` syntax; good for step-by-step experience.
- **Flowcharts** (sections 1, 2, 4, 5, 6, 7, 8): Use for roles, journeys, and use-case style views.

---

*Ikoha Community Development — Human / user diagrams*
