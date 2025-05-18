"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("footer");

  const navigationItems = [
    {
      title: t("nav.home.title"),
      href: "/",
      items: [],
    },
    {
      title: t("nav.product.title"),
      items: [
        { title: t("nav.product.reports"), href: "/reports" },
        { title: t("nav.product.statistics"), href: "/statistics" },
        { title: t("nav.product.dashboards"), href: "/dashboards" },
        { title: t("nav.product.recordings"), href: "/recordings" },
      ],
    },
    {
      title: t("nav.company.title"),
      items: [
        { title: t("nav.company.about"), href: "/about" },
        { title: t("nav.company.fundraising"), href: "/fundraising" },
        { title: t("nav.company.investors"), href: "/investors" },
        { title: t("nav.company.contact"), href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative w-full bg-foreground text-background py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent_70%)]" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 px-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">ShipStack™</h2>
          </div>
          <p className="text-lg max-w-lg leading-relaxed">
            {t("description")}
          </p>
          <div className="flex flex-wrap gap-10">
            <div className="text-sm space-y-1">
              <p>{t("address.line1")}</p>
              <p>{t("address.line2")}</p>
              <p>{t("address.line3")}</p>
            </div>
            <div className="text-sm space-y-1">
              <Link href="/terms" className="hover:text-primary">{t("terms")}</Link>
              <Link href="/privacy" className="hover:text-primary">{t("privacy")}</Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {navigationItems.map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <h3 className="text-xl font-medium">{item.title}</h3>
              {item.items.map((sub) => (
                <Link
                  key={sub.title}
                  href={sub.href}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {sub.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
