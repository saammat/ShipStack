import { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider';
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootProvider>{children}</RootProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}