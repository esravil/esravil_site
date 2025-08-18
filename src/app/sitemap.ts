import { MetadataRoute } from 'next';
import { getAllPosts, getAllPapers, getAllTags } from '@/lib/content';
import { siteConfig } from '@/lib/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/stances`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/papers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Blog posts
  const blogPosts = getAllPosts('blog').map((post) => ({
    url: `${baseUrl}/blog/${post.frontMatter.slug}`,
    lastModified: new Date(post.frontMatter.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Stories
  const stories = getAllPosts('stories').map((post) => ({
    url: `${baseUrl}/stories/${post.frontMatter.slug}`,
    lastModified: new Date(post.frontMatter.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Stances
  const stances = getAllPosts('stances').map((post) => ({
    url: `${baseUrl}/stances/${post.frontMatter.slug}`,
    lastModified: new Date(post.frontMatter.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Papers
  const papers = getAllPapers().map((paper) => ({
    url: `${baseUrl}/papers/${paper.frontMatter.slug}`,
    lastModified: new Date(paper.frontMatter.updatedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  // Tag pages
  const tags = getAllTags().map((tag) => ({
    url: `${baseUrl}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  return [
    ...staticPages,
    ...blogPosts,
    ...stories,
    ...stances,
    ...papers,
    ...tags,
  ];
}