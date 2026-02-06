import { cn } from '@/lib/utils';
import { ProfileHighlight } from '@/types/storyblok';
import Image from 'next/image';
import { useMemo } from 'react';
import AnimateOnScroll from '../shared/animate-on-scroll';
import RichText from '../shared/rich-text';

interface Props {
  blok: ProfileHighlight;
}

const ProfileHighlightSection = ({ blok }: Props) => {
  const { tagline, heading, section_description, title, description, image, variant } = blok;
  const isDescriptionEmpty = useMemo(() => {
    return (
      !description ||
      (description.content && description.content.length === 0) ||
      (description.content && description.content.every((item) => item.type === 'paragraph' && !item.content))
    );
  }, [description]);

  const isTitleAndDescriptionEmpty = !title && isDescriptionEmpty;

  if (variant === 'image_left') {
    return (
      <div>
        <div className="relative z-51 h-[440px] lg:h-[352px]">
          {/* <Image
            src={bg_profile_highlight_2}
            alt="Background"
            fill
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          /> */}
          <div className="absolute inset-0 -z-5 bg-[#F0AC01] opacity-85" />
          <div className="section-padding relative mx-auto flex max-w-[1200px] flex-col gap-8 lg:flex-row lg:justify-between">
            <AnimateOnScroll variant="fadeLeft" duration={0.8} className="flex-3">
              <p className="paragraph leading-[170%] text-[#2E2F2E]">{section_description}</p>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fadeRight" duration={0.8} delay={0.2} className="flex-2 space-y-8 lg:space-y-12">
              <div className="space-y-3">
                <h3 className="tagline text-left text-base lg:text-base">{tagline}</h3>
                <h2 className="heading-2">{heading}</h2>
              </div>
              <Image
                src={image?.filename || ''}
                alt={image?.alt || 'Profile Image'}
                width={400}
                height={400}
                className="aspect-500/640 object-cover"
              />
            </AnimateOnScroll>
          </div>
        </div>
        <div>
          <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 pt-[341px] pb-12 lg:flex-row lg:gap-16 lg:pt-16 lg:pb-25">
            <div className="flex-1 space-y-2">
              {title && <h2 className="heading-2">{title}</h2>}
              {!isDescriptionEmpty && <RichText doc={description} className="[&_p]:text-[#2E2F2E]" />}
            </div>
            <div className="hidden flex-1 lg:block" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="mx-auto max-w-[1200px] pt-12 lg:pt-16">
        <div
          className={cn('flex flex-col gap-8 lg:gap-12', {
            'lg:flex-row lg:items-center lg:justify-between': variant === 'split_header',
          })}
        >
          {heading && (
            <h2
              className={cn('heading-2 text-center', {
                'lg:flex-1 lg:text-left': variant === 'split_header',
              })}
            >
              {heading}
            </h2>
          )}
          {section_description && (
            <p
              className={cn('paragraph mx-auto max-w-[800px] text-center leading-[150%]', {
                'lg:flex-1 lg:text-left': variant === 'split_header',
              })}
            >
              {section_description}
            </p>
          )}
        </div>
      </div>
      <div className="relative">
        <AnimateOnScroll
          variant="fadeUp"
          duration={0.8}
          className={cn(
            'relative z-10 mx-4 flex max-w-[1200px] flex-col items-center gap-8 bg-[#E5B439] px-4 py-12 lg:mx-auto lg:flex-row lg:gap-20 lg:p-12',
            {
              'mb-5 h-[480px] p-0 lg:min-h-[627px] lg:p-0': isTitleAndDescriptionEmpty,
            },
          )}
        >
          {(title || !isDescriptionEmpty) && (
            <div>
              {title && (
                <h3 className="font-anakeim-display-ssk text-xl leading-[150%] font-normal tracking-[0%] lg:text-[30px]">
                  {title}
                </h3>
              )}
              {!isDescriptionEmpty && <RichText doc={description} className="[&_p]:text-[#2E2F2E]" />}
            </div>
          )}
          <Image
            src={image?.filename || ''}
            alt={image?.alt || 'Profile Image'}
            width={isTitleAndDescriptionEmpty ? undefined : 600}
            height={isTitleAndDescriptionEmpty ? undefined : 600}
            fill={isTitleAndDescriptionEmpty}
            className={cn('aspect-420/531 object-cover', {
              'aspect-auto h-full w-full': isTitleAndDescriptionEmpty,
            })}
          />
        </AnimateOnScroll>
        <div className="absolute right-0 bottom-1/5 left-0 z-0 h-[320px] lg:bottom-1/7">
          {/* <Image
            src={bg_profile_highlight}
            alt="Background"
            fill
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          /> */}
          <div className="absolute inset-0 -z-5 bg-[#7B590399]" />
        </div>
      </div>
    </div>
  );
};

export default ProfileHighlightSection;
