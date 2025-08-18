import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      require('remark-gfm'),
    ],
    rehypePlugins: [
      [require('rehype-pretty-code'), {
        theme: 'github-dark',
        onVisitLine(node: any) {
          if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
          }
        },
        onVisitHighlightedLine(node: any) {
          node.properties.className.push('line--highlighted');
        },
        onVisitHighlightedWord(node: any) {
          node.properties.className = ['word--highlighted'];
        },
      }],
    ],
  },
});

export default withMDX(nextConfig);
