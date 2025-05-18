"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownLeft,
  UserPlus,
  BarChart,
  DollarSign,
} from "lucide-react";
import { useTranslations } from "next-intl";

const CountUp = ({
  target,
  format,
  start = 0,
  duration = 1.6,
}: {
  target: number;
  format?: Intl.NumberFormatOptions;
  start?: number;
  duration?: number;
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(start);

  useEffect(() => {
    const controls = animate(motionVal, target, { duration, ease: "easeOut" });
    const unsub = motionVal.on("change", (v) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = new Intl.NumberFormat("en-US", format ?? {}).format(v);
      }
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [motionVal, target, duration, format]);

  return <span ref={nodeRef} />;
};

export const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations("stats");

  const metrics = [
    {
      label: t("newUsers"),
      value: 9240,
      delta: 12.4,
      icon: UserPlus,
    },
    {
      label: t("pageViews"),
      value: 1_820_500,
      delta: -3.1,
      icon: BarChart,
      format: { notation: "compact" as const },
    },
    {
      label: t("revenue"),
      value: 582_740,
      delta: 7.8,
      icon: DollarSign,
      format: {
        style: "currency" as const,
        currency: "USD",
        notation: "compact" as const,
      },
    },
    {
      label: t("session"),
      value: 312,
      delta: 1.6,
      icon: BarChart,
      format: {} // 或直接省略 format 字段
    },
  ];
  

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32">
      <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight md:text-5xl text-foreground">
        {t("heading")}
      </h2>
      <p className="mb-16 text-center text-muted-foreground text-lg">
        {t("subheading")}
      </p>

      <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const positive = m.delta >= 0;
          const Arrow = positive ? ArrowUpRight : ArrowDownLeft;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between gap-6 rounded-2xl border border-border p-6 shadow-sm backdrop-blur-lg"
            >
              <div className="flex items-center justify-between">
                <Arrow
                  className={`h-5 w-5 ${
                    positive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <m.icon className="h-5 w-5 text-muted-foreground" />
              </div>

              <h3 className="text-4xl font-semibold tracking-tight text-foreground">
                {inView && <CountUp target={m.value} format={m.format} />}
                <span
                  className={`ml-2 align-baseline text-sm ${
                    positive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {positive ? "+" : ""}
                  {m.delta}%
                </span>
              </h3>

              <p className="text-sm text-muted-foreground">{m.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
