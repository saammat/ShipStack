"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from 'next/image';

const steps = (t: any, theme: string) => [
  {
    title: t("steps.0.title"),
    description: t("steps.0.description"),
    image: `/images/timeline/download${theme === "dark" ? "-dark" : ""}.png`,
  },
  {
    title: t("steps.1.title"),
    description: t("steps.1.description"),
    image: `/images/timeline/edit${theme === "dark" ? "-dark" : ""}.png`,
  },
  {
    title: t("steps.2.title"),
    description: t("steps.2.description"),
    image: `/images/timeline/deploy${theme === "dark" ? "-dark" : ""}.png`,
  },
];

export const UsageFlow = () => {
  const t = useTranslations("usageFlow");
  const { theme } = useTheme();
  const localizedSteps = steps(t, theme || "light");

  return (
    <section className="py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative grid gap-16 md:grid-cols-2">
          <div className="top-40 h-fit md:sticky">
            <h2 className="mt-4 mb-6 text-5xl font-semibold md:text-5xl">
              {t("heading")}
            </h2>
            <p className="font-medium text-muted-foreground md:text-xl">
              {t("description")}
            </p>
            <div className="mt-8 flex flex-col gap-4 lg:flex-row">
              <Button className="gap-2" size="lg" asChild>
                <a href={ process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/saammat/ShipStack" } target="_blank">{t("buttons.primary")}</a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href="#">{t("buttons.secondary")}</a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-12 md:gap-20">
            {localizedSteps.map((step, index) => (
              <div key={index} className="rounded-xl border p-2">
                <Image
                  src={step.image}
                  width={1200}
                  height={630}
                  alt={step.title}
                  className="aspect-video w-full rounded-xl border border-dashed object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-1 text-2xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
