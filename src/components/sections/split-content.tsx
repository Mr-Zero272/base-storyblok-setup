import { cn, isWhiteBackground } from '@/lib/utils';
import { SplitContent } from '@/types/storyblok';
import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from '../shared/animate-on-scroll';
import RichText from '../shared/rich-text';
import StackedImage from '../shared/stack-image';
import { Button } from '../ui/button';

interface Props {
  blok: SplitContent;
}

const SplitContentSection = ({ blok }: Props) => {
  const {
    title,
    description,
    image,
    background_color,
    media_position,
    stack_image,
    cta_label,
    cta_link,
    title_bottom_line,
    title_bottom_line_color,
    stack_background,
    sub_title,
    no_padding_y,
    image_aspect,
    variant,
    extra_padding_top,
    background,
  } = blok;

  if (media_position === 'cover') {
    return (
      <div className="relative mb-[96px] h-[600px] lg:h-[800px]">
        {image?.filename && (
          <AnimateOnScroll variant="scaleIn" duration={0.8}>
            <Image
              src={image?.filename || ''}
              alt="Background"
              fill
              className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
            />
          </AnimateOnScroll>
        )}
        <AnimateOnScroll
          variant="fadeUp"
          delay={0.3}
          className="absolute right-4 bottom-0 left-4 w-fit translate-y-1/3 space-y-3 bg-[#F0AC01B2] p-8 lg:left-1/2 lg:w-[560px]"
        >
          <h2 className="heading-2 text-white">{title}</h2>
          <RichText doc={description} className="[&_p]:text-white" />
          {cta_link && (
            <Button asChild className="w-fit">
              <Link href={cta_link || '#'}>{cta_label || 'Click here'}</Link>
            </Button>
          )}
        </AnimateOnScroll>
      </div>
    );
  }

  if (variant === 'image_overflow') {
    return (
      <div className="relative z-50 lg:h-[442px]">
        {background?.filename && (
          <Image
            src={background?.filename}
            alt="Background"
            fill
            className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
          />
        )}
        <div
          className="absolute inset-0 -z-5 opacity-85"
          style={background_color ? { backgroundColor: background_color } : {}}
        />

        <div
          className={cn(
            'mx-auto flex max-w-[1200px] flex-col-reverse items-center gap-6 px-4 py-12 lg:flex-row lg:gap-16 lg:px-4 lg:py-25',
            {
              'flex-col-reverse lg:flex-row-reverse': media_position === 'left',
              'py-0 lg:py-0': no_padding_y,
              'lg:pt-[158px]': extra_padding_top,
            },
          )}
        >
          <AnimateOnScroll
            variant={media_position === 'left' ? 'fadeRight' : 'fadeLeft'}
            duration={0.7}
            className={cn('flex-1 space-y-2', {
              'space-y-[31px]': title_bottom_line,
            })}
          >
            <div className="space-y-2">
              <h2 className="heading-2">{title}</h2>
              {sub_title && <h3 className="paragraph leading-[150%]">{sub_title}</h3>}
            </div>
            {title_bottom_line && (
              <div
                className="h-0.5 max-w-[245px]"
                style={{
                  background: title_bottom_line_color || '#2E2F2E',
                }}
              />
            )}
            <RichText doc={description} />
          </AnimateOnScroll>
          <AnimateOnScroll
            variant={media_position === 'left' ? 'fadeLeft' : 'fadeRight'}
            duration={0.7}
            delay={0.2}
            className="flex-1"
          >
            <Image
              src={image?.filename || ''}
              alt={image?.alt || 'Image'}
              width={600}
              height={600}
              className={cn('z-1000 aspect-466/547 w-full object-cover')}
              style={
                image_aspect && image_aspect?.slice(7)
                  ? {
                      aspectRatio: image_aspect?.slice(7),
                    }
                  : {}
              }
            />
          </AnimateOnScroll>
        </div>
      </div>
    );
  }

  return (
    <div data-variant={variant || 'default'} className="relative overflow-hidden">
      {background?.filename && (
        <Image
          src={background?.filename}
          alt="Background"
          fill
          className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
        />
      )}
      <div
        className="absolute inset-0 -z-5"
        style={
          background_color && !isWhiteBackground(background_color)
            ? { backgroundColor: background_color }
            : { backgroundColor: 'transparent' }
        }
      />
      <div
        className={cn(
          'mx-auto flex max-w-[1200px] flex-col-reverse items-center gap-6 px-4 py-12 lg:flex-row lg:gap-16 lg:px-4 lg:py-25',
          {
            'flex-col lg:flex-row-reverse': media_position === 'left',
            'py-0 lg:py-0': no_padding_y,
            'lg:pt-[158px]': extra_padding_top,
          },
        )}
      >
        <AnimateOnScroll
          variant={media_position === 'left' ? 'fadeRight' : 'fadeLeft'}
          duration={0.7}
          className={cn('flex-1 space-y-2', {
            'space-y-[31px]': title_bottom_line,
          })}
        >
          <div className="space-y-2">
            <h2 className="heading-2">{title}</h2>
            {sub_title && <h3 className="paragraph leading-[150%]">{sub_title}</h3>}
          </div>
          {title_bottom_line && (
            <div
              className="h-0.5 max-w-[245px]"
              style={{
                background: title_bottom_line_color || '#2E2F2E',
              }}
            />
          )}
          <RichText doc={description} />
        </AnimateOnScroll>
        <AnimateOnScroll
          variant={media_position === 'left' ? 'fadeLeft' : 'fadeRight'}
          duration={0.7}
          delay={0.2}
          className="flex-1"
        >
          {stack_image && (
            <StackedImage
              imageUrl={image?.filename || ''}
              colors={['#E5B4391A', '#E5B43933', '#E5B43966']}
              className="aspect-466/547"
              variant={
                stack_background
                  ? media_position === 'left'
                    ? 'background_stack_left_bottom'
                    : 'background_stack_right'
                  : 'default'
              }
              stack_background={stack_background?.filename || ''}
              style={
                image_aspect && image_aspect?.slice(7)
                  ? {
                      aspectRatio: image_aspect?.slice(7),
                    }
                  : {}
              }
            />
          )}
          {!stack_image && (
            <Image
              src={image?.filename || ''}
              alt={image?.alt || 'Image'}
              width={600}
              height={400}
              className={cn('aspect-466/547 w-full object-cover')}
              style={
                image_aspect && image_aspect?.slice(7)
                  ? {
                      aspectRatio: image_aspect?.slice(7),
                    }
                  : {}
              }
            />
          )}
        </AnimateOnScroll>
      </div>
    </div>
  );
};

export default SplitContentSection;
