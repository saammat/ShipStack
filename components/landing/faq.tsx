"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export const FAQ = () => {
  const t = useTranslations("faq");
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(120,120,255,0.10), transparent 60%)`
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative w-full py-32 overflow-hidden">
      <motion.div className="pointer-events-none absolute -inset-0 -z-10" style={{ background }} />

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 px-8">
        <div className="flex flex-col gap-8">
          <Badge variant="outline" className="w-fit">FAQ</Badge>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            {t("description")}
          </p>
          <Button variant="outline" className="gap-3 w-48">
            {t("button")} <PhoneCall className="w-4 h-4" />
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium tracking-tight hover:text-primary transition-colors">
                {t(`items.${index}.question`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {t(`items.${index}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
