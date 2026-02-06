import RichText from '@/components/shared/rich-text';
import { BottomFooter as BottomFooterType } from '@/types/storyblok';
import Image from 'next/image';
import Link from 'next/link';

type BottomFooterProps = {
  data?: BottomFooterType;
};

function BottomFooter({ data }: BottomFooterProps) {
  const {
    logo,
    description: bottom_description,
    social_links,
    navigation_label,
    navigation,
    contact_label,
    contacts,
    copyright,
  } = data || {};
  return (
    <div className="container mx-auto max-w-[1200px] space-y-12 px-4 pt-10 pb-6 lg:pt-25">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="flex flex-3 flex-col gap-8 lg:flex-row lg:gap-3">
          <div className="flex-1 space-y-[31px]">
            <div className="space-y-2">
              <h4 className="font-josefin-sans text-2xl leading-[150%] font-semibold tracking-[0%] text-[#102447] lg:text-[32px]">
                {navigation_label}
              </h4>
              <div className="border-primary w-32 border-t" />
            </div>
            <div className="space-y-2">
              {navigation?.map((navItem) => {
                return (
                  <Link key={navItem._uid} href={navItem.link || '/'} className="nav-link block">
                    {navItem.label || 'Navigation Item'}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex-1 space-y-[31px]">
            <div className="space-y-2">
              <h4 className="font-josefin-sans text-2xl leading-[150%] font-semibold tracking-[0%] text-[#102447] lg:text-[32px]">
                {contact_label}
              </h4>
              <div className="border-primary w-32 border-t" />
            </div>
            <div className="space-y-5">
              {contacts?.map((contact) => {
                return (
                  <div key={contact._uid} className="">
                    <div className="flex items-center gap-2">
                      <Image
                        src={contact.icon?.filename || ''}
                        alt={contact.icon?.alt || 'contact-icon'}
                        width={24}
                        height={24}
                        className="size-6"
                      />
                      <span className="paragraph text-lg">{contact.label}</span>
                    </div>
                    <p className="paragraph text-lg">{contact.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-2 space-y-6">
          <Image
            src={logo?.filename || ''}
            alt={logo?.alt || 'Footer logo'}
            width={163}
            height={80}
            className="h-[32px] w-[32px] object-contain"
          />
          <p className="paragraph w-full">{bottom_description}</p>
          <div className="flex items-center gap-8">
            {social_links?.map((social_link) => (
              <Link
                key={social_link._uid}
                href={social_link.link || '/'}
                className="bg-primary flex size-10 items-center justify-center rounded-full"
              >
                <Image
                  src={social_link?.icon?.filename || ''}
                  alt={social_link?.icon?.meta_data?.alt || 'social-icon'}
                  width={40}
                  height={40}
                  className="size-4"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full border-t border-[#2E2F2E]" />
        <RichText doc={copyright} variant="copyright" />
      </div>
    </div>
  );
}

export default BottomFooter;
