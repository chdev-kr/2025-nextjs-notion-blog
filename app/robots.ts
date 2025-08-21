import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // gymcoding과 동일하되 undefined 방지
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}