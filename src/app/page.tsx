import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Journey } from "@/components/sections/journey";
import { Stack } from "@/components/sections/stack";
import { Why } from "@/components/sections/why";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Journey />
      <Stack />
      <Why />
      <Contact />
    </>
  );
}
