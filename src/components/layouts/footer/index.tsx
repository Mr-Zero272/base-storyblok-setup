import { getCachedGlobalContent } from '@/lib/storyblok/storyblok-cached';
import { Footer as FooterType } from '@/types/storyblok';
import BottomFooter from './components/bottom-footer';

const Footer = async () => {
  const rawData = await getCachedGlobalContent({ slug: 'footer' });
  const { top, bottom } = rawData.story.content as FooterType;
  return (
    <div>
      {/* top footer */}
      {/* <TopFooter data={top?.[0]} /> */}
      {/* bottom footer */}
      <BottomFooter data={bottom?.[0]} />
    </div>
  );
};

export default Footer;
