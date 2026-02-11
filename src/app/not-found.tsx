import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { ArrowUpRightIcon, SearchXIcon } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <Empty className="min-h-screen">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>No Story Yet</EmptyTitle>
        <EmptyDescription>
          We couldn&apos;t find the page you were looking for. Please check the URL or create new content in Storyblok.
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
};

export default NotFound;
