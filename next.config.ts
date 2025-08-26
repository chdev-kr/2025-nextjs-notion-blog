import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

// import remarkGfm from 'remark-gfm';
const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   typedRoutes: true,
  // },
  turbopack: {
    // turbopack 설정 추가
  },
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
    ],
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
