import { getPublishedPosts } from '@/lib/notion';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // 환경변수 체크
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    return NextResponse.json({ error: 'Notion API credentials not configured' }, { status: 500 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;

    const tag = searchParams.get('tag') || undefined;
    const sort = searchParams.get('sort') || undefined;
    const startCursor = searchParams.get('startCursor') || undefined;
    const pageSize = Number(searchParams.get('pageSize')) || undefined;

    const response = await getPublishedPosts({ tag, sort, startCursor, pageSize });

    return NextResponse.json(response);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
