import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

// ① next‑intl 中间件（负责 locale 解析 / 重写 / 重定向）
const intlMiddleware = createIntlMiddleware(routing);

// 统一导出的中间件函数
export async function middleware(request: NextRequest) {
  // ② 解析 locale：`/zh/dashboard` → locale = 'zh'
  const [, locale = 'en', ...segments] = request.nextUrl.pathname.split('/');

  // ③ 若访问 `/sign-in`（无前缀），重定向到 `/{locale}/sign-in`
  if (request.nextUrl.pathname === '/sign-in') {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/sign-in`;
    return NextResponse.redirect(url);
  }

  // ④ 保护 `/{locale}/dashboard/**`
  // if (segments[0] === 'dashboard') {
  //   // 这里的session判断，暂时只通过cookie判断，后续可以考虑通过数据库判断
  //   // const session = await auth();

  //   // 从cookie中获取session
  //   const token = request.cookies.get("authjs.session-token")?.value;
  //   if (!token) {
  //     const loginUrl = request.nextUrl.clone();
  //     loginUrl.pathname = `/${locale}/sign-in`;
  //     loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
  //     loginUrl.searchParams.set('reason', 'auth'); // 👈 添加提示参数
  //     return NextResponse.redirect(loginUrl);
  //   }
  // }

  // ⑤ 其余请求放行
  return intlMiddleware(request);
}

// ✅ 配置 matcher 路径
export const config = {
  matcher: [
    '/((?!api|docs|trpc|_next|_vercel|.*\\..*).*)', // 跳过静态资源和 API 路由
  ]
};
