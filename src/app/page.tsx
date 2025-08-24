import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-20">
      <div className="w-full max-w-2xl" role="main" aria-label="Main content">
        {/* Hero Section */}
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-left">
              esravil@MBP ~
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
              <p className="text-lg font-mono">$ ls -a</p>
              <div className="text-lg text-muted-foreground ml-4 space-y-1">
                <p>about.txt - Hey I&apos;m esravil. I like to make cool things. I&apos;m fond of distributed systems and solving difficult problems. I didn&apos;t go to a t20 school, but I interned at Google and at the Solana Foundation. <a href="/about" className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium ml-1 no-underline will-change-transform">more →</a></p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-mono">/interests</p>
              <div className="text-lg text-muted-foreground ml-4 space-y-1">
                <p>• Hobby-maxxer: running, basketball, working out, biking, swimming, reading, investing, and creating things that convenience everyone.</p>
                <p>• Life goals: summit K2 and/or complete an Ironman.</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-mono">/projects</p>
              <div className="text-lg text-muted-foreground ml-4">
                • Some of my{' '}
                <a href="#" className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-800 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  projects
                </a>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-mono">/writing</p>
              <div className="text-lg text-muted-foreground ml-4 flex flex-wrap items-center gap-2">
                • My{' '}
                <a href="#" className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-800 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.5 14.25V16.5a3 3 0 003 3h3a3 3 0 003-3V14.25M7.5 14.25V9a3 3 0 013-3h3a3 3 0 013 3v5.25M7.5 14.25h9"/>
                  </svg>
                  substack
                </a>{' '}
                and{' '}
                <Link href="/blog" className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-800 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v4.5a1.5 1.5 0 01-3 0V8a1 1 0 011-1z"/>
                  </svg>
                  blog
                </Link>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-mono">/contact</p>
              <div className="text-lg text-muted-foreground ml-4 flex flex-wrap items-center gap-2">
                • Connect:{' '}
                <a href="https://twitter.com/esravil" className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-800 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </a>{' '}
                <a href="mailto:esravil@example.com" className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-800 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
