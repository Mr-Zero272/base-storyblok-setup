import { ISbStoriesParams } from '@storyblok/react';
import { unstable_cache } from 'next/cache';
import { getStoryblokApi } from './api';
import { RELATION_PRESETS } from './relation';
import { getCacheTags } from './storyblok-helpers';

/**
 * Unified cached Storyblok API fetcher
 * Uses consistent tag naming: direct slug (e.g., "global/header", "pages/home")
 * Automatically caches API responses with configurable revalidation
 */
export const getCachedStoryblokData = async (
  slug: string,
  params: ISbStoriesParams = {},
  revalidateTime: number | false = process.env.NODE_ENV === 'development' ? 60 : 3600, // Default: 1 hour, 60 seconds in dev mode, false = no revalidation
  preset?: keyof typeof RELATION_PRESETS,
) => {
  const storyblokApi = getStoryblokApi();

  const fetchData = unstable_cache(
    async () => {
      const { data, perPage, total } = await storyblokApi.get(`cdn/stories/${slug}`, {
        ...params,
        version: params.version || 'published',
        cv: process.env.NODE_ENV === 'development' ? Date.now() : undefined,
        resolve_relations: preset ? RELATION_PRESETS[preset] : [],
      });
      return { ...data, perPage, total };
    },
    [slug, JSON.stringify(params)],
    {
      revalidate: revalidateTime,
      tags: getCacheTags(slug), // Returns [slug, 'storyblok']
    },
  );

  return fetchData();
};

/**
 * Cached function for global content (header, footer, etc.)
 * Uses longer cache time as global content changes less frequently
 */
export const getCachedGlobalContent = async ({
  slug,
  revalidateTime = process.env.NODE_ENV === 'development' ? 60 : 7200, // Default: 2 hours for global content, 60 seconds in dev mode
  preset,
}: {
  slug: string;
  revalidateTime?: number;
  preset?: keyof typeof RELATION_PRESETS;
}) => {
  return getCachedStoryblokData(`global/${slug}`, { version: 'published' }, revalidateTime, preset);
};

/**
 * Cached function for page content
 * Standard cache time for frequently changing content
 */
export const getCachedPageContent = async ({
  slug,
  revalidateTime = process.env.NODE_ENV === 'development' ? 60 : 3600, // Default: 1 hour, 60 seconds in dev mode,
  preset,
  params,
}: {
  slug: string;
  revalidateTime?: number;
  preset?: keyof typeof RELATION_PRESETS;
  params?: ISbStoriesParams;
}) => {
  return getCachedStoryblokData(slug, { version: 'published', ...params }, revalidateTime, preset);
};
