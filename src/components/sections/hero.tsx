import { Hero } from '@/types/storyblok';
import Image from 'next/image';
import AnimateOnScroll from '../shared/animate-on-scroll';

interface HeroSectionProps {
  blok: Hero;
}

const HeroSection = ({ blok }: HeroSectionProps) => {
  const { title, description, background } = blok;
  return (
    <div className="relative flex h-[580px] flex-col items-center justify-end px-4 py-12 lg:h-[648px] lg:px-30 lg:py-20">
      <Image
        src={background?.filename || ''}
        alt={background?.alt || 'Hero background'}
        fill
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      <div className="absolute inset-0 -z-5 size-full bg-[#00000033]" />

      <AnimateOnScroll variant="fadeBottomLeft">
        <div className="mx-auto flex max-w-[800px] flex-col items-center justify-end">
          <h1 className="heading-1">{title}</h1>
          <p className="paragraph text-center text-white">{description}</p>
        </div>
      </AnimateOnScroll>
    </div>
  );
};

export default HeroSection;
