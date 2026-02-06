import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  title: string;
  titleClassName?: string;
  content: React.ReactNode;
  contentClassName?: string;
  borderColor?: string;
  paddingBetween?: string;
  className?: string;
  topBorderPercent?: string;
  insideBlockClassName?: string;
}

const BorderDecorator = ({
  title,
  titleClassName = '',
  content,
  contentClassName,
  className = '',
  borderColor = '#2E2F2E',
  paddingBetween = '4px',
  topBorderPercent,
  insideBlockClassName,
}: Props) => {
  return (
    <div
      className={cn('relative w-full min-w-0 border-r border-b border-l', className)}
      style={{
        borderColor: borderColor,
        padding: paddingBetween,
      }}
    >
      <div
        className="absolute top-0 left-0 w-1/5 border-t"
        style={{
          borderColor: borderColor,
          width: topBorderPercent || '20%',
        }}
      />
      <div
        className="absolute top-0 right-0 w-1/5 border-t border-white"
        style={{
          borderColor: borderColor,
          width: topBorderPercent || '20%',
        }}
      />
      <div
        className={cn(
          'relative w-full min-w-0 border-r-4 border-b-4 border-l-4 bg-[#FFFFFF1F] backdrop-blur-sm',
          insideBlockClassName,
        )}
        style={{
          borderColor: borderColor,
        }}
      >
        <div
          className="absolute top-0 left-0 w-1/5 border-t-4"
          style={{
            borderColor: borderColor,
            width: topBorderPercent || '20%',
          }}
        />
        <div
          className="absolute top-0 right-0 w-1/5 border-t-4"
          style={{
            borderColor: borderColor,
            width: topBorderPercent || '20%',
          }}
        />
        <h3
          className={cn(
            'font-anakeim-display-ssk 0 absolute top-0 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 text-center text-xl leading-[140%] font-normal tracking-[2px] text-[#2E2F2E] lg:text-[36px]',
            titleClassName,
          )}
        >
          {title}
        </h3>
        <div className={cn('', contentClassName)}>{content}</div>
      </div>
    </div>
  );
};

export default BorderDecorator;
