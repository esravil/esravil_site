'use client';

import Link from 'next/link';
import { Background } from '@/components/crypto-matrix';
import { Rss, Map, Github, Twitter, Mail, BookOpen } from 'lucide-react';

interface HomeClientProps {
  additionalLines: number;
}

export function HomeClient({ additionalLines }: HomeClientProps) {
  return (
    <div id="new" className="relative bg-white text-black min-h-[100dvh] select-none">
      <Background />
      {/* Minimalist layout - content positioned without bulky containers */}
      <div className="min-h-[100dvh]">
        <div className="flex">
          <main
            className="relative z-10 pt-16 md:ml-16 lg:ml-24 xl:ml-32 pointer-events-none select-text"
            role="main"
            aria-label="Main content"
          >
          {/* Sticky header with minimal padding */}
          <div className="sticky top-0 z-50 py-2 px-8 sm:px-12 pointer-events-none">
            <Link href="/" className="text-lg font-mono w-fit pointer-events-auto hover:text-gray-600 transition-colors">
              esravil ~
            </Link>
          </div>


          {/* Content sections with minimal containers */}
          <div className="mt-6 px-8 sm:px-12 pointer-events-none">
            <p className="text-lg font-mono w-fit pointer-events-auto">% cat about.txt</p>
            <div className="text-lg text-gray-600 ml-4 mt-2 pointer-events-none">
              <p className="w-fit max-w-2xl pointer-events-auto">
                Hey I&apos;m esravil. I like to make cool things. I&apos;m
                fond of distributed systems and solving difficult problems.
                Previously, I interned at Google and some other cool places.
              </p>
            </div>
            <div className="ml-4 mt-2 pointer-events-none">
              <Link
                href="/about"
                className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded text-sm no-underline transition-colors w-fit pointer-events-auto"
              >
                [+{additionalLines} lines]
              </Link>
            </div>
          </div>

          {/* Projects section */}
          <div className="mt-8 px-8 sm:px-12 pointer-events-none">
            <p className="text-lg font-mono w-fit pointer-events-auto">% ls projects/</p>
            {/* <div className="text-lg text-gray-600 ml-4 mt-2 pointer-events-none">
              <p className="w-fit max-w-2xl pointer-events-auto">
                Some things I've built and worked on.
              </p>
            </div> */}

            {/* Project links */}
            <div className="mt-3 ml-4 pointer-events-none">
              <ul className="list-none space-y-1">
                <li className="w-fit pointer-events-none">
                  <Link
                    href="https://haters.me"
                    className="text-gray-600 transition-colors w-fit pointer-events-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="haters.me"
                  >
                    <span className="hover:text-white hover:bg-black underline w-fit">haters.me</span>
                  </Link>
                  <span className="text-gray-500 text-sm ml-2 pointer-events-none">
                    — bet on yourself to achieve a goal; if not, you lose money
                  </span>
                </li>
                <li className="w-fit pointer-events-none">
                  <Link
                    href="https://pinata.fun"
                    className="text-gray-600 transition-colors w-fit pointer-events-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="pinata.fun"
                  >
                    <span className="hover:text-white hover:bg-black underline w-fit">pinata.fun</span>
                  </Link>
                  <span className="text-gray-500 text-sm ml-2 pointer-events-none">
                    — investing platform, CSGO skins + cases ETF on solana
                  </span>
                </li>
              </ul>
            </div>

            {/* Social links / Contact (text labels, one per row) */}
            <div className="mt-8 ml-4 pointer-events-none">
              <div className="flex flex-col gap-1 w-fit pointer-events-none">

                <span className="text-gray-600 pointer-events-auto flex items-center gap-2" title="Email">
                  <Mail className="h-4 w-4" />
                  esravil99 [at] gmail [dot] com
                </span>

                <Link
                  href="https://twitter.com/esravil"
                  className="text-gray-600 transition-colors w-fit pointer-events-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter"
                >
                  <span className="hover:text-white hover:bg-black underline flex items-center gap-2 w-fit">
                    <Twitter className="h-4 w-4" />
                    twitter
                  </span>
                </Link>
                <Link
                  href="https://github.com/esravil"
                  className="text-gray-600 transition-colors w-fit pointer-events-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <span className="hover:text-white hover:bg-black underline flex items-center gap-2 w-fit">
                    <Github className="h-4 w-4" />
                    github
                  </span>
                </Link>
                <Link
                  href="/blog"
                  className="text-gray-600 transition-colors w-fit pointer-events-auto"
                  title="Blog"
                >
                  <span className="hover:text-white hover:bg-black underline flex items-center gap-2 w-fit">
                    <BookOpen className="h-4 w-4" />
                    blog
                  </span>
                </Link>
              </div>
            </div>

            {/* RSS and Sitemap icons only */}
            <div className="flex items-center gap-4 mt-8 ml-4 w-fit pointer-events-none">
              <Link
                href="/feed.xml"
                className="text-gray-600 hover:text-black transition-colors w-fit h-fit pointer-events-auto"
                title="RSS Feed"
              >
                <Rss className="h-5 w-5" />
                <span className="sr-only">RSS Feed</span>
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-gray-600 hover:text-black transition-colors w-fit h-fit pointer-events-auto"
                title="Sitemap"
              >
                <Map className="h-5 w-5" />
                <span className="sr-only">Sitemap</span>
              </Link>
            </div>
          </div>



          {/* Links with minimal spacing - aligned with content */}
          {/* <div className="flex items-center gap-4 mt-8 ml-4 px-8 sm:px-12 w-fit pointer-events-none">
            <Link
              href="/feed.xml"
              className="text-gray-600 hover:text-black transition-colors w-fit h-fit pointer-events-auto"
              title="RSS Feed"
            >
              <Rss className="h-5 w-5" />
              <span className="sr-only">RSS Feed</span>
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-gray-600 hover:text-black transition-colors w-fit h-fit pointer-events-auto"
              title="Sitemap"
            >
              <Map className="h-5 w-5" />
              <span className="sr-only">Sitemap</span>
            </Link>
          </div> */}
          </main>

        </div>
      </div>
    </div>
  );
}
