"use client";

import { ContactSection } from "./components/sections/ContactSection";
import { Hero } from "./components/sections/Hero";
import { HomeAboutTeaser } from "./components/sections/HomeAboutTeaser";
import { HomeWorkPreview } from "./components/sections/HomeWorkPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeWorkPreview />
      <HomeAboutTeaser />
      <ContactSection />
    </>
  );
}
