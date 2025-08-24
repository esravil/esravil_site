export const siteConfig = {
  name: 'esravil',
  description: "Founder and developer esravil. Former intern at Google and Solana Foundation, building scalable systems and solving complex problems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://esravil.dev',
  author: {
    name: 'esravil',
    email: 'esravil@example.com',
    github: 'rob82281',
    twitter: 'esravil',
    linkedin: '',
  },
  socials: {
    github: 'https://github.com/rob82281',
    twitter: 'https://twitter.com/esravil',
    linkedin: '',
    email: 'mailto:esravil@example.com',
  },
  navigation: [],
  analytics: {
    // Add analytics configuration here
    vercel: process.env.NODE_ENV === 'production',
  },
} as const;

export type SiteConfig = typeof siteConfig;