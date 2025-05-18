"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useTranslations } from "next-intl";

/* ----------------------------- 类型定义 ----------------------------- */

type Transaction = {
  id: string;
  date: string;
  description: string;
  credits: number;
  type: "earned" | "spent";
};

/* ----------------------------- 模拟数据 ----------------------------- */

const currentCredits = 1280;

const transactions: Transaction[] = [
  { id: "tx_1", date: "2025-05-07", description: "每日签到奖励", credits: 20, type: "earned" },
  { id: "tx_2", date: "2025-05-06", description: "邀请好友注册", credits: 100, type: "earned" },
  { id: "tx_3", date: "2025-05-05", description: "兑换 API 调用额度", credits: -200, type: "spent" },
  { id: "tx_4", date: "2025-05-01", description: "季度活跃奖励", credits: 300, type: "earned" },
];

/* ----------------------------- 主页面组件 ----------------------------- */

export default function CreditsDetailPage() {
  const t = useTranslations("creditsDetail");

  return (
    <SidebarInset>
      {/* 面包屑 */}
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>{t("user")}</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{t("credits")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* 主内容 */}
      <main className="container mx-auto max-w-6xl py-24 flex flex-col gap-4 space-y-24">
        {/* Credits 概览 */}
        <SectionHeading>{t("sections.summary")}</SectionHeading>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <Card className="w-full max-w-sm rounded-2xl border shadow-sm bg-background">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                {t("currentCredits")}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <p className="text-4xl font-extrabold text-primary">{currentCredits}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t("creditsAvailable")}</p>
              <Button size="sm" className="mt-4 rounded-lg" variant="outline">
                {t("redeem")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 明细表 */}
        <SectionHeading>{t("sections.transactions")}</SectionHeading>
        <Card className="rounded-2xl">
          <CardHeader className="px-6 pb-4">
            <CardTitle className="text-lg font-semibold">{t("transactionHistory")}</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("date")}</TableHead>
                  <TableHead>{t("description")}</TableHead>
                  <TableHead className="text-right">{t("credits")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-muted/40">
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell className="text-right font-medium">
                      <CreditsPill credits={tx.credits} type={tx.type} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </SidebarInset>
  );
}

/* ----------------------------- 子组件 ----------------------------- */

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 first:mt-0">
    {children}
  </h2>
);

const CreditsPill = ({ credits, type }: { credits: number; type: "earned" | "spent" }) => {
  const classes =
    type === "earned"
      ? "bg-emerald-500/15 text-emerald-700"
      : "bg-destructive/15 text-destructive";
  const Icon = type === "earned" ? ArrowUpCircle : ArrowDownCircle;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${classes}`}>
      <Icon className="h-3 w-3" /> {credits > 0 ? `+${credits}` : credits}
    </span>
  );
};
