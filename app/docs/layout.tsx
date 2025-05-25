import { source } from '@/lib/source';
import { DocsLayout, DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { ReactNode } from 'react';
import { BookIcon, Palette, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import { RootProvider } from 'fumadocs-ui/provider';
import { SidebarOptions } from 'fumadocs-ui/layouts/docs/shared';

const sidebarDropdownIconMap = {
  'LayoutGrid': <LayoutGrid />,
  'Palette': <Palette />
}

const sidebarDropdownColor = {
  'LayoutGrid': 'hsl(220, 91%, 54%)',
  'Palette': 'var(--${meta.file.dirname}-color, var(--color-fd-foreground))',
}

// docs 侧边栏基础配置
const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image alt="ShipStack" src="/shipstack.png" width={24} height={24} sizes="100px" className="dark:invert" aria-label="Fumadocs"/>
        <span className="font-medium [.uwu_&]:hidden [header_&]:text-[15px]">
          ShipStack
        </span>
      </>
    )
  },
  links: [
    {
      icon: <BookIcon />,
      text: 'Blog',
      url: '/blog',
      secondary: false,
    },
  ],
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL
};

const sidebar: SidebarOptions = {
  tabs: {
    transform(option, node) {
      const meta = source.getNodeMeta(node);
      if (!meta || !meta.data.icon) return option;
      const color = `var(--${meta.file.dirname}-color)`;
      const iconKey = meta.data.icon as keyof typeof sidebarDropdownIconMap;
      const icon = sidebarDropdownIconMap[iconKey];

      return {
        ...option,
        icon: (
          <div
            className="rounded-lg p-1.5 shadow-lg ring-2 m-px border [&_svg]:size-6.5 md:[&_svg]:size-5"
            style={
              {
                color,
                borderColor: `color-mix(in oklab, ${color} 50%, transparent)`,
                '--tw-ring-color': `color-mix(in oklab, ${color} 20%, transparent)`,
              } as object
            }
          >
            {icon}
          </div>
        ),
      };
    },
  },
}

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  sidebar: sidebar
};

export default function DocumentsLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <RootProvider>
          <DocsLayout {...docsOptions}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}