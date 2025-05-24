"use client"

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Gauge, Bell, LogOut } from "lucide-react";
import { useState, useTransition } from "react";
import Image from 'next/image';
import Link from "next/link";
import { useParams } from 'next/navigation';
import { signIn, signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function Header() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('header');
  const { data: session, status } = useSession();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="w-full bg-foreground text-background text-sm py-2 flex justify-center items-center gap-2">
        {t('promotion1')} <Link href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/saammat/ShipStack"} target="_blank" className="underline font-medium">Github</Link>{t('promotion2')}
      </div>
      <header className="w-full sticky top-0 z-40 bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between">
          {/* Left links */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="font-bold text-xl hover:text-primary flex flex-row items-center space-x-6">
              <Image src="/shipstack.png" alt="shipstack" width={32} height={32} className="dark:invert dark:brightness-0 dark:hover:opacity-80 hover:opacity-70 transition-opacity" />
              ShipStack
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary" onClick={
              (e) => {
                e.preventDefault();
                scrollToSection("features");
              }
            }>
              {t("features")}
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary" onClick={
              (e) => {
                e.preventDefault();
                scrollToSection("features2");
              }
            }>
              {t("cases")}
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary" onClick={
              (e) => {
                e.preventDefault();
                scrollToSection("pricing");
              }
            }>
              {t("pricing")}
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">{t("docs")}</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">{t("blog")}</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={locale} onValueChange={(value) => onSelectChange(value as 'en' | 'zh')}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {routing.locales.map((cur) => (
                  <SelectItem key={cur} value={cur}>
                    {t('localeSwitcherLocale', { locale: cur })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ModeToggle />
            <div className="border-r border-border h-8 hidden md:inline"></div>
            {!session ? (
              <Button variant="outline" onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}>{t("signin")}</Button>
            ) : (
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={session.user?.image || '/default-avatar.png'} alt={session.user?.name || 'User'} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side={"bottom"}
                    align="center"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={session.user?.image || '/default-avatar.png'} alt={session.user?.name || 'User'} />
                          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">{session.user?.name || ''}</span>
                          <span className="truncate text-xs">{session.user?.email || ''}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <Gauge />
                          {t("dashboard")}
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <div onClick={() => signOut()}>
                        <LogOut />
                        {t("signout")}
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            <Link href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/saammat/ShipStack"} target="_blank" className="hover:text-primary">
              <Image src="/icons/github.svg" alt="GitHub" width={24} height={24} className="dark:invert dark:brightness-0 dark:hover:opacity-80 hover:opacity-70 transition-opacity" />
            </Link>
            <Link href="https://discord.com" target="_blank" className="hover:text-primary">
              <Image src="/icons/discord.svg" alt="Discord" width={24} height={24} className="dark:invert dark:brightness-0 dark:hover:opacity-80 hover:opacity-70 transition-opacity" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
