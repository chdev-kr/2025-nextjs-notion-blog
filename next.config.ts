import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

// import remarkGfm from 'remark-gfm';
const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   typedRoutes: true,
  // },
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        hostname: 'www.notion.so',
      },
      {
        hostname: 'www.books.weniv.co.kr',
      },
      {
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        hostname: 'notion.so',
      },
      {
        hostname: 'notion-static.com',
      },
      {
        hostname: 'notionusercontent.com',
      },
      {
        hostname: '*.notion.so',
      },
      {
        hostname: '*.notion-static.com',
      },
      {
        hostname: '*.notionusercontent.com',
      },
    ],
    // 이미지 최적화 설정
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7일 캐시
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // 이미지 크기 최적화
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 서명된 URL을 위한 설정
    unoptimized: false, // 기본적으로는 최적화 활성화
    loader: 'default', // 기본 로더 사용
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'md'],
  // 사이트맵 관련 설정 추가
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  // 필요한 마크다운 플러그인을 추가할 수 있음~!
  options: {
    // remarkPlugins: [remarkGfm],
    // ts-expect-error remark-gfm 타입 충돌 문제 해결
    // remarkPlugins: [['remark-gfm']],
  },
});

export default withMDX(nextConfig);
