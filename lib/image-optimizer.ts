/**
 * 이미지 최적화 유틸리티
 * 서명된 URL과 일반 URL을 모두 최적화
 */

/**
 * 이미지 URL을 최적화합니다
 * @param imageUrl 원본 이미지 URL
 * @param width 최적화할 너비 (기본값: 800)
 * @param quality 이미지 품질 (기본값: 75)
 * @returns 최적화된 이미지 URL
 */
export function optimizeImageUrl(
  imageUrl: string,
  width: number = 800,
  quality: number = 75
): string {
  if (!imageUrl) return '';

  // AWS S3 서명된 URL인지 확인
  const isSignedUrl =
    imageUrl.includes('X-Amz-Signature') ||
    imageUrl.includes('X-Amz-Algorithm') ||
    imageUrl.includes('X-Amz-Credential');

  if (isSignedUrl) {
    // 서명된 URL의 경우, URL 파라미터를 추가하지 않고 그대로 반환
    // Next.js Image 컴포넌트에서 unoptimized=true로 처리
    return imageUrl;
  }

  // 일반 Notion 이미지 URL인 경우 최적화 파라미터 추가
  const isNotionImage =
    imageUrl.includes('notion.so') ||
    imageUrl.includes('notion-static.com') ||
    imageUrl.includes('notionusercontent.com');

  if (isNotionImage) {
    // 이미 최적화 파라미터가 있는지 확인
    if (imageUrl.includes('width=') || imageUrl.includes('quality=')) {
      return imageUrl; // 이미 최적화된 경우 그대로 반환
    }

    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}width=${width}&quality=${quality}`;
  }

  return imageUrl;
}

/**
 * 이미지 최적화 설정을 반환합니다
 * @param imageUrl 이미지 URL
 * @returns 최적화 설정 객체
 */
export function getImageOptimizationConfig(imageUrl: string) {
  const isSignedUrl =
    imageUrl.includes('X-Amz-Signature') ||
    imageUrl.includes('X-Amz-Algorithm') ||
    imageUrl.includes('X-Amz-Credential');

  return {
    isSignedUrl,
    unoptimized: isSignedUrl, // 서명된 URL은 최적화 비활성화
    quality: isSignedUrl ? 85 : 75, // 서명된 URL은 85%, 일반 URL은 75%
    priority: false, // 필요에 따라 조정
  };
}

/**
 * 이미지 로딩 최적화를 위한 sizes 속성 생성
 * @param isFirst 첫 번째 이미지인지 여부
 * @param isSignedUrl 서명된 URL인지 여부
 * @returns sizes 문자열
 */
export function getOptimizedSizes(isFirst: boolean = false, isSignedUrl: boolean = false): string {
  if (isSignedUrl) {
    // 서명된 URL의 경우 더 보수적인 sizes 설정
    return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw';
  }

  if (isFirst) {
    return '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw';
  }
  return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
}
