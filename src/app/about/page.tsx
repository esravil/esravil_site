import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen px-8 sm:px-12 py-2 bg-white text-black">
      <div className="w-full max-w-2xl pt-16 md:ml-16 lg:ml-24 xl:ml-32">
        <section className="space-y-8">
          <div>
            <Link href="/" className="text-lg font-mono hover:text-gray-600 transition-colors">
              esravil ~
            </Link>
            <div className="text-lg font-mono text-gray-600 mt-1">
              /about
            </div>
          </div>
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <p className="text-lg font-mono">% cat about.txt</p>
              <div className="text-lg text-gray-600 ml-4 space-y-4">
                <p>
                  Hey I&apos;m esravil. I like to make cool things. I&apos;m fond of distributed systems and solving difficult problems. Previously, I interned at Google and at the Solana Foundation.
                </p>
                
                
                <h2 className="text-base font-mono text-black mt-6"># interests</h2>
                <ul className="ml-4 space-y-1">
                  <li>• gmk keycaps</li>
                  <li>• gym prs</li>
                  <li>• the art of zero-sum</li>
                  <li>• dwarkesh patel videos</li>
                </ul>
                
                <h2 className="text-base font-mono text-black mt-6"># dislikes</h2>
                <ul className="ml-4 space-y-1">
                  <li>• milk after cereal</li>
                  <li>• molly tea haters</li>
                  <li>• the tenderloin, SF</li>
                  <li>• the fact that i didn&apos;t buy eth in 2016</li>
                </ul>
                
                <h2 className="text-base font-mono text-black mt-6"># occupying my time</h2>
                <ul className="ml-4 space-y-1">
                  <li>• making this site</li>
                  <li>• i optimize my sleep schedule around my usage of gpt5 and gork</li>
                  <li>• psps cats in the wild</li>
                  <li>• &gt;= 60 vo2 max upkeep</li>
                </ul>
                
                <h2 className="text-base font-mono text-black mt-6"># things i&apos;m doing</h2>
                <ul className="ml-4 space-y-1">
                  <li>• learning rust + sol dev</li>
                  <li>• making my calves stronger</li>
                  <li>• tinkering with prediction markets, perps trading, and some math</li>
                  <li>• sometimes infra / convenience tooling</li>

                </ul>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/" className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded text-sm transition-colors no-underline">
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
