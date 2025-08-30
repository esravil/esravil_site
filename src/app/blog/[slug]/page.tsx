import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BlogPostMeta {
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  status: string;
  image?: string;
}

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<{ meta: BlogPostMeta; content: string } | null> {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    if (data.status !== 'published') {
      return null;
    }
    
    return {
      meta: {
        title: data.title,
        summary: data.summary,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt,
        tags: data.tags || [],
        status: data.status,
        image: data.image
      },
      content
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames
    .filter(name => name.endsWith('.mdx'))
    .map((name) => ({
      slug: name.replace('.mdx', '')
    }));
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }
  
  return {
    title: `${post.meta.title} | Blog`,
    description: post.meta.summary,
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen px-8 sm:px-12 py-16 bg-white text-black">
      <div className="w-full max-w-2xl md:ml-16 lg:ml-24 xl:ml-32">
        <div className="mb-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              esravil@MBP ~
            </h1>
            <div className="text-sm text-gray-600 -mt-2">
              NYC + SF
            </div>
            <div className="text-sm text-gray-600 mt-1">
              /blog/{slug}
            </div>
          </div>
          
          <Link 
            href="/blog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <article>
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.meta.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-4">
                <time>
                  Published {new Date(post.meta.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {post.meta.updatedAt && post.meta.updatedAt !== post.meta.publishedAt && (
                  <span>
                    Updated {new Date(post.meta.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>
              
              {post.meta.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-black rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {post.meta.summary}
              </p>
            </header>
            
            <div className="prose prose-neutral max-w-none prose-sm sm:prose-base">
              <MDXRemote source={post.content} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}