import type { Metadata, Viewport } from 'next';
import { Outfit, Lora } from 'next/font/google';
import './globals.css';
import { HouseProvider } from '@/lib/store';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBottomBar } from '@/components/MobileBottomBar';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Our Home | Casa Nostra — Messina Student Flat',
  description: 'Cozy, beautiful, multilingual house management portal for our shared student flat in Messina, Italy.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#3D664B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${lora.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FCFBF7] text-stone-800 antialiased selection:bg-sage-200 selection:text-sage-900">
        <HouseProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <MobileBottomBar />
        </HouseProvider>
      </body>
    </html>
  );
}
