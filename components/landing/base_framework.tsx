"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

type Framework = { name: string; logo: string };

const frameworks: Framework[] = [
  { name: "ChatGPT", logo: "/icons/openai.svg" },
  { name: "Next.js", logo: "/icons/nextdotjs.svg" },
  { name: "React", logo: "/icons/react.svg" },
  { name: "shadcn/ui", logo: "/icons/shadcnui.svg" },
  { name: "Tailwind CSS", logo: "/icons/tailwindcss.svg" },
  { name: "Vercel", logo: "/icons/vercel.svg" },
  { name: "Lucide", logo: "/icons/lucide.svg" }
];

export const BaseFramework = () => {
  const t = useTranslations("framework");
  const trackRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // 计算滚动参数
  useEffect(() => {
    if (trackRef.current) {
      const firstItem = trackRef.current.firstChild as HTMLElement;
      if (firstItem) {
        setItemWidth(firstItem.offsetWidth);
        setContainerWidth(trackRef.current.offsetWidth);
      }
    }
  }, []);

  // 计算动画持续时间（基于速度和内容长度）
  const speed = 100; // 像素/秒
  const duration = containerWidth / speed;

  return (
    <section className="relative mx-auto flex max-w-4xl flex-col items-center overflow-hidden py-24">
      {/* 渐隐遮罩 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

      {/* 滚动轨道 */}
      <div className="w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex"
          animate={{
            x: [0, -itemWidth * frameworks.length],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {frameworks.slice(-2).map((fw, i) => (
            <Logo key={`pre-${i}`} framework={fw} />
          ))}
          {frameworks.map((fw, i) => (
            <Logo key={`original-${i}`} framework={fw} />
          ))}
          {frameworks.map((fw, i) => (
            <Logo key={`clone-${i}`} framework={fw} />
          ))}
          {frameworks.slice(0, 2).map((fw, i) => (
            <Logo key={`post-${i}`} framework={fw} />
          ))}
        </motion.div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        {t("footer")}
      </p>
    </section>
  );
};

const Logo = ({ framework }: { framework: Framework }) => (
  <div className="flex min-w-[160px] items-center justify-center px-4">
    <Image
      src={framework.logo}
      alt={framework.name}
      width={32}
      height={32}
      className="h-8 w-8 object-contain transition-opacity hover:opacity-80 dark:invert"
    />
    <span className="ml-2 text-sm text-muted-foreground">{framework.name}</span>
  </div>
);