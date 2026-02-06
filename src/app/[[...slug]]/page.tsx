import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { getStoryblokApi } from '@/lib/storyblok';
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
  const fullSlug = slug ? (slug.length > 0 ? slug.join('/') : '/pages/home') : '/pages/home';
  const fullSlugPages = fullSlug?.includes('pages') ? fullSlug : `/pages/${fullSlug}`;

  const storyblokApi = getStoryblokApi();
  try {
    const { data } = await storyblokApi.get(`cdn/stories/${fullSlugPages}`, {
      version: 'published',
    });
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
      title: 'Dr. Denise Hamlin',
      description:
        'I am dedicated to helping you achieve a healthy, confident smile. A great smile is not just about appearance—it can improve comfort, boost self-esteem, and enhance your quality of life. My focus is on providing personalized care that supports both your oral health and overall well-being.',
    };
  }

  return {
    title: story?.content?.meta_title || 'Dr. Denise Hamlin',
    description:
      story?.content?.meta_description ||
      'I am dedicated to helping you achieve a healthy, confident smile. A great smile is not just about appearance—it can improve comfort, boost self-esteem, and enhance your quality of life. My focus is on providing personalized care that supports both your oral health and overall well-being.',
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
