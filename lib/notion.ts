import { Client } from '@notionhq/client';
import type { Post, TagFilterItem } from '@/types/blog';
import type {
  PageObjectResponse,
  PersonUserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import { unstable_cache } from 'next/cache';
import { revalidateTag } from 'next/cache';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const n2m = new NotionToMarkdown({ notionClient: notion });

function getPostMetadata(page: PageObjectResponse): Post {
  const { properties } = page;

  const getCoverImage = (cover: PageObjectResponse['cover']) => {
    if (!cover) return '';

    let imageUrl = '';
    switch (cover.type) {
      case 'external':
        imageUrl = cover.external.url;
        break;
      case 'file':
        imageUrl = cover.file.url;
        break;
      default:
        return '';
    }

    // Notion 이미지 URL 최적화 (서명된 URL 고려)
    if (imageUrl) {
      // AWS S3 서명된 URL인지 확인 (파라미터 추가 시 서명 무효화됨)
      const isSignedUrl =
        imageUrl.includes('X-Amz-Signature') ||
        imageUrl.includes('X-Amz-Algorithm') ||
        imageUrl.includes('X-Amz-Credential');

      if (isSignedUrl) {
        // 서명된 URL은 그대로 반환 (파라미터 추가 시 403 에러 발생)
        // PostCard 컴포넌트에서 unoptimized=true로 처리하여 최적화
        return imageUrl;
      }

      // 일반 Notion 이미지 URL인 경우에만 최적화 적용
      const isNotionImage =
        imageUrl.includes('notion.so') ||
        imageUrl.includes('notion-static.com') ||
        imageUrl.includes('notionusercontent.com');

      if (isNotionImage) {
        // 이미 최적화 파라미터가 있는지 확인
        if (imageUrl.includes('width=') || imageUrl.includes('quality=')) {
          return imageUrl; // 이미 최적화된 경우 그대로 반환
        }

        // Notion 이미지 URL에 최적화 파라미터 추가 (품질을 75%로 조정)
        const separator = imageUrl.includes('?') ? '&' : '?';
        return `${imageUrl}${separator}width=800&quality=75`;
      }
    }

    return imageUrl;
  };

  return {
    id: page.id,
    title: properties.Title.type === 'title' ? (properties.Title.title[0]?.plain_text ?? '') : '',
    description:
      properties.Description.type === 'rich_text'
        ? (properties.Description.rich_text[0]?.plain_text ?? '')
        : '',
    coverImage: getCoverImage(page.cover),
    tags:
      properties.Tags.type === 'multi_select'
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [],
    author:
      properties.Author.type === 'people'
        ? ((properties.Author.people[0] as PersonUserObjectResponse)?.name ?? '')
        : '',
    date: properties.Date.type === 'date' ? (properties.Date.date?.start ?? '') : '',
    modifiedDate: page.last_edited_time,
    slug:
      properties.Slug.type === 'rich_text'
        ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
        : page.id,
  };
}

export const getPostBySlug = async (
  slug: string
): Promise<{
  markdown: string;
  post: Post | null;
}> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
      ],
    },
  });

  if (!response.results[0]) {
    return {
      markdown: '',
      post: null,
    };
  }

  const mdBlocks = await n2m.pageToMarkdown(response.results[0].id);
  const { parent } = n2m.toMarkdownString(mdBlocks);

  return {
    markdown: parent,
    post: getPostMetadata(response.results[0] as PageObjectResponse),
  };

  // return getPageMetadata(response);
};

export interface GetPublishedPostsParams {
  tag?: string;
  sort?: string;
  pageSize?: number;
  startCursor?: string;
}
export interface GetPublishedPostsResponse {
  posts: Post[];
  hasMore: boolean;
  nextCursor: string | null;
}

export const getPublishedPosts = unstable_cache(
  async ({
    tag = '전체',
    sort = 'latest',
    pageSize = 10, // 홈페이지에서 더 많은 게시물 표시
    startCursor,
  }: GetPublishedPostsParams = {}): Promise<GetPublishedPostsResponse> => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            property: 'Status',
            select: {
              equals: 'Published',
            },
          },
          ...(tag && tag !== '전체'
            ? [
                {
                  property: 'Tags',
                  multi_select: {
                    contains: tag,
                  },
                },
              ]
            : []),
        ],
      },
      sorts: [
        {
          property: 'Date',
          direction: sort === 'latest' ? 'descending' : 'ascending',
        },
      ],
      page_size: pageSize,
      start_cursor: startCursor,
    });

    const posts = response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(getPostMetadata);

    return {
      posts,
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
    };
  },
  undefined,
  {
    tags: ['notion-posts'], // 통일된 캐시 태그 사용
    revalidate: 30, // 30초마다 재검증
  }
);

export const getTags = unstable_cache(
  async (): Promise<TagFilterItem[]> => {
    const { posts } = await getPublishedPosts({ pageSize: 100 });

    // 모든 태그를 추출하고 각 태그의 출현 횟수를 계산
    const tagCount = posts.reduce(
      (acc, post) => {
        post.tags?.forEach((tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    );

    // TagFilterItem 형식으로 변환
    const tags: TagFilterItem[] = Object.entries(tagCount).map(([name, count]) => ({
      id: name,
      name,
      count,
    }));

    // "전체" 태그 추가
    tags.unshift({
      id: 'all',
      name: '전체',
      count: posts.length,
    });

    // 태그 이름 기준으로 정렬 ("전체" 태그는 항상 첫 번째에 위치하도록 제외)
    const [allTag, ...restTags] = tags;
    const sortedTags = restTags.sort((a, b) => a.name.localeCompare(b.name));

    return [allTag, ...sortedTags];
  },
  undefined,
  {
    tags: ['notion-posts'], // getPublishedPosts와 같은 캐시 태그 사용
    revalidate: 30, // 30초마다 재검증 (getPublishedPosts와 동일)
  }
);

export interface CreatePostParams {
  title: string;
  tag: string;
  content: string;
}

export const createPost = async ({ title, tag, content }: CreatePostParams) => {
  const response = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID!,
    },
    properties: {
      Title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      Description: {
        rich_text: [
          {
            text: {
              content: content,
            },
          },
        ],
      },
      Tags: {
        multi_select: [{ name: tag }],
      },
      Status: {
        select: {
          name: 'Published',
        },
      },
      Date: {
        date: {
          start: new Date().toISOString(),
        },
      },
    },
  });

  // 새 포스트 생성 후 캐시 무효화
  revalidateTag('notion-posts');

  return response;
};

// 캐시 무효화 함수
export const revalidateCache = () => {
  revalidateTag('notion-posts');
};
