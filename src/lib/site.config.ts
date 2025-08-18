export const siteConfig = {
  name: 'esravil',
  description: "A NYC/SF tech bro who didn't go to a T20 school but interned at Google and the Solana Foundation. Systems programmer in Rust, fascinated with distributed systems and blockchain since mid-2024. Active in both SF tech and web3 Solana ecosystems. Hobby-maxxer: running, basketball, working out, biking, swimming, reading, investing, and creating things that convenience everyone. Life goals: summit K2 and/or complete an Ironman.",
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