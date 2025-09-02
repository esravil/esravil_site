import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  status: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames
    .filter(name => name.endsWith('.mdx'))
    .map((name) => {
      const fullPath = path.join(postsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: data.slug || name.replace('.mdx', ''),
        title: data.title,
        summary: data.summary,
        publishedAt: data.publishedAt,
        tags: data.tags || [],
        status: data.status || 'published'
      };
    })
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  
  return posts;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen px-8 sm:px-12 py-16 bg-white text-black">
      <div className="w-full max-w-2xl md:ml-16 lg:ml-24 xl:ml-32">
        <section className="space-y-8">
          <div>
            <Link href="/" className="text-lg font-mono hover:text-gray-600 transition-colors">
              esravil ~
            </Link>
            <div className="text-lg font-mono text-gray-600 mt-1">
              /blog
            </div>
          </div>
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <p className="text-lg font-mono">% ls -a</p>
              <div className="text-lg text-gray-600 ml-4 space-y-1">
                <p>Thoughts on technology, distributed systems, and building things.</p>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <p key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded text-sm transition-colors no-underline">
                        {post.title}
                      </Link>
                      <span className="text-lg ml-2">({new Date(post.publishedAt).toLocaleDateString()})</span>
                      {post.tags.length > 0 && (
                        <span className="text-lg ml-2">
                          [{post.tags.join(', ')}]
                        </span>
                      )}
                    </p>
                  ))
                ) : (
                  <p>No blog posts yet.</p>
                )}
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