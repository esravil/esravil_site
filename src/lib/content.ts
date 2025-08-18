import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { FrontMatter, PaperFrontMatter, Post, Paper, ContentSection } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

export function getContentDirectory(section: ContentSection): string {
  return path.join(contentDirectory, section);
}

export function getAllFiles(section: ContentSection): string[] {
  const sectionDir = getContentDirectory(section);
  
  if (!fs.existsSync(sectionDir)) {
    return [];
  }

  return fs.readdirSync(sectionDir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

export function getFileContent(section: ContentSection, slug: string): string {
  const filePath = path.join(getContentDirectory(section), `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  return fs.readFileSync(filePath, 'utf8');
}

export function parseContent(content: string): { frontMatter: any; content: string; readingTime: string } {
  const { data: frontMatter, content: markdownContent } = matter(content);
  const readingTimeResult = readingTime(markdownContent);

  return {
    frontMatter,
    content: markdownContent,
    readingTime: readingTimeResult.text,
  };
}

export function getPostBySlug(section: Exclude<ContentSection, 'papers'>, slug: string): Post {
  const fileContent = getFileContent(section, slug);
  const { frontMatter, content, readingTime: readingTimeText } = parseContent(fileContent);

  // Validate frontmatter
  if (!frontMatter.title || !frontMatter.slug || !frontMatter.publishedAt) {
    throw new Error(`Invalid frontmatter in ${section}/${slug}.mdx`);
  }

  return {
    frontMatter: frontMatter as FrontMatter,
    content,
    readingTime: readingTimeText,
  };
}

export function getPaperBySlug(slug: string): Paper {
  const fileContent = getFileContent('papers', slug);
  const { frontMatter, content, readingTime: readingTimeText } = parseContent(fileContent);

  // Validate paper frontmatter
  if (!frontMatter.title || !frontMatter.slug || !frontMatter.year || !frontMatter.venue) {
    throw new Error(`Invalid paper frontmatter in papers/${slug}.mdx`);
  }

  return {
    frontMatter: frontMatter as PaperFrontMatter,
    content,
    readingTime: readingTimeText,
  };
}

export function getAllPosts(section: Exclude<ContentSection, 'papers'>): Post[] {
  const slugs = getAllFiles(section);
  
  const posts = slugs
    .map(slug => {
      try {
        return getPostBySlug(section, slug);
      } catch (error) {
        console.warn(`Error loading post ${section}/${slug}:`, error);
        return null;
      }
    })
    .filter((post): post is Post => post !== null)
    .filter(post => post.frontMatter.status === 'published');

  // Sort by publishedAt date (newest first)
  return posts.sort((a, b) => 
    new Date(b.frontMatter.publishedAt).getTime() - new Date(a.frontMatter.publishedAt).getTime()
  );
}

export function getAllPapers(): Paper[] {
  const slugs = getAllFiles('papers');
  
  const papers = slugs
    .map(slug => {
      try {
        return getPaperBySlug(slug);
      } catch (error) {
        console.warn(`Error loading paper ${slug}:`, error);
        return null;
      }
    })
    .filter((paper): paper is Paper => paper !== null)
    .filter(paper => paper.frontMatter.status === 'published');

  // Sort by year and then by publishedAt date (newest first)
  return papers.sort((a, b) => {
    const yearDiff = b.frontMatter.year - a.frontMatter.year;
    if (yearDiff !== 0) return yearDiff;
    
    return new Date(b.frontMatter.publishedAt).getTime() - new Date(a.frontMatter.publishedAt).getTime();
  });
}

export function getAllTags(): string[] {
  const allPosts = [
    ...getAllPosts('blog'),
    ...getAllPosts('stories'),
    ...getAllPosts('stances'),
    ...getAllPapers(),
  ];

  const tagsSet = new Set<string>();
  allPosts.forEach(post => {
    post.frontMatter.tags.forEach(tag => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

export function getPostsByTag(tag: string): (Post | Paper)[] {
  const allPosts = [
    ...getAllPosts('blog'),
    ...getAllPosts('stories'),
    ...getAllPosts('stances'),
    ...getAllPapers(),
  ];

  return allPosts
    .filter(post => post.frontMatter.tags.includes(tag))
    .sort((a, b) => 
      new Date(b.frontMatter.publishedAt).getTime() - new Date(a.frontMatter.publishedAt).getTime()
    );
}

export function getAllSeries(): string[] {
  const allPosts = [
    ...getAllPosts('blog'),
    ...getAllPosts('stories'),
    ...getAllPosts('stances'),
    ...getAllPapers(),
  ];

  const seriesSet = new Set<string>();
  allPosts.forEach(post => {
    if (post.frontMatter.series) {
      seriesSet.add(post.frontMatter.series);
    }
  });

  return Array.from(seriesSet).sort();
}

export function getPostsBySeries(series: string): (Post | Paper)[] {
  const allPosts = [
    ...getAllPosts('blog'),
    ...getAllPosts('stories'),
    ...getAllPosts('stances'),
    ...getAllPapers(),
  ];

  return allPosts
    .filter(post => post.frontMatter.series === series)
    .sort((a, b) => 
      new Date(a.frontMatter.publishedAt).getTime() - new Date(b.frontMatter.publishedAt).getTime()
    );
}

export function getLatestPosts(limit: number = 5): (Post | Paper)[] {
  const allPosts = [
    ...getAllPosts('blog'),
    ...getAllPosts('stories'),
    ...getAllPosts('stances'),
    ...getAllPapers(),
  ];

  return allPosts
    .sort((a, b) => 
      new Date(b.frontMatter.publishedAt).getTime() - new Date(a.frontMatter.publishedAt).getTime()
    )
    .slice(0, limit);
}