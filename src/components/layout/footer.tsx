import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href={siteConfig.socials.github}
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            
            <Link
              href={siteConfig.socials.twitter}
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            
            <Link
              href={siteConfig.socials.linkedin}
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            
            <Link
              href={siteConfig.socials.email}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col space-y-2 text-center md:flex-row md:justify-center md:space-x-6 md:space-y-0">
          <Link href="/feed.xml" className="text-sm text-muted-foreground hover:text-foreground">
            RSS Feed
          </Link>
          <Link href="/sitemap.xml" className="text-sm text-muted-foreground hover:text-foreground">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}