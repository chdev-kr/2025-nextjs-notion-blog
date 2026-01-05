import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 이미지를 Vercel Blob Storage에 업로드하는 API
 * POST /api/upload-image
 */
export async function POST(request: NextRequest) {
  try {
    const { imageUrl, filename } = await request.json();

    if (!imageUrl || !filename) {
      return NextResponse.json(
        { error: 'imageUrl과 filename이 필요합니다.' },
        { status: 400 }
      );
    }

    // Notion 이미지를 다운로드
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: '이미지를 다운로드할 수 없습니다.' },
        { status: 500 }
      );
    }

    const blob = await imageResponse.blob();

    // Vercel Blob에 업로드
    const { url } = await put(filename, blob, {
      access: 'public',
      addRandomSuffix: false, // 파일명 중복 방지
    });

    return NextResponse.json({
      success: true,
      url,
      originalUrl: imageUrl,
    });
  } catch (error) {
    console.error('이미지 업로드 중 오류:', error);
    return NextResponse.json(
      { error: '이미지 업로드에 실패했습니다.' },
      { status: 500 }
    );
  }
}
