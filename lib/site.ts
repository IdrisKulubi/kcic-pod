export const siteConfig = {
  name: "Sustainably Speaking Africa",
  shortName: "SSA",
  tagline: "The Living Frequency of Change",
  description:
    "Sustainably Speaking Africa is a KCIC podcast featuring African voices on climate finance, clean energy, circularity, food systems, entrepreneurship, and leadership.",
  keywords: [
    "Sustainably Speaking Africa",
    "KCIC podcast",
    "Africa climate podcast",
    "climate finance Africa",
    "clean energy Africa",
    "circular economy Africa",
    "African climate innovation",
    "Kenya Climate Innovation Center",
    "sustainability podcast",
  ],
  locale: "en_KE",
  language: "en",
  creator: "Kenya Climate Innovation Center",
  publisher: "Kenya Climate Innovation Center",
  email: "podcast@kcic.org",
  youtube: {
    handle: "@KenyaCIC",
    url: "https://www.youtube.com/@KenyaClimateInnovationCenter",
  },
  social: {
    youtube: "https://www.youtube.com/@KenyaClimateInnovationCenter",
  },
} as const

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (fromEnv) return fromEnv

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`
  }

  return "http://localhost:3000"
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl()
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}
