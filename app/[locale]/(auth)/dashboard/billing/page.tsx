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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Download,
  Plus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

/* ----------------------------- 类型定义 ----------------------------- */

type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  exp: string;
  isPrimary: boolean;
};

type Invoice = {
  id: string;
  number: string;
  date: string;
  amount: string;
  status: "paid" | "open" | "overdue";
  pdfUrl: string;
};

/* ----------------------------- 模拟数据 ----------------------------- */

const paymentMethods: PaymentMethod[] = [
  { id: "pm_1", brand: "Visa", last4: "4242", exp: "04/27", isPrimary: true },
  { id: "pm_2", brand: "Mastercard", last4: "4444", exp: "11/25", isPrimary: false },
];

const invoices: Invoice[] = [
  { id: "in_1", number: "F2024-0001", date: "2024-12-15", amount: "$99.00", status: "paid", pdfUrl: "#" },
  { id: "in_2", number: "F2023-0004", date: "2023-12-15", amount: "$99.00", status: "paid", pdfUrl: "#" },
  { id: "in_3", number: "F2023-0003", date: "2023-09-15", amount: "$99.00", status: "overdue", pdfUrl: "#" },
];

/* ----------------------------- 主页面组件 ----------------------------- */

export default function BillingPage() {
  const t = useTranslations("billingProfile");

  return (
    <SidebarInset>
      {/* 面包屑（保持与 Account 页面一致，无边框） */}
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
                <BreadcrumbPage>{t("billing")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="container mx-auto max-w-6xl py-24 flex flex-col gap-4 space-y-24">
        {/* 付款方式 */}
        <SectionHeading>{t("sections.paymentMethods")}</SectionHeading>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {paymentMethods.map((pm) => (
            <div
              key={pm.id}
              className="w-full max-w-sm rounded-2xl border shadow-sm bg-background p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-lg">
                    {pm.brand} •••• {pm.last4}
                  </span>
                </div>
                {pm.isPrimary && (
                  <Badge variant="secondary" className="rounded-md text-xs">
                    {t("primary")}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("expires")}: {pm.exp}
              </p>
              <div className="flex gap-3 mt-auto">
                {!pm.isPrimary && (
                  <Button size="sm" variant="outline" className="rounded-lg">
                    {t("setPrimary")}
                  </Button>
                )}
                <Button size="sm" variant="destructive" className="rounded-lg">
                  {t("remove")}
                </Button>
              </div>
            </div>
          ))}

          {/* 添加新卡片 */}
          <div
            className="w-full max-w-sm rounded-2xl border-2 border-dashed border-muted-foreground/40 hover:border-muted-foreground/70 transition-colors flex items-center justify-center p-6 cursor-pointer group"
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-foreground">
              <Plus className="h-6 w-6" />
              <span className="text-sm font-medium">{t("addPaymentMethod")}</span>
            </div>
          </div>
        </div>

        {/* 发票历史 */}
        <SectionHeading>{t("sections.invoices")}</SectionHeading>
        <Card className="rounded-2xl">
          <CardHeader className="px-6 pb-4">
            <CardTitle className="text-lg font-semibold">{t("invoiceHistory")}</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("invoice")}</TableHead>
                  <TableHead>{t("date")}</TableHead>
                  <TableHead>{t("amount")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead>{t("action")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id} className="hover:bg-muted/40">
                    <TableCell>{inv.number}</TableCell>
                    <TableCell>{inv.date}</TableCell>
                    <TableCell>{inv.amount}</TableCell>
                    <TableCell>
                      <StatusPill status={inv.status} />
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Download className="h-4 w-4 mr-1.5" /> {t("download")}
                      </Button>
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

const StatusPill = ({ status }: { status: Invoice["status"] }) => {
  const t = useTranslations("billingProfile");
  const map: Record<Invoice["status"], { color: string; icon: React.ElementType }> = {
    paid: { color: "bg-emerald-500/15 text-emerald-700", icon: CheckCircle2 },
    open: { color: "bg-yellow-400/20 text-yellow-700", icon: AlertTriangle },
    overdue: { color: "bg-destructive/15 text-destructive", icon: XCircle },
  };
  const { color, icon: Icon } = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${color}`}>
      <Icon className="h-3 w-3" /> {t(status)}
    </span>
  );
};
