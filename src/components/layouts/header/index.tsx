import { Button } from '@/components/ui/button';
import { getCachedGlobalContent } from '@/lib/storyblok-cached';
import { Header as HeaderType } from '@/types/storyblok';
import Image from 'next/image';
import Link from 'next/link';
import DesktopNavigation from './components/desktop-navigation';
import MobileNavigation from './components/mobile-navigation';

const Header = async () => {
  const rawData = await getCachedGlobalContent('header');
  const { logo, navigation, cta_label, cta_link } = rawData.story.content as HeaderType;

  return (
    <div className="sticky top-0 z-100 flex h-[72px] items-center justify-between gap-4 bg-white px-4 py-2.5 min-[1265px]:h-25 min-[1265px]:gap-6 min-[1265px]:px-6">
      <Image
        src={logo?.filename || '/placeholder-logo.png'}
        alt="Logo"
        width={161}
        height={76}
        className="h-[32px] w-[32px] object-contain min-[1265px]:h-[40px] min-[1265px]:w-[40px]"
      />

      {/* desktop nav */}
      <DesktopNavigation navigationItems={navigation || []} className="hidden flex-1 min-[1265px]:flex" />

      {/* mobile nav */}
      <MobileNavigation navigationItems={navigation || []} cta_label={cta_label} cta_link={cta_link} />

      <Button asChild className="hidden min-[1265px]:inline-flex">
        <Link href={cta_link || '#'}> {cta_label}</Link>
      </Button>
    </div>
  );
};

export default Header;
