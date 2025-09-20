import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 보안을 위해 특정 토큰이나 헤더를 확인할 수 있습니다
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.REVALIDATE_TOKEN;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { success: false, message: '인증되지 않은 요청입니다.' },
        { status: 401 }
      );
    }

    // 캐시 무효화
    revalidateTag('notion-posts');

    return NextResponse.json({
      success: true,
      message: '캐시가 성공적으로 무효화되었습니다.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('캐시 무효화 중 오류 발생:', error);
    return NextResponse.json(
      { success: false, message: '캐시 무효화에 실패했습니다.' },
      { status: 500 }
    );
  }
}
