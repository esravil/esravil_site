import { siteConfig } from '@/lib/site.config';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-20">
      <div className="w-full max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="space-y-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-left">
            {siteConfig.name}
          </h1>
          <div className="space-y-6 text-left">
            <p className="text-lg text-muted-foreground">
              A NYC/SF tech bro who didn&apos;t go to a T20 school but interned at Google and the Solana Foundation. Systems programmer in Rust, fascinated with distributed systems and blockchain since mid-2024. Active in both SF tech and web3 Solana ecosystems.
            </p>
            
            <ul className="space-y-3 text-lg text-muted-foreground hero-list">
              <li>• Hobby-maxxer: running, basketball, working out, biking, swimming, reading, investing, and creating things that convenience everyone.</li>
              <li>• Life goals: summit K2 and/or complete an Ironman.</li>
              <li>• Some of my <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors underline">projects</a></li>
              <li>• My <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors underline">substack</a></li>
              <li>• Connect: <a href="https://twitter.com/esravil" className="text-blue-500 hover:text-blue-400 transition-colors underline">Twitter</a>, <a href="mailto:esravil@example.com" className="text-blue-500 hover:text-blue-400 transition-colors underline">Email</a></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
