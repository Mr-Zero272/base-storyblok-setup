import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { lazy } from 'react';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    page: lazy(() => import('../components/layouts/page')),
    hero: lazy(() => import('../components/sections/hero')),
    split_content: lazy(() => import('../components/sections/split-content')),
    feature_carousel: lazy(() => import('../components/sections/feature_carousel')),
    list_testimonials: lazy(() => import('../components/sections/list-testimonials')),
    profile_highlight: lazy(() => import('../components/sections/profile-highlight')),
    gallery_carousel: lazy(() => import('../components/sections/gallery-carousel')),
    message_highlight: lazy(() => import('../components/sections/message-highlight')),
    statistics: lazy(() => import('../components/sections/statistics')),
    cta_card: lazy(() => import('../components/sections/cta-card')),
    service_showcase: lazy(() => import('../components/sections/service-showcase')),
    service_overview: lazy(() => import('../components/sections/service-overview')),
    normal_richtext: lazy(() => import('../components/sections/normal-richtext')),
  },
  apiOptions: {
    region: 'eu',
    cache: {
      clear: 'auto',
      type: 'memory',
    },
  },
});
