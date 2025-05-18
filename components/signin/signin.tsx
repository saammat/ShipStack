"use client"

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { providerMap } from "@/auth"
import { signIn } from "next-auth/react";

export const SignIn = () => {
  const t = useTranslations("signin")
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (providerId: string) => {
    try {
      setIsLoading(true);
      const result = await signIn(providerId, { redirectTo: "/dashboard" });
      if (result?.error) {
        console.error('登录出错:', result.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('登录出错:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {isLoading ? (
          <div className="flex items-center gap-2 self-center font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Loader2 className="size-4 animate-spin" />
            </div>
            ShipStack
          </div>
        ) : (
          <a href="/" className="flex items-center gap-2 self-center font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ArrowLeft className="size-4" />
            </div>
            ShipStack
          </a>
        )}
        {/* 登录表单 */}
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{t("welcomeBack")}</CardTitle>
              <CardDescription>{t("loginWithProvider")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {/* 第三方登录 */}
                <div className="flex flex-col gap-4">
                  {Object.values(providerMap).map((provider) => {
                    let logoSrc = "";
                    let className = "";
                    if (provider.id === "google") {
                      logoSrc = "/icons/google_color.svg";
                      className = ""
                    } else if (provider.id === "github") {
                      logoSrc = "/icons/github_color.svg";
                      className = "dark:invert dark:brightness-0 dark:hover:opacity-80 hover:opacity-70 transition-opacity"
                    }

                    return (
                      <Button variant="outline" className="w-full" onClick={() => handleSignIn(provider.id)} key={provider.id}>
                        <Image src={logoSrc} alt={provider.name} width={16} height={16} className={className} />
                        {t(`loginWith${provider.name}`)}
                      </Button>
                    );
                  })}
                </div>

                {/* 分割线 */}
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    {t("orContinueWith")}
                  </span>
                </div>

                <form>
                  {/* 账号密码登录 */}
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">{t("password")}</Label>
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                          {t("forgotPassword")}
                        </a>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                      {t("login")}
                    </Button>
                  </div>
                </form>

                {/* 注册 */}
                <div className="text-center text-sm">
                  {t("noAccount")}{" "}
                  <a href="/sign-up" className="underline underline-offset-4">
                    {t("signUp")}
                  </a>
                </div>
              </div>

            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            {t("agreeTerms")} <a href="#">{t("terms")}</a> {t("and")} <a href="#">{t("privacy")}</a>.
          </div>
        </div>
      </div>
    </div>
  )
}
