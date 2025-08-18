import Link from 'next/link';
import { Rss, Map } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          
          <div className="flex justify-center items-center space-x-4">
            <Link 
              href="/feed.xml" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="RSS Feed"
            >
              <Rss className="h-5 w-5" />
              <span className="sr-only">RSS Feed</span>
            </Link>
            <Link 
              href="/sitemap.xml" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Sitemap"
            >
              <Map className="h-5 w-5" />
              <span className="sr-only">Sitemap</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}