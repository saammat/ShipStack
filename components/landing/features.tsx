"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useRef, useMemo } from "react";
import {
  Settings,
  Rocket,
  ShieldCheck,
  Zap,
  Cpu,
  BookOpen,
  Globe,
  Code,
} from "lucide-react";
import { useTranslations } from "next-intl";

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

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(((x / rect.width) - 0.5) * 20);
    my.set(-((y / rect.height) - 0.5) * 20);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const springX = useSpring(my, { stiffness: 250, damping: 22 });
  const springY = useSpring(mx, { stiffness: 250, damping: 22 });

  const transform = useTransform(
    [springX, springY],
    ([x, y]) =>
      `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(1.04)`
  );

  return (
    <motion.div
      ref={ref}
      style={{ transform }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      variants={appear}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="group relative h-full"
    >
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/20 via-fuchsia-500/10 to-transparent opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100 dark:from-primary/30" />

      <Card className="relative h-full rounded-2xl border backdrop-blur-lg shadow-xl shadow-black/10 transition-shadow group-hover:shadow-black/20 dark:shadow-white/10">
        <CardHeader className="flex-row items-center gap-5 pb-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold tracking-tight">
            {feature.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-8 pt-0 text-base text-muted-foreground leading-relaxed">
          {feature.description}
        </CardContent>
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
        title: t("prebuiltAuth.title"),
        description: t("prebuiltAuth.description"),
        icon: ShieldCheck,
      },
      {
        title: t("billing.title"),
        description: t("billing.description"),
        icon: Zap,
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
    <section className="relative mx-auto max-w-[90rem] px-8 py-40">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(120,120,255,0.08),_transparent_60%)] dark:bg-[radial-gradient(circle_at_center,_rgba(120,120,255,0.14),_transparent_60%)]" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-24 text-center text-5xl font-semibold tracking-tight md:text-5xl"
      >
        {t("heading.prefix")}
        <span className="text-primary font-semibold">
        {t("heading.highlight")}
        </span>
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: {} }}
        className="grid gap-x-14 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      >
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </motion.div>
    </section>
  );
};
