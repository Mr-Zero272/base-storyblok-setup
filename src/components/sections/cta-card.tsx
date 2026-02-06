import { CtaCard } from '@/types/storyblok';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from '../shared/animate-on-scroll';

interface Props {
  blok: CtaCard;
}

const CtaCardSection = ({ blok }: Props) => {
  const { section_description, heading, title, description, icon, cta_label, cta_link } = blok;
  return (
    <div className="relative">
      {/* <Image
        src={bg_profile_highlight_2}
        alt="Background"
        fill
        className="absolute inset-0 -z-10 h-full w-full object-cover grayscale"
      /> */}
      <div className="absolute inset-0 -z-5 bg-[#F0AC01] opacity-85" />
      <div className="section-padding space-y-8 lg:space-y-15">
        <AnimateOnScroll variant="fadeUp" duration={0.6}>
          <div className="flex flex-col-reverse items-end justify-between gap-3 lg:flex-row lg:items-center">
            <p className="paragraph leading-[170%] text-[#2E2F2E] lg:max-w-[600px]">{section_description}</p>
            <h2 className="heading-2 text-right lg:max-w-[540px]">{heading}</h2>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll variant="fadeUp" delay={0.2} duration={0.7} className="group relative">
          <div className="absolute z-5 h-full w-[calc(100%-24px)] -translate-x-2 -translate-y-8 bg-[#FFFFFF33] transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0 lg:w-full lg:-translate-x-8" />
          <div className="absolute z-5 h-full w-[calc(100%-24px)] translate-x-2 -translate-y-4 bg-[#FFFFFF7A] transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0 lg:w-full lg:-translate-x-4" />
          <div className="relative z-10 flex w-[calc(100%-24px)] flex-col gap-4.5 bg-white py-[11px] pr-4.5 pl-6 transition-colors group-hover:bg-[#E5B439] max-lg:ml-auto lg:w-full lg:flex-row lg:py-3 lg:pr-5 lg:pl-7">
            <Image
              src={icon?.filename || ''}
              alt={icon?.alt || 'Icon'}
              width={60}
              height={60}
              className="size-[70px] object-contain lg:size-25"
            />
            <div>
              <h3 className="font-anakeim-display-ssk text-xl leading-[140%] font-normal tracking-[2px] text-[#2E2F2E] capitalize lg:text-[28px]">
                {title}
              </h3>
              <div className="space-y-2">
                <p className="paragraph leading-[150%] text-[#221E20]">{description}</p>
                <Link
                  href={cta_link || '#'}
                  className="inline-flex items-center gap-2 text-base leading-[140%] font-normal tracking-[0px] text-[#2E2F2E]"
                >
                  {cta_label}
                  <ArrowRight className="size-5 text-[#2E2F2E]" />
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
};

export default CtaCardSection;
