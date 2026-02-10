import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { getCachedPageContent } from '@/lib/storyblok-cached';
import { resolveSlug } from '@/lib/storyblok-helpers';
import { ISbStoryData } from '@storyblok/react';
import { StoryblokStory } from '@storyblok/react/rsc';
import { ArrowUpRightIcon, SearchXIcon } from 'lucide-react';
import Link from 'next/link';

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
    const data = await getCachedPageContent(fullSlug);
    return data.story as ISbStoryData;
  } catch (error) {
    console.error('Error fetching story data:', error);
    return null;
  }
}

export const generateMetadata = async ({ params }: PageProps) => {
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
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchXIcon />
          </EmptyMedia>
          <EmptyTitle>No Story Yet</EmptyTitle>
          <EmptyDescription>
            We couldn&apos;t find the page you were looking for. Please check the URL or create new content in
            Storyblok.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="outline">
            <Link href="http://app.storyblok.com/" target="_blank" rel="noopener noreferrer">
              Go to Storyblok
            </Link>
          </Button>
        </EmptyContent>
        <Button variant="link" asChild className="text-muted-foreground" size="sm">
          <Link href="http://storyblok.com/" target="_blank" rel="noopener noreferrer">
            Learn More <ArrowUpRightIcon />
          </Link>
        </Button>
      </Empty>
    );
  }

  return <StoryblokStory story={story} />;
}
