'use client';

import AnimateOnScroll from '@/components/shared/animate-on-scroll';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LinkItem } from '@/types/storyblok';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

interface MobileNavigationProps {
  cta_label?: string;
  cta_link?: string;
  navigationItems: LinkItem[];
  className?: string;
}

const MobileNavigation = ({ cta_label, cta_link, navigationItems, className }: MobileNavigationProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-fit w-fit flex-col items-center justify-center gap-1.5 px-1 py-2 min-[1265px]:hidden"
        >
          {/* Top line */}
          <motion.span
            className="block h-[1.75px] w-[26.26px] rounded-full bg-[#2E2F2E]"
            animate={{
              rotate: open ? 45 : 0,
              y: open ? 8 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          {/* Middle line */}
          <motion.span
            className="block h-[1.75px] w-[26.26px] rounded-full bg-[#2E2F2E]"
            animate={{
              opacity: open ? 0 : 1,
              scale: open ? 0.8 : 1,
            }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          {/* Bottom line */}
          <motion.span
            className="block h-[1.75px] w-[26.26px] rounded-full bg-[#2E2F2E]"
            animate={{
              rotate: open ? -45 : 0,
              y: open ? -8 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="top-auto bottom-0 z-150 h-[calc(100dvh-72px)] w-full gap-0" showCloseButton={false}>
        <SheetHeader className="sr-only">
          <SheetTitle>Mobile navigation</SheetTitle>
          <SheetDescription>Mobile navigation</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto bg-[#E5E0B5] px-4 py-8">
          <div className="flex flex-col gap-2">
            {navigationItems.map((item, index) => {
              const hasSubmenu = item.sub_links && item.sub_links.length > 0;

              if (hasSubmenu) {
                return (
                  <Collapsible key={item._uid}>
                    <AnimateOnScroll variant="fadeLeft" delay={index * 0.1} duration={0.4}>
                      <CollapsibleTrigger asChild className="group">
                        <button className="nav-link data-[state=open]:bg-primary data-[state=open]:text-primary-foreground flex w-full items-center justify-center px-4 py-2.5">
                          <span>{item.label}</span>
                          <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </button>
                      </CollapsibleTrigger>
                    </AnimateOnScroll>
                    <CollapsibleContent className="z-101 bg-[#E5B439] p-4">
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
                    </CollapsibleContent>
                  </Collapsible>
                );
              }
              return (
                <AnimateOnScroll key={item._uid} variant="fadeLeft" delay={index * 0.1} duration={0.4}>
                  <Link
                    href={item.link || '#'}
                    className="nav-link flex w-full items-center justify-center px-4 py-2.5"
                  >
                    {item.label}
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
        <SheetFooter className="bg-white px-4 pt-4 pb-11">
          <AnimateOnScroll variant="fadeUp" duration={0.4} delay={0.2}>
            <Button asChild className="w-full">
              <Link href={cta_link || '#'}>{cta_label}</Link>
            </Button>
          </AnimateOnScroll>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
