export type PodcastEpisode = {
  id: string
  title: string
  duration: string
  published: string
  topic: string
  summary?: string
  featured?: boolean
}

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: "V-5lEJW47ZM",
    title: "Rethinking Development Finance: A Funder's Perspective | Peter Laugharn",
    duration: "39:33",
    published: "July 2026",
    topic: "Development finance",
    summary:
      "A candid funder's view on moving capital closer to African institutions, communities, and locally led priorities.",
    featured: true,
  },
  {
    id: "zdvmnZ_62dE",
    title: "Narratives as Africa's Development Tool | Moky Makura",
    duration: "21:30",
    published: "June 2026",
    topic: "Storytelling",
  },
  {
    id: "Nxw0TKiNnh4",
    title: "Watts to Wealth: Making Energy Work for Africa's Development | Carol Koech",
    duration: "29:26",
    published: "June 2026",
    topic: "Energy",
    summary:
      "Carol Koech connects reliable energy, productive economies, and the infrastructure Africa needs to create lasting wealth.",
    featured: true,
  },
  {
    id: "LDXtmcx7Sts",
    title: "Why Africa Must Bet on Itself | Kennedy Odede",
    duration: "29:03",
    published: "June 2026",
    topic: "African leadership",
  },
  {
    id: "u-N2DuPfqWE",
    title: "Efficient Appliances, Rural Transformation & Africa's Energy Future | Emmanuel Aziebor",
    duration: "42:17",
    published: "June 2026",
    topic: "Energy access",
  },
  {
    id: "ml1tnzdrlz8",
    title: "Africa United: Why Africans Must Move Forward Together | Ndidi Nwuneli",
    duration: "32:02",
    published: "June 2026",
    topic: "African leadership",
    summary:
      "Ndidi Nwuneli makes the case for a connected continent that builds markets, knowledge, and momentum together.",
    featured: true,
  },
  {
    id: "SntfM3fml8E",
    title: "Money, Markets and Mindsets: William Asiko on Africa's Development Pathways",
    duration: "31:54",
    published: "June 2026",
    topic: "Climate finance",
  },
  {
    id: "rCn-hLBGGrM",
    title: "From Waste to Wealth: Supporting Circular Economy Enterprises | Christine Mbaabu",
    duration: "41:50",
    published: "May 2026",
    topic: "Circular economy",
  },
  {
    id: "lP1P4ejPJns",
    title: "Turning Banana Trunks into Sanitary Pads: The EcoBana Story | Lennox Omondi",
    duration: "30:56",
    published: "May 2026",
    topic: "Climate innovation",
  },
  {
    id: "IjAAAQ03XvA",
    title: "Getting Funded: Navigating Climate Finance and Investor Expectations",
    duration: "20:38",
    published: "March 2026",
    topic: "Climate finance",
  },
  {
    id: "yTpVrOeH9Qc",
    title: "The Case for Energy Access and Efficiency in Africa | Martha Wakoli",
    duration: "23:11",
    published: "March 2026",
    topic: "Energy access",
  },
  {
    id: "j-QZj3h8yt0",
    title: "Africa's Green Future: Innovation, Entrepreneurship and Sustainability | Ernest Chitechi",
    duration: "37:59",
    published: "February 2026",
    topic: "Entrepreneurship",
  },
  {
    id: "8nPYrxyOT6g",
    title: "Carbon Markets 101: Africa's Green Gold | Joseph Wambugu",
    duration: "29:31",
    published: "February 2026",
    topic: "Carbon markets",
  },
  {
    id: "67g_BWUEeBI",
    title: "Africa's Climate Ambition: Renewable Energy and Adaptation | Joao Cunha",
    duration: "26:36",
    published: "February 2026",
    topic: "Renewable energy",
  },
  {
    id: "d5jJq3LN1tc",
    title: "Storytelling and Climate Action in Africa | Umuliza Njiru, Arik Karani & William Dekker",
    duration: "58:15",
    published: "January 2026",
    topic: "Storytelling",
  },
  {
    id: "yeBGRz16lkM",
    title: "Africa's Climate Economy: Business, Innovation and Local Solutions | Bankole Oloruntoba",
    duration: "40:29",
    published: "January 2026",
    topic: "Climate economy",
  },
  {
    id: "wA7P2Y3ZOao",
    title: "A Vision for Africa's Green Transition | Joseph Murabula",
    duration: "38:51",
    published: "December 2025",
    topic: "Green transition",
  },
]

export const featuredPodcastEpisodes = podcastEpisodes.filter(
  (episode) => episode.featured
)

export function getEpisodeUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`
}

export function getEpisodeThumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}
