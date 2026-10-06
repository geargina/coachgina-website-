// Single source of truth for all site copy.
// Every fact below traces to ~/Documents/Geargina Resume/Geargina Tan CV Oct 2026.pdf
// (master: SecondBrain/05-resources/cv-geargina-master.md) or to a CONFIRMED row in
// ~/Sites/coachgina-website/context/claims-and-proof.md. Nothing else may be added.

window.DATA = {
  profile: {
    name: "Geargina Tan",
    firstName: "Geargina",
    initials: "GT",
    role: "AI Educator & Operator",
    roleHeading: ["AI Educator", "Operator."],          // heading: "AI Educator & <i>Operator.</i>"
    email: "hello@iamcoachgina.com",
    location: "Singapore",
    linkedin: "https://linkedin.com/in/gearginatan",
    linkedinLabel: "linkedin.com/in/gearginatan",
    resumePath: "geargina-tan-cv.pdf",
    heroVideo: { webm: "assets/video/hero.webm", mp4: "assets/video/hero.mp4", poster: "assets/video/hero.webp" },
    // Exact spoken line of the hero video (crawlable transcript under the video; also the VideoObject description).
    heroTranscript: "Hi, I'm Geargina. I'm an AI educator and operator. I co-founded WTFox.ai, and I teach business leaders across Southeast Asia to use AI well.",
    summary: "Entrepreneurial operations leader and AI educator with 15+ years driving business growth across tech, hospitality and e-commerce. Co-founder and COO of WTFox.ai, an agentic AI CRM company, leading operations, go-to-market and the group's SOC 2, ISO 27001 and GDPR audit-readiness programme. Speaks and teaches across Southeast Asia on practical AI adoption for business professionals.",
    extraLine: "Writes on LinkedIn as \"Coach Gina\" about practical AI adoption for business leaders in Southeast Asia.",
    currentRole: "Co-Founder & COO, WTFox.ai",
    since: "Jan 2026",
    education: "Bachelor of Business Management, RMIT / SIM, 2008",
    quote: "Fifteen years of operations, now spent teaching business people to use AI properly.",   // paraphrase of the summary
    idCard: {
      band: "OPERATOR ID",
      rows: [["ID No.", "GT-2009"], ["Dept.", "Operations & AI"], ["Based", "Singapore"]],
      back: [
        "Co-Founder & COO, WTFox.ai",
        "Bachelor of Business Management, RMIT / SIM",
        "Executive Education, Design Thinking & Innovation, NUS",
        "SOC 2, ISO 27001 and GDPR programme lead",
        "15+ years across tech, hospitality and e-commerce"
      ],
      foundLine: "If found, say hello · hello@iamcoachgina.com"
    },
    quickFacts: [
      ["Location", "Singapore"],
      ["Education", "Bachelor of Business Management, RMIT / SIM"],
      ["Current role", "Co-Founder & COO, WTFox.ai"],
      ["Email", "hello@iamcoachgina.com"]
    ]
  },

  nav: ["About", "Stack", "Work", "Workshops", "Experience", "Numbers", "Contact"],

  // Skills → "The periodic table of my stack". symbol = 2 letters, logo = file in /logos (or null → concept icon)
  skillGroups: [
    { family: "AI & Automation", skills: [
      { name: "Claude / Claude Code", symbol: "Cl", logo: "claude.svg", hex: "#D97757", uses: ["WTFox.ai internal workflows", "Claude Masterclass"] },
      { name: "OpenAI", symbol: "Oa", logo: null, hex: "#000000", uses: ["Qashier AI agents"] },
      { name: "Gemini", symbol: "Ge", logo: "googlegemini.svg", hex: "#8E75B2", uses: [] },
      { name: "n8n", symbol: "N8", logo: "n8n.svg", hex: "#EA4B71", uses: ["WTFox.ai internal workflows"] },
      { name: "Replit / Lovable", symbol: "Rp", logo: "replit.svg", hex: "#F26207", uses: [] },
      { name: "HeyGen AI", symbol: "Hg", logo: null, hex: "#000000", uses: [] },
      { name: "ElevenLabs AI", symbol: "El", logo: "elevenlabs.svg", hex: "#000000", uses: [] }
    ]},
    { family: "Compliance & Security", skills: [
      { name: "Vanta", symbol: "Va", logo: null, hex: "#000000", uses: ["Compliance programme"] },
      { name: "SOC 2", symbol: "S2", logo: null, hex: "#000000", uses: ["Compliance programme"] },
      { name: "ISO 27001", symbol: "Is", logo: null, hex: "#000000", uses: ["Compliance programme"] },
      { name: "GDPR", symbol: "Gd", logo: null, hex: "#000000", uses: ["Compliance programme"] },
      { name: "Risk workshops", symbol: "Rw", logo: null, hex: "#000000", uses: ["Compliance programme"] },
      { name: "Policy authoring", symbol: "Pa", logo: null, hex: "#000000", uses: ["Compliance programme"] }
    ]},
    { family: "CRM & Sales", skills: [
      { name: "HubSpot", symbol: "Hs", logo: "hubspot.svg", hex: "#FF7A59", uses: [] },
      { name: "Salesforce", symbol: "Sf", logo: null, hex: "#00A1E0", uses: [] },
      { name: "Aircall", symbol: "Ac", logo: "aircall.svg", hex: "#00B388", uses: [] },
      { name: "Intercom", symbol: "Ic", logo: "intercom.svg", hex: "#6AFDEF", uses: [] }
    ]},
    { family: "Analytics & BI", skills: [
      { name: "Tableau", symbol: "Tb", logo: null, hex: "#E97627", uses: [] },
      { name: "Power BI", symbol: "Pb", logo: null, hex: "#F2C811", uses: [] },
      { name: "Microsoft Office 365", symbol: "M3", logo: null, hex: "#D83B01", uses: [] },
      { name: "Google Workspace", symbol: "Gw", logo: "google.svg", hex: "#4285F4", uses: [] }
    ]},
    { family: "Content & Media", skills: [
      { name: "Canva", symbol: "Cv", logo: null, hex: "#00C4CC", uses: [] },
      { name: "Multimedia Suite", symbol: "Mm", logo: null, hex: "#000000", uses: [] }
    ]}
  ],

  // Work → expanding accordion gallery. "ui" = which illustrative CSS mini-UI to draw.
  projects: [
    { id: "wtfox", index: "01", kicker: "Agentic AI CRM · 2026", title: "WTFox.ai",
      description: "Co-founded WTFox.ai, an agentic AI CRM company whose assistant, Mr. Fox, lives inside WhatsApp and Telegram group chats to capture conversations, qualify leads and update the CRM automatically.",
      features: ["Philippines market launch, July 2026", "Go-to-market strategy", "Sales rep onboarding and AI training", "Compensation and contract framework"],
      tech: ["Claude / Claude Code", "n8n"], ui: "chat" },
    { id: "compliance", index: "02", kicker: "SOC 2 · ISO 27001 · GDPR · 2026", title: "Group compliance programme",
      description: "Lead the multi-framework compliance programme on the Vanta platform for WTFox.ai's parent company, a dealership CRM SaaS business, with audits targeted for 2026.",
      features: ["30+ information-security and privacy policies", "Customer-facing Data Processing Agreement", "Access reviews and vendor assessments", "Executive risk workshops"],
      tech: ["Vanta", "SOC 2", "ISO 27001", "GDPR"], ui: "controls" },
    { id: "masterclass", index: "03", kicker: "AI Masterclass · Aug 2026", title: "Claude Masterclass",
      description: "AI Masterclass series (Claude for professionals) delivered with Cogentic AI Partners, Singapore, August 2026. Two evening cohorts, 21 paying attendees.",
      features: ["3 hour format, cohort cap 30", "Confidence setting up a Project rose 48% (post-session survey)", "91% of survey respondents rated pacing \"just right\"", "Level 2 programme in development"],
      tech: ["Claude / Claude Code"], ui: "slides" },
    { id: "bnf", index: "04", kicker: "Executive workshop · Mar 2026", title: "BNF Group strategy retreat",
      description: "A 3 hour AI session for 40+ senior managers at a strategy retreat, almost all of whom had never used an AI tool. Taught on Claude.",
      features: ["40+ senior managers", "3 hour hands-on session", "First AI tool for most of the room", "Taught on Claude"],
      tech: ["Claude / Claude Code"], ui: "room" },
    { id: "qashier", index: "05", kicker: "AI agents in operations · 2022 to 2025", title: "Qashier AI agents",
      description: "Launched AI agents to support lead generation, sales enablement and operational workflows, including OpenAI bots and SOP automation, cutting ticket response times to 5 minutes and reducing ticket volumes by 50%.",
      features: ["Ticket response time down to 5 minutes", "Ticket volumes down 50%", "OpenAI bots and SOP automation", "Philippines shared-services hub, 90% CSAT"],
      tech: ["OpenAI", "HubSpot", "Intercom"], ui: "tickets" },
    { id: "jewel", index: "06", kicker: "Brick and mortar · 2018 to 2020", title: "Jewel Changi Airport",
      description: "Part of the pre-opening leadership team. Oversaw 12 User Experience Managers, built 150+ SOPs covering crisis management and business continuity, and coordinated the launch of 270 tenants and 6 attractions, welcoming 500,000 visitors in the first week.",
      features: ["SMART command centre: 12 systems, 5,000 sensors, 700 CCTVs, 200 mobile devices", "Attraction sales team: eight-digit revenue within 9 months", "40 F&B tenants onboarded to food delivery within 1.5 months", "Tactical promotions with STB and ESG"],
      tech: [], ui: "terminal" },
    { id: "uss", index: "07", kicker: "Brick and mortar · 2009 to 2018", title: "Universal Studios Singapore",
      description: "Pre-opening teams for Universal Studios Singapore, Dolphin Island, SEA Aquarium and Adventure Cove Waterpark at Resorts World Sentosa. Took over and opened Dolphin Island within 3 months after two previous unsuccessful attempts.",
      features: ["Hired and developed 80 team members in the Dreamworks zone", "Launched Jurassic World, Trolls and Halloween Horror Nights, 57% more footfall", "Converted 10% of season pass holders to annual passes", "3 month supervisory attachment at Universal Studios Orlando"],
      tech: [], ui: "park" }
  ],

  // Speaking & teaching → ink-flood index (replaces the doc's Certifications section)
  speaking: [
    { title: "Panelist, \"AI-first Finance: A strategic journey\"", issuer: "ACCA Singapore Annual Conference 2026 · October 2026" },
    { title: "Guest speaker, \"Unlocking Your Superpowers: Masterclass on Personal Productivity with AI\"", issuer: "PICPA EMPOWER International Conference, Cagayan de Oro · October 2026" },
    { title: "Solopreneur AI workshop (paid programme)", issuer: "Singapore · September 2026" },
    { title: "AI Masterclass series, Claude for professionals", issuer: "With Cogentic AI Partners, Singapore · August 2026" },
    { title: "\"AI-Native with Claude\" hands-on workshop", issuer: "Singapore · June 2026" },
    { title: "Insight Hour", issuer: "Podium, Singapore · June 2026" },
    { title: "Humans in AI Week panel", issuer: "The AI Collective · June 2026" },
    { title: "Opening talk on Skills, Connectors and Plugins", issuer: "AI Power Users Meetup, Singapore · May 2026" },
    { title: "Business-competition judge", issuer: "Catholic Junior College · May 2026" },
    { title: "AI workshop for 40+ senior managers", issuer: "BNF Group strategy retreat, Ritz-Carlton Singapore · March 2026" }
  ],

  // Experience + education as one path (chronological, oldest first)
  timeline: [
    { year: "2008", title: "Bachelor of Business Management", place: "RMIT / Singapore Institute of Management (SIM)", detail: "", kind: "education" },
    { year: "2009 to 2014", title: "Senior Manager, Marine Life Park & Universal Studios Singapore", place: "Resorts World Sentosa, Singapore", detail: "Pre-opening teams for Universal Studios Singapore, Dolphin Island, SEA Aquarium and Adventure Cove Waterpark. Opened Dolphin Island within 3 months after two unsuccessful attempts. Hired and developed 80 team members in the Dreamworks zone." },
    { year: "2014 to 2017", title: "Founder & Director", place: "Printstone Pte Ltd, Singapore", detail: "Launched a profitable 3D and commercial printing business, breaking even within 8 months. Projects for Marina Bay Sands, TED Talks and National Gallery." },
    { year: "2017 to 2018", title: "Assistant Director, Attractions Promotions & Events", place: "Resorts World Sentosa / Universal Studios Singapore", detail: "Launched Jurassic World, Trolls and Halloween Horror Nights, a 57% increase in footfall. Main contact for Universal Studios Orlando HQ." },
    { year: "2018 to 2020", title: "Assistant Vice President, User Experience", place: "Jewel Changi Airport Development Pte Ltd, Singapore", detail: "Pre-opening leadership team. Oversaw 12 User Experience Managers, built 150+ SOPs, coordinated the launch of 270 tenants and 6 attractions, welcoming 500,000 visitors in the first week." },
    { year: "2020", title: "Executive Education Certificate, Design Thinking & Innovation for Business", place: "National University of Singapore (NUS)", detail: "", kind: "education" },
    { year: "2020 to 2022", title: "Program Manager, Amazon Flex Last Mile Operations (SG Lead)", place: "Amazon, Singapore", detail: "Last mile delivery operations across Singapore and Australia. Parking and tolls cost-saving plan saving $500K annually. COVID SOPs for 3,000 delivery partners." },
    { year: "2022 to 2025", title: "VP Operations Excellence & Country Director, Philippines", place: "Qashier Pte Ltd, Singapore", detail: "70% year on year revenue growth in the Philippines. Regional expansion across 5 SEA markets. AI agents cut ticket response times to 5 minutes and ticket volumes by 50%." },
    { year: "2026 to now", title: "Co-Founder & COO", place: "WTFox.ai, Singapore", detail: "Agentic AI CRM. Philippines market launch, day-to-day operations, AI-powered internal workflows, and the group's SOC 2, ISO 27001 and GDPR compliance programme." }
  ],

  // Achievements → pinned horizontal gallery (numbers from the CV only)
  achievements: [
    { label: "Years in operations", caption: "Tech, hospitality and e-commerce", detail: "Across Resorts World Sentosa, Jewel Changi, Amazon, Qashier and WTFox.ai", value: 15, suffix: "+", logoText: "15" },
    { label: "Revenue growth", caption: "Philippines, year on year", detail: "Qashier, as Country Director", value: 70, suffix: "%", logoText: "PH" },
    { label: "Visitors in week one", caption: "Jewel Changi Airport opening", detail: "270 tenants and 6 attractions launched", value: 500000, suffix: "", logoText: "JW" },
    { label: "Annual savings", caption: "Parking and tolls plan", detail: "Amazon Flex, Singapore and Australia", value: 500, prefix: "$", suffix: "K", logoText: "AZ" },
    { label: "Policies authored", caption: "Information security and privacy", detail: "Core ISMS set, GDPR pack, DPA, incident response, BCDR", value: 30, suffix: "+", logoText: "SOC" },
    { label: "SEA markets", caption: "Regional expansion", detail: "Contributing to 30% business growth at Qashier", value: 5, suffix: "", logoText: "SEA" },
    { label: "SOPs built", caption: "Crisis management and BCP", detail: "Jewel Changi pre-opening", value: 150, suffix: "+", logoText: "SOP" },
    { label: "Ticket volume cut", caption: "AI agents and SOP automation", detail: "Response times down to 5 minutes", value: 50, suffix: "%", logoText: "AI" }
  ],

  // Workshops → "Work with me". Copy lifted from geargina.com (claims gate CONFIRMED rows only). No prices.
  workshops: {
    lede: "Hands-on AI sessions on Claude and ChatGPT, built around the work people already do. Most rooms have never opened an AI tool, and nobody gets asked to write code.",
    offers: [
      { index: "01", title: "Team workshops", kind: "For business teams",
        body: "2 hrs, 3 hrs, a full day or a group retreat, in person in Singapore or online. Built for management teams who want their people AI native. Everyone brings one real piece of work and leaves with a Project, a skill and an agent running on it.",
        facts: ["Group retreats and offsites welcome", "Scoped per team"],
        cta: { label: "Scope a workshop", href: "mailto:hello@iamcoachgina.com?subject=Team%20workshop%20enquiry" },
        more: { label: "Workshop details", href: "ai-workshops-singapore.html" } },
      { index: "02", title: "Claude Masterclass", kind: "Evening cohort",
        body: "A 3 hour evening cohort with Cogentic AI Partners. Three cohorts so far, with students joining from London, Spain, Singapore, Malaysia and India.",
        facts: ["91% of respondents rated the pacing \"just right\"", "S$349 per seat"],
        cta: { label: "Ask about the next cohort", href: "mailto:hello@iamcoachgina.com?subject=Claude%20Masterclass%20enquiry" },
        more: { label: "Masterclass details", href: "claude-workshop-singapore.html" } },
      { index: "03", title: "1:1 tutoring", kind: "Private sessions",
        body: "You, your laptop and your own work. Skills, agents, connectors and project context, set up on the tasks you actually repeat, in person in Singapore or online.",
        facts: ["Claude or ChatGPT, your choice", "Scoped per person"],
        cta: { label: "Book a 1:1", href: "mailto:hello@iamcoachgina.com?subject=1%3A1%20tutoring%20enquiry" },
        more: { label: "Contact form", href: "contact.html" } },
      // Partner card: paraphrase of the geargina.com homepage #offerings "For Partners" card.
      { index: "04", title: "Partner training providers", kind: "Partner model",
        body: "For academies, communities and training businesses that want practical AI in their catalogue. You own the audience and the registration. The curriculum's ready to teach, and the Claude Masterclass with Cogentic AI Partners already runs this way.",
        facts: ["Revenue share, agreed per programme", "Curriculum ready to teach"],
        cta: { label: "Propose a partnership", href: "mailto:hello@iamcoachgina.com?subject=Partnership%20proposal" },
        more: { label: "Partner details", href: "ai-workshops-singapore.html#partners" } }
    ],
    testimonials: [
      { quote: "If anyone here wants to know more about what AI can do, I seriously recommend contacting Geargina. In less than 30 mins she showed me how little I knew about AI, with her 'second brain'... Now I can't unsee what AI can do.", name: "Keith", role: "Group chat recommendation · Oct 2026", initials: "K" },
      { quote: "Geargina helped me see ChatGPT as far more than a chat layer. She clearly explained how skills, agents, connectors, scheduler, and project context can turn repeatable processes... What I valued most was how she connected these tools to practical business outcomes... I left the session with a much clearer picture of how to build my own AI-enabled way of working.", name: "Bryce", role: "1:1 AI coaching · Sep 2026", initials: "B" },
      { quote: "Geargina has very good 'trainer' skills. She knows the stuff well and is able to articulate the approach very clearly with simple illustrations and drawing comparisons to things we easily understand.", name: "Anonymous response", role: "Post-session survey · Claude Masterclass, Aug 2026", initials: "A" },
      { quote: "Yesterday's session was terrific! Geargina was very knowledgeable, and my mind was focused on how the learning could be used in everyday life, not just work.", name: "Viju", role: "Masterclass attendee", initials: "V" },
      { quote: "The 1:1 sessions were the best money I spent this year. I went from 'ChatGPT tourist' to genuinely faster at my job.", name: "Julian Hu", role: "Product Manager", initials: "JH" },
      { quote: "Enjoyed the session. I'm gonna build my own Obsidian coming week.", name: "Willis", role: "Masterclass attendee", initials: "W" }
    ],
    cta: {
      title: "Tell me who is in the room.",
      body: "Group size, how long you can give me, and what you want people doing differently next Monday. I reply within 2 business days.",
      primary: { label: "Contact me", href: "mailto:hello@iamcoachgina.com?subject=Workshop%20or%201%3A1%20enquiry" },
      secondary: { label: "DM on LinkedIn", href: "https://linkedin.com/in/gearginatan" }
    }
  },

  // FAQ: verbatim from the geargina.com homepage <details> blocks (#faq). Do not reword.
  faq: [
    { q: "Who is Coach Gina?", a: "Coach Gina (Geargina Tan) is an AI workshop facilitator based in Singapore and the co-founder and COO of WTFox.ai, an AI company she runs on Claude and ChatGPT every day. She came to AI without a technical background, which shapes how she teaches. Her workshops start where beginners actually are, and take people from chatting with AI to handing it real work." },
    { q: "Do I need a technical background to join an AI workshop?", a: "No. The sessions are built for people who are new to AI and have no technical background. Geargina is not a developer either, which is why the material starts in plain language instead of where an engineer would start. What you do need is a laptop, an account logged in before the session begins, and one real piece of your own work to practise on." },
    { q: "How do I choose an AI workshop facilitator in Singapore?", a: "Ask five things. Has this person run a room like yours, at your seniority and skill level. Does the session work on your own documents rather than a demo dataset. Is there hands-on time from the first 20 minutes. What will people have actually built by the time they leave. And will you see the survey results afterwards, the flat ones included." },
    { q: "How much does an AI workshop in Singapore cost?", a: "It is scoped per team, so there is no rate card. Four things move the number. How many people are in the room, how long the format runs (2 hrs, 3 hrs or a full day), how much prep goes into building the session on your own documents, and whether it runs in person in Singapore or online. Send those four on the contact form and you get a figure back." },
    { q: "Do you run AI workshops for beginners?", a: "Yes, and most rooms are beginners. At the BNF Group strategy retreat in March 2026, a room of 40+ senior managers had almost no AI use between them. After the August 2026 Claude Masterclass, attendees self-rated their confidence in setting up a Claude Project 48% higher than before. That comes from a post-session survey, so read it as feedback rather than a study." },
    { q: "Can you build the workshop around our company's own work?", a: "Yes, that is the format rather than an add-on. Everyone brings a laptop and one real piece of their own work, a report they write monthly, a deck in progress, a process doc. Before the day there is a scoping call on who is in the room, what tools they already pay for, and what you want them doing differently next Monday. The exercises get rewritten onto your material." },
    { q: "Does Geargina Tan speak at conferences and events?", a: "Yes. Geargina Tan speaks at conferences, industry events and private team sessions in Singapore and across Southeast Asia, in person and online. Recent stages include the Claude Masterclass 101 with Cogentic AI Partners, an online LHH session for senior professionals in career transition, and the BNF Group strategy retreat. Next up are the EntreBoss HUB panel at the National Library on 16 September 2026, the ACCA Singapore Annual Conference on 9 October 2026 and the PICPA EMPOWER International Conference in Cagayan de Oro on 24 October 2026. Details and enquiries at geargina.com/speaking.html." },
    { q: "How do I get in touch with Coach Gina?", a: "Send the contact form at geargina.com/contact.html with your team size, topic and rough timeline, or send a direct message on LinkedIn. Geargina replies personally within 2 business days from hello@iamcoachgina.com." }
  ],

  contact: {
    headingLines: ["Let's build", "something together."],
    badgeText: "say hello · say hello · say hello · "
  }
};
