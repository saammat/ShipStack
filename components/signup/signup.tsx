"use client"

import { ArrowLeft } from "lucide-react"
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

const SignupForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const t = useTranslations("signup")

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("createAccount")}</CardTitle>
          <CardDescription>{t("signupWithProvider")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <Image src="/icons/google_color.svg" alt="Google" width={16} height={16} />
                  {t("signUpWithGoogle")}
                </Button>
                <Button variant="outline" className="w-full">
                  <Image src="/icons/github_color.svg" alt="Github" width={16} height={16} className="dark:invert dark:brightness-0 dark:hover:opacity-80 hover:opacity-70 transition-opacity" />
                  {t("signUpWithGithub")}
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  {t("orContinueWith")}
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t("name")}</Label>
                  <Input
                    id="name"
                    type="text"
                    className="border-muted"
                    placeholder={t("namePlaceholder")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    className="border-muted"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">{t("password")}</Label>
                  <Input id="password" type="password" className="border-muted" required />
                </div>
                <Button type="submit" className="w-full">
                  {t("createAccount")}
                </Button>
              </div>
              <div className="text-center text-sm">
                {t("haveAccount")}{" "}
                <a href="/sign-in" className="underline underline-offset-4">
                  {t("signIn")}
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        {t("agreeTerms")} <a href="#">{t("terms")}</a> {t("and")} <a href="/privacy-policy">{t("privacy")}</a>.
      </div>
    </div>
  )
}

export const SignUp = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ArrowLeft className="size-4" />
          </div>
          ShipStack
        </a>
        <SignupForm />
      </div>
    </div>
  )
}
