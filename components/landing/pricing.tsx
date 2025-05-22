"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MoveRight, PhoneCall, Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface Tier {
  name: string;
  priceId: string;
  monthly: number;
  yearly: number;
  cta: string;
  featured?: boolean;
  extraFeatures: string[];
}

const tiers: Tier[] = [
  {
    name: "Free",
    priceId: "price_123",
    monthly: 0,
    yearly: 0,
    cta: "cta.free",
    extraFeatures: [
      "features.free.source",
      "features.free.i18n",
      "features.free.auth",
      "features.free.payment",
      "features.free.database",
      "features.free.admin",
    ],
  },
  {
    name: "Pro",
    priceId: "price_1234",
    monthly: 199,
    yearly: 159,
    cta: "cta.pro",
    featured: true,
    extraFeatures: [
      "features.pro.allStarter",
      "features.pro.ai",
      "features.pro.email",
      "features.pro.analytics",
      "features.pro.vercel",
      "features.pro.blog",
      "features.pro.docs",
      "features.pro.license",
      "features.pro.support",
    ],
  },
  {
    name: "Enterprise",
    priceId: "price_12345",
    monthly: 0,
    yearly: 0,
    cta: "cta.enterprise",
    extraFeatures: [
      "features.enterprise.allGrowth",
      "features.enterprise.1on1",
      "features.enterprise.custom",
    ],
  },
];

export const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const t = useTranslations("pricing");
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/saammat/ShipStack";

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    setSelectedPriceId(priceId);

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          userId: "clf0000000000000000000000",
        }),
      });

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error("未能获取支付链接");
      }
    } catch (err) {
      console.error("Checkout Error:", err);
    } finally {
      setLoading(false);
      setSelectedPriceId(null);
    }
  };

  const descriptionMap: Record<string, string> = {
    Free: t("description.free"),
    Pro: t("description.pro"),
    Enterprise: t("description.enterprise"),
  };

  return (
    <section className="bg-background text-foreground py-40 px-8">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <Badge variant="outline" className="px-2 py-1 text-xs uppercase tracking-widest">
          {t("badge")}
        </Badge>
        <h2 className="mt-4 text-5xl font-extrabold md:text-6xl tracking-tight">
          {t("heading")}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {t("subheading")}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm">
          {/* <span>{t("monthly")}</span>
          <Switch checked={annual} onCheckedChange={setAnnual} />
          <span>
            {t("yearly")}
            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded">
              {t("save")}
            </span>
          </span> */}
        </div>
      </div>

      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-3 items-stretch">
        {tiers.map((tier, idx) => {
          const price = annual ? tier.yearly : tier.monthly;

          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: tier.featured ? 1.07 : 1.03 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex ${tier.featured ? "scale-[1.05] z-10" : ""}`}
            >
              <Card className={`flex flex-col justify-between relative h-full w-full rounded-2xl border border-border bg-background ${tier.featured ? "border-primary shadow-lg" : ""}`}>
                {tier.featured && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {t("popular")}
                  </Badge>
                )}

                <CardHeader className="text-center p-8 pb-4">
                  <CardTitle className="text-2xl font-semibold">{tier.name}</CardTitle>
                  <CardDescription className="mt-2 text-sm text-muted-foreground">
                    {descriptionMap[tier.name]}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow p-8 pt-0">
                  <div className="text-center">
                    <p className="text-4xl font-bold">
                      {tier.name === "Enterprise" ? (
                        <span>{t("contactForPricing")}</span>
                      ) : (
                        <>
                          ${price}
                          {/* <span className="ml-1 text-sm font-medium text-muted-foreground">
                            /{annual ? t("unit.year") : t("unit.month")}
                          </span> */}
                        </>
                      )}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm flex-grow">
                    {tier.extraFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{t(feature)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-4">
                    <Button
                      variant={tier.featured ? "default" : "outline"}
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        if (tier.name === "Free") {
                          window.open(githubUrl, "_blank"); // 🔁 替换为你的 GitHub 仓库链接
                        } else {
                          handleCheckout(tier.priceId);
                        }
                      }}
                    >
                      {loading && selectedPriceId === tier.priceId && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {t(tier.cta)}
                      {tier.name === "Enterprise" ? (
                        <PhoneCall className="ml-2 h-4 w-4" />
                      ) : (
                        <MoveRight className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
