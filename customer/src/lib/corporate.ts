export const CORPORATE = {
  name: "Brancho",
  legalName: "Brancho Technologies Pvt. Ltd.",
  tagline: "Home, Perfectly Taken Care Of.",
  domain: "brancho.in",
  founded: 2019,
  headquarters: "Brancho House, MG Road, Junagadh, Gujarat 362001",
  ctaEmail: "care@brancho.in",
};

export const CONTACT = {
  corporate: {
    label: "Corporate Office",
    value: "Brancho House, MG Road, Junagadh, Gujarat 362001",
    mapsUrl: "https://www.google.com/maps?q=MG+Road,+Junagadh,+Gujarat",
  },
  support: { label: "Customer Support", email: "support@brancho.in", phone: "+91 1800 123 4567" },
  business: { label: "Business Enquiries", email: "business@brancho.in", phone: "+91 79 4000 5000" },
  media: { label: "Media Enquiries", email: "press@brancho.in", phone: "+91 79 4000 5001" },
  careers: { label: "Careers", email: "careers@brancho.in" },
  hr: { label: "HR & Partnerships", email: "partners@brancho.in" },
  whatsapp: { label: "WhatsApp", value: "+91 98980 12345" },
  hours: [
    { label: "Monday – Saturday", value: "9:00 AM – 8:00 PM IST" },
    { label: "Sunday", value: "10:00 AM – 6:00 PM IST" },
    { label: "Emergency Support", value: "24 × 7" },
  ],
  emergency: { label: "Emergency Hotline", phone: "+91 1800 123 4568" },
};

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/brancho" },
  { label: "Twitter", href: "https://twitter.com/brancho" },
  { label: "Instagram", href: "https://www.instagram.com/brancho" },
  { label: "YouTube", href: "https://youtube.com/@brancho" },
  { label: "Facebook", href: "https://facebook.com/brancho" },
];

export const REGISTRATIONS = [
  { label: "GSTIN", value: "24AACCX0000X1Z5", note: "Registered under GST Act, 2017" },
  { label: "CIN", value: "U74999GJ2019PTC109876", note: "Incorporated under Companies Act, 2013" },
  { label: "MSME Udyam", value: "UDYAM-GJ-19-0098765", note: "Micro & Small Enterprise" },
  { label: "FSSAI", value: "21524095000123", note: "Food Safety & Standards Authority of India" },
  { label: "Trademark", value: "Application No. 4901234", note: "Class 37 & 45 — Service Marks" },
  { label: "ISO", value: "ISO 9001:2015 Certified", note: "Quality Management Systems" },
  { label: "Copyright", value: "© 2019–2026 Brancho Technologies Pvt. Ltd.", note: "All intellectual property rights reserved" },
];

export type Business = {
  slug: string;
  name: string;
  parent: string;
  tagline: string;
  description: string;
  hero: string;
  overview: string[];
  mission: string;
  services: { title: string; description: string }[];
  highlights: string[];
  gallery: string[];
  faqs: { q: string; a: string }[];
  cta: string;
  ctaHref: string;
};

export const BUSINESSES: Business[] = [
  {
    slug: "water",
    name: "Brancho Water",
    parent: "Brancho",
    tagline: "Pure water, delivered with certainty.",
    description:
      "RO service, tank cleaning, water quality testing and safe drinking water solutions for homes and businesses across Gujarat.",
    hero: "Every drop tested. Every service guaranteed.",
    overview: [
      "Brancho Water is the water ecosystem business of Brancho. From certified RO servicing and UV purification to overhead tank cleaning and lab-tested drinking water, we take total ownership of the water your family consumes.",
      "Our trained water-systems technicians follow a documented 40-point service checklist, use genuine replacement parts, and provide digital water-quality reports after every visit.",
    ],
    mission: "To make every Indian home confident about the water it drinks.",
    services: [
      { title: "RO Service & AMC", description: "Filter replacement, membrane cleaning, TDS balancing and annual maintenance contracts with priority response." },
      { title: "UV / UF Purifier Service", description: "Lamp replacement, sediment cleaning and purification performance audits for UV and UF systems." },
      { title: "Overhead Tank Cleaning", description: "Scheduled pressure-jet cleaning with anti-bacterial disinfection and scum layer removal." },
      { title: "Water Quality Testing", description: "Lab-accredited testing for pH, TDS, hardness, chlorides and bacterial contamination with digital reports." },
      { title: "Drinking Water Delivery", description: "Packaged drinking water for corporates and societies, delivered on a fixed weekly schedule." },
      { title: "Water Softeners & Pumps", description: "Installation and servicing of softeners, pressure pumps and flow systems for whole-home water." },
    ],
    highlights: ["Lab-tested quality", "40-point service checklist", "Genuine spare parts", "Digital water reports", "Priority AMC support", "Society partnerships"],
    gallery: ["/about.svg", "/hero-poster.svg", "/about.svg", "/hero-poster.svg"],
    faqs: [
      { q: "How often should an RO be serviced?", a: "We recommend a professional service every 6–8 months depending on inlet water quality. AMC customers get automatic reminders." },
      { q: "Do you test bacterial contamination?", a: "Yes. Our testing partners cover microbiological parameters including total coliform and E. coli, in addition to physical-chemical tests." },
    ],
    cta: "Book a water service",
    ctaHref: "/services",
  },
  {
    slug: "home-care",
    name: "Brancho Home Care",
    parent: "Brancho",
    tagline: "The complete care programme for your home.",
    description:
      "Deep cleaning, maintenance, repairs and annual care plans that keep every corner of your home in perfect condition.",
    hero: "One programme. Every inch of home covered.",
    overview: [
      "Brancho Home Care is our flagship residential programme — a proactive, scheduled approach to home maintenance. Instead of reacting to breakdowns, families subscribe to care plans that cover cleaning, appliance servicing, pest control and repairs.",
      "Every plan is delivered by verified professionals with a shared digital checklist, photo-proof completion and a 90-day workmanship warranty.",
    ],
    mission: "To give every family a home that is always at its best.",
    services: [
      { title: "Deep Home Cleaning", description: "2,000-point cleaning across every room with eco-friendly products and colour-coded equipment." },
      { title: "Kitchen & Bathroom Detailing", description: "Chimney degreasing, scale removal and food-safe sanitisation of the most-used spaces." },
      { title: "Appliance Servicing", description: "AC, washing machine, refrigerator and RO on a fixed preventive schedule." },
      { title: "Electrical & Plumbing Care", description: "Safety audits, minor repairs and fittings bundled into annual plans." },
      { title: "Pest Control", description: "Child- and pet-safe quarterly treatments with a 3-month service guarantee." },
      { title: "Home Care Plans", description: "Annual, semi-annual and monthly subscriptions with priority slots and savings." },
    ],
    highlights: ["Scheduled care, not breakdowns", "Shared digital checklists", "90-day warranty", "Eco-friendly products", "Priority slots", "Transparent pricing"],
    gallery: ["/about.svg", "/hero-poster.svg", "/about.svg", "/hero-poster.svg"],
    faqs: [
      { q: "What is a Home Care Plan?", a: "A subscription that bundles the services your home needs into a fixed schedule, at a lower cost than booking individually, with priority scheduling." },
      { q: "Are the cleaning products safe?", a: "Yes. We use biodegradable, skin-safe products across all plans, and equipment is colour-coded to prevent cross-contamination." },
    ],
    cta: "Explore care plans",
    ctaHref: "/services",
  },
  {
    slug: "urgent-care",
    name: "Brancho Urgent Care",
    parent: "Brancho",
    tagline: "When your home can't wait, neither do we.",
    description:
      "60-minute emergency response for electrical failures, plumbing bursts, lockouts and safety-critical repairs, available 24 × 7.",
    hero: "Broken at midnight? We arrive in 60 minutes.",
    overview: [
      "Brancho Urgent Care is our rapid-response unit for the moments that cannot wait — a burst pipe, a live wire, a failed lock or a child locked out. Our emergency responders are on-call around the clock in every live city.",
      "With live ETA tracking, upfront surge-free pricing and a guaranteed response time, Urgent Care brings calm to the moments that matter most.",
    ],
    mission: "To be there when a home needs help the most.",
    services: [
      { title: "Emergency Electrical", description: "Power failures, sparking, short-circuits and switchboard burnouts handled with immediate triage." },
      { title: "Emergency Plumbing", description: "Burst pipes, overflows, gas leaks and blockages stabilised within the response window." },
      { title: "Locksmith & Access", description: "Locked doors, broken keys and safe-opening with non-destructive entry first." },
      { title: "Pest Emergencies", description: "Bee nests, rodent sightings and sudden infestations managed with safe removal." },
      { title: "Appliance Failures", description: "Refrigerator, geyser and AC failures when a family cannot wait for a scheduled visit." },
      { title: "Gas & Safety Checks", description: "Immediate safety assessment of gas leaks, carbon monoxide concerns and wiring hazards." },
    ],
    highlights: ["60-minute response", "24 × 7 availability", "Surge-free pricing", "Live ETA tracking", "Trained emergency crew", "Family safety first"],
    gallery: ["/about.svg", "/hero-poster.svg", "/about.svg", "/hero-poster.svg"],
    faqs: [
      { q: "How fast is the response?", a: "Our guaranteed response time is 60 minutes in live cities during emergency hours, with live tracking so you always know where help is." },
      { q: "Is emergency pricing higher?", a: "No. Emergency rates are fixed and published, with no surge pricing even at midnight." },
    ],
    cta: "Call urgent support",
    ctaHref: "/contact",
  },
  {
    slug: "myfamnest",
    name: "MyFamNest",
    parent: "Brancho",
    tagline: "A connected home for the whole family.",
    description:
      "Smart-home installation, elderly care check-ins, safety devices and family-connected services that make a house a nest.",
    hero: "Technology that cares for the people you love.",
    overview: [
      "MyFamNest is Brancho's family-connected home business — blending smart-home installation, health and safety devices, and caregiver services into one trusted programme for multi-generational families.",
      "From video-doorbells and elder-safety sensors to assisted-living check-ins, MyFamNest gives families the peace of mind of knowing loved ones are safe and connected.",
    ],
    mission: "To make every home a safe, connected nest for every generation.",
    services: [
      { title: "Smart Home Setup", description: "Wi-Fi, cameras, video doorbells, smart locks and voice assistants installed and configured." },
      { title: "Elder Care Check-ins", description: "Scheduled wellbeing visits, medication reminders and emergency alert setup for ageing parents." },
      { title: "Home Safety Devices", description: "Smoke, gas, water-leak and motion sensors installed with mobile alerts." },
      { title: "Child Safety Solutions", description: "Child-proofing, balcony safety, socket covers and kitchen hazard assessment." },
      { title: "24 × 7 Monitoring Desk", description: "A monitored helpdesk that responds to alerts and connects families in seconds." },
      { title: "Family Concierge", description: "A dedicated relationship manager for day-to-day home and family needs." },
    ],
    highlights: ["Multi-generational care", "Certified installers", "Monitored helpdesk", "Family app access", "Emergency escalation", "Trusted partners"],
    gallery: ["/about.svg", "/hero-poster.svg", "/about.svg", "/hero-poster.svg"],
    faqs: [
      { q: "Do you provide caregivers?", a: "MyFamNest partners with verified care agencies for trained assistance, while our core offering focuses on safety technology and check-in services." },
      { q: "Is data secure?", a: "Yes. All device data is encrypted and stored on Indian servers. Families control exactly who sees their feeds and alerts." },
    ],
    cta: "Secure your family nest",
    ctaHref: "/businesses/myfamnest",
  },
  {
    slug: "students",
    name: "Brancho Students",
    parent: "Brancho",
    tagline: "Independent living, made simple.",
    description:
      "Affordable services for students and hostels — laundry, room cleaning, appliance repair and safety essentials at campus-friendly prices.",
    hero: "Your room, your studies, your time. We handle the rest.",
    overview: [
      "Brancho Students is built for the independent lives of India's student population — PG rooms, hostels, and shared flats. We deliver budget-friendly cleaning, laundry, repairs and essentials with student-centric scheduling and transparent, pocket-friendly pricing.",
      "From exam-week quick cleans to annual hostel contracts, we help students live well while they focus on their futures.",
    ],
    mission: "To make student living comfortable, affordable and safe.",
    services: [
      { title: "Room Cleaning", description: "Quick and deep cleans scheduled around class timings and exam seasons." },
      { title: "Laundry & Linen", description: "Scheduled laundry and linen pickup for students and hostels." },
      { title: "Appliance Repair", description: "Washing machines, fridges, geysers and fans repaired on campus." },
      { title: "Hostel Contracts", description: "Annual maintenance contracts for PGs, hostels and student residences." },
      { title: "Moving Assistance", description: "Pack, shift and unpack support for moving in and moving out." },
      { title: "Safety Essentials", description: "Locks, smoke alarms and fire-safety checks at student-friendly prices." },
    ],
    highlights: ["Student pricing", "Flexible scheduling", "Campus-wide contracts", "Quick booking", "Verified pros", "Parent-approved"],
    gallery: ["/about.svg", "/hero-poster.svg", "/about.svg", "/hero-poster.svg"],
    faqs: [
      { q: "Can parents book on behalf of students?", a: "Yes. Parents can book services for their child's PG or hostel from anywhere, and track completion through the app." },
      { q: "Do you serve campuses outside Gujarat?", a: "Today we operate in our live Gujarat cities with student campuses. National expansion follows our city roadmap." },
    ],
    cta: "Set up student care",
    ctaHref: "/businesses/students",
  },
];

export const NEWSROOM = [
  {
    slug: "brancho-crosses-100k-customers",
    category: "Company News",
    title: "Brancho crosses 100,000 happy customers across Gujarat",
    excerpt: "A milestone built on trust, verification and service excellence.",
    date: "July 2026",
    readTime: "4 min",
    body: [
      "Brancho today announced it has crossed 100,000 customers served across Gujarat — a milestone reached seven years after a single van rolled out of Junagadh with three professionals and a promise of trust.",
      "The company credits the achievement to its multi-point verification protocol, transparent pricing and a technology platform that has made home services predictable.",
      "Brancho plans to build on this momentum with its national expansion roadmap beginning Q1 2027.",
    ],
  },
  {
    slug: "ai-allocation-engine",
    category: "Technology",
    title: "How AI matches the right professional to your home",
    excerpt: "Inside the smart allocation engine behind every Brancho booking.",
    date: "June 2026",
    readTime: "6 min",
    body: [
      "Every Brancho booking is matched by an AI allocation engine that weighs skill match, distance, availability, ratings and workmanship history in real time.",
      "The system has reduced average arrival times by 32% and improved first-time-fix rates to 96% across live cities.",
      "Future versions will predict demand per locality and proactively position professionals.",
    ],
  },
  {
    slug: "five-point-verification",
    category: "Safety",
    title: "Our 5-point professional verification protocol",
    excerpt: "Everything we check before a professional visits your home.",
    date: "May 2026",
    readTime: "5 min",
    body: [
      "Before any professional appears on the Brancho platform, they pass identity verification, police background checks, address confirmation, a skill assessment and an in-person training session.",
      "Verification is refreshed periodically, and re-verified professionals display a live 'Verified' badge in the app.",
    ],
  },
  {
    slug: "monsoon-checklist",
    category: "Cleaning Tips",
    title: "The monsoon home care checklist every home needs",
    excerpt: "Simple steps to keep your home fresh through the rains.",
    date: "April 2026",
    readTime: "3 min",
    body: [
      "From sealing window leaks to servicing ACs and checking drainage, a seasonal care routine prevents most monsoon headaches.",
      "Brancho Home Care plans now include a dedicated monsoon module.",
    ],
  },
  {
    slug: "urgent-care-launch",
    category: "Product",
    title: "Brancho Urgent Care launches with 60-minute response promise",
    excerpt: "24 × 7 emergency home response is now live across all Brancho cities.",
    date: "March 2026",
    readTime: "4 min",
    body: [
      "Brancho Urgent Care is now live, guaranteeing a 60-minute response for emergency electrical, plumbing, locksmith and safety issues.",
      "The service is staffed by a dedicated on-call crew and backed by live ETA tracking.",
    ],
  },
  {
    slug: "sustainability-report",
    category: "Sustainability",
    title: "Brancho publishes its first impact & sustainability report",
    excerpt: "Water saved, waste diverted and livelihoods created.",
    date: "January 2026",
    readTime: "5 min",
    body: [
      "The report details Brancho's eco-friendly product usage, low-water cleaning techniques and the employment generated for over 5,000 verified professionals.",
    ],
  },
];

export const DOWNLOADS = [
  { slug: "brand-book", title: "Brand Book", description: "Complete brand guidelines — logo, colour, typography and usage.", format: "PDF", size: "8.4 MB", updated: "July 2026", pages: "64 pages" },
  { slug: "corporate-manual", title: "Corporate Manual", description: "Internal standards for governance, ethics and operations.", format: "PDF", size: "5.2 MB", updated: "June 2026", pages: "38 pages" },
  { slug: "media-kit", title: "Media Kit", description: "Press assets, logos, photography and fact sheet for journalists.", format: "ZIP", size: "42 MB", updated: "July 2026", pages: "Assets + PDF" },
  { slug: "company-profile", title: "Company Profile", description: "An executive introduction to Brancho for partners and clients.", format: "PDF", size: "6.8 MB", updated: "July 2026", pages: "24 pages" },
  { slug: "brochure", title: "Services Brochure", description: "All services and plans for customers, in one elegant brochure.", format: "PDF", size: "12.1 MB", updated: "May 2026", pages: "32 pages" },
  { slug: "presentation", title: "Corporate Presentation", description: "Investor and partner-ready slide deck.", format: "PPTX", size: "18.5 MB", updated: "June 2026", pages: "40 slides" },
  { slug: "annual-report", title: "Annual Report", description: "Brancho's FY2025–26 performance, impact and outlook.", format: "PDF", size: "9.6 MB", updated: "April 2026", pages: "72 pages" },
];

export const FUTURE = [
  { slug: "foundation", name: "Brancho Foundation", tagline: "Service beyond services.", description: "A not-for-profit arm dedicated to professional skilling, free safety training and community care across India." },
  { slug: "csr", name: "CSR Programmes", tagline: "Giving back, measurably.", description: "Water, sanitation, digital literacy and livelihood programmes in the communities we serve." },
  { slug: "innovation-lab", name: "Innovation Lab", tagline: "Build what the home will need next.", description: "An in-house lab prototyping the next decade of home services — robotics, smart sensors and service automation." },
  { slug: "ai-platform", name: "Brancho AI", tagline: "The intelligence behind every visit.", description: "Predictive allocation, quality monitoring and conversational care that keeps every booking flawless." },
  { slug: "global", name: "Global Expansion", tagline: "A standard of home care for the world.", description: "A measured international roadmap to bring India's home-service standard to new markets." },
  { slug: "investors", name: "Investor Relations", tagline: "Long-term value, transparent reporting.", description: "Financial disclosures, governance and a clear roadmap for sustainable, profitable growth." },
  { slug: "sustainability", name: "Sustainability", tagline: "Caring for homes and the planet.", description: "Eco-products, water conservation, zero-waste operations and responsible employment." },
];

export type FutureDetail = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  overview: string[];
  pillars: { title: string; description: string }[];
  stats: { value: string; label: string }[];
  milestones: { phase: string; title: string; description: string }[];
  status: "Live" | "In Progress" | "Planned";
};

export const FUTURE_DETAILS: FutureDetail[] = [
  {
    slug: "foundation",
    name: "Brancho Foundation",
    tagline: "Service beyond services.",
    description: "A not-for-profit arm dedicated to professional skilling, free safety training and community care across India.",
    status: "In Progress",
    overview: [
      "The Brancho Foundation is our independent not-for-profit arm, focused on the people who make home services possible. It exists to create dignified livelihoods, train the next generation of skilled professionals and give back to the communities Brancho serves.",
      "Registered separately from Brancho's commercial operations, the Foundation runs skilling centres, community safety workshops and emergency-support programmes for families of service professionals.",
    ],
    pillars: [
      { title: "Skilling & Certification", description: "Free vocational training and certification for technicians, cleaners and caregivers, with placement support across the Brancho network." },
      { title: "Safety for Every Home", description: "Free home-safety and electrical-awareness workshops for first-time homeowners and senior citizens." },
      { title: "Professional Wellbeing", description: "Health insurance, accident cover and education support for professionals and their children." },
      { title: "Community Care", description: "Emergency support and relief drives for families of service professionals in times of crisis." },
    ],
    stats: [
      { value: "5,000+", label: "Professionals trained" },
      { value: "1,200+", label: "Families supported" },
      { value: "3", label: "Skilling centres" },
    ],
    milestones: [
      { phase: "2026", title: "Foundation launch", description: "Independent registration and the first two skilling centres in Junagadh and Veraval." },
      { phase: "2027", title: "Statewide reach", description: "Ten centres across Gujarat and the first national professional-wellbeing programme." },
      { phase: "2028", title: "National model", description: "A replicable skilling-to-livelihood model extended to every live Brancho city." },
    ],
  },
  {
    slug: "csr",
    name: "CSR Programmes",
    tagline: "Giving back, measurably.",
    description: "Water, sanitation, digital literacy and livelihood programmes in the communities we serve.",
    status: "Live",
    overview: [
      "Brancho's CSR programmes translate our mission into measurable community impact. We focus on water, sanitation, digital literacy and livelihoods — the same essentials we serve inside the home.",
      "Every programme is designed with local partners, tracked with public reporting, and aligned to the UN Sustainable Development Goals where we can contribute most.",
    ],
    pillars: [
      { title: "Water for Schools", description: "RO systems, tank-cleaning and safe-drinking infrastructure in municipal schools across Gujarat." },
      { title: "Swachh Bharat Support", description: "Sanitation awareness, waste segregation drives and clean-up support in urban neighbourhoods." },
      { title: "Digital Literacy", description: "Free sessions teaching senior citizens and first-time users to transact safely online." },
      { title: "Livelihood Uplift", description: "Direct employment, upskilling and fair-pay practices for thousands of verified professionals." },
    ],
    stats: [
      { value: "40+", label: "School programmes" },
      { value: "8,000+", label: "Community sessions" },
      { value: "₹2 Cr+", label: "Cumulative CSR spend" },
    ],
    milestones: [
      { phase: "2026", title: "Expand water programme", description: "15 new municipal schools receive safe-drinking-water infrastructure." },
      { phase: "2027", title: "Digital literacy scale", description: "Senior-citizen digital literacy reaches every live Brancho city." },
      { phase: "2028", title: "Impact transparency", description: "Annual CSR impact report published with independently verified outcomes." },
    ],
  },
  {
    slug: "innovation-lab",
    name: "Innovation Lab",
    tagline: "Build what the home will need next.",
    description: "An in-house lab prototyping the next decade of home services — robotics, smart sensors and service automation.",
    status: "In Progress",
    overview: [
      "The Brancho Innovation Lab is our in-house unit prototyping the next decade of home services. From service robots to predictive maintenance sensors, we build — not just imagine — what homes will need next.",
      "The Lab operates like a startup inside Brancho: small teams, rapid prototypes and field trials in real homes before anything ships.",
    ],
    pillars: [
      { title: "Service Robotics", description: "Prototyping robotic helpers for repetitive cleaning and inspection tasks in large homes and societies." },
      { title: "Predictive Maintenance", description: "Sensors that tell us an appliance is about to fail — days before it actually does." },
      { title: "Service Automation", description: "End-to-end automation of quoting, allocation, quality checks and re-service logic." },
      { title: "Green Services", description: "Low-water, chemical-free cleaning technologies that reduce environmental impact." },
    ],
    stats: [
      { value: "12", label: "Active prototypes" },
      { value: "200+", label: "Field trials" },
      { value: "5", label: "Patents filed" },
    ],
    milestones: [
      { phase: "2026", title: "First field deployments", description: "Predictive-maintenance sensors go live in 500 partner homes." },
      { phase: "2027", title: "Robotics pilot", description: "Assisted-cleaning robots pilot in select societies and corporates." },
      { phase: "2028", title: "Commercial products", description: "First consumer products from the Lab reach the market." },
    ],
  },
  {
    slug: "ai-platform",
    name: "Brancho AI",
    tagline: "The intelligence behind every visit.",
    description: "Predictive allocation, quality monitoring and conversational care that keeps every booking flawless.",
    status: "Live",
    overview: [
      "Brancho AI is the intelligence layer behind every booking. It matches the right professional to the right home, predicts demand before it happens and monitors quality on every single visit.",
      "The platform has cut average arrival times by 32% and improved first-time-fix rates to 96% across live cities — and it learns more with every completed service.",
    ],
    pillars: [
      { title: "Smart Allocation", description: "Real-time matching on skill, distance, ratings and workmanship history — in under a second." },
      { title: "Demand Forecasting", description: "Predicting per-locality demand lets us position professionals where they'll be needed." },
      { title: "Quality Monitoring", description: "Computer-vision-assisted checklists review every completed service before sign-off." },
      { title: "Conversational Care", description: "An assistant that answers booking questions, reschedules slots and resolves issues instantly." },
    ],
    stats: [
      { value: "-32%", label: "Arrival time" },
      { value: "96%", label: "First-time fix" },
      { value: "100%", label: "Services monitored" },
    ],
    milestones: [
      { phase: "2026", title: "Generalised allocation", description: "Allocation engine opens to vertical businesses beyond home services." },
      { phase: "2027", title: "Predictive positioning", description: "Proactive professional positioning based on live demand heatmaps." },
      { phase: "2028", title: "Autonomous care", description: "End-to-end autonomous resolution of routine service issues." },
    ],
  },
  {
    slug: "global",
    name: "Global Expansion",
    tagline: "A standard of home care for the world.",
    description: "A measured international roadmap to bring India's home-service standard to new markets.",
    status: "Planned",
    overview: [
      "India has taught us what home services can be when trust is engineered into the product. Global Expansion is our measured plan to bring that standard to new markets.",
      "We are not chasing rapid international growth. We are building a repeatable model — verified professionals, transparent pricing, digital quality — and will enter only markets where we can uphold it.",
    ],
    pillars: [
      { title: "Gulf Cooperation Council", description: "Large Indian diaspora communities with a familiar demand for reliable home services." },
      { title: "Southeast Asia", description: "Fast-urbanising markets with growing demand for organised home care." },
      { title: "Indian Diaspora Markets", description: "Cities where verified, trustworthy professionals are hard to find for NRIs." },
      { title: "Franchise Model", description: "Partner-led city operations under the Brancho standard and playbook." },
    ],
    stats: [
      { value: "3", label: "Markets under study" },
      { value: "Q1 2027", label: "First pilot target" },
      { value: "2030", label: "International network" },
    ],
    milestones: [
      { phase: "2026", title: "Market study", description: "Deep-dive feasibility and partner identification in candidate markets." },
      { phase: "2027", title: "First pilot", description: "A single pilot city operating to the full Brancho standard." },
      { phase: "2028–30", title: "Network build", description: "A measured rollout to multiple international cities." },
    ],
  },
  {
    slug: "investors",
    name: "Investor Relations",
    tagline: "Long-term value, transparent reporting.",
    description: "Financial disclosures, governance and a clear roadmap for sustainable, profitable growth.",
    status: "Live",
    overview: [
      "Brancho's investor relations are built on a simple principle: long-term value and transparent reporting. We share our progress honestly, hold ourselves to independent governance, and build for durable, profitable growth.",
      "This page is the gateway to our reporting, governance and the roadmap that guides our capital decisions.",
    ],
    pillars: [
      { title: "Transparent Reporting", description: "Regular business updates, annual reports and honest disclosure of metrics and milestones." },
      { title: "Strong Governance", description: "Independent board oversight, documented policies and compliance with Indian corporate law." },
      { title: "Durable Economics", description: "A clear path to profitability across each vertical business, without sacrificing quality." },
      { title: "Long-Term Roadmap", description: "Capital deployed against the national and international expansion plan, not short-term moves." },
    ],
    stats: [
      { value: "100K+", label: "Customers served" },
      { value: "5,000+", label: "Professionals" },
      { value: "25+", label: "Cities" },
    ],
    milestones: [
      { phase: "2026", title: "Annual Report", description: "FY2025–26 annual report with audited financials published in the Download Center." },
      { phase: "2027", title: "National raise", description: "Growth capital for national expansion aligned to the roadmap." },
      { phase: "2028–30", title: "Public market readiness", description: "Path to public listing following a track record of profitable growth." },
    ],
  },
  {
    slug: "sustainability",
    name: "Sustainability",
    tagline: "Caring for homes and the planet.",
    description: "Eco-products, water conservation, zero-waste operations and responsible employment.",
    status: "Live",
    overview: [
      "Caring for homes means caring for the planet those homes sit on. Brancho's sustainability framework covers our products, our operations and the way we treat people.",
      "From eco-friendly cleaning chemicals and low-water techniques to zero-plastic packaging and fair employment, sustainability is engineered into how we work — not bolted on.",
    ],
    pillars: [
      { title: "Eco-Friendly Products", description: "Biodegradable, skin-safe cleaning products across every service category." },
      { title: "Water Conservation", description: "Low-water and steam-cleaning techniques that cut water use by up to 70%." },
      { title: "Zero-Waste Operations", description: "Digital invoices, reusable equipment and plastic-free consumables." },
      { title: "Responsible Employment", description: "Fair pay, safety equipment, insurance and dignified treatment for every professional." },
    ],
    stats: [
      { value: "-70%", label: "Water in cleaning" },
      { value: "100%", label: "Biodegradable products" },
      { value: "0", label: "Single-use plastic" },
    ],
    milestones: [
      { phase: "2026", title: "First impact report", description: "Baseline impact report published covering water, waste and livelihoods." },
      { phase: "2027", title: "Green fleet", description: "Electric vehicles for a share of urban service fleets." },
      { phase: "2028", title: "Net-zero ambition", description: "Measured roadmap to carbon-neutral operations." },
    ],
  },
];

export const BRAND = {
  tagline: "Home, Perfectly Taken Care Of.",
  pillars: ["Trust", "Premium Quality", "Technology", "Long-term Value"],
  colors: [
    { name: "Navy", hex: "#181A1F", usage: "Primary — foundations, text, dark surfaces" },
    { name: "Gold", hex: "#C6A55A", usage: "Accent — CTAs, highlights, premium cues" },
    { name: "Gold Deep", hex: "#A98844", usage: "Hover states, secondary accent" },
    { name: "Champagne", hex: "#E0CB94", usage: "Gradients, soft accents" },
    { name: "Ink", hex: "#1A1A1C", usage: "Body text" },
    { name: "Muted", hex: "#6B7280", usage: "Secondary text" },
    { name: "Surface", hex: "#FFFFFF", usage: "Light backgrounds" },
    { name: "Soft", hex: "#F6F5F1", usage: "Subtle section backgrounds" },
  ],
  typography: [
    { name: "Manrope", role: "Display & Headings", weights: "SemiBold, Bold, ExtraBold", usage: "Hero titles, section headings, numbers" },
    { name: "Inter", role: "Body & UI", weights: "Regular, Medium, SemiBold", usage: "Paragraphs, navigation, forms, tables" },
  ],
  logoRules: [
    "Always use the official transparent logo files.",
    "Maintain a clear-space margin of at least 1× the icon height on all sides.",
    "On dark backgrounds use the white logo mark; on light backgrounds use the charcoal mark.",
    "Never stretch, tilt, recolor or add effects to the logo.",
    "Minimum sizes: 24 px digital, 12 mm print.",
    "The gold accent is reserved for premium moments — use it sparingly.",
  ],
  voice: [
    "Clear before clever. Our customers range from new homeowners to grandparents; clarity wins.",
    "Confident and calm. We solve problems, we don't dramatise them.",
    "Human and warm. Professional language with a genuine, caring tone.",
    "Specific over vague. Numbers, checklists and guarantees build trust.",
  ],
  iconStyle: "Thin, rounded, geometric line icons at consistent 2px stroke weight. Gold on dark, navy on light.",
  illustrationStyle: "Warm flat illustrations with navy linework, gold highlights and soft cream backgrounds. No photorealism, no clichés.",
  photography: "Natural light, real Indian homes, real professionals in uniform. Warm tones, honest and documentary in feel. Never stock-looking.",
  do: ["Use approved logo files", "Keep clear space", "Use brand fonts", "Photograph real people"],
  dont: ["Stretch or recolor the logo", "Use the tagline in logos", "Introduce new accent colours", "Use stock photography"],
};

export const TIMELINE = [
  { year: "2019", title: "Founded in Junagadh", description: "Brancho begins with one van, three professionals and a promise of trust." },
  { year: "2021", title: "Gujarat expansion", description: "Brancho grows across Saurashtra, reaching Rajkot and Veraval." },
  { year: "2023", title: "Technology platform", description: "AI allocation, live tracking and digital-first operations go live." },
  { year: "2024", title: "Businesses portfolio", description: "Brancho Water, Home Care and Urgent Care become independent businesses." },
  { year: "2025", title: "Family & student services", description: "MyFamNest and Brancho Students extend care beyond the walls of the home." },
  { year: "2026", title: "100,000 families", description: "National vision with a measured international roadmap." },
];

export const CULTURE = [
  { title: "Dignity for every role", description: "From field professional to engineer, every role at Brancho is respected, paid fairly and developed." },
  { title: "Truth over comfort", description: "We share bad news early, celebrate wins loudly, and measure everything honestly." },
  { title: "Own it end-to-end", description: "Small teams, big ownership. We ship, measure and refine without waiting for permission." },
  { title: "Care is the product", description: "Every decision is tested against one question — does this make a home better cared for?" },
];

export const ROADMAP = [
  { phase: "2026–27", title: "Deepen Gujarat", description: "Full coverage of tier-2 and tier-3 towns, vertical businesses scaled, AI platform generalised." },
  { phase: "2027–28", title: "National scale", description: "Mumbai, Pune, Delhi NCR, Bengaluru and 20 more metros live with franchise operations." },
  { phase: "2028–30", title: "Global standard", description: "International pilot, robotics-assisted service trials and a public market readiness path." },
];

export const FOUNDER = {
  name: "Rohan Trivedi",
  role: "Founder & Chief Executive Officer",
  intro:
    "Rohan founded Brancho in 2019 after watching his parents struggle to find a trustworthy plumber in Junagadh. A former infrastructure engineer, he built the company on a simple conviction: Indian homes deserve the same reliability and dignity as any other consumer service.",
  story: [
    "It began as a weekend problem — a leaking bathroom and a string of unavailable, unverified repairmen. Rohan and his co-founders rented a single van, hired three professionals, and personally accompanied the first hundred visits to learn what trust really meant.",
    "The insight that shaped Brancho: customers weren't looking for a technician, they were looking for certainty. So Brancho built verification, transparent pricing and a quality guarantee into the core of the product.",
    "Today Rohan leads a team of 200+ across technology, operations and field leadership, still spending every month on the ground — meeting professionals, sitting in on services and listening to customers.",
  ],
  principles: [
    "Trust is earned in the details.",
    "Professionals are partners, not resources.",
    "Build for the long term, report honestly.",
    "Obsess over the last 1% of every service.",
  ],
  qa: {
    question: "What does 'home, perfectly taken care of' mean to you?",
    answer:
      "It means a family never has to wonder who will fix the AC in July, or whether the person entering their home is safe. It means a professional is treated with dignity and paid fairly. Perfect care is quiet — it's when nothing needs worrying about.",
  },
};

export const LEGAL_FAQ_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/legal/refund-policy" },
  { label: "Cancellation Policy", href: "/legal/cancellation-policy" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
];

export const BRANCHES = [
  { city: "Junagadh", status: "HQ", since: "2019" },
  { city: "Rajkot", status: "Live", since: "2020" },
  { city: "Veraval", status: "Live", since: "2021" },
];

export const SEARCHABLE_PAGES = [
  { title: "Home", path: "/", description: "India's trusted home services platform" },
  { title: "Services", path: "/services", description: "AC cleaning, deep cleaning, electrician, plumbing and more" },
  { title: "How It Works", path: "/how-it-works", description: "Five simple steps from booking to completion" },
  { title: "Mobile App", path: "/app", description: "Customer and partner apps" },
  { title: "Cities", path: "/cities", description: "Where Brancho is live today" },
  { title: "Careers", path: "/careers", description: "Build the future with us" },
  { title: "Contact", path: "/contact", description: "Reach our teams" },
  { title: "Privacy Policy", path: "/privacy", description: "How we protect your data" },
  { title: "Terms & Conditions", path: "/terms", description: "Terms of service" },
  { title: "Refund Policy", path: "/legal/refund-policy", description: "When and how refunds work" },
  { title: "Cancellation Policy", path: "/legal/cancellation-policy", description: "How bookings can be cancelled" },
  { title: "Cookie Policy", path: "/legal/cookie-policy", description: "How we use cookies" },
  { title: "Businesses", path: "/businesses", description: "Brancho Water, Home Care, Urgent Care and more" },
  { title: "Founder", path: "/founder", description: "Meet Rohan Trivedi" },
  { title: "Newsroom", path: "/newsroom", description: "Press and announcements" },
  { title: "FAQs", path: "/faqs", description: "Frequently asked questions" },
  { title: "Brand Guidelines", path: "/brand-guidelines", description: "How to use the Brancho brand" },
  { title: "Media Gallery", path: "/media/gallery", description: "Photos of our work and people" },
  { title: "Media Videos", path: "/media/videos", description: "Brand films and product videos" },
  { title: "Press Resources", path: "/media/press", description: "Assets for journalists" },
  { title: "Download Center", path: "/downloads", description: "Brand book, brochures, reports" },
  { title: "Legal & Registrations", path: "/legal", description: "GST, MSME, FSSAI and more" },
  { title: "Sitemap", path: "/sitemap", description: "Full index of pages" },
  { title: "Brancho Water", path: "/businesses/water", description: "Water services and RO care" },
  { title: "Brancho Home Care", path: "/businesses/home-care", description: "Home care plans and cleaning" },
  { title: "Brancho Urgent Care", path: "/businesses/urgent-care", description: "24 × 7 emergency response" },
  { title: "MyFamNest", path: "/businesses/myfamnest", description: "Connected family home" },
  { title: "Brancho Students", path: "/businesses/students", description: "Student living services" },
  { title: "Brancho Foundation", path: "/future/foundation", description: "Our not-for-profit arm" },
  { title: "Investor Relations", path: "/future/investors", description: "Governance and reporting" },
];

export const MEDIA_GALLERY = [
  { src: "/about.svg", title: "Deep cleaning in action", category: "Services" },
  { src: "/hero-poster.svg", title: "Our professionals on site", category: "People" },
  { src: "/about.svg", title: "Brancho Water RO service", category: "Businesses" },
  { src: "/hero-poster.svg", title: "The Brancho uniform", category: "People" },
  { src: "/about.svg", title: "Kitchen detailing", category: "Services" },
  { src: "/hero-poster.svg", title: "Monsoon readiness drive", category: "Events" },
];

export const MEDIA_VIDEOS = [
  { id: "brand-film", title: "Brancho — Home, Perfectly Taken Care Of.", duration: "1:30", category: "Brand Film" },
  { id: "how-it-works", title: "How a Brancho visit works in 60 seconds", duration: "0:60", category: "Explainer" },
  { id: "water-story", title: "Every drop tested — inside Brancho Water", duration: "2:15", category: "Business" },
  { id: "founder-story", title: "Rohan Trivedi on why Brancho exists", duration: "3:00", category: "Founder" },
  { id: "urgent-care", title: "60-minute response — Brancho Urgent Care", duration: "1:10", category: "Business" },
  { id: "impact-report", title: "Our 2026 impact report in 90 seconds", duration: "1:30", category: "Impact" },
];

export const PRESS = [
  {
    outlet: "The Economic Times",
    title: "Home services platform Brancho crosses 100,000 customers in Gujarat",
    date: "July 2026",
    type: "Feature",
  },
  {
    outlet: "YourStory",
    title: "How Brancho built trust in home services, one verification at a time",
    date: "June 2026",
    type: "Startup Story",
  },
  {
    outlet: "Entrepreneur India",
    title: "From one van to 5,000 professionals: the Brancho playbook",
    date: "May 2026",
    type: "Interview",
  },
  {
    outlet: "Gujarat Samachar",
    title: "Junagadh-born Brancho expands urgent home care across Gujarat",
    date: "March 2026",
    type: "News",
  },
  {
    outlet: "YourStory",
    title: "This startup is putting a 5-point verification behind every home visit",
    date: "February 2026",
    type: "Feature",
  },
  {
    outlet: "Inc42",
    title: "Brancho sets its sights on a national home-services standard",
    date: "January 2026",
    type: "Interview",
  },
];

export const FAQS_EXTRA = [
  { q: "How are Brancho professionals verified?", a: "Every professional passes identity verification, police background checks, address confirmation, a skill assessment and in-person training before joining. Verification is refreshed periodically." },
  { q: "What does Brancho charge?", a: "Pricing is upfront and transparent. You see the exact cost before confirming, based on service, location and job size. No hidden charges." },
  { q: "Which cities are you live in?", a: "Veraval, Rajkot and Junagadh today, with more cities on our roadmap." },
  { q: "How do I become a service partner?", a: "Download the Brancho Partner app, complete your profile and pass our verification and skill assessment. Once approved, you get training, a uniform and weekly payouts." },
  { q: "Is there a warranty on services?", a: "Selected services carry a workmanship warranty of up to 90 days. If the same issue recurs, we fix it free." },
  { q: "What if I'm not satisfied?", a: "We'll send a professional back at no cost, or issue a refund — whichever you prefer." },
  { q: "How do refunds work?", a: "Refunds for cancellations or quality issues are processed within 5–7 working days to the original payment method or Brancho wallet. See the Refund Policy." },
  { q: "Do you offer emergency services?", a: "Yes — Brancho Urgent Care guarantees a 60-minute response for emergencies, 24 × 7." },
  { q: "Can I pay in cash?", a: "Yes. Pay online via UPI, cards or wallets, or pay by cash on completion where available." },
  { q: "How do I contact support?", a: "Email support@brancho.in, call 1800 123 4567, or use live chat — our team answers in minutes." },
];
