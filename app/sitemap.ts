import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 기본 URL - gymcoding과 동일하되 undefined 방지
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';

  // 정적 페이지 목록 - gymcoding과 동일
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ] as const;

  // Notion API 없을 때 정적 페이지만 반환 (배포 에러 방지)
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    console.warn('Notion API credentials not found, returning static pages only');
    return [...staticPages];
  }

  try {
    // 블로그 게시물 가져오기 - gymcoding과 동일
    const { posts } = await getPublishedPosts({ pageSize: 100 });

    // 블로그 게시물 URL 생성 - gymcoding과 동일
    const blogPosts = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.modifiedDate ? new Date(post.modifiedDate) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // 정적 페이지와 블로그 게시물 결합 - gymcoding과 동일
    return [...staticPages, ...blogPosts];
  } catch (error) {
    console.warn('Failed to fetch posts for sitemap:', error);
    // 에러 시 정적 페이지만 반환
    return [...staticPages];
  }
}