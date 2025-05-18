"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const projects = Array.from({ length: 10 }).map((_, i) => ({
  name: `Project ${i + 1}`,
  description: `This project helps users manage feature ${i + 1}.`,
  logo: "/images/timeline/deploy.png",
}));

export const Case = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("caseShowcase");

  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      const max = carouselApi.scrollSnapList().length;
      const nextIndex = (activeIndex + 1) % max;
      carouselApi.scrollTo(nextIndex);
      setActiveIndex(nextIndex);
    }, 2500);

    return () => clearInterval(interval);
  }, [carouselApi, activeIndex]);

  return (
    <section className="relative w-full py-24 md:py-40">
      {/* 渐隐遮罩 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="container mx-auto">
        <div className="flex flex-col gap-10 items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-semibold tracking-tight"
          >
            {t("title")}
          </motion.h2>

          <Carousel setApi={setCarouselApi} className="w-full">
            <CarouselContent>
              {projects.map((project, i) => (
                <CarouselItem
                  key={i}
                  className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
                >
                  <div className="flex flex-col items-center text-center gap-4 p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-full aspect-video relative rounded-md overflow-hidden">
                      <Image src={project.logo} alt={project.name} fill className="object-cover"/>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-foreground">
                        {t(`projects.${i}.name`, { default: project.name })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t(`projects.${i}.description`, { default: project.description })}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
