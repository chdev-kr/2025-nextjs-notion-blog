'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ProfileImage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 클라이언트에서 마운트된 후에만 테마를 사용
  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버사이드 렌더링 시에는 기본 이미지 사용
  if (!mounted) {
    return (
      <Image
        src="/images/profile-light.png"
        alt="chDEV"
        width={144}
        height={144}
        className="object-cover"
      />
    );
  }

  return (
    <Image
      src={theme === 'light' ? '/images/profile-light.png' : '/images/profile-dark.png'}
      alt="chDEV"
      width={144}
      height={144}
      className="object-cover"
    />
  );
}
