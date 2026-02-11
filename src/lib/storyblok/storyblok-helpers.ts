import { StoryblokRichTextNode } from '@storyblok/react';
import { StoryblokMultilink } from '../../../.storyblok/types/storyblok';

export function resolveSlug(slug?: string[]) {
  const fullSlug = slug ? (slug.length > 0 ? slug.join('/') : '/pages/home') : '/pages/home';
  return fullSlug.includes('pages') ? fullSlug : `pages/${fullSlug}`;
}

export function checkRichTextEmpty(richText?: StoryblokRichTextNode) {
  return (
    !richText ||
    (richText.content && richText.content.length === 0) ||
    (richText.content && richText.content.every((item) => item.type === 'paragraph' && !item.content))
  );
}

export function getCacheTags(slug: string): string[] {
  return [slug, 'storyblok']; // Main tag + general Storyblok tag
}

export const getLinkUrl = (link?: StoryblokMultilink) => {
  if (!link) return '#';

  if (link.linktype === 'url') {
    return link.url || '#';
  } else if (link.linktype === 'story') {
    if (link.cached_url && link.cached_url.startsWith('pages')) {
      return link.cached_url.slice(5) || '#';
    } else {
      return link.cached_url || '#';
    }
  } else if (link.linktype === 'email') {
    return `mailto:${link.email || ''}`;
  } else if (link.linktype === 'asset') {
    return link.url || '#';
  }

  return '#';
};
