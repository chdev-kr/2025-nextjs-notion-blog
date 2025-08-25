import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Providers from './providers';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | chDEV 블로그',
    default: 'chDEV 블로그',
  },
  description: '프론트엔드 개발과 관련된 다양한 지식과 경험을 공유하는 블로그입니다.',
  keywords: ['Next.js', '프론트엔드', '웹개발', '코딩', '프로그래밍', '리액트'],
  authors: [{ name: '김채현', url: 'https://github.com/chdev-kr' }],
  creator: '김채현',
  publisher: '김채현',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  other: {
    google: 'notranslate',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR" suppressHydrationWarning>
      <head>
        {/* 구글 애널리틱스 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        {/* 네이버 웹마스터 도구 */}
        <meta name="naver-site-verification" content="75d6266603a8a1ea177f59652a9b7090c349aebb" />

        {/* 구글 서치 콘솔 */}
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            {modal}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
