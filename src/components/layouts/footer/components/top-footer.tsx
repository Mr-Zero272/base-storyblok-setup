'use client';

import MapComponent from '@/components/shared/map';
import { Button } from '@/components/ui/button';
import { TopFooter as TopFooterType } from '@/types/storyblok';
import Image from 'next/image';
import Link from 'next/link';

interface TopFooterProps {
  data?: TopFooterType;
}

const TopFooter = ({ data }: TopFooterProps) => {
  const {
    background,
    title,
    description,
    phone,
    office_hours,
    office_hours_label,
    latitude,
    longitude,
    cta_label,
    cta_link,
  } = data || {};

  if (!data) {
    return null;
  }

  return (
    <div className="relative">
      <Image
        src={background?.filename || ''}
        alt={background?.alt || 'Footer background'}
        fill
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-5 size-full bg-[#7B5903] opacity-60" />
      <div className="relative container mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-12 lg:flex-row lg:gap-[102px] lg:py-25">
        <div className="flex-1">
          <MapComponent
            center={[Number(longitude) || -111.8651523, Number(latitude) || 33.7422526]}
            zoom={15}
            className="h-[300px] w-full lg:h-full"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-8">
          <div className="space-y-8">
            <h2 className="heading-2 text-center text-white">{title}</h2>
            <div className="flex justify-center">
              <div className="relative border-r border-b border-l border-white p-2">
                <div className="absolute top-0 left-0 w-1/4 border-t border-white" />
                <div className="absolute top-0 right-0 w-1/4 border-t border-white" />
                <div className="relative size-full border-r-4 border-b-4 border-l-4 border-white bg-[#FFFFFF1F] backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-1/4 border-t-4 border-white" />
                  <div className="absolute top-0 right-0 w-1/4 border-t-4 border-white" />
                  <h3 className="font-alle-porsche absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[24px] leading-[140%] font-normal tracking-[0px] text-white lg:text-[32px]">
                    {office_hours_label}
                  </h3>
                  <div className="flex size-full flex-col items-center justify-center gap-2 px-6 pt-10 pb-4 lg:px-20">
                    {office_hours?.map((item) => (
                      <div key={item._uid} className="grid w-full grid-cols-7 gap-8">
                        <span className="col-span-3 text-base leading-[150%] font-light tracking-[0%] text-white lg:text-lg">
                          {item.day}
                        </span>
                        <div className="col-span-4 flex items-center gap-1 text-base leading-[150%] font-light tracking-[0%] text-white lg:text-lg">
                          {item.is_closed ? 'CLOSED' : item.open_time + ' - ' + item.close_time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-center text-base leading-[140%] font-normal tracking-[0px] text-white">
                {description}
              </p>
              <span className="font-lexend text-center text-xl leading-[140%] font-semibold tracking-[0px] text-white">
                {phone}
              </span>
            </div>
            <Button variant="secondary" asChild className="w-full">
              <Link href={cta_link || '#'}>{cta_label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFooter;
