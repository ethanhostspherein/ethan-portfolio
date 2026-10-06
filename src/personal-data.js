// Personal facts are owner-supplied or verified from the owner's public sources.
// Interests below follow the five themes in Ethan's supplied Still Building portrait.
export const personal = {
  interests: [
    { title: "Ideas", description: "Small questions that can turn into useful things." },
    { title: "Travel", description: "The world beyond the screen, and the people who make a stay memorable." },
    { title: "Tech", description: "Learning by building, from an experiment to a working product." },
    { title: "People", description: "The human side of hospitality, collaboration, and everyday experiences." },
    { title: "Impact", description: "Useful tools that make a difference in the real world." },
  ],
  hobbies: [
    { title: "Travel & discovery", icon: "Compass", description: "Getting out into the world and keeping a record of the places along the way." },
    { title: "Photography & stories", icon: "NotebookPen", description: "Sharing moments, perspectives, and stories through @staybuildtravel." },
    { title: "Creative AI experiments", icon: "Sparkles", description: "Trying prompts, visual ideas, and little experiments with ChatGPT." },
  ],
  places: [
    ...["Amritsar", "Manali", "McLeod Ganj", "Mukteshwar", "Kashmir", "Mumbai", "Haridwar", "Kolkata", "Guwahati"].map(name => ({ name, country: "India", story: "Part of my travels around India. A place in my personal journal, and a little more of the world beyond my work.", ownerSupplied: true })),
    { name: "Shimla", country: "India", year: "2025", story: "A page from the hills, shared on @staybuildtravel in November 2025. The reel says it simply: Shimla, with a little love.", source: "https://www.instagram.com/staybuildtravel/reel/DRQ8SUaE1Kf/" },
    { name: "Kainchi Dham", country: "India", year: "2026", story: "Another stop in the travel journal, shared in January 2026. The location-tagged photo keeps this little part of the journey on the record.", source: "https://www.instagram.com/staybuildtravel/p/DTQYxbBDF7R/" },
  ],
  socials: [{ name: "Instagram", url: "https://www.instagram.com/staybuildtravel/" }, { name: "GitHub", url: "https://github.com/Hostizzy" }],
  skills: [
    { title: "Languages & web foundations", tags: ["JavaScript", "TypeScript", "HTML", "CSS", "SQL"], description: "JavaScript and TypeScript across my Hostizzy repositories, with certified HTML and SQL foundations." },
    { title: "Frontend & product experience", tags: ["React", "Next.js", "Tailwind CSS", "Web UX"], description: "Responsive interfaces and usable workflows for the people running the business." },
    { title: "Data & backend services", tags: ["Firebase", "Supabase", "Node.js"], description: "Authentication, data, server-side integrations, and the operational layers behind my products." },
    { title: "AI-assisted development", tags: ["Claude", "ChatGPT", "Perplexity", "AI integrations"], description: "From understanding a real problem to building, testing, and iterating on working software." },
    { title: "Shipping & operations", tags: ["Git", "GitHub", "Vercel", "PWAs"], description: "Version control, deployment, and web apps that support real hospitality operations." },
    { title: "Quality & systems thinking", tags: ["Quality analysis", "Networking fundamentals", "Product strategy"], description: "Quality analyst experience at IBM, Google, and Airbnb, plus networking fundamentals and founder-led product decisions." },
  ],
  littleThings: [
    { title: "Always a work in progress", description: "Still Building is the note on my portrait. It feels right for this little corner of the internet, too." },
    { title: "One idea leads to another", description: "From hospitality operations to travel products and public data: Hostizzy, JuxTravel, HostOS, ResIQ, and Deshboard live in the Work folder." },
    { title: "A desktop with a playful side", description: "There’s a terminal to discover, a secret keyboard sequence, and now a couple of little games. Make yourself at home." },
  ],
};
