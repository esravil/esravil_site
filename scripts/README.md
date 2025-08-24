# Blog Creation Scripts

## Create a New Blog Post

### Interactive Mode (Recommended)

```bash
npm run new-post
```

This will prompt you for:
- Post title
- Post summary/description  
- Custom slug (optional)
- Tags (optional)
- Whether to publish immediately or save as draft

### Quick Mode

```bash
node scripts/create-blog-post.js "Your Post Title" "Your post summary"
```

This creates a draft post with the given title and summary.

## Blog Post Structure

Blog posts are MDX files stored in `content/blog/` with this frontmatter structure:

```yaml
---
title: "Your Post Title"
slug: "your-post-slug"
summary: "Brief description of your post"
publishedAt: "2025-01-15"
updatedAt: "2025-01-15"
tags: ["tag1", "tag2"]
series: null
status: published  # or "draft"
image: null
canonicalUrl: null
---
```

## Publishing Posts

1. Create a draft post using the script
2. Edit the MDX file in your preferred editor
3. Change `status: draft` to `status: published` when ready
4. The post will appear on `/blog`

## Blog Features

- Automatic slug generation from titles
- Tag support with visual badges
- Responsive design with dark/light theme
- Syntax highlighting for code blocks
- Reading time estimation
- SEO-friendly metadata