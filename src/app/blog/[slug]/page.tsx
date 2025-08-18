import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Prose } from '@/components/mdx/prose';
import { getPostBySlug, getAllFiles } from '@/lib/content';
import { siteConfig } from '@/lib/site.config';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllFiles('blog');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = getPostBySlug('blog', params.slug);
    const { frontMatter } = post;

    return {
      title: frontMatter.title,
      description: frontMatter.summary,
      authors: [{ name: siteConfig.author.name }],
      openGraph: {
        title: frontMatter.title,
        description: frontMatter.summary,
        type: 'article',
        publishedTime: frontMatter.publishedAt,
        modifiedTime: frontMatter.updatedAt,
        authors: [siteConfig.author.name],
        tags: frontMatter.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: frontMatter.title,
        description: frontMatter.summary,
        creator: `@${siteConfig.author.twitter}`,
      },
      alternates: {
        canonical: frontMatter.canonicalUrl || `${siteConfig.url}/blog/${params.slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = getPostBySlug('blog', params.slug);
    const { frontMatter, content, readingTime } = post;

    return (
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={frontMatter.publishedAt}>
                  {new Date(frontMatter.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime}</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              {frontMatter.title}
            </h1>

            <p className="text-xl text-muted-foreground">
              {frontMatter.summary}
            </p>

            <div className="flex flex-wrap gap-2">
              {frontMatter.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <Badge variant="outline" className="hover:bg-muted">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {frontMatter.series && (
              <div>
                <Link href={`/series/${frontMatter.series}`}>
                  <Badge className="hover:bg-primary/80">
                    Series: {frontMatter.series}
                  </Badge>
                </Link>
              </div>
            )}
          </div>
        </div>

        <Prose>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Prose>

        {frontMatter.updatedAt !== frontMatter.publishedAt && (
          <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
            Last updated on{' '}
            <time dateTime={frontMatter.updatedAt}>
              {new Date(frontMatter.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        )}
      </article>
    );
  } catch (error) {
    notFound();
  }
}