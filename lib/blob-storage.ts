/**
 * Vercel Blob Storage 관련 유틸리티 함수
 */

import { put, list, del } from '@vercel/blob';

export async function uploadNotionImageToBlob(imageUrl: string, postSlug: string): Promise<string> {
  try {
    // 이미 Blob Storage에 있는 이미지인지 확인
    if (imageUrl.includes('vercel-storage.com') || imageUrl.includes('blob.vercel-storage.com')) {
      return imageUrl; // 이미 업로드된 이미지는 그대로 반환
    }

    // Notion 이미지만 처리
    const isNotionImage =
      imageUrl.includes('notion.so') ||
      imageUrl.includes('amazonaws.com') ||
      imageUrl.includes('notion-static.com') ||
      imageUrl.includes('notionusercontent.com');

    if (!isNotionImage) {
      return imageUrl; // Notion 이미지가 아니면 원본 반환
    }

    // 이미지 다운로드
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error('이미지 다운로드 실패:', imageUrl);
      return imageUrl; // 실패하면 원본 반환
    }

    const blob = await response.blob();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const extension = contentType.split('/')[1] || 'jpg';

    // 파일명 생성: posts/{slug}/{timestamp}.{extension}
    const timestamp = Date.now();
    const filename = `posts/${postSlug}/${timestamp}.${extension}`;

    // Vercel Blob에 업로드
    const { url } = await put(filename, blob, {
      access: 'public',
      contentType,
    });

    return url;
  } catch (error) {
    console.error('이미지 업로드 중 오류:', error);
    return imageUrl; // 에러 발생 시 원본 반환
  }
}

export async function uploadMultipleImages(
  images: string[],
  postSlug: string
): Promise<Map<string, string>> {
  const urlMap = new Map<string, string>();

  for (const imageUrl of images) {
    const blobUrl = await uploadNotionImageToBlob(imageUrl, postSlug);
    urlMap.set(imageUrl, blobUrl);
  }

  return urlMap;
}

/**
 * Blob Storage에 있는 모든 이미지 목록 조회
 */
export async function listAllImages() {
  const { blobs } = await list();
  return blobs;
}

export async function deleteImage(url: string) {
  try {
    await del(url);
    console.log(`이미지 삭제 성공: ${url}`);
  } catch (error) {
    console.error('이미지 삭제 실패:', error);
  }
}

export async function migratePostImages(
  coverImage: string | null,
  postSlug: string
): Promise<string | null> {
  if (!coverImage) return null;

  const blobUrl = await uploadNotionImageToBlob(coverImage, postSlug);
  return blobUrl;
}
