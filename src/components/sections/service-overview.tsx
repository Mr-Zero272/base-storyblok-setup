import { ServiceOverview } from '@/types/storyblok';
import Image from 'next/image';
import AnimateOnScroll from '../shared/animate-on-scroll';
import RichText from '../shared/rich-text';

interface Props {
  blok: ServiceOverview;
}

const ServiceOverviewSection = ({ blok }: Props) => {
  const { title, description, image } = blok;
  return (
    <div className="relative">
      <div className="section-padding relative z-10">
        <AnimateOnScroll variant="fadeUp" duration={0.8} className="size-full">
          <div className="border-2 border-[#2E2F2E] bg-transparent p-2">
            <div className="space-y-5 border-4 border-[#2E2F2E] bg-white px-3 py-5 lg:space-y-12 lg:px-16 lg:py-20">
              <h2 className="heading-2 text-center">{title}</h2>
              <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-15">
                <AnimateOnScroll variant="fadeLeft" duration={0.8} delay={0.2} className="flex-1">
                  <RichText doc={description} variant="rich-text-normal" />
                </AnimateOnScroll>
                <AnimateOnScroll variant="fadeRight" duration={0.8} delay={0.2} className="flex-1">
                  <Image
                    src={image?.filename || ''}
                    alt={image?.alt || 'Service Overview Image'}
                    width={600}
                    height={600}
                    className="aspect-480/480 object-cover"
                  />
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
      <div className="absolute right-0 bottom-0 left-0 z-0 h-[320px]">
        {/* <Image
          src={bg_profile_highlight}
          alt="Background"
          fill
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        /> */}
        <div className="absolute inset-0 -z-5 bg-[#7B5903CC]" />
      </div>
    </div>
  );
};

export default ServiceOverviewSection;
