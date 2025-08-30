import Link from 'next/link';
import { Rss, Map } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white border-gray-200">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-600">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          
          <div className="flex justify-center items-center space-x-4">
            <Link 
              href="/feed.xml" 
              className="text-gray-600 hover:text-black transition-colors"
              title="RSS Feed"
            >
              <Rss className="h-5 w-5" />
              <span className="sr-only">RSS Feed</span>
            </Link>
            <Link 
              href="/sitemap.xml" 
              className="text-gray-600 hover:text-black transition-colors"
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