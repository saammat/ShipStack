"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Ripple } from "@/components/magicui/ripple";

export const CTA = () => {
  const t = useTranslations("cta");

  return (
    <section className="relative w-full pt-32 pb-64 px-6 sm:px-12">
      <Ripple />
      {/* 正文 */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mt-6 mb-6 text-5xl font-semibold tracking-tight md:text-5xl">
          <span className="text-primary font-semibold">
            {t("headingHighlight")}
          </span>
          {t("title")}
        </h2>
        <p className="mb-14 font-medium text-muted-foreground md:text-xl">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/saammat/ShipStack"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="min-w-[150px]">
              {t("primary")}
            </Button>
          </a>
          <a href="/docs">
            <Button variant="outline" size="lg" className="min-w-[150px]">
              {t("secondary")}
            </Button>
          </a>
        </div>
      </div>
      {/* 背景波纹图形 */}

    </section>
  );
};
