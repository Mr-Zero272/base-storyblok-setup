import { ISbStoriesParams } from '@storyblok/react';
import { unstable_cache } from 'next/cache';
import { getStoryblokApi } from './storyblok';
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
) => {
  const storyblokApi = getStoryblokApi();

  const fetchData = unstable_cache(
    async () => {
      const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
        ...params,
        version: params.version || 'published',
        cv: process.env.NODE_ENV === 'development' ? Date.now() : undefined,
      });
      return data;
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
export const getCachedGlobalContent = async (
  slug: string,
  revalidateTime: number = process.env.NODE_ENV === 'development' ? 60 : 7200, // Default: 2 hours for global content, 60 seconds in dev mode
) => {
  return getCachedStoryblokData(`global/${slug}`, { version: 'published' }, revalidateTime);
};

/**
 * Cached function for page content
 * Standard cache time for frequently changing content
 */
export const getCachedPageContent = async (
  slug: string,
  revalidateTime: number = process.env.NODE_ENV === 'development' ? 60 : 3600, // Default: 1 hour, 60 seconds in dev mode
) => {
  return getCachedStoryblokData(slug, { version: 'published' }, revalidateTime);
};
