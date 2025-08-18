import { getAllPosts, getAllPapers } from './content';
import { siteConfig } from './site.config';
import { Post, Paper } from './types';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatRssDate(date: string): string {
  return new Date(date).toUTCString();
}

function generateRssItem(post: Post | Paper, section: string): string {
  const link = `${siteConfig.url}/${section}/${post.frontMatter.slug}`;
  
  return `
    <item>
      <title>${escapeXml(post.frontMatter.title)}</title>
      <description>${escapeXml(post.frontMatter.summary)}</description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${formatRssDate(post.frontMatter.publishedAt)}</pubDate>
      <author>${siteConfig.author.email} (${siteConfig.author.name})</author>
      ${post.frontMatter.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>
  `.trim();
}

export function generateRssFeed(): string {
  const blogPosts = getAllPosts('blog');
  const stories = getAllPosts('stories');
  const stances = getAllPosts('stances');
  const papers = getAllPapers();

  // Combine all posts and sort by publication date (newest first)
  const allPosts: Array<{ post: Post | Paper; section: string }> = [
    ...blogPosts.map(post => ({ post, section: 'blog' })),
    ...stories.map(post => ({ post, section: 'stories' })),
    ...stances.map(post => ({ post, section: 'stances' })),
    ...papers.map(post => ({ post, section: 'papers' })),
  ].sort((a, b) => 
    new Date(b.post.frontMatter.publishedAt).getTime() - 
    new Date(a.post.frontMatter.publishedAt).getTime()
  );

  const rssItems = allPosts.map(({ post, section }) => 
    generateRssItem(post, section)
  ).join('\n');

  const lastBuildDate = new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${siteConfig.url}</link>
    <language>en-US</language>
    <managingEditor>${siteConfig.author.email} (${siteConfig.author.name})</managingEditor>
    <webMaster>${siteConfig.author.email} (${siteConfig.author.name})</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`.trim();
}