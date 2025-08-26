'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [contactsExpanded, setContactsExpanded] = useState(false);
  const [writingsExpanded, setWritingsExpanded] = useState(false);
  
  return (
    <div className="relative">
      {/* Main Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-20">
      <div className="w-full max-w-2xl" role="main" aria-label="Main content">
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
              <p className="text-lg font-mono">% cat about.txt</p>
              <div className="text-lg text-muted-foreground ml-4 space-y-1">
                <p>Hey I&apos;m esravil. I like to make cool things. I&apos;m fond of distributed systems and solving difficult problems. Previously, I interned at Google and at the Solana Foundation.</p>
                <Link 
                  href="/about"
                  className="inline-flex items-center gap-1 px-2 py-1 bg-muted hover:bg-muted/80 text-muted-foreground rounded text-xs font-mono ml-0 mt-2 no-underline"
                >
                  [+12 more lines]
                </Link>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-mono">% ls -a</p>
              <div className="text-sm text-muted-foreground ml-4 space-y-1 font-mono">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setProjectsExpanded(!projectsExpanded)}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <span className="text-muted-foreground/60">{projectsExpanded ? '└──' : '├──'}</span>
                    <span>projects/</span>
                  </button>
                </div>
                {projectsExpanded && (
                  <div className="ml-4 space-y-1 animate-in slide-in-from-top-1 duration-200">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground/60">├──</span>
                      <span>distributed-cache.rs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground/60">├──</span>
                      <span>blockchain-validator.go</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground/60">└──</span>
                      <span>ml-pipeline.py</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setContactsExpanded(!contactsExpanded)}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <span className="text-muted-foreground/60">{contactsExpanded ? '├──' : '├──'}</span>
                    <span>shameless-plugs/</span>
                  </button>
                </div>
                {contactsExpanded && (
                  <div className="ml-4 space-y-1 animate-in slide-in-from-top-1 duration-200">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground/60">├──</span>
                      <a href="https://twitter.com/esravil" className="inline-flex items-center gap-2 px-2 py-1 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded text-xs transition-colors no-underline">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        twitter
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground/60">└──</span>
                      <a href="mailto:esravil99@gmail.com" className="inline-flex items-center gap-2 px-2 py-1 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded text-xs transition-colors no-underline">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        email
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setWritingsExpanded(!writingsExpanded)}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <span className="text-muted-foreground/60">{writingsExpanded ? '└──' : '└──'}</span>
                    <span>writings/</span>
                  </button>
                </div>
                {writingsExpanded && (
                  <div className="ml-4 space-y-1 animate-in slide-in-from-top-1 duration-200">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground/60">├──</span>
                      <Link href="/blog" className="inline-flex items-center gap-2 px-2 py-1 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded text-xs transition-colors no-underline">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                          <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v4.5a1.5 1.5 0 01-3 0V8a1 1 0 011-1z"/>
                        </svg>
                        blog
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground/60">└──</span>
                      <a href="https://esravil.substack.com/" className="inline-flex items-center gap-2 px-2 py-1 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded text-xs transition-colors no-underline">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.539 8.242H1.46V5.406c0-1.44 1.164-2.604 2.604-2.604H19.93c1.44 0 2.604 1.164 2.604 2.604v2.836zM1.46 10.812V18.59c0 1.44 1.164 2.604 2.604 2.604H19.93c1.44 0 2.604-1.164 2.604-2.604V10.812H1.46zM6.21 15.312c0-.45.36-.81.81-.81h9.96c.45 0 .81.36.81.81s-.36.81-.81.81H7.02c-.45 0-.81-.36-.81-.81z"/>
                        </svg>
                        substack
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </section>
      </div>
      </div>

    </div>
  );
}
