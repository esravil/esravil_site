import type { Metadata } from 'next';
import { PostList } from '@/components/content/post-list';
import { getAllPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical insights, tutorials, and thoughts on GPU computing and software development.',
};

export default function BlogPage() {
  const posts = getAllPosts('blog');

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <PostList 
        posts={posts} 
        section="blog" 
        title="Blog"
        showAll
      />
    </div>
  );
}