import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import StoryblokProvider from "@/providers/storyblok-provider";
import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <StoryblokProvider>
        <Header />
        {children}
        <Footer />
      </StoryblokProvider>
    </div>
  );
};

export default PageLayout;
