'use client';

import { formatTimeAgo } from '@/lib/date';
import { cn } from '@/lib/utils';
import { ListTestimonials } from '@/types/storyblok';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AnimateOnScroll from '../shared/animate-on-scroll';
import BorderDecorator from '../shared/border-decorator';
import Rating from '../shared/rating';
import { Button } from '../ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface Props {
  blok: ListTestimonials;
}

const ListTestimonialsSection = ({ blok }: Props) => {
  const { title, testimonials, cta_label, cta_link, variant, media } = blok;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (variant === 'list') {
    return (
      <div className="section-padding space-y-8 lg:space-y-[60px]">
        <AnimateOnScroll variant="fadeUp" duration={0.6}>
          <h2 className="heading-2 text-center">{title}</h2>
        </AnimateOnScroll>
        {testimonials?.map((testimonial, index) => (
          <AnimateOnScroll key={testimonial._uid} variant="fadeUp" delay={0.1 * index}>
            <div className="space-y-[1px] border-l-4 border-[#2E2F2E] pl-6">
              <QuoteIcon />
              <div className="border-b border-b-[#ADADAD] pb-[13px]">
                <p className="paragraph">{testimonial.content}</p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-[0.25px]">
                  <div className="text-lg leading-[150%] font-medium tracking-[0px] text-[#221E20]">
                    {testimonial.author_name}
                  </div>
                  <div className="text-base leading-[140%] font-normal tracking-[0px] text-[#ADADAD]">
                    {formatTimeAgo(testimonial.date || new Date())}
                  </div>
                </div>
                <div>
                  {testimonial.platform === 'google' && <GoogleIcon className="mt-2" />}
                  {testimonial.platform === 'yelp' && <YelpIcon className="mt-2" />}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
        <div className="flex justify-center">
          <Button asChild>
            <Link href={cta_link || '#'}>{cta_label}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* <Image
        src={bg_testimonials}
        alt="Background"
        fill
        className="absolute inset-0 -z-10 h-full w-full -rotate-180 -rotate-x-180 object-cover object-bottom"
      /> */}
      <div className="section-padding flex min-w-0 items-center gap-16">
        <AnimateOnScroll variant="scaleIn" duration={0.8} className="flex min-w-0">
          <BorderDecorator
            title={title || ''}
            topBorderPercent="15%"
            insideBlockClassName="bg-transparent backdrop-blur-none"
            titleClassName="lg:w-full w-fit"
            className="w-fit"
            content={
              <div className="relative flex flex-col items-center gap-4.5 px-4 pt-14 pb-10">
                <div className="flex flex-1 flex-col items-center gap-2 lg:flex-row">
                  {media?.map((item, index) => (
                    <div key={index} className="relative flex-1 lg:max-w-[340px]">
                      <Image
                        src={item.image?.filename || ''}
                        alt={item.image?.alt || 'Media Image'}
                        width={340}
                        height={340}
                        className="aspect-340/191 h-full w-full object-cover"
                      />
                      <PlayIcon className="absolute top-1/2 left-1/2 size-[47px] -translate-x-1/2 -translate-y-1/2 cursor-pointer" />
                    </div>
                  ))}
                </div>
                <div className="w-full lg:max-w-[402px]">
                  <Carousel className="w-full min-w-0" setApi={setApi} opts={{ loop: true, slidesToScroll: 1 }}>
                    <CarouselContent>
                      {testimonials?.map((testimonial) => (
                        <CarouselItem key={testimonial._uid} className="basis-full">
                          <div className="flex min-w-0 flex-col items-center gap-4.5">
                            <Rating rating={Number(testimonial.rating) || 0} size="lg" />
                            <p className="paragraph leading-[150% line-clamp-4 text-center">{testimonial.content}</p>
                            <h3 className="heading-3 text-center">{testimonial.author_name}</h3>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 size-11 max-lg:top-auto max-lg:-bottom-8 lg:-left-16" />
                    <CarouselNext className="right-0 size-11 max-lg:top-auto max-lg:-bottom-8 lg:-right-16" />
                  </Carousel>
                </div>
                <div className="flex items-center gap-2">
                  {Array.from({ length: count }).map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex size-5 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-transparent',
                        {
                          'border-[#2E2F2E]': current - 1 === index,
                        },
                      )}
                    >
                      <div
                        className={cn('size-3 rounded-full bg-white', {
                          'bg-[#2E2F2E]': current - 1 === index,
                        })}
                        onClick={() => api?.scrollTo(index)}
                      />
                    </div>
                  ))}
                </div>
                <Button asChild className="w-fit">
                  <Link href={cta_link || '#'}>{cta_label}</Link>
                </Button>
              </div>
            }
          />
        </AnimateOnScroll>
      </div>
    </div>
  );
};

export default ListTestimonialsSection;

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M.5 24C.5 11.021 11.021.5 24 .5S47.5 11.021 47.5 24 36.979 47.5 24 47.5.5 36.979.5 24m17.4-5.596c0-2.238 2.427-3.633 4.36-2.506l9.603 5.596c1.92 1.12 1.92 3.893 0 5.012l-9.602 5.596c-1.934 1.127-4.361-.268-4.361-2.506z"
        clipRule="evenodd"
      ></path>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h48v48H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 35 35" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#DEEBF5"
        fillRule="evenodd"
        d="M26.25 35H8.75A8.75 8.75 0 0 1 0 26.25V8.75A8.75 8.75 0 0 1 8.75 0h17.5A8.75 8.75 0 0 1 35 8.75v17.5A8.75 8.75 0 0 1 26.25 35"
        clipRule="evenodd"
      ></path>
      <path
        fill="#F0FAFF"
        fillRule="evenodd"
        d="M16.406 9.844h9.844a4.922 4.922 0 0 0 .503-9.819C26.586.015 26.42 0 26.25 0H8.75A8.75 8.75 0 0 0 0 8.75v17.5A16.407 16.407 0 0 1 16.406 9.844"
        clipRule="evenodd"
      ></path>
      <path
        fill="#CDDCEB"
        fillRule="evenodd"
        d="M26.25 17.5A8.75 8.75 0 1 0 35 26.25V8.75a8.75 8.75 0 0 1-8.75 8.75"
        clipRule="evenodd"
      ></path>
      <path
        fill="#1E78FF"
        d="M28.438 17.757q0-.64-.06-1.279a1.09 1.09 0 0 0-1.087-.987c-1.955-.002-6.408-.002-8.477-.002a1.094 1.094 0 0 0-1.093 1.094v2.11a1.094 1.094 0 0 0 1.093 1.093h4.933a5.16 5.16 0 0 1-2.23 3.39v.002a2.79 2.79 0 0 0 2.787 2.787h.809c2.111-1.943 3.325-4.813 3.325-8.208"
      ></path>
      <path
        fill="#00B450"
        d="M17.721 28.659a10.68 10.68 0 0 0 7.396-2.694l-3.595-2.788a6.77 6.77 0 0 1-10.061-3.538h-.838a2.873 2.873 0 0 0-2.873 2.873v.001a11.16 11.16 0 0 0 9.971 6.146"
      ></path>
      <path
        fill="#FFB400"
        d="M11.456 19.638a6.68 6.68 0 0 1 0-4.271v-.002a2.874 2.874 0 0 0-2.873-2.873h-.834a11.17 11.17 0 0 0 0 10.02z"
      ></path>
      <path
        fill="#E60014"
        d="M17.721 10.758c1.27-.02 2.516.359 3.56 1.084a1.075 1.075 0 0 0 1.393-.11c.5-.474 1.159-1.132 1.677-1.65a1.093 1.093 0 0 0-.105-1.64 10.83 10.83 0 0 0-6.525-2.1 11.16 11.16 0 0 0-9.971 6.15l3.707 2.874a6.67 6.67 0 0 1 6.264-4.608"
      ></path>
    </g>
    <defs>
      <clipPath id="a">
        <rect width="35" height="35" fill="#fff" rx="17.5"></rect>
      </clipPath>
    </defs>
  </svg>
);

const YelpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 35 35" {...props}>
    <g clipPath="url(#a)">
      <g clipPath="url(#b)">
        <path fill="#DB3429" d="M35 17.5a17.5 17.5 0 1 1-34.999 0A17.5 17.5 0 0 1 35 17.5"></path>
        <path
          fill="#C20000"
          d="m34.482 21.733-10.491-10.49a.79.79 0 0 0-.642-.291l-5.803-5.885a.795.795 0 0 0-.885-.233l-5.676 2.098a.797.797 0 0 0-.374 1.206l5.676 8.039q.069.098.163.173l3.424 3.418a.8.8 0 0 0-.472 1.187l1.726 2.82-5.284-5.312a.8.8 0 0 0-.277-.245l-6.257-3.38a.796.796 0 0 0-1.174.658l-.277 5.056a.79.79 0 0 0 .247.62l4.144 4.097-.648.7a.8.8 0 0 0 .05 1.133l7.795 7.794a17.51 17.51 0 0 0 15.035-13.163"
        ></path>
        <path
          fill="#fff"
          d="m16.663 4.836-5.676 2.098a.796.796 0 0 0-.374 1.206l5.676 8.039a.796.796 0 0 0 1.447-.46V5.583a.796.796 0 0 0-1.073-.747M8.143 15.496l-.277 5.055a.797.797 0 0 0 .993.816l6.53-1.671a.796.796 0 0 0 .181-1.473l-6.252-3.38a.796.796 0 0 0-1.175.653"
        ></path>
        <path
          fill="#FFF5CB"
          d="m19.272 16.812 3.43-5.485a.797.797 0 0 1 1.292-.083l2.925 3.561a.797.797 0 0 1-.389 1.264l-6.356 1.923a.796.796 0 0 1-.902-1.18"
        ></path>
        <path
          fill="#fff"
          d="m16.188 21.02-4.58 4.944a.795.795 0 0 0 .346 1.302l4.581 1.433a.797.797 0 0 0 1.035-.76V21.56a.796.796 0 0 0-1.382-.542"
        ></path>
        <path
          fill="#FFF5CB"
          d="m19.403 20.958 3.52 5.758a.796.796 0 0 0 1.335.038l2.64-3.814a.796.796 0 0 0-.415-1.213l-6.16-1.945a.796.796 0 0 0-.92 1.176"
        ></path>
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h35v35H0z"></path>
      </clipPath>
      <clipPath id="b">
        <path fill="#fff" d="M0 0h35v35H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

const QuoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" {...props}>
    <path
      fill="#2E2F2E"
      d="m12.688 4.57-2.016 11.328h3.36v11.904H3.664v-12L6.832 4.57zm15.552 0-2.016 11.328h3.36v11.904H19.216v-12L22.384 4.57z"
    ></path>
  </svg>
);
