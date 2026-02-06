import { ISbStoriesParams } from '@storyblok/react';
import { unstable_cache } from 'next/cache';
import { getStoryblokApi } from './storyblok';

/**
 * Cached Storyblok API fetcher
 * Automatically caches API responses with configurable revalidation
 */
export const getCachedStoryblokData = async (
  slug: string,
  params: ISbStoriesParams = {},
  revalidateTime: number = 3600, // Default: 1 hour
) => {
  const cacheKey = `storyblok-${slug}-${JSON.stringify(params)}-${1}`;

  const fetchData = unstable_cache(
    async () => {
      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
        ...params,
        version: params.version || 'published',
        cv: process.env.NODE_ENV === 'development' ? Date.now() : undefined,
      });
      return data;
    },
    [cacheKey],
    {
      revalidate: revalidateTime,
      tags: [`storyblok-${slug}`],
    },
  );

  return fetchData();
};

/**
 * Cached function specifically for global content (header, footer, etc.)
 * Uses longer cache time as global content changes less frequently
 */
export const getCachedGlobalContent = async (
  slug: string,
  revalidateTime: number = 7200, // Default: 2 hours for global content
) => {
  return getCachedStoryblokData(`global/${slug}`, { version: 'published' }, revalidateTime);
};
