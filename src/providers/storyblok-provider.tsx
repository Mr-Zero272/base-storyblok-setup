'use client';

import { getStoryblokApi } from '@/lib/storyblok/api';
import { PropsWithChildren } from 'react';

export default function StoryblokProvider({ children }: PropsWithChildren) {
  getStoryblokApi();
  return children;
}
