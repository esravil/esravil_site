import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Post, Paper } from '@/lib/types';

interface PostCardProps {
  post: Post | Paper;
  section: string;
}

export function PostCard({ post, section }: PostCardProps) {
  const { frontMatter, readingTime } = post;
  const isRecent = new Date(frontMatter.publishedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <Card className="transition-colors hover:bg-muted/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={frontMatter.publishedAt}>
              {new Date(frontMatter.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {isRecent && (
              <Badge variant="secondary" className="text-xs">
                New
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        </div>
        
        <CardTitle className="line-clamp-2">
          <Link 
            href={`/${section}/${frontMatter.slug}`}
            className="hover:underline"
          >
            {frontMatter.title}
          </Link>
        </CardTitle>
        
        <CardDescription className="line-clamp-3">
          {frontMatter.summary}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {frontMatter.tags.slice(0, 3).map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge variant="outline" className="text-xs hover:bg-muted">
                {tag}
              </Badge>
            </Link>
          ))}
          {frontMatter.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{frontMatter.tags.length - 3}
            </Badge>
          )}
        </div>
        
        {frontMatter.series && (
          <div className="mt-2">
            <Link href={`/series/${frontMatter.series}`}>
              <Badge className="text-xs">
                Series: {frontMatter.series}
              </Badge>
            </Link>
          </div>
        )}
        
        {'venue' in frontMatter && (
          <div className="mt-2 text-sm text-muted-foreground">
            Published in {frontMatter.venue} ({frontMatter.year})
          </div>
        )}
      </CardContent>
    </Card>
  );
}