import { asset } from "./assets";
export const profile = {
  name: "Ethan Barman",
  firstName: "Ethan",
  role: "Co-Founder & CEO, Hostizzy",
  email: "admin@hostsphereindia.com",
  linkedin: "https://www.linkedin.com/in/ethanbarman",
  bio: "Founder, operator, and hands-on builder. Bringing hospitality experience and thoughtful technology together to make travel feel more human.",
};
export const sources = {
  hostizzy: "https://www.hostizzy.com/about",
  investor: "https://invest.hostizzy.com/",
  linkedin: "https://www.linkedin.com/in/ethanbarman",
  building:
    "https://www.linkedin.com/posts/ethanbarman_hospitality-ai-innovation-activity-7384800347036430336-Z6y7",
  agentic:
    "https://www.linkedin.com/posts/ethanbarman_ai-agentic-emergent-activity-7391221303179079680-0wqT",
};
export const apps = [
  { id: "about", name: "About Me", icon: "UserRound", color: "blue" },
  { id: "work", name: "Work", icon: "Folder", color: "pink" },
  { id: "journey", name: "Journey", icon: "Mountain", color: "green" },
  { id: "ideas", name: "Ideas", icon: "Lightbulb", color: "yellow" },
  { id: "writing", name: "Writing", icon: "FileText", color: "purple" },
  { id: "contact", name: "Contact", icon: "Send", color: "coral" },
  { id: "resume", name: "Resume", icon: "FileText", color: "cyan" },
];
export const projects = [
  {
    id: "hostizzy",
    name: "Hostizzy",
    type: "Hospitality & operations",
    year: "Ongoing",
    color: "#f3d9d5",
    tag: "Every property has a story.",
    description:
      "A vacation rental management company that puts each property’s individual identity first. Technology and local operations support personal guest experiences across India.",
    role: "Co-Founder & CEO · Company vision, product strategy, technology, and client relationships",
    result:
      "An operating hospitality business supported by in-house technology, property partnerships, and guest service teams.",
    features: [
      "Property-first hospitality",
      "Personalized management",
      "Technology-driven operations",
    ],
    url: "https://www.hostizzy.com",
    source: sources.hostizzy,
    image: asset("projects/hostizzy.webp"),
  },
  {
    id: "juxtravel",
    name: "JuxTravel",
    type: "Travel technology",
    year: "2026",
    color: "#dce8df",
    tag: "Find the trip that fits.",
    description:
      "A travel platform for India’s independent homestays and villas. It helps travellers understand fit, practical trade-offs, and the real picture before booking.",
    role: "Founder-led product strategy · Hostsphere India’s travel platform",
    result:
      "Launched across India on 15 September 2026, with an Android app and a traveller Passport for trips and memories.",
    features: [
      "Jux Fit stay discovery",
      "Reality checks before booking",
      "Travel planning and a personal Passport",
    ],
    url: "https://www.juxtravel.com",
    source: "https://www.juxtravel.com",
    image: asset("projects/juxtravel.webp"),
  },
  {
    id: "resiq",
    name: "ResIQ",
    type: "Hospitality software",
    year: "Ongoing",
    color: "#ddd9f4",
    tag: "Built for the people on the ground.",
    description:
      "Hostizzy’s reservation management product brings bookings, property information, and operating insights into a mobile-first workspace.",
    role: "Founder-led product development · AI-assisted building",
    result:
      "Described publicly as used for live reservations and daily operations, with multi-property management and real-time analytics.",
    features: [
      "Mobile-first reservation workflows",
      "Multi-property management",
      "Operational dashboards",
    ],
    url: "https://resiq.hostizzy.com",
    source: sources.building,
    image: asset("projects/resiq.webp"),
  },
  {
    id: "hostos",
    name: "HostOS",
    type: "Hospitality software",
    year: "Ongoing",
    color: "#dbe4ed",
    tag: "The operating layer for hospitality.",
    description:
      "HostSuite, at the HostOS domain, is a property management platform for Indian vacation rentals, homestays, and boutique hotels. It brings bookings, guests, payments, and team workflows together.",
    role: "Founder-led product vision and AI-assisted development",
    result:
      "A live product with dedicated guest and owner portals, OTA reservation workflows, and tools for day-to-day property operations.",
    features: [
      "Bookings and calendar synchronization",
      "WhatsApp and AI-assisted guest communication",
      "Guest and property-owner portals",
    ],
    url: "https://hostos.hostizzy.com/",
    source: "https://hostos.hostizzy.com/",
    image: asset("projects/hostos.webp"),
  },
  {
    id: "deshboard",
    name: "Deshboard",
    type: "Civic technology",
    year: "Ongoing",
    color: "#e9e2ce",
    tag: "The pulse of India, backed by evidence.",
    description: "A public-data dashboard that makes India’s everyday conditions easier to explore. It connects cost of living, jobs, weather, air quality, public money, and accountability with named sources and clear methodology.",
    role: "Independent project · Product and public-data experience",
    result: "A live bilingual website with national and local views, representative information, source links, and visible data freshness.",
    features: ["India-wide and local data views", "English and Hindi navigation", "Source transparency and methodology"],
    url: "https://deshboard.co.in/",
    source: "https://deshboard.co.in/",
    image: asset("projects/deshboard.webp"),
  },
];
export const notes = [
  {
    title: "Building hospitality technology with AI",
    date: "From LinkedIn",
    preview: "Domain experience, clear problems, and the willingness to build.",
    url: sources.building,
    body: [
      "In a public build update, Ethan described creating hospitality systems with AI tools and a focused understanding of the operational problems.",
      "The work covered reservations, guest management, team workflows, and analytics. His central point: domain knowledge and clarity can give founders a practical starting point for building software.",
      "This is an editorial summary of the original post. Follow the source below for Ethan’s own words.",
    ],
  },
  {
    title: "Agentic platforms: promise and practice",
    date: "From LinkedIn",
    preview: "What matters is a working product, not a convincing demo.",
    url: sources.agentic,
    body: [
      "Ethan’s follow-up compared the promise of autonomous product builders with his own hands-on experience of AI-assisted development.",
      "He emphasized working functionality, useful context, and iteration over surface-level output. His perspective centers collaboration between experienced people and capable tools.",
      "This is an editorial summary of the original post, rather than a newly authored article.",
    ],
  },
  {
    title: "A property-first approach to hospitality",
    date: "From Hostizzy",
    preview: "The stay should be remembered for its own character.",
    url: sources.hostizzy,
    body: [
      "Hostizzy’s public story puts the property’s identity at the heart of its approach. Each stay is intended to feel individual rather than like a uniform extension of a management brand.",
      "The model combines tailored property strategies with operational support and personal service.",
      "Read the company story below for the original perspective and more detail.",
    ],
  },
];
