import { FeatureCarousel } from '@/types/storyblok';
import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from '../shared/animate-on-scroll';
import { Button } from '../ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface Props {
  blok: FeatureCarousel;
}

const FeatureCarouselSection = ({ blok }: Props) => {
  const { title, description, cta_label, cta_link, images } = blok;
  console.log({
    images,
  });
  return (
    <div className="relative">
      {/* <Image
        src={bg_feature_carousel}
        alt="Background"
        fill
        className="absolute inset-0 -z-10 h-full w-full -rotate-180 object-cover"
      /> */}
      <div className="absolute inset-0 -z-5 bg-[#F0AC0199]" />
      <div className="section-padding flex flex-col gap-8 lg:gap-16">
        <AnimateOnScroll variant="fadeUp" duration={0.6}>
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div className="space-y-2 lg:max-w-[720px]">
              <h2 className="heading-2">{title}</h2>
              <p className="paragraph leading-[150%]">{description}</p>
            </div>
            <Button asChild className="w-fit">
              <Link href={cta_link || '#'}>{cta_label}</Link>
            </Button>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll variant="fadeUp" delay={0.2} duration={0.7} className="w-full">
          <Carousel className="w-full">
            <CarouselContent>
              {images?.map((item, index) => (
                <CarouselItem key={item._uid} className="basis-[75%] lg:basis-1/4">
                  <Image
                    src={item.image?.filename || ''}
                    alt={item.image?.alt || `Feature image ${index + 1}`}
                    width={600}
                    height={400}
                    className="h-[480px] w-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 size-11" />
            <CarouselNext className="right-0 size-11" />
          </Carousel>
        </AnimateOnScroll>
      </div>
    </div>
  );
};

export default FeatureCarouselSection;
