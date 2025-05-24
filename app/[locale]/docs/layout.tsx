import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { ReactNode } from 'react';

const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'My App',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}