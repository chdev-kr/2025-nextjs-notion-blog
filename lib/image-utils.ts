/**
 * 이미지 URL 최적화 유틸리티 함수들
 */

import { useState } from 'react';

/**
 * Notion 이미지 URL을 최적화합니다
 * @param imageUrl 원본 이미지 URL
 * @param width 최적화할 너비 (기본값: 800)
 * @param quality 이미지 품질 (기본값: 80)
 * @returns 최적화된 이미지 URL
 */
export function optimizeNotionImageUrl(
  imageUrl: string,
  width: number = 800,
  quality: number = 80
): string {
  if (!imageUrl) return '';

  // AWS S3 서명된 URL인지 확인 (파라미터 추가 시 서명 무효화됨)
  const isSignedUrl =
    imageUrl.includes('X-Amz-Signature') ||
    imageUrl.includes('X-Amz-Algorithm') ||
    imageUrl.includes('X-Amz-Credential');

  if (isSignedUrl) {
    // 서명된 URL은 그대로 반환 (파라미터 추가 시 403 에러 발생)
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

    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}width=${width}&quality=${quality}`;
  }

  return imageUrl;
}

/**
 * 이미지 로딩 에러를 처리하는 함수
 * @param event 이미지 에러 이벤트
 * @param fallbackSrc 대체 이미지 URL
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc?: string
) {
  const img = event.currentTarget;

  if (fallbackSrc && img.src !== fallbackSrc) {
    img.src = fallbackSrc;
  } else {
    // 이미지 로딩 실패 시 빈 이미지로 설정
    img.style.display = 'none';
  }
}

/**
 * 이미지 로딩 상태를 관리하는 훅
 */
export function useImageLoading() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return {
    loading,
    error,
    handleLoad,
    handleError,
  };
}

/**
 * 기본 블러 데이터 URL (1x1 투명 픽셀)
 */
export const DEFAULT_BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

/**
 * 이미지 크기에 따른 최적화된 sizes 속성 생성
 * @param isFirst 첫 번째 이미지인지 여부
 * @returns sizes 속성 값
 */
export function getOptimizedSizes(isFirst: boolean = false): string {
  if (isFirst) {
    return '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw';
  }
  return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
}
