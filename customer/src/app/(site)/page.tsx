import Hero from "@/components/sections/Hero";
import ServicesMarquee from "@/components/sections/ServicesMarquee";
import Services from "@/components/sections/Services";
import WhyBrancho from "@/components/sections/WhyBrancho";
import HowItWorks from "@/components/sections/HowItWorks";
import AppShowcase from "@/components/sections/AppShowcase";
import Industries from "@/components/sections/Industries";
import Testimonials from "@/components/sections/Testimonials";
import Cities from "@/components/sections/Cities";
import Sustainability from "@/components/sections/Sustainability";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Loader from "@/components/layout/Loader";
import { faqLd } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <ServicesMarquee />
      <Services />
      <WhyBrancho />
      <HowItWorks />
      <AppShowcase />
      <Industries />
      <Testimonials />
      <Cities />
      <Sustainability />
      <FAQ />
      <Contact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
