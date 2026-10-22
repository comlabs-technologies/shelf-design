import { Header } from "@/components/Header";
import { Hero } from "@/components/hero/Hero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Capabilities } from "@/components/sections/Capabilities";
import { Capture } from "@/components/sections/Capture";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Privacy } from "@/components/sections/Privacy";
import { SearchDemo } from "@/components/sections/SearchDemo";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <SearchDemo />
        <Capture />
        <Capabilities />
        <Privacy />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
