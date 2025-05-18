"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {
    Mail,
    Phone,
    MapPin,
    KeyRound,
    ShieldCheck,
    CreditCard,
    LogOut,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

/* ----------------------------- 类型定义 ----------------------------- */

type Session = {
    id: string;
    device: string;
    location: string;
    ip: string;
    lastActive: string;
};

type User = {
    name: string;
    email: string;
    avatar: string;
    role: string;
    phone?: string;
    address?: string;
    joinedAt: string;
    plan: string;
    planTier: "Starter" | "Standard" | "Premium";
    renews: string;
    usage: string;
    twoFA: boolean;
    sessions: Session[];
};

/* ----------------------------- 模拟数据 ----------------------------- */

const mockUser: User = {
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    avatar: "/avatars/01.png",
    role: "Owner",
    phone: "+1 (555)‑014‑9955",
    address: "1234 Market St, San Francisco, CA",
    joinedAt: "2024‑01‑15",
    plan: "Pro Annual",
    planTier: "Standard",
    renews: "2026‑01‑15",
    usage: "12 GB / 100 GB",
    twoFA: true,
    sessions: [
        {
            id: "1",
            device: "Chrome on macOS",
            location: "San Francisco, US",
            ip: "73.223.14.2",
            lastActive: "2 hours ago",
        },
        {
            id: "2",
            device: "Safari on iOS",
            location: "Chicago, US",
            ip: "172.16.0.10",
            lastActive: "Yesterday",
        },
    ],
};

/* ----------------------------- 主页面组件 ----------------------------- */

export default function AccountDetailFlatPage() {
    const t = useTranslations("accountProfile");
    const user = mockUser; // TODO: 替换为实际数据
    const { data: session } = useSession();

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
                                <BreadcrumbPage>{t("account")}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main className="container mx-auto max-w-6xl py-24 flex flex-col gap-24">
                {/* Header */}
                <header className="flex flex-col gap-6 md:flex-row md:items-center">
                    <Avatar className="h-24 w-24 border">
                        <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            {session?.user?.name || ""}
                        </h1>
                        <p className="text-muted-foreground break-all">{session?.user?.email || ""}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">{user.role}</Badge>
                            <Badge>{user.planTier}</Badge>
                        </div>
                    </div>
                    <Button size="lg">{t("editProfile")}</Button>
                </header>

                <main className="space-y-24">
                    {/* ---------------- 概览 ---------------- */}
                    <SectionHeading>{t("sections.overview")}</SectionHeading>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("basicInfo.title")}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoRow icon={Mail} label={t("basicInfo.email")} value={user.email} />
                                <InfoRow icon={Phone} label={t("basicInfo.phone")} value={user.phone} />
                                <InfoRow icon={MapPin} label={t("basicInfo.address")} value={user.address} />
                                <InfoRow icon={KeyRound} label={t("basicInfo.joinedAt")} value={user.joinedAt} />
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>{t("usage.title")}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-muted-foreground">
                                    {t("usage.storage")}: <span className="font-medium">{user.usage}</span>
                                </p>
                                <div className="w-full h-3 rounded bg-muted overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all"
                                        style={{ width: "12%" /* 12 GB / 100 GB */ }}
                                    />
                                </div>
                                <Button size="sm" variant="outline">
                                    {t("usage.manage")}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* ---------------- 订阅 ---------------- */}
                    <SectionHeading>{t("sections.subscription")}</SectionHeading>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("subscription.title")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <InfoRow icon={CreditCard} label={t("subscription.plan")} value={user.plan} />
                            <InfoRow icon={KeyRound} label={t("subscription.renews")} value={user.renews} />

                            <div className="flex gap-4">
                                <Button size="sm">{t("subscription.upgrade")}</Button>
                                <Button size="sm" variant="outline">
                                    {t("subscription.cancel")}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ---------------- 安全 ---------------- */}
                    <SectionHeading>{t("sections.security")}</SectionHeading>
                    <div className="grid gap-8 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("security.title")}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoRow
                                    icon={ShieldCheck}
                                    label={t("security.twoFA")}
                                    value={user.twoFA ? t("common.enabled") : t("common.disabled")}
                                />
                                <Button size="sm" variant="outline">
                                    {t("security.manage2fa")}
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t("sessions.title")}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 max-h-80 overflow-y-auto">
                                {user.sessions.map((s) => (
                                    <SessionRow key={s.id} session={s} />
                                ))}
                                <Button size="sm" variant="destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    {t("sessions.signOutAll")}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* ---------------- 活动 ---------------- */}
                    <SectionHeading>{t("sections.activity")}</SectionHeading>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("activity.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{t("activity.placeholder")}</p>
                        </CardContent>
                    </Card>

                    {/* ---------------- 偏好 ---------------- */}
                    <SectionHeading>{t("sections.preferences")}</SectionHeading>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("preferences.title")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <InfoRow label={t("preferences.language")} value="English (US)" />
                            <InfoRow label={t("preferences.theme")} value={t("preferences.themeAuto") ?? "Auto"} />
                            <Button size="sm" variant="outline">
                                {t("preferences.edit")}
                            </Button>
                        </CardContent>
                    </Card>
                </main>
            </main>
        </SidebarInset>

    );
};

/* ----------------------------- 子组件 ----------------------------- */

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold tracking-tight mb-6 first:mt-0">
        {children}
    </h2>
);

const InfoRow = ({
    icon: Icon,
    label,
    value,
}: {
    icon?: React.ElementType;
    label: string;
    value?: string | undefined;
}) => (
    <div className="flex items-start gap-3 text-sm">
        {Icon && <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />}
        <div>
            <p className="text-muted-foreground whitespace-nowrap">{label}</p>
            <p className="font-medium break-all">{value || "—"}</p>
        </div>
    </div>
);

const SessionRow = ({ session }: { session: Session }) => (
    <div className="flex items-start gap-3 text-sm py-2 border-b last:border-none">
        <ShieldCheck className="h-4 w-4 text-muted-foreground mt-0.5" />
        <div className="flex-1">
            <p className="font-medium">{session.device}</p>
            <p className="text-muted-foreground truncate">
                {session.location} · {session.ip}
            </p>
        </div>
        <span className="text-muted-foreground whitespace-nowrap">
            {session.lastActive}
        </span>
    </div>
);
