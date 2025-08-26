import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 기본 URL 설정 (www 포함)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.chdev.kr';

  // 기본 정적 페이지 (항상 반환)
  const staticPages: MetadataRoute.Sitemap = [
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
  ];

  // 블로그 게시물 가져오기 (에러 처리 강화)
  let blogPosts: MetadataRoute.Sitemap = [];

  try {
    const { posts } = await getPublishedPosts({ pageSize: 100 });

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
}

// 사이트맵에 대한 HTTP 헤더 설정
export async function generateMetadata() {
  return {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  };
}
