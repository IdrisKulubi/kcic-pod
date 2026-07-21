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
  title: "Why launch a sustainability podcast in Africa, and why now?",
  description: [
    "Recorded live at the Sustainably Speaking Africa launch, this special conversation opens up what inspired the podcast and the role it hopes to play in shaping more grounded, African-led sustainability dialogue.",
    "The panel explores innovation, collaboration, and why lasting sustainability begins with local context, lived experience, and honest conversation.",
  ],
  moderator: "Tobias Belle",
  panelists: ["Umuliza M. Njiru", "Arik Karani", "William Dekker"],
  youtubeUrl: "https://www.youtube.com/watch?v=d5jJq3LN1tc&t=52s",
  embedUrl:
    "https://www.youtube-nocookie.com/embed/d5jJq3LN1tc?start=52&autoplay=1&rel=0",
  poster: "https://i.ytimg.com/vi/d5jJq3LN1tc/maxresdefault.jpg",
} as const

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

export const youtubeChannel = {
  handle: "@KenyaCIC",
  label: "Our YouTube Channel",
  url: "https://www.youtube.com/@KenyaClimateInnovationCenter",
} as const

export const waveformBars = [42, 68, 34, 86, 58, 74, 46, 92, 54, 78, 38, 64]
