import Link from 'next/link';
import { siteConfig } from '@/lib/site.config';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:border-b-0 border-b border-border">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          {/* Mobile menu button - we'll implement this later */}
          <div className="md:hidden">
            {/* Mobile menu toggle */}
          </div>
        </div>
      </div>
    </header>
  );
}