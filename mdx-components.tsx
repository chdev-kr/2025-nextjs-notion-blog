import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // 이미지 컴포넌트 커스터마이징
    img: ({ src, alt, ...props }) => {
      // GIF 파일인지 확인 (더 포괄적인 검사)
      const isGif = src?.toLowerCase().includes('.gif');

      if (isGif) {
        return (
          <div className="my-6 w-full">
            <img
              src={src}
              alt={alt}
              className="gif-image h-auto w-full rounded-lg shadow-lg"
              style={{
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                objectFit: 'contain',
              }}
              {...props}
            />
          </div>
        );
      }

      // 일반 이미지는 기본 처리
      return (
        <div className="my-4 flex justify-center">
          <img
            src={src}
            alt={alt}
            className="h-auto max-w-full rounded-md"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
            {...props}
          />
        </div>
      );
    },
  };
}
