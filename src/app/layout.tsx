import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import '@/styles/globals.css';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LeCrisTur — Excursii • Călătorii • Experiențe | Excursii cu autocarul',
  description:
    'Excursii organizate din Republica Moldova către cele mai frumoase destinații din România. Transport modern, ghid dedicat, cazare verificată.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={lato.variable}>
      <body className="flex min-h-screen flex-col bg-white text-[#2C2C2C] antialiased font-sans">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
