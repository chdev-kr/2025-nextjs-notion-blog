import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // 기본 URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chdev.kr';

    // 정적 페이지 목록 (SEO 최적화를 위해 확장)
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about/projects`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/about/skills`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/photos`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      },
    ] as const;

    // 블로그 게시물 가져오기 (에러 처리 추가)
    let blogPosts: MetadataRoute.Sitemap = [];
    try {
      const { posts } = await getPublishedPosts({ pageSize: 100 });

      // 블로그 게시물 URL 생성 (SEO 최적화)
      blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.modifiedDate
          ? new Date(post.modifiedDate)
          : new Date(post.date || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    } catch (error) {
      console.error('블로그 포스트 가져오기 실패:', error);
      // 에러가 발생해도 정적 페이지는 반환
    }

    // 정적 페이지와 블로그 게시물 결합
    return [...staticPages, ...blogPosts];
  } catch (error) {
    console.error('사이트맵 생성 실패:', error);
    // 최소한의 사이트맵 반환
    return [
      {
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chdev.kr',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
    ];
  }
}
