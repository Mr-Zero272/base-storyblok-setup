import { StatisticItem as StatisticItemType, Statistics } from '@/types/storyblok';
import Image from 'next/image';
import AnimateOnScroll from '../shared/animate-on-scroll';

interface Props {
  blok: Statistics;
}

const StatisticsSection = ({ blok }: Props) => {
  const { title, sub_title, items } = blok;
  return (
    <div className="relative h-[623px] lg:h-[496px]">
      <div className="absolute top-0 z-10 flex h-[192px] max-w-[1200px] flex-col items-center justify-center bg-[#2E2F2E] max-lg:right-5 max-lg:left-5 lg:left-1/2 lg:h-[320px] lg:w-full lg:-translate-x-1/2">
        <div>
          <h2 className="heading-2 text-center tracking-[-2%] text-[#E5B439]">{title}</h2>
          <p className="font-alle-porsche text-center text-lg leading-[150%] tracking-[0%] text-[#E5B439] uppercase lg:text-[32px]">
            {sub_title}
          </p>
        </div>
        <div className="absolute bottom-0 flex translate-y-8/9 flex-col items-center gap-8 lg:translate-y-1/2 lg:flex-row">
          {items?.map((item, index) => (
            <AnimateOnScroll
              key={item._uid}
              variant="fadeUp"
              duration={0.7}
              delay={index * 0.2}
              className="w-full lg:w-[265px]"
            >
              <StatisticItem item={item} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
      <div className="absolute right-0 bottom-0 left-0 h-[524px] lg:h-[320px]">
        {/* <Image src={bg_clinic} alt="Background" fill className="absolute inset-0 -z-10 h-full w-full object-cover" /> */}
        <div className="absolute inset-0 -z-5 bg-[#7B590399]" />
      </div>
    </div>
  );
};

export default StatisticsSection;

const StatisticItem = ({ item }: { item: StatisticItemType }) => {
  return (
    <div className="relative flex h-30 w-full items-center justify-center bg-white px-2 pt-7 pb-5 lg:w-[265px]">
      <Image
        src={item.icon?.filename || ''}
        alt={item.icon?.meta_data?.alt || 'icon'}
        width={60}
        height={60}
        className="absolute top-0 left-1/2 z-100 size-[45px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
      />
      <div className="flex flex-col items-center justify-center">
        <h3 className="heading-2 text-[32px] lg:text-[32px]">{item.value}</h3>
        <p className="paragraph leading-[170%] text-[#221E20]">{item.label}</p>
      </div>
    </div>
  );
};
