import { Post, Paper } from '@/lib/types';
import { PostCard } from './post-card';

interface PostListProps {
  posts: (Post | Paper)[];
  section: string;
  title?: string;
  showAll?: boolean;
  limit?: number;
}

export function PostList({ posts, section, title, showAll = false, limit = 10 }: PostListProps) {
  const displayPosts = showAll ? posts : posts.slice(0, limit);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No posts found</h3>
        <p className="text-muted-foreground">
          Check back later for new content!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {displayPosts.map((post) => (
          <PostCard
            key={post.frontMatter.slug}
            post={post}
            section={section}
          />
        ))}
      </div>
      
      {!showAll && posts.length > limit && (
        <div className="text-center pt-6">
          <p className="text-sm text-muted-foreground">
            Showing {limit} of {posts.length} posts
          </p>
        </div>
      )}
    </div>
  );
}