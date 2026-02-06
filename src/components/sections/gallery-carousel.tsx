'use client';

import { cn } from '@/lib/utils';
import { GalleryCarousel } from '@/types/storyblok';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AnimateOnScroll from '../shared/animate-on-scroll';
import { Button } from '../ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel';

interface Props {
  blok: GalleryCarousel;
}

const GalleryCarouselSection = ({ blok }: Props) => {
  const { title, description, images, cta_label, cta_link } = blok;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div>
      <div className="section-padding max-w-full space-y-8 lg:space-y-16">
        <AnimateOnScroll variant="fadeUp" duration={0.6}>
          <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 lg:flex-row">
            <h2 className="heading-2 flex-1">{title}</h2>
            <p className="paragraph flex-1 leading-[150%]">{description}</p>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll
          variant="fadeUp"
          delay={0.2}
          duration={0.7}
          className="-mx-4 flex flex-col items-center gap-8 lg:gap-12"
        >
          <Carousel className="w-full" opts={{ loop: true, align: 'center' }} setApi={setApi}>
            <CarouselContent>
              {images?.map((item, index) => (
                <CarouselItem key={item._uid} className="basis-[66%] lg:basis-[27%]">
                  <div
                    className={cn('transition-all duration-500', {
                      'scale-90 grayscale': index !== current - 1,
                    })}
                  >
                    <Image
                      src={item.image?.filename || ''}
                      alt={item.image?.alt || 'Gallery Image'}
                      width={1200}
                      height={600}
                      className="aspect-480/360 h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mx-auto flex w-full max-w-[343px] items-center justify-between">
            <button
              className="flex size-11 items-center justify-center rounded-full border-2 border-[#2E2F2E]"
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeftIcon className="size-5 text-[#2E2F2E]" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: images?.length || 0 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex size-5 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-transparent',
                    {
                      'border-[#E5E0B5]': current - 1 === index,
                    },
                  )}
                >
                  <div
                    className={cn('size-3 rounded-full bg-[#E5E0B5]', {
                      'bg-[#2E2F2E]': current - 1 === index,
                    })}
                    onClick={() => api?.scrollTo(index)}
                  />
                </div>
              ))}
            </div>
            <button
              className="flex size-11 items-center justify-center rounded-full border-2 border-[#2E2F2E]"
              onClick={() => api?.scrollNext()}
            >
              <ArrowRightIcon className="size-5 text-[#2E2F2E]" />
            </button>
          </div>
          <Button asChild className="mx-auto w-fit">
            <Link href={cta_link || '#'}>{cta_label}</Link>
          </Button>
        </AnimateOnScroll>
      </div>
    </div>
  );
};

export default GalleryCarouselSection;
