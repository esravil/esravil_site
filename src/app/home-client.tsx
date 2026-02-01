'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Background } from '@/components/crypto-matrix';
import {
  ArrowUpRight,
  BookOpen,
  Github,
  Mail,
  Rss,
  Twitter,
} from 'lucide-react';

interface HomeClientProps {
  additionalLines: number;
}

export function HomeClient({ additionalLines }: HomeClientProps) {
  const year = new Date().getFullYear();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const navSlotRef = useRef<HTMLDivElement | null>(null);

  // Fixed, clipped layers so the matrix doesn't scroll but still appears inside the panel.
  const panelBgRef = useRef<HTMLDivElement | null>(null);
  const matrixMaskRef = useRef<HTMLDivElement | null>(null);

  // Prevent iOS-style rubber-band overscroll at the top/bottom of the page
  useEffect(() => {
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY ?? 0;
      const deltaY = currentY - startY;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const atTop = window.scrollY <= 0;
      const atBottom = window.scrollY >= Math.max(0, maxScroll - 1);

      // pulling down at top OR pulling up at bottom => block bounce
      if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // Fixed footer + masking-style reveal (bottom-first), while the main content panel
  // moves up/down live based on scroll proximity to bottom (no easing / no bounce).
  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    const panelBg = panelBgRef.current;
    const matrixMask = matrixMaskRef.current;
    if (!footer || !content || !panelBg || !matrixMask) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));

    const updateClips = (cornerRadius: number) => {
      const rect = content.getBoundingClientRect();
      const vh = window.innerHeight;

      // Convert the panel rect into inset() values relative to the viewport.
      const top = Math.max(0, rect.top);
      const left = 0;
      const right = 0;
      const bottom = Math.max(0, vh - rect.bottom);

      // Bottom corners should match the content panel radius.
      const r = Math.max(0, cornerRadius);
      const clip = `inset(${top}px ${right}px ${bottom}px ${left}px round 0px 0px ${r}px ${r}px)`;

      panelBg.style.clipPath = clip;
      // Safari
      // @ts-expect-error: webkitClipPath is supported in browsers
      panelBg.style.webkitClipPath = clip;

      matrixMask.style.clipPath = clip;
      // Safari
      // @ts-expect-error: webkitClipPath is supported in browsers
      matrixMask.style.webkitClipPath = clip;
    };

    let raf = 0;

    const apply = () => {
      raf = 0;

      const footerH = footer.getBoundingClientRect().height;

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const distanceToBottom = Math.max(0, maxScroll - window.scrollY);

      // Reveal within the last footer height of scroll.
      // revealPx: 0 -> footer hidden, footerH -> fully revealed
      const revealPx = clamp(footerH - distanceToBottom, 0, footerH);

      // Base radius driven by footer reveal, but we only render the curved edge when the
      // panel’s bottom edge is actually visible in the viewport. This prevents the curve
      // from "sticking" to the viewport bottom while the panel scrolls away.
      const desiredRadius = clamp(revealPx, 0, 18);

      if (prefersReducedMotion) {
        footer.style.clipPath = 'inset(0% 0 0 0)';
        // Safari
        // @ts-expect-error: webkitClipPath is supported in browsers
        footer.style.webkitClipPath = 'inset(0% 0 0 0)';
        content.style.transform = 'translate3d(0, 0, 0)';

        // Keep panel corners consistent.
        content.style.borderBottomLeftRadius = '18px';
        content.style.borderBottomRightRadius = '18px';

        // Keep fixed background layers aligned to the panel.
        updateClips(18);
        return;
      }

      // Bottom-first reveal: reduce TOP inset from 100% -> 0%
      const topInsetPct = footerH > 0 ? (1 - revealPx / footerH) * 100 : 100;
      const clip = `inset(${topInsetPct}% 0 0 0)`;

      footer.style.clipPath = clip;
      // Safari
      // @ts-expect-error: webkitClipPath is supported in browsers
      footer.style.webkitClipPath = clip;

      // Translate first so the rect we read reflects the current visual position.
      content.style.transform = `translate3d(0, ${-Math.max(0, revealPx - desiredRadius)}px, 0)`;

      // Fade the corner radius out as the panel bottom scrolls below the viewport.
      // This avoids awkward gaps when scrolling up from the bottom (rounded -> square transition is continuous).
      const rectAfterTransform = content.getBoundingClientRect();
      const overlap = rectAfterTransform.bottom - window.innerHeight; // > 0 when bottom is below viewport

      const visibleRadius = clamp(desiredRadius - Math.max(0, overlap), 0, desiredRadius);

      content.style.borderBottomLeftRadius = `${visibleRadius}px`;
      content.style.borderBottomRightRadius = `${visibleRadius}px`;

      // After positioning, align fixed layers to the (possibly translated) panel bounds.
      updateClips(visibleRadius);
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(apply);
    };

    footer.style.willChange = 'clip-path';
    content.style.willChange = 'transform';
    panelBg.style.willChange = 'clip-path';
    matrixMask.style.willChange = 'clip-path';

    // Initial hidden footer (reveals bottom-first)
    if (!prefersReducedMotion) {
      footer.style.clipPath = 'inset(100% 0 0 0)';
      // Safari
      // @ts-expect-error: webkitClipPath is supported in browsers
      footer.style.webkitClipPath = 'inset(100% 0 0 0)';
      content.style.transform = 'translate3d(0, 0, 0)';
    }

    schedule();

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => schedule());
      ro.observe(footer);
      ro.observe(content);
      ro.observe(document.documentElement);
      if (document.body) ro.observe(document.body);
    }

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) window.cancelAnimationFrame(raf);
      ro?.disconnect();
      footer.style.willChange = '';
      content.style.willChange = '';
      panelBg.style.willChange = '';
      matrixMask.style.willChange = '';
    };
  }, []);

  // Keep the left nav pinned to the viewport (even while the main panel translates for footer reveal).
  useEffect(() => {
    const slot = navSlotRef.current;
    if (!slot) return;

    const update = () => {
      const rect = slot.getBoundingClientRect();
      document.documentElement.style.setProperty('--home-nav-left', `${rect.left}px`);
      document.documentElement.style.setProperty('--home-nav-width', `${rect.width}px`);
    };

    update();

    window.addEventListener('resize', update, { passive: true });

    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => update());
      ro.observe(slot);
    }

    return () => {
      window.removeEventListener('resize', update);
      ro?.disconnect();
    };
  }, []);

  return (
    <div
      id="new"
      className="relative min-h-[100dvh] bg-[linear-gradient(to_bottom,_#ffffff_0%,_#ffffff_calc(100%-140px),_#f9fafb_calc(100%-140px),_#f9fafb_100%)] text-black select-none [--footer-reveal-h:clamp(320px,36vh,520px)]"
    >
      {/* Fixed clipped white panel fill (replaces the panel's bg-white so the matrix can be fixed behind content). */}
      <div
        ref={panelBgRef}
        aria-hidden
        className="fixed inset-0 z-[1] pointer-events-none bg-white"
        style={{
          clipPath: 'inset(0 0 0 0 round 0px 0px 18px 18px)',
          // Safari
          WebkitClipPath: 'inset(0 0 0 0 round 0px 0px 18px 18px)',
        }}
      />

      {/* Fixed clipped crypto matrix layer (does not scroll). */}
      <div
        ref={matrixMaskRef}
        aria-hidden
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          clipPath: 'inset(0 0 0 0 round 0px 0px 18px 18px)',
          // Safari
          WebkitClipPath: 'inset(0 0 0 0 round 0px 0px 18px 18px)',
        }}
      >
        <Background />
      </div>

      {/* Fixed left nav (pinned for the entire scroll). */}
      <div
        className="hidden lg:block fixed top-44 lg:top-48 z-20 pointer-events-none"
        style={{
          left: 'var(--home-nav-left, 0px)',
          width: 'var(--home-nav-width, 180px)',
        }}
      >
        <div className="pointer-events-auto">
          <div className="flex flex-col gap-5 text-sm">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-base font-mono w-fit hover:text-gray-600 transition-colors"
                aria-label="Home"
              >
                esravil
              </Link>
            </div>

            <nav className="flex flex-col gap-2 text-gray-600">
              <a href="#top" className="w-fit hover:text-black transition-colors">
                Home
              </a>
              <a href="#projects" className="w-fit hover:text-black transition-colors">
                Projects
              </a>
              <a href="#writing" className="w-fit hover:text-black transition-colors">
                Writing
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content panel (moves up as the footer reveals). Rounded bottom edges for a seamless join. */}
      <div
        ref={contentRef}
        className="relative z-10 pointer-events-none min-h-[100dvh] bg-transparent rounded-b-[18px] overflow-hidden border-x border-b border-black/10"
      >
        {/* Main two-column layout */}
        <div className="relative z-10 mx-auto w-full px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.4fr)_180px_minmax(0,0.15fr)_minmax(0,40rem)_minmax(0,1fr)] gap-y-14 lg:gap-y-24">
            {/* Left fixed/sticky nav */}
            <aside
              className="hidden lg:block pt-44 lg:pt-48 lg:col-start-2"
              aria-hidden="true"
            >
              <div ref={navSlotRef} className="w-full h-px opacity-0 pointer-events-none" />
            </aside>

            {/* Right content column */}
            <main
              id="top"
              className="pt-44 lg:pt-48 pb-24 select-text lg:col-start-4"
              role="main"
              aria-label="Main content"
            >
              {/* Hero / intro (aligned to mimic screenshot spacing) */}
              <section className="max-w-4xl">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[0.95]">
                  Building
                  <br />
                  scalable systems
                  <br />
                  in public
                </h1>

                <div className="mt-10 text-lg text-gray-600 space-y-6 max-w-3xl">
                  <p className="pointer-events-auto">
                    Hey I&apos;m esravil. I like to make cool things. I&apos;m fond of distributed
                    systems and solving difficult problems. Previously, I interned at Google and
                    some other cool places.
                  </p>
                  <p className="text-black pointer-events-auto">To start, here are a few things.</p>
                </div>

                <div className="mt-8 pointer-events-auto">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded text-sm no-underline transition-colors w-fit"
                  >
                    [+{additionalLines} lines]
                  </Link>
                </div>
              </section>

              <div className="mt-16 border-t border-black/10 max-w-4xl" />

              {/* 01 Projects */}
              <section id="projects" className="mt-16 max-w-4xl">
                <div className="text-sm text-gray-500">01</div>
                <h2 className="mt-4 text-2xl font-semibold">Projects</h2>

                <p className="mt-4 text-lg text-gray-600 pointer-events-auto max-w-3xl">
                  A couple things I&apos;ve built recently. (Keeping it lightweight—more will show up
                  here over time.)
                </p>

                <div className="mt-6 pointer-events-none">
                  <ul className="list-none space-y-3">
                    <li className="pointer-events-none">
                      <Link
                        href="https://haters.me"
                        className="pointer-events-auto text-gray-700 hover:text-black transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="haters.me"
                      >
                        <span className="underline underline-offset-2 hover:bg-black hover:text-white px-1 rounded-sm">
                          haters.me
                        </span>
                      </Link>
                      <span className="ml-2 text-gray-500 text-sm pointer-events-none">
                        — bet on yourself to achieve a goal; if not, you lose money
                      </span>
                    </li>

                    <li className="pointer-events-none">
                      <Link
                        href="https://pinata.fun"
                        className="pointer-events-auto text-gray-700 hover:text-black transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="pinata.fun"
                      >
                        <span className="underline underline-offset-2 hover:bg-black hover:text-white px-1 rounded-sm">
                          pinata.fun
                        </span>
                      </Link>
                      <span className="ml-2 text-gray-500 text-sm pointer-events-none">
                        — investing platform, CSGO skins + cases ETF on solana
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Placeholder "card" image (to mimic the scrollable media blocks) */}
                <div className="mt-10 pointer-events-auto overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-sm">
                  <img
                    src="/placeholders/placeholder-graph.svg"
                    alt=""
                    className="w-full h-auto block"
                  />
                  <div className="flex items-center justify-between px-6 py-4 text-sm">
                    <span className="text-gray-600">A tiny dashboard mock</span>
                    <ArrowUpRight className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
              </section>

              <div className="mt-16 border-t border-black/10 max-w-4xl" />

              {/* 02 Writing */}
              <section id="writing" className="mt-16 max-w-4xl">
                <div className="text-sm text-gray-500">02</div>
                <h2 className="mt-4 text-2xl font-semibold">Writing</h2>

                <p className="mt-4 text-lg text-gray-600 pointer-events-auto max-w-3xl">
                  Notes on systems, distributed infra, and building things that feel inevitable.
                </p>

                <div className="mt-6 pointer-events-auto">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded text-sm transition-colors no-underline w-fit"
                    title="Blog"
                  >
                    <BookOpen className="h-4 w-4" />
                    Visit blog
                  </Link>
                </div>

                <div className="mt-10 pointer-events-auto overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-sm">
                  <img
                    src="/placeholders/placeholder-workbench.svg"
                    alt=""
                    className="w-full h-auto block"
                  />
                  <div className="flex items-center justify-between px-6 py-4 text-sm">
                    <span className="text-gray-600">A workbench snapshot</span>
                    <ArrowUpRight className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
              </section>

              <div className="mt-16 border-t border-black/10 max-w-4xl" />

              {/* 03 Contact / "Join" style section */}
              <section id="contact" className="mt-16 max-w-4xl">
                <div className="text-sm text-gray-500">03</div>
                <h2 className="mt-4 text-2xl font-semibold">Contact</h2>

                <p className="mt-4 text-lg text-gray-600 pointer-events-auto max-w-3xl">
                  If you want to talk systems, product, or weird little experiments—reach out.
                </p>

                <div className="mt-6 pointer-events-auto flex flex-col gap-3 text-gray-700">
                  <Link
                    href="https://twitter.com/esravil"
                    className="inline-flex items-center gap-2 w-fit hover:text-black transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                    twitter
                    <ArrowUpRight className="h-4 w-4 opacity-60" />
                  </Link>

                  <Link
                    href="https://github.com/esravil"
                    className="inline-flex items-center gap-2 w-fit hover:text-black transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                  >
                    <Github className="h-4 w-4" />
                    github
                    <ArrowUpRight className="h-4 w-4 opacity-60" />
                  </Link>

                  <span className="inline-flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4" />
                    esravil99 [at] gmail [dot] com
                  </span>
                </div>

                {/* Two-up image block like the screenshot */}
                <div className="mt-10 pointer-events-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-sm">
                    <img
                      src="/placeholders/placeholder-team-1.svg"
                      alt=""
                      className="w-full h-auto block"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-sm">
                    <img
                      src="/placeholders/placeholder-team-2.svg"
                      alt=""
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* Curtain-reveal footer (scroll-synced, no easing) */}
      <footer
        ref={footerRef}
        className="pointer-events-auto fixed bottom-0 left-0 right-0 w-full h-[var(--footer-reveal-h)] overflow-hidden border-t border-black/10 z-0"
        style={{
          clipPath: 'inset(100% 0 0 0)',
          // Safari
          WebkitClipPath: 'inset(100% 0 0 0)',
        }}
      >
        <div className="absolute inset-0">
          <img
            src="/placeholders/footer-bg.svg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative h-full w-full px-8 sm:px-12 text-white">
          <div className="mx-auto h-full w-full flex flex-col justify-center">
            <div className="flex items-center justify-between gap-8">
              <div>
                <div className="text-3xl font-medium tracking-tight">esravil</div>

                <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/80">
                  <a href="#top" className="hover:text-white transition-colors">
                    Home
                  </a>
                  <a href="#projects" className="hover:text-white transition-colors">
                    Projects
                  </a>
                  <a href="#writing" className="hover:text-white transition-colors">
                    Writing
                  </a>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="https://twitter.com/esravil"
                  className="text-white/80 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="https://github.com/esravil"
                  className="text-white/80 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="/feed.xml"
                  className="text-white/80 hover:text-white transition-colors"
                  title="RSS Feed"
                >
                  <Rss className="h-5 w-5" />
                  <span className="sr-only">RSS Feed</span>
                </Link>
              </div>
            </div>

            <div className="mt-8 h-px w-full bg-white/20" />

            <div className="mt-5 flex items-center justify-between text-xs text-white/70">
              <span>Copyright © {year} esravil. All rights reserved.</span>
              <div className="flex items-center gap-6">
                <span className="cursor-default">Privacy</span>
                <span className="cursor-default">Terms</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
