"use client";
import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const sections = [
  {
    titleKey: "product",
    links: [
      { nameKey: "features", id: "features", href: "" },
      { nameKey: "pricing", id: "pricing", href: "" },
      { nameKey: "faq", id: "faq", href: "" },
    ]
  },
  {
    titleKey: "support",
    links: [
      { nameKey: "docs", id: "", href: "/docs" },
      { nameKey: "blog", id: "", href: "/blog" },
      { nameKey: "github", id: "", href: "https://github.com/saammat/ShipStack/issues" },
    ]
  },
  { 
    titleKey: "language",
    links: [
      { nameKey: "english", id: "", href: "/en" },
      { nameKey: "chinese", id: "", href: "/zh" }
    ]
  }
];

const socialLinks = [
  { icon: "/icons/instagram.svg", href: "#", label: "Instagram" },
  { icon: "/icons/facebook.svg", href: "#", label: "Facebook" },
  { icon: "/icons/x.svg", href: "#", label: "X" }
];

const legalLinks = [
  { nameKey: "terms", href: "#" },
  { nameKey: "privacyPolicy", href: "/privacy-policy" }
];

export const Footer = () => {
  const t = useTranslations("footer");
  const locale = useLocale(); 

  return (
    <footer className={"relative bg-foreground text-background dark:bg-foreground dark:text-background py-20 md:py-32"}>
      <div className="container mx-auto">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          
          {/* Logo与描述 */}
          <div className="flex w-full flex-col gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <a href="/">
                <Image
                  src="/shipstack.png"
                  alt="ShipStack"
                  width={36}
                  height={36}
                  className="rounded-md invert dark:invert-0 transition-opacity hover:opacity-70 dark:hover:opacity-80"
                />
              </a>
              <span className="text-xl font-semibold">ShipStack</span>
            </div>

            <p className="max-w-[70%] text-sm">
              {t("description")}
            </p>

            <ul className="flex items-center space-x-6">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-primary transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    <Image
                      src={social.icon}
                      alt={social.label}
                      width={24}
                      height={24}
                      className="size-5 invert dark:invert-0"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 菜单区块 */}
          <div className="grid w-full gap-8 md:grid-cols-3 lg:gap-16">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{t(section.titleKey)}</h3>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="hover:text-primary">
                      {link.id && (
                        <a href={`#${link.id}`}>{t(link.nameKey)}</a>
                      )}
                      {link.href && (
                        <a href={link.href === '/docs' ? `/docs/${locale}`  : link.href}>{t(link.nameKey)}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* 法律与版权 */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{t("copyright")}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}>{t(link.nameKey)}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
