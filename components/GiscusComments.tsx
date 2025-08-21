'use client';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
export default function GiscusComments() {
  const { theme } = useTheme();
  return (
    <Giscus
      repo="chdev-kr/2025-nextjs-notion-blog-gisc"
      repoId="R_kgDOPhx5zQ"
      category="Announcements"
      categoryId="DIC_kwDOPhx5zc4CubGr"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === 'dark' ? 'dark' : 'light'}
      lang="ko"
    />
  );
}
