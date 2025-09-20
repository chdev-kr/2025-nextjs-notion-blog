import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, User } from 'lucide-react';
import { getPostBySlug } from '@/lib/notion';
import { formatDate } from '@/lib/date';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypePrettyCode from 'rehype-pretty-code';
import { compile } from '@mdx-js/mdx';
import withSlugs from 'rehype-slug';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import GiscusComments from '@/components/GiscusComments';
import { notFound } from 'next/navigation';
import { getPublishedPosts } from '@/lib/notion';
import { Metadata } from 'next';

// 구조화된 데이터 생성 함수
function generateStructuredData(post: {
  title: string;
  description?: string;
  author?: string;
  date: string;
  modifiedDate?: string;
  slug: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author || 'chDEV',
      url: 'https://github.com/chdev-kr',
    },
    publisher: {
      '@type': 'Organization',
      name: 'chDEV',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/profile-light.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.modifiedDate || post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
    articleSection: '프론트엔드 개발',
    inLanguage: 'ko-KR',
  };
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
      description: '요청하신 블로그 포스트를 찾을 수 없습니다.',
    };
  }

  return {
    title: post.title,
    description: post.description || `${post.title} - chDEV 블로그`,
    keywords: post.tags,
    authors: [{ name: post.author || 'chDEV' }],
    publisher: 'chDEV',
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modifiedDate,
      authors: post.author || 'chDEV',
      tags: post.tags,
    },
  };
}

interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}

export const generateStaticParams = async () => {
  const { posts } = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export const revalidate = 60;

function TableOfContentsLink({ item }: { item: TocEntry }) {
  return (
    <div className="space-y-2">
      <Link
        key={item.id}
        href={`#${item.id}`}
        className={`hover:text-foreground text-muted-foreground block font-medium transition-colors`}
      >
        {item.value}
      </Link>
      {item.children && item.children.length > 0 && (
        <div className="space-y-2 pl-4">
          {item.children.map((subItem) => (
            <TableOfContentsLink key={subItem.id} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

// 마크다운 정리 함수
function sanitizeMarkdown(markdown: string): string {
  // JSX 태그에서 잘못된 문자 제거
  return (
    markdown
      // 태그 이름에 괄호가 포함된 경우 제거
      .replace(/<([a-zA-Z][a-zA-Z0-9]*?)\(/g, '<$1')
      .replace(/<([a-zA-Z][a-zA-Z0-9]*?)\)/g, '<$1')
      // 속성에서 괄호 제거
      .replace(/\s+\([^)]*\)/g, '')
      // 잘못된 JSX 태그 패턴 수정
      .replace(/<([^>]*?)\(([^>]*?)>/g, '<$1 $2>')
      .replace(/<([^>]*?)\)([^>]*?)>/g, '<$1 $2>')
      // 빈 속성 제거
      .replace(/\s+[a-zA-Z-]+=""/g, '')
      .replace(/\s+[a-zA-Z-]+=''/g, '')
  );
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const { markdown: rawMarkdown, post } = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 마크다운 정리
  const markdown = sanitizeMarkdown(rawMarkdown);

  let data;
  try {
    const result = await compile(markdown, {
      rehypePlugins: [
        withSlugs,
        rehypeSanitize,
        withToc,
        withTocExport,
        /** Optionally, provide a custom name for the export. */
        // [withTocExport, { name: 'toc' }],
      ],
    });
    data = result.data;
  } catch (error) {
    console.error('MDX 컴파일 에러:', error);
    // MDX 컴파일 실패 시 빈 목차로 처리
    data = { toc: [] };
  }

  // 구조화된 데이터 JSON-LD 스크립트
  const structuredData = generateStructuredData({
    ...post,
    date: post.date || new Date().toISOString(),
  });

  return (
    <>
      {/* 구조화된 데이터 스크립트 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="container py-6 md:py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[240px_1fr_240px] md:gap-8">
          <aside className="hidden md:block">{/* 추후 콘텐츠 추가 */}</aside>
          <section className="overflow-hidden">
            {/* 블로그 헤더 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  {post.tags?.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-bold md:text-4xl">{post.title}</h1>
              </div>

              {/* 메타 정보 */}
              <div className="text-muted-foreground flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* 모바일 전용 목차 */}
            <div className="sticky top-[var(--sticky-top)] mb-6 md:hidden">
              <details className="bg-muted/60 rounded-lg p-4 backdrop-blur-sm">
                <summary className="cursor-pointer text-lg font-semibold">목차</summary>
                <nav className="mt-3 space-y-3 text-sm">
                  {data?.toc?.map((item) => (
                    <TableOfContentsLink key={item.id} item={item} />
                  ))}
                </nav>
              </details>
            </div>

            {/* 블로그 본문 */}
            <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none">
              <MDXRemote
                source={markdown}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [withSlugs, rehypeSanitize, rehypePrettyCode],
                  },
                }}
              />
            </div>

            <Separator className="my-16" />

            {/* 이전/다음 포스트 네비게이션 */}
            <GiscusComments />
          </section>
          <aside className="relative hidden md:block">
            <div className="sticky top-[var(--sticky-top)]">
              <div className="bg-muted/60 space-y-4 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">목차</h3>
                <nav className="space-y-3 text-sm">
                  {data?.toc?.map((item) => (
                    <TableOfContentsLink key={item.id} item={item} />
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
