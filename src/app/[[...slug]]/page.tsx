import { getCachedPageContent } from '@/lib/storyblok/storyblok-cached';
import { resolveSlug } from '@/lib/storyblok/storyblok-helpers';
import { ISbStoryData } from '@storyblok/react';
import { StoryblokStory } from '@storyblok/react/rsc';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

// Revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

// Helper function to fetch story data
async function getStoryData(params: PageProps['params']) {
  const { slug } = await params;
  const fullSlug = resolveSlug(slug);

  try {
    const data = await getCachedPageContent({ slug: fullSlug });
    return data.story as ISbStoryData;
  } catch (error) {
    console.error('Error fetching story data:', error);
    return null;
  }
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const story = await getStoryData(params);

  if (!story) {
    return {
      title: '404 - Page Not Found',
      description: 'Your page could not be found. Please check the URL or create new content in Storyblok.',
    };
  }

  return {
    title: story?.content?.meta_title || '404 - Page Not Found',
    description:
      story?.content?.meta_description ||
      'Your page could not be found. Please check the URL or create new content in Storyblok.',
  };
};

export default async function Page({ params }: PageProps) {
  const story = await getStoryData(params);

  if (!story) {
    return notFound();
  }

  return <StoryblokStory story={story} />;
}
