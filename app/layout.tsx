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
  description:
    '프론트엔드 개발과 관련된 다양한 지식과 경험을 공유하는 블로그입니다. Next.js, React, TypeScript 등 최신 웹 기술에 대한 실용적인 가이드를 제공합니다.',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    '프론트엔드',
    '웹개발',
    '코딩',
    '프로그래밍',
    'JavaScript',
    '웹 개발자',
    '프론트엔드 개발자',
    '김채현',
    'chDEV',
  ],
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
  // 구글 검색엔진 최적화
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    // 구글 번역 방지 (한국어 콘텐츠이므로)
    google: 'notranslate',
    // 네이버 검색엔진 최적화
    'naver-site-verification': '75d6266603a8a1ea177f59652a9b7090c349aebb',
    // 네이버 블로그 크롤링 허용
    robots: 'index,follow',
    // 구글 검색엔진 최적화
    ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && {
      'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    }),
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

        {/* 네이버 검색엔진 최적화 */}
        <meta name="robots" content="index,follow" />

        {/* 구글 검색엔진 최적화 */}
        <meta name="google" content="notranslate" />
        <meta
          name="googlebot"
          content="index,follow,max-video-preview:-1,max-image-preview:large,max-snippet:-1"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
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
