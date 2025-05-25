import { source } from '@/lib/source';
import { DocsLayout, DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { ReactNode } from 'react';
import { BookIcon } from 'lucide-react';
import Image from 'next/image';

const logo = (
  <>
    <Image
      alt="ShipStack"
      src="/shipstack.png"
      width={24}
      height={24}
      sizes="100px"
      className="dark:invert"
      aria-label="Fumadocs"
    />
  </>
);

const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        {logo}
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

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...docsOptions}>
      {children}
    </DocsLayout>
  );
}