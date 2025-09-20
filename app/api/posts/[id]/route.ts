import { notion } from '@/lib/notion';
import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Notion에서 페이지를 아카이브 처리 (실제 삭제가 아닌 아카이브)
    await notion.pages.update({
      page_id: id,
      archived: true,
    });

    // 캐시 무효화
    revalidateTag('notion-posts');

    return NextResponse.json({ success: true, message: '게시물이 삭제되었습니다.' });
  } catch (error) {
    console.error('게시물 삭제 중 오류 발생:', error);
    return NextResponse.json(
      { success: false, message: '게시물 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
