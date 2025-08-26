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
    <div className="min-h-screen px-8 sm:px-12 md:px-16 lg:px-20 py-16">
      <div className="w-full max-w-2xl mx-auto">
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-left">
              esravil@MBP ~/blog
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
              <p className="text-lg font-mono">% ls -a</p>
              <div className="text-lg text-muted-foreground ml-4 space-y-1">
                <p>Thoughts on technology, distributed systems, and building things.</p>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <p key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded text-sm transition-colors no-underline">
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
              <Link href="/" className="inline-flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded text-sm transition-colors no-underline">
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