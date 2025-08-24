#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function createBlogPost(answers) {
  const slug = answers.slug || slugify(answers.title);
  const tagsArray = answers.tags ? answers.tags.split(',').map(tag => tag.trim()) : [];
  
  const frontmatter = `---
title: "${answers.title}"
slug: "${slug}"
summary: "${answers.summary}"
publishedAt: "${getCurrentDate()}"
updatedAt: "${getCurrentDate()}"
tags: [${tagsArray.map(tag => `"${tag}"`).join(', ')}]
series: null
status: ${answers.status || 'draft'}
image: null
canonicalUrl: null
---

# ${answers.title}

${answers.summary}

## Write your content here...

This is your blog post content. You can use:

- **Markdown** formatting
- \`code snippets\`
- Links: [Example](https://example.com)

\`\`\`javascript
// Code blocks with syntax highlighting
console.log("Hello, world!");
\`\`\`

> Blockquotes for important notes

1. Ordered lists
2. Are also supported

- Unordered lists
- Work too

---

Happy writing! 🚀
`;

  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`\nError: A blog post with slug "${slug}" already exists.`);
    console.log(`File: ${filePath}`);
    return;
  }

  // Ensure directory exists
  const blogDir = path.dirname(filePath);
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  // Write the file
  fs.writeFileSync(filePath, frontmatter);
  
  console.log(`\n✅ Blog post created successfully!`);
  console.log(`📝 File: ${filePath}`);
  console.log(`🌐 URL: /blog/${slug}`);
  console.log(`\nTo publish this post, change the status from "draft" to "published" in the frontmatter.`);
}

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('🚀 Create a New Blog Post\n');
  
  try {
    const answers = {};
    
    answers.title = await askQuestion('Post title: ');
    if (!answers.title) {
      console.log('Title is required!');
      process.exit(1);
    }
    
    answers.summary = await askQuestion('Post summary/description: ');
    if (!answers.summary) {
      console.log('Summary is required!');
      process.exit(1);
    }
    
    const customSlug = await askQuestion(`Custom slug (press Enter for "${slugify(answers.title)}"): `);
    if (customSlug) {
      answers.slug = slugify(customSlug);
    }
    
    answers.tags = await askQuestion('Tags (comma-separated, optional): ');
    
    const publishNow = await askQuestion('Publish now? (y/N): ');
    answers.status = publishNow.toLowerCase() === 'y' ? 'published' : 'draft';
    
    createBlogPost(answers);
    
  } catch (error) {
    console.error('Error creating blog post:', error);
  } finally {
    rl.close();
  }
}

// Handle CLI arguments for non-interactive mode
if (process.argv.length > 2) {
  const title = process.argv[2];
  const summary = process.argv[3] || 'Blog post summary';
  
  if (title) {
    createBlogPost({
      title,
      summary,
      status: 'draft'
    });
    process.exit(0);
  }
}

// Run interactive mode
main();