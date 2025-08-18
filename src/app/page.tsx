import { siteConfig } from '@/lib/site.config';

interface ColorfulButtonProps {
  href: string;
  children: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red';
}

function ColorfulButton({ href, children, color }: ColorfulButtonProps) {
  const colorClasses = {
    blue: 'bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-200 hover:border-blue-500 hover:scale-105 hover:shadow-md',
    purple: 'bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200 hover:border-purple-500 hover:scale-105 hover:shadow-md',
    green: 'bg-green-100 border-green-400 text-green-800 hover:bg-green-200 hover:border-green-500 hover:scale-105 hover:shadow-md',
    orange: 'bg-orange-100 border-orange-400 text-orange-800 hover:bg-orange-200 hover:border-orange-500 hover:scale-105 hover:shadow-md',
    red: 'bg-red-100 border-red-400 text-red-800 hover:bg-red-200 hover:border-red-500 hover:scale-105 hover:shadow-md'
  };

  return (
    <a 
      href={href}
      className={`
        inline-block px-2 py-1 rounded-md border-2 text-sm font-medium
        transition-all duration-300 ease-out transform
        ${colorClasses[color]}
      `}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-20">
      <div className="w-full max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="space-y-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-left">
            {siteConfig.name}
          </h1>
          <div className="space-y-6 text-left">
            <p className="text-lg text-muted-foreground">
              A NYC/SF tech bro who didn&apos;t go to a T20 school but interned at Google and the Solana Foundation. Systems programmer in Rust, fascinated with distributed systems and blockchain since mid-2024. Active in both SF tech and web3 Solana ecosystems.
            </p>
            
            <ul className="space-y-3 text-lg text-muted-foreground hero-list">
              <li>• Hobby-maxxer: running, basketball, working out, biking, swimming, reading, investing, and creating things that convenience everyone.</li>
              <li>• Life goals: summit K2 and/or complete an Ironman.</li>
              <li>• Some of my <ColorfulButton href="#" color="purple">projects</ColorfulButton></li>
              <li>• My <ColorfulButton href="#" color="green">substack</ColorfulButton></li>
              <li>• Connect: <ColorfulButton href="https://twitter.com/esravil" color="blue">Twitter</ColorfulButton> <ColorfulButton href="mailto:esravil@example.com" color="orange">Email</ColorfulButton></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
