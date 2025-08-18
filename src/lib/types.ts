export interface FrontMatter {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  series?: string;
  status: 'published' | 'draft';
  image?: string;
  canonicalUrl?: string;
}

export interface PaperFrontMatter extends FrontMatter {
  year: number;
  venue: string;
  links: {
    pdf?: string;
    code?: string;
    doi?: string;
  };
}

export interface Post {
  frontMatter: FrontMatter;
  content: string;
  readingTime: string;
}

export interface Paper {
  frontMatter: PaperFrontMatter;
  content: string;
  readingTime: string;
}

export type ContentSection = 'blog' | 'stories' | 'stances' | 'papers';

export interface ContentIndex {
  posts: Post[];
  papers: Paper[];
  tags: string[];
  series: string[];
}