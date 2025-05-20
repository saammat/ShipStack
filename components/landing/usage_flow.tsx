"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const steps = (t: any) => [
  {
    title: t("steps.0.title"),
    description: t("steps.0.description"),
    image: "/images/timeline/download.png",
  },
  {
    title: t("steps.1.title"),
    description: t("steps.1.description"),
    image: "/images/timeline/edit.png",
  },
  {
    title: t("steps.2.title"),
    description: t("steps.2.description"),
    image: "/images/timeline/deploy.png",
  },
];

export const UsageFlow = () => {
  const t = useTranslations("usageFlow");
  const localizedSteps = steps(t);

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
                <a href="#">{t("buttons.primary")}</a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href="#">{t("buttons.secondary")}</a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-12 md:gap-20">
            {localizedSteps.map((step, index) => (
              <div key={index} className="rounded-xl border p-2">
                <img
                  src={step.image}
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
