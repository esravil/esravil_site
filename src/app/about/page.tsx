import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-20">
      <div className="w-full max-w-2xl">
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-left">
              esravil@MBP ~/about
            </h1>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">NYC, SF</span>
            </div>
          </div>
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <p className="text-lg font-mono">$ cat about.txt</p>
              <div className="text-lg text-muted-foreground ml-4 space-y-4">
                <p>
                  Hey I&apos;m esravil. I like to make cool things. I&apos;m fond of distributed systems and solving difficult problems. I didn&apos;t go to a t20 school, but I interned at Google and at the Solana Foundation.
                </p>
                
                <p>
                  I&apos;m passionate about building scalable systems and solving complex technical challenges. My experience spans from working on distributed systems at major tech companies to contributing to blockchain infrastructure.
                </p>
                
                <p>
                  When I&apos;m not coding, you&apos;ll find me pursuing various physical activities or diving deep into books about technology, finance, and personal development. I believe in continuous learning and pushing personal boundaries.
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-mono">$ cat interests.txt</p>
              <p className="text-lg text-muted-foreground ml-4">
                Hobby-maxxer: running, basketball, working out, biking, swimming, reading, investing, and creating things that convenience everyone.
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-mono">$ cat goals.txt</p>
              <p className="text-lg text-muted-foreground ml-4">
                Summit K2 and/or complete an Ironman. These challenges represent the intersection of physical endurance, mental fortitude, and meticulous preparation that I find compelling.
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-mono">$ cat experience.txt</p>
              <p className="text-lg text-muted-foreground ml-4">
                I&apos;ve had the opportunity to intern at Google and the Solana Foundation, where I worked on challenging problems in distributed systems and blockchain technology. These experiences shaped my understanding of building systems at scale.
              </p>
            </div>
            
            <div className="mt-8">
              <Link href="/" className="text-blue-600 hover:underline">← Back to home</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}