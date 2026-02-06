import { Page as PageType } from '@/types/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';

interface PageProps {
  blok: PageType;
}

export default function Page({ blok }: PageProps) {
  return (
    <main>
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
