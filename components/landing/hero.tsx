"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveRight, BookOpen, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

// const words = ["build", "deploy", "scale", "optimize"];

export const Hero = () => {
  const t = useTranslations("hero");
  const words = t.raw("typewriterWords") as string[];

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
      deleting ? 40 : 100
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words]);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4">
      <div className="mb-6 flex items-center gap-3">
        <Image src="/shipstack.png" alt="ShipStack Logo" width={64} height={64} className="dark:invert dark:brightness-0 dark:hover:opacity-80 hover:opacity-70 transition-opacity" />
        <span className="text-4xl font-semibold tracking-tight md:text-6xl text-foreground">
          ShipStack
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          <span className="inline-block">
            {t("headline.prefix")}
            <span className="relative inline-block">
              {words[index].substring(0, subIndex)}
              <span className="absolute -right-1 top-0 h-full w-[2px] animate-blink bg-primary"></span>
            </span>
            {t("headline.suffix")}
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {t("description.line1")} <br />
          {t("description.line2")} <br />
          {t("description.line3")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="gap-2 font-medium transition-all duration-200">
            {t("buttons.start")} <MoveRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="gap-2 font-medium transition-all duration-200">
            {t("buttons.demo")} <Rocket className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="lg" className="gap-2 text-muted-foreground hover:text-foreground">
            {t("buttons.docs")} <BookOpen className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
