"use client";

import { BrandLogos } from "./components/sections/BrandLogos";
import { ContactSection } from "./components/sections/ContactSection";
import { LandingAbout } from "./components/sections/LandingAbout";
import { LandingCertifications } from "./components/sections/LandingCertifications";
import { LandingEducation } from "./components/sections/LandingEducation";
import { LandingExperience } from "./components/sections/LandingExperience";
import { LandingHero } from "./components/sections/LandingHero";
import { LandingProjects } from "./components/sections/LandingProjects";
import { LandingServices } from "./components/sections/LandingServices";
import { LandingSkills } from "./components/sections/LandingSkills";
import { SectionBand } from "./components/ui/SectionBand";

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <SectionBand cat="violet">
        <LandingProjects />
      </SectionBand>
      <SectionBand tone="tint" cat="mint">
        <BrandLogos />
      </SectionBand>
      <SectionBand cat="peach">
        <LandingServices />
      </SectionBand>
      <SectionBand cat="teal">
        <LandingAbout />
      </SectionBand>
      <SectionBand tone="tint" cat="violet">
        <LandingExperience />
      </SectionBand>
      <SectionBand cat="blue">
        <LandingSkills />
      </SectionBand>
      <SectionBand cat="mint">
        <LandingEducation />
      </SectionBand>
      <SectionBand cat="pink">
        <LandingCertifications />
      </SectionBand>
      <SectionBand tone="tint" cat="peach">
        <ContactSection />
      </SectionBand>
    </>
  );
}
