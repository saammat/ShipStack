"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CircleDollarSign, LucideIcon } from "lucide-react";
import { useRef, useMemo } from "react";
import { Settings, Rocket, ShieldCheck, Cpu, BookOpen,
  Globe, Code, Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import { MagicCard } from "../magicui/magic-card";
import { useTheme } from "next-themes";
import { Badge } from "../ui/badge";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const appear = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.14 },
  }),
};

export const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(x - rect.width / 2);
    my.set(y - rect.height / 2);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const lightX = useTransform(mx, (v) => `${v * 0.3}px`);
  const lightY = useTransform(my, (v) => `${v * 0.3}px`);

  const { theme } = useTheme()

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      variants={appear}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="group relative h-full"
    >

      <Card className="p-0 w-full shadow-none border-none transition-transform group-hover:scale-[1.05]">
        <MagicCard
          gradientColor={
            theme === "dark"
              ? "linear-gradient(145deg, hsl(210 30% 25%), hsl(30 20% 25%))"
              : "linear-gradient(145deg, hsl(40 50% 90%), hsl(220 40% 70%))"
          }
          className="p-2 min-h-[211px]"
        >
          <CardHeader className="flex flex-row items-center justify-between px-5 pt-5 pb-3 gap-4">
            <CardTitle className="text-xl font-semibold tracking-tight">{feature.title}</CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-6 pt-2 text-sm text-muted-foreground leading-relaxed">
            {feature.description}
          </CardContent>
        </MagicCard>
      </Card>
    </motion.div>
  );
};

export const Features = () => {
  const t = useTranslations("features");
  const features: Feature[] = useMemo(
    () => [
      {
        title: t("modularByDesign.title"),
        description: t("modularByDesign.description"),
        icon: Cpu,
      },
      {
        title: t("aiPowered.title"),
        description: t("aiPowered.description"),
        icon: Bot,
      },
      {
        title: t("prebuiltAuth.title"),
        description: t("prebuiltAuth.description"),
        icon: ShieldCheck,
      },
      {
        title: t("billing.title"),
        description: t("billing.description"),
        icon: CircleDollarSign,
      },
      {
        title: t("deployment.title"),
        description: t("deployment.description"),
        icon: Rocket,
      },
      {
        title: t("modernStack.title"),
        description: t("modernStack.description"),
        icon: Code,
      },
      {
        title: t("extensible.title"),
        description: t("extensible.description"),
        icon: Settings,
      },
      {
        title: t("globalFirst.title"),
        description: t("globalFirst.description"),
        icon: Globe,
      },
      {
        title: t("docsSdk.title"),
        description: t("docsSdk.description"),
        icon: BookOpen,
      },
    ],
    [t]
  );


  return (
    <section id="features" className="relative mx-auto max-w-[90rem] px-8 py-40">
      {/* <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(120,120,255,0.08),_transparent_60%)] dark:bg-[radial-gradient(circle_at_center,_rgba(120,120,255,0.14),_transparent_60%)]" /> */}
      
      <div className="text-center">
        <Badge variant="outline" className="px-2 py-1 text-xs uppercase tracking-widest">
          {t("badge")}
        </Badge>
      </div >
      <h2 className="mt-6 mb-6 text-center text-5xl font-semibold tracking-tight md:text-5xl">
        {t("heading.prefix")}
        <span className="text-primary font-semibold">
          {t("heading.highlight")}
        </span>
      </h2>
      <p className="mb-20 text-center font-medium text-muted-foreground md:text-xl">
        {t("subtitle")}
      </p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: {} }}
        className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3"
      >
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </motion.div>
    </section>
  );
};
