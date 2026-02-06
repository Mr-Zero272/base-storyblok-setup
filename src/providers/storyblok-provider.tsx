"use client";

import { getStoryblokApi } from "@/lib/storyblok";
import { PropsWithChildren } from "react";

export default function StoryblokProvider({ children }: PropsWithChildren) {
  getStoryblokApi();
  return children;
}
