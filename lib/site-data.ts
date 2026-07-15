export const navItems = [
  { label: "Episodes", href: "#episodes" },
  { label: "Themes", href: "#themes" },
  { label: "Guests", href: "#guests" },
  { label: "Transcripts", href: "#transcripts" },
] as const

export const topics = [
  { label: "Climate finance", slug: "climate-finance" },
  { label: "Clean energy", slug: "clean-energy" },
  { label: "Circularity", slug: "circularity" },
  { label: "Food systems", slug: "food-systems" },
] as const

export const featuredEpisode = {
  title: "Financing the next wave of African climate ventures",
  guest: "Dr. Amara Osei",
  role: "Climate finance lead, Nairobi",
  duration: "42 min",
  description:
    "A conversation on patient capital, local innovation, and what it takes to move solutions from pilots into durable markets.",
  guestImage:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  platforms: [
    { label: "Spotify", href: "https://open.spotify.com" },
    { label: "Apple Podcasts", href: "https://podcasts.apple.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
}

export const episodePreviews = [
  {
    title: "Grid-ready solar for peri-urban clinics",
    guest: "James Mwangi",
    duration: "38 min",
    topic: "Clean energy",
  },
  {
    title: "Circular plastics in East African ports",
    guest: "Fatima Hassan",
    duration: "51 min",
    topic: "Circularity",
  },
  {
    title: "Policy pathways for climate-smart agriculture",
    guest: "Samuel Adeyemi",
    duration: "44 min",
    topic: "Food systems",
  },
]

export const guestPreviews = [
  {
    name: "Dr. Amara Osei",
    org: "Pan-African Climate Finance Network",
    quote: "Capital follows conviction when local teams own the roadmap.",
  },
  {
    name: "James Mwangi",
    org: "SolarGrid East Africa",
    quote: "Energy access is climate action you can hear in every ward.",
  },
  {
    name: "Fatima Hassan",
    org: "Coastal Circularity Lab",
    quote: "Waste streams are supply chains waiting to be redesigned.",
  },
]

export const waveformBars = [42, 68, 34, 86, 58, 74, 46, 92, 54, 78, 38, 64]
