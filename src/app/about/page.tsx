import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen px-8 sm:px-12 md:px-16 lg:px-20 py-16">
      <div className="w-full max-w-2xl mx-auto">
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
              <p className="text-lg font-mono">% cat about.txt</p>
              <div className="text-lg text-muted-foreground ml-4 space-y-4">
                <p>
                  Hey I&apos;m esravil. I like to make cool things. I&apos;m fond of distributed systems and solving difficult problems. Previously, I interned at Google and at the Solana Foundation.
                </p>
                
                
                <h2 className="text-base font-mono text-foreground mt-6"># interests</h2>
                <ul className="ml-4 space-y-1">
                  <li>• gmk keycaps</li>
                  <li>• gym prs</li>
                  <li>• the art of zero-sum</li>
                  <li>• dwarkesh patel videos</li>
                </ul>
                
                <h2 className="text-base font-mono text-foreground mt-6"># dislikes</h2>
                <ul className="ml-4 space-y-1">
                  <li>• milk after cereal</li>
                  <li>• molly tea haters</li>
                  <li>• the tenderloin, SF</li>
                  <li>• the fact that i didn&apos;t buy eth in 2016</li>
                </ul>
                
                <h2 className="text-base font-mono text-foreground mt-6"># occupying my time</h2>
                <ul className="ml-4 space-y-1">
                  <li>• making this site</li>
                  <li>• optimizing my sleep schedule around usage limits of claude max, gpt5, and gork4 subscriptions</li>
                  <li>• psps cats in the wild</li>
                  <li>• &gt;= 60 vo2 max upkeep</li>
                </ul>
                
                <h2 className="text-base font-mono text-foreground mt-6"># things i&apos;m doing</h2>
                <ul className="ml-4 space-y-1">
                  <li>• learning rust</li>
                  <li>• codeforces / leetcode in rust</li>
                  <li>• creating solana dapps</li>
                  <li>• Creating mcp servers for super niche things / finding a way to minify context used by mcp servers</li>    

                </ul>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/" className="inline-flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded text-sm transition-colors no-underline">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}