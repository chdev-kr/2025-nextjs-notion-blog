import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-[var(--header-height)] items-center px-4">
        <div className="grid w-full grid-cols-3 items-center">
          <div className="flex items-center justify-start">
            <Link href="/" className="text-xl font-semibold">
              <span className="font-bold">{'{chDEV}'}</span>
            </Link>
          </div>
          <nav className="flex items-center justify-center gap-4">
            <Link href="/" className="hover:text-primary font-medium">
              홈
            </Link>
            {/* 나중에 사용할 수 있도록 주석처리 */}
            {/* <Link href="/blog" className="hover:text-primary font-medium">
              포트폴리오
            </Link> */}
            <Link href="/about" prefetch={false} className="hover:text-primary font-medium">
              소개
            </Link>
          </nav>

          <div className="flex items-center justify-end gap-2">
            <ThemeToggle />
            {/* <Button asChild size="sm" className="gap-2">
              <Link href="/blog/write">글쓰기</Link>
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
