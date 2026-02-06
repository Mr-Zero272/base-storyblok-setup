import { NormalRichtext } from '@/types/storyblok';
import AnimateOnScroll from '../shared/animate-on-scroll';
import RichText from '../shared/rich-text';

interface Props {
  blok: NormalRichtext;
}

const NormalRichtextSection = ({ blok }: Props) => {
  const { content } = blok;
  return (
    <div className="section-padding max-w-[860px]">
      <AnimateOnScroll variant="fadeUp" className="w-full">
        <RichText doc={content} className="space-y-8 [&_img]:mb-8" variant="rich-text-normal" />
      </AnimateOnScroll>
    </div>
  );
};

export default NormalRichtextSection;
