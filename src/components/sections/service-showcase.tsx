import { cn } from '@/lib/utils';
import { ServiceShowcase } from '@/types/storyblok';
import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from '../shared/animate-on-scroll';
import { Button } from '../ui/button';

interface Props {
  blok: ServiceShowcase;
}

const ServiceShowcaseSection = ({ blok }: Props) => {
  const { items, title } = blok;
  return (
    <div>
      <div className="section-padding space-y-8 pt-0 lg:space-y-16">
        <div className="flex flex-col items-center gap-5">
          <div className="h-25 w-0.5 bg-[#2E2F2E]" />
          <h2 className="heading-2 text-center">{title}</h2>
        </div>
        <div className="space-y-8 lg:space-y-16">
          {items?.map((service, index) => (
            <AnimateOnScroll
              key={service._uid}
              variant={index % 2 === 0 ? 'fadeLeft' : 'fadeRight'}
              duration={0.8}
              delay={index * 0.2}
              className={cn('flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-0', {
                'lg:flex-row-reverse': index % 2 !== 0,
              })}
            >
              <div
                className={cn('flex flex-col gap-5 lg:w-1/2 lg:gap-10', {
                  'lg:pr-10': index % 2 === 0,
                  'lg:pl-10': index % 2 !== 0,
                })}
              >
                <div className="space-y-2 lg:space-y-3">
                  <h3 className="heading-3 mb-4">{service.title}</h3>
                  <p className="paragraph text-[#2E2F2E]">{service.description}</p>
                </div>
                <Button asChild className="w-fit">
                  <Link href={service.cta_link || '#'}>{service.cta_label || 'Learn More'}</Link>
                </Button>
              </div>
              <div className="lg:w-1/2">
                <Image
                  src={service.image?.filename || ''}
                  alt={service.image?.alt || 'Service Image'}
                  width={600}
                  height={420}
                  className="aspect-600/420 object-cover"
                />
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceShowcaseSection;
