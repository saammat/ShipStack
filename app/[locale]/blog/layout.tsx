import { ReactNode } from 'react';
import Header from "@/components/landing/header";
import { Footer } from '@/components/landing/footer';

export default async function RootLayout({ children }: { children: ReactNode; }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}