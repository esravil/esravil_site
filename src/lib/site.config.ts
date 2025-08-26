export const siteConfig = {
  name: 'esravil',
  description: "Founder and developer esravil. Former intern at Google and Solana Foundation, building scalable systems and solving complex problems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://esravil.io',
  author: {
    name: 'esravil',
    email: 'esravil99@gmail.com',
    github: 'esravil',
    twitter: 'esravil',
    linkedin: '',
  },
  socials: {
    github: 'https://github.com/esravil',
    twitter: 'https://twitter.com/esravil',
    linkedin: '',
    email: 'mailto:esravil99@gmail.com',
  },
  navigation: [],
  analytics: {
    // Add analytics configuration here
    vercel: process.env.NODE_ENV === 'production',
  },
} as const;

export type SiteConfig = typeof siteConfig;