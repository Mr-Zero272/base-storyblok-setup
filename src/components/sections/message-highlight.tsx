import { MessageHighlight } from '@/types/storyblok';
import AnimateOnScroll from '../shared/animate-on-scroll';

type Props = {
  blok: MessageHighlight;
};

function MessageHighlightSection({ blok }: Props) {
  const { tagline, title, description } = blok;
  return (
    <div className="section-padding max-w-[720px] space-y-3">
      <AnimateOnScroll variant="fadeUp">
        <h4 className="tagline">{tagline}</h4>
      </AnimateOnScroll>
      <AnimateOnScroll variant="fadeUp" delay={0.1}>
        <h2 className="heading-2 text-center">{title}</h2>
      </AnimateOnScroll>
      <AnimateOnScroll variant="fadeUp" delay={0.2}>
        <p className="paragraph text-center">{description}</p>
      </AnimateOnScroll>
    </div>
  );
}

export default MessageHighlightSection;
