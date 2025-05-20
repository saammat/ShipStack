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
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <BaseFramework />
      <Features />
      <Feature2 />
      <UsageFlow />
      <Case />
      <Stats />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
