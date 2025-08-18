import { cn } from '@/lib/utils';

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-none',
        // Headings
        'prose-headings:scroll-m-20 prose-headings:tracking-tight',
        'prose-h1:text-4xl prose-h1:font-bold prose-h1:lg:text-5xl',
        'prose-h2:text-3xl prose-h2:font-semibold prose-h2:first:mt-0',
        'prose-h3:text-2xl prose-h3:font-semibold',
        'prose-h4:text-xl prose-h4:font-semibold',
        // Paragraphs and text
        'prose-p:leading-7 prose-p:[&:not(:first-child)]:mt-6',
        'prose-lead:text-xl prose-lead:text-muted-foreground',
        // Lists
        'prose-ul:my-6 prose-ul:ml-6 prose-ul:[&>li]:mt-2',
        'prose-ol:my-6 prose-ol:ml-6 prose-ol:[&>li]:mt-2',
        // Links
        'prose-a:font-medium prose-a:underline prose-a:underline-offset-4',
        'prose-a:text-foreground hover:prose-a:text-muted-foreground',
        'prose-a:no-underline hover:prose-a:underline',
        // Blockquotes
        'prose-blockquote:mt-6 prose-blockquote:border-l-2 prose-blockquote:border-border',
        'prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground',
        // Code
        'prose-code:relative prose-code:rounded prose-code:bg-muted',
        'prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm',
        'prose-code:font-mono prose-code:font-semibold',
        'prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:border',
        'prose-pre:bg-muted prose-pre:p-4',
        // Tables
        'prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-border',
        'prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-2 prose-th:text-left',
        'prose-th:font-bold prose-th:[&[align=center]]:text-center prose-th:[&[align=right]]:text-right',
        'prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2',
        'prose-td:[&[align=center]]:text-center prose-td:[&[align=right]]:text-right',
        // Images
        'prose-img:rounded-md prose-img:border',
        // HR
        'prose-hr:border-border',
        // Strong and emphasis
        'prose-strong:font-semibold',
        className
      )}
    >
      {children}
    </div>
  );
}