"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface Feature197Props {
  features: FeatureItem[];
}

const Feature2 = () => {
  const t = useTranslations("features2");
  const features: FeatureItem[] = [
    {
      id: 1,
      title: t("marketingLandingPage"),
      image: "/images/features2/SaaS.png",
      description: t("marketingLandingPageDescription")
    },
    {
      id: 2,
      title: t("blogPlatform"),
      image: "/images/features2/SaaS.png",
      description: t("blogPlatformDescription")
    },
    {
      id: 3,
      title: t("aiPoweredSaaSTools"),
      image: "/images/features2/SaaS.png",
      description: t("aiPoweredSaaSToolsDescription")
    },
    {
      id: 4,
      title: t("curatedDirectorySite"),
      image: "/images/features2/SaaS.png",
      description: t("curatedDirectorySiteDescription")
    },
    {
      id: 5,
      title: t("membershipCommunity"),
      image: "/images/features2/SaaS.png",
      description: t("membershipCommunityDescription")
    },
  ];

  const [activeTabId, setActiveTabId] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(features[0].image);

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="mb-12 flex w-full items-start justify-between gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="mt-4 mb-6 text-5xl font-semibold md:text-5xl">
              {t("heading")}
            </h2>
            <p className="mb-10 font-medium text-muted-foreground md:text-xl">
              {t("description")}
            </p>
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {features.map((tab) => (
                <AccordionItem key={tab.id} value={`item-${tab.id}`}>
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.image);
                      setActiveTabId(tab.id);
                    }}
                    className="cursor-pointer py-5 !no-underline transition"
                  >
                    <h6
                      className={`text-lg font-semibold ${tab.id === activeTabId ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      {tab.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={tab.image}
                        alt={tab.title}
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative m-auto hidden w-1/2 overflow-hidden rounded-2xl border border-muted-foreground/20 bg-muted shadow-xl transition-shadow hover:shadow-2xl md:block">
            <div
              className={cn(
                "w-full h-full p-1.5 rounded-2xl relative isolate overflow-hidden",
                "bg-white/5 dark:bg-black/90",
                "bg-gradient-to-br from-black/5 to-black/[0.02] dark:from-white/5 dark:to-white/[0.02]",
                "backdrop-blur-xl backdrop-saturate-[180%]",
                "border border-black/10 dark:border-white/10",
                "shadow-[0_8px_16px_rgb(0_0_0_/_0.15)] dark:shadow-[0_8px_16px_rgb(0_0_0_/_0.25)]",
                "will-change-transform translate-z-0"
              )}
            >
              <div
                className={cn(
                  "w-full h-full rounded-xl relative",
                  "bg-gradient-to-br from-black/[0.05] to-transparent dark:from-white/[0.08] dark:to-transparent",
                  "backdrop-blur-md backdrop-saturate-150",
                  "border border-black/[0.05] dark:border-white/[0.08]",
                  "text-black/90 dark:text-white",
                  "shadow-sm",
                  "will-change-transform translate-z-0",
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/[0.02] before:to-black/[0.01] dark:before:from-white/[0.03] dark:before:to-white/[0.01] before:opacity-0 before:transition-opacity before:pointer-events-none",
                  "hover:before:opacity-100"
                )}
              >
                <img
                  src={activeImage}
                  alt="Feature preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export { Feature2 };
