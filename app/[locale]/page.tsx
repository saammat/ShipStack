import Header from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { BaseFramework } from "@/components/landing/base_framework";
import { Features } from "@/components/landing/features";
import { Feature2 } from "@/components/landing/features2";
import { UsageFlow } from "@/components/landing/usage_flow";
import { Case } from "@/components/landing/case";
import { Stats } from "@/components/landing/stats";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <DotPattern width={40} height={40} cx={1} cy={1} cr={1} className={cn( "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]")}/>
      <Header />
      <Hero />
      <BaseFramework />
      <Features />
      <Feature2 />
      <UsageFlow />
      {/* <Case /> */}
      {/* <Stats /> */}
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
