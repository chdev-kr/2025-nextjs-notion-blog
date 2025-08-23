'use client';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function GiscusComments() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 클라이언트에서 마운트된 후에만 테마를 사용
  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버사이드 렌더링 시에는 기본 테마 사용
  if (!mounted) {
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
        theme="light"
        lang="ko"
      />
    );
  }

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
