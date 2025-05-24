import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { createMDX } from 'fumadocs-mdx/next';

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};
const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX();

export default withMDX(withNextIntl(nextConfig));
