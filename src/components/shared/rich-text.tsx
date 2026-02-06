import { cn } from '@/lib/utils';
import type { StoryblokRichTextNode } from '@storyblok/richtext';
import { richTextResolver } from '@storyblok/richtext';

export type RichTextProps = {
  doc: unknown;
  variant?: 'default' | 'copyright' | 'rich-text-normal';
  className?: string;
};

const renderRichText = richTextResolver<string>().render;

function RichText({ doc, className, variant }: RichTextProps) {
  const variantClass = variant ? variant : 'rich-text';

  return (
    <>
      <div
        className={cn('space-y-3', variantClass, className)}
        dangerouslySetInnerHTML={{
          __html: renderRichText(doc as StoryblokRichTextNode),
        }}
      />
    </>
  );
}

export default RichText;
