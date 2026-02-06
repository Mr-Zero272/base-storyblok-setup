import { StoryblokRichTextNode } from '@storyblok/react';

export function resolveSlug(slug?: string[]) {
  const fullSlug = slug?.length ? slug.join('/') : 'home';
  return fullSlug.includes('pages') ? fullSlug : `pages/${fullSlug}`;
}

export function checkRichTextEmpty(richText?: StoryblokRichTextNode) {
  return (
    !richText ||
    (richText.content && richText.content.length === 0) ||
    (richText.content && richText.content.every((item) => item.type === 'paragraph' && !item.content))
  );
}
