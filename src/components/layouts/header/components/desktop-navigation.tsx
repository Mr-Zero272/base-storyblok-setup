'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { LinkItem } from '@/types/storyblok';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DesktopNavigationProps {
  navigationItems: LinkItem[];
  className?: string;
}

const DesktopNavigation = ({ navigationItems, className }: DesktopNavigationProps) => {
  const pathname = usePathname();

  return (
    <div className={cn('flex items-center justify-center gap-10', className)}>
      {navigationItems.map((item, index) => {
        const isActive = pathname === item.link;
        const hasSubmenu = item.sub_links && item.sub_links.length > 0;

        if (hasSubmenu) {
          return (
            <Popover key={item._uid}>
              {/* <AnimateOnScroll variant="fadeDown" delay={index * 0.1}> */}
              <PopoverTrigger asChild className="group">
                <button className="nav-link flex items-center">
                  <span>{item.label}</span>
                  <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </PopoverTrigger>
              {/* </AnimateOnScroll> */}
              <PopoverContent className="z-101 bg-[#E5B439] p-4">
                <div className="flex flex-col gap-5 border-l-2 border-[#2E2F2E] px-4">
                  {item.sub_links!.map((subItem) => (
                    <Link
                      key={subItem._uid}
                      href={subItem.link || '#'}
                      className="nav-link transition-transform hover:-translate-y-0.5"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          );
        }
        return (
          // <AnimateOnScroll key={item._uid} variant="fadeDown" delay={index * 0.1}>
          <Link
            key={item._uid}
            href={item.link || '#'}
            className={cn('nav-link', {
              'text-primary font-bold': isActive,
            })}
          >
            {item.label}
          </Link>
          // </AnimateOnScroll>
        );
      })}
    </div>
  );
};

export default DesktopNavigation;
