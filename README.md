# 🧠 2025 Next.js Notion Blog

> Notion을 CMS로 활용한 모던 기술 블로그입니다.

## 🌐 **Live Demo**

**🔗 [https://chdev.kr](https://chdev.kr)** - chDEV의 기술 블로그

> Next.js 15, Notion API, TypeScript로 구축된 모던 블로그

## ✨ 주요 기능

### 📝 블로그 기능

- **Notion API 연동**: Notion 데이터베이스에서 블로그 포스트 자동 가져오기
- **마크다운 렌더링**: MDX를 활용한 풍부한 마크다운 콘텐츠 표시
- **목차(TOC) 자동 생성**: 헤딩을 기반으로 한 자동 목차 생성
- **태그 필터링**: 태그별 포스트 분류 및 필터링
- **검색 및 정렬**: 최신순/오래된순 정렬 기능

### 🎨 UI/UX

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **다크모드 지원**: 라이트/다크 테마 전환
- **shadcn/ui**: 모던한 UI 컴포넌트 라이브러리
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크

### 🔧 기술적 특징

- **React 19**: 최신 React 버전 지원
- **App Router**: Next.js 15의 최신 라우팅 시스템
- **TypeScript**: 타입 안전성 보장
- **Turbopack**: 빠른 개발 서버
- **Hydration 최적화**: SSR/CSR 간 불일치 문제 해결

## 🚀 시작하기

### 필수 조건

- Node.js 18 이상
- npm 또는 yarn
- Notion 계정 및 API 키

### 설치 및 실행

1. **저장소 클론**

```bash
git clone https://github.com/chdev-kr/2025-nextjs-notion-blog.git
cd 2025-nextjs-notion-blog
```

2. **의존성 설치**

```bash
npm install --legacy-peer-deps
```

3. **환경변수 설정**

```bash
# .env.local 파일 생성
NOTION_TOKEN=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

> **Vercel 배포 시**:
>
> - `your-vercel-domain.vercel.app`는 Vercel 배포 후 생성되는 실제 도메인으로 교체
> - 예: `https://notion-blog-abc123.vercel.app`
> - Vercel 대시보드 → 프로젝트 → Domains에서 확인 가능

4. **개발 서버 실행**

```bash
npm run dev
```

5. **브라우저에서 확인**

```
http://localhost:3000
```

## ⚙️ Notion 설정

### 1. Notion Integration 생성

1. [Notion Developers](https://www.notion.so/my-integrations)에서 새 Integration 생성
2. API 키 복사하여 `NOTION_TOKEN`에 설정

### 2. 데이터베이스 생성

필수 속성들을 포함한 데이터베이스를 생성해주세요:

| 속성명      | 타입         | 설명                        |
| ----------- | ------------ | --------------------------- |
| Title       | Title        | 포스트 제목                 |
| Slug        | Rich text    | URL 슬러그                  |
| Description | Rich text    | 포스트 설명                 |
| Tags        | Multi-select | 태그 목록                   |
| Status      | Select       | 발행 상태 (Published/Draft) |
| Date        | Date         | 작성일                      |
| Author      | People       | 작성자                      |

### 3. 권한 설정

1. 데이터베이스 페이지에서 **"공유"** 클릭
2. 생성한 Integration 초대
3. **"읽기"** 권한 부여

## 📁 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── blog/[slug]/       # 블로그 상세 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx          # 홈페이지
│   └── providers.tsx     # React Query, Theme Provider
├── components/            # 재사용 가능한 컴포넌트
│   ├── features/         # 기능별 컴포넌트
│   ├── layouts/          # 레이아웃 컴포넌트
│   ├── theme/           # 테마 관련 컴포넌트
│   └── ui/              # shadcn/ui 컴포넌트
├── lib/                  # 유틸리티 함수
│   ├── notion.ts        # Notion API 함수
│   ├── date.ts          # 날짜 유틸리티
│   └── utils.ts         # 공통 유틸리티
└── types/               # TypeScript 타입 정의
```

## 🛠 주요 기술 스택

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: TanStack Query
- **CMS**: Notion API
- **Markdown**: MDX
- **Theme**: next-themes

## 🔧 트러블슈팅

### **Vercel 배포 시 "API token is invalid" 에러**

**문제**: 환경변수를 설정했는데도 Vercel에서 Notion API 토큰을 읽지 못하는 경우

**원인**: 팀 수준에서 환경변수를 설정했지만, 프로젝트에서 인식하지 못함

**해결방법**:

1. **Vercel 대시보드** → **프로젝트 직접 선택** (팀 설정이 아닌)
2. **Settings** → **Environment Variables**
3. **프로젝트 수준에서 환경변수 설정**:
   ```
   NOTION_TOKEN=your_notion_api_token
   NOTION_DATABASE_ID=your_database_id
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```
4. **Environment**: **Production, Preview, Development** 모두 체크
5. **Save** 후 **Redeploy** (Build Cache 사용 안 함)

### **환경변수 디버깅 방법**

배포 로그에서 환경변수가 제대로 읽히는지 확인:

```javascript
console.log('NOTION_TOKEN exists:', !!process.env.NOTION_TOKEN);
console.log('NOTION_DATABASE_ID exists:', !!process.env.NOTION_DATABASE_ID);
```

### **Notion 데이터베이스 권한 확인**

1. **Notion 데이터베이스 페이지** 접속
2. **"공유"** 버튼 클릭
3. **Integration 추가** → **"읽기" 권한 부여**

### **React 19 호환성 문제**

일부 패키지가 React 19를 지원하지 않을 경우:

```bash
npm install --legacy-peer-deps
```

### **배포된 사이트에서 브랜딩 변경이 반영되지 않는 문제**

**문제**: 코드에서 브랜드명을 변경했는데 배포된 사이트에서 여전히 이전 텍스트가 표시되는 경우

**원인**:

- 일부 파일에서 텍스트가 완전히 변경되지 않음
- Vercel 캐시 또는 CDN 캐시 지연
- 브라우저 캐시 문제

**해결방법**:

1. **모든 파일에서 일괄 변경**:

   ```bash
   # 모든 TypeScript 파일에서 텍스트 일괄 변경
   find . -name "*.tsx" -not -path "./node_modules/*" -exec sed -i '' 's/이전텍스트/새텍스트/g' {} \;
   ```

2. **변경사항 확인**:

   ```bash
   # 남아있는 이전 텍스트 검색
   grep -r "이전텍스트" . --exclude-dir=node_modules --exclude-dir=.git
   ```

3. **강제 재배포**:

   ```bash
   # 빈 커밋으로 Vercel 재배포 트리거
   git commit --allow-empty -m "🔄 강제 재배포"
   git push origin main
   ```

4. **캐시 확인**:
   - 시크릿 모드에서 사이트 접속
   - 하드 리프레시: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows)
   - Vercel 대시보드에서 배포 상태 확인

### **이미지 최적화 성능 개선**

**문제**:

- 직접 업로드한 이미지가 최적화되지 않아 로딩 속도가 느림
- 서명된 URL과 일반 URL에 대한 일관성 없는 최적화 처리
- 이미지 품질과 파일 크기 간의 균형 문제

**최적화 전**:

- 모든 이미지가 원본 크기로 로딩
- 서명된 URL에서 403/500 에러 발생
- 일관성 없는 이미지 처리 방식

**최적화 후**:

- **직접 업로드한 이미지 (서명된 URL)**:
  - 품질: 85% (적절한 품질 유지)
  - 최적화: `unoptimized=true` (Next.js 최적화 비활성화)
  - 에러 방지: 403/500 에러 완전 해결
- **Unsplash 이미지 (일반 URL)**:
  - 품질: 75% (파일 크기 최적화)
  - 최적화: Next.js 자동 최적화 활성화
  - 포맷: WebP/AVIF 자동 변환

**개선사항**:

1. **중앙화된 이미지 최적화 관리**: `lib/image-optimizer.ts` 생성
2. **타입별 최적화 전략**: 서명된 URL과 일반 URL에 대한 차별화된 처리
3. **품질 균형**: 최고 품질 대신 적절한 품질로 파일 크기 최적화
4. **에러 해결**: 서명된 URL 관련 모든 에러 해결
5. **성능 향상**: 각 이미지 타입에 맞는 최적화 전략 적용

**수정된 파일**:

- `lib/image-optimizer.ts`: 중앙화된 이미지 최적화 유틸리티 (신규)
- `components/features/blog/PostCard.tsx`: 최적화 설정 적용
- `lib/notion.ts`: 품질 파라미터 조정 (80% → 75%)

**CDN 도입 검토 및 대안 선택**:

- **Cloudinary CDN 설치**: `npm install cloudinary`로 CDN 라이브러리 설치
- **자체 최적화 시스템 선택**: CDN 대신 Next.js 내장 최적화 + 커스텀 로직으로 해결
- **선택 이유**:
  - CDN 추가 비용 및 복잡성 회피
  - Next.js Image 컴포넌트의 충분한 최적화 기능 활용
  - 서명된 URL 문제를 더 간단하게 해결
- **향후 확장성**: 필요시 Cloudinary나 ImageKit 등 CDN으로 쉽게 마이그레이션 가능

### **동적 아이콘(Favicon) 시스템**

이 프로젝트는 **Next.js의 동적 아이콘 생성 기능**을 사용합니다:

**구현 방식**:

- `app/icon.tsx`: 브랜드 "C" 문자를 동적으로 생성
- 32x32px 크기의 검은 배경, 흰 글씨 원형 아이콘
- Next.js ImageResponse API 사용

**코드 예시**:

```tsx
// app/icon.tsx
export default function Icon() {
  return new ImageResponse(
    <div style={{...}}>C</div>,
    { width: 32, height: 32 }
  );
}
```

**아이콘 우선순위**:

1. `app/icon.tsx` (동적 생성) - **최우선**
2. `app/favicon.ico` (정적 파일)

**커스터마이징**:

- 브랜드명 변경: `icon.tsx`에서 "C" → 원하는 문자로 수정
- 색상/스타일 변경: `style` 객체에서 `background`, `color` 수정
- 정적 아이콘 사용: `icon.tsx` 삭제하고 `favicon.ico`만 사용

### **favicon 변경이 반영되지 않는 문제**

**문제**: favicon 관련 변경사항이 브라우저에서 반영되지 않는 경우

**원인**:

- 브라우저 favicon 캐시 (매우 강력한 캐시)
- 동적/정적 아이콘 우선순위 혼동

**해결방법**:

1. **브라우저 캐시 강제 새로고침**:
   - `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows)
   - 또는 브라우저 개발자 도구에서 Network 탭 → Disable cache 체크 후 새로고침

2. **아이콘 타입 선택**:

   ```bash
   # 동적 아이콘 사용 시 (현재 설정)
   # app/icon.tsx 파일에서 수정

   # 정적 아이콘 사용 시
   rm app/icon.tsx  # 동적 아이콘 제거
   # app/favicon.ico 파일만 사용
   ```

### **OpenGraph 이미지 및 메타데이터 문제**

**문제**: OpenGraph 이미지가 안 뜨거나, 소셜 미디어 공유 시 제목/설명이 제대로 표시되지 않는 경우

**원인**:

- `NEXT_PUBLIC_SITE_URL` 환경변수 누락
- OpenGraph 메타데이터 설정 불완전
- Hydration 에러로 인한 SSR/CSR 불일치

**해결방법**:

1. **환경변수 추가**:

   ```bash
   # .env.local 파일에 추가
   NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
   ```

2. **layout.tsx 메타데이터 개선**:

   ```tsx
   export const metadata: Metadata = {
     // ... 기존 설정
     openGraph: {
       type: 'website',
       locale: 'ko_KR',
       url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
       title: '김채현 기록장',
       description: '프론트엔드 개발과 관련된 다양한 지식과 경험을 공유하는 기록장입니다.',
       siteName: 'chDEV 놀이터',
       images: [
         {
           url: '/opengraph-image',
           width: 1200,
           height: 630,
           alt: '김채현 포트폴리오 OG 이미지',
         },
       ],
     },
     twitter: {
       card: 'summary_large_image',
       title: '김채현 포트폴리오',
       description: '프론트엔드 개발과 관련된 다양한 지식과 경험을 공유하는 기록장입니다.',
       images: ['/opengraph-image'],
     },
   };
   ```

3. **page.tsx 메타데이터 추가**:

   ```tsx
   export const metadata: Metadata = {
     title: '홈',
     description: '프론트엔드 개발자 김채현의 포트폴리오입니다.',
     openGraph: {
       title: '김채현 기록장 - 홈',
       description: '프론트엔드 개발자 김채현의 포트폴리오입니다.',
       url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
       siteName: '김채현 포트폴리오',
       images: [
         {
           url: '/opengraph-image',
           width: 1200,
           height: 630,
           alt: '김채현 포트폴리오 OG 이미지',
         },
       ],
     },
     twitter: {
       card: 'summary_large_image',
       title: '김채현 포트폴리오 - 홈',
       description: '프론트엔드 개발자 김채현의 포트폴리오.',
       images: ['/opengraph-image'],
     },
   };
   ```

4. **테스트 방법**:
   - 브라우저에서 `http://localhost:3000/opengraph-image` 접속
   - Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator

### **React Hydration 에러 해결**

**문제**: 콘솔에 "Hydration failed because the server rendered HTML didn't match the client" 에러 발생

**원인**:

- `next-themes` 라이브러리의 서버/클라이언트 불일치
- 테마 관련 컴포넌트들이 서버와 클라이언트에서 다르게 렌더링
- 배포 환경에서 SEO 및 성능 문제 발생 가능

**해결방법** (gymcoding 방식):

1. **mounted 패턴 적용**:

   ```tsx
   // 모든 테마 관련 컴포넌트에 적용
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
     setMounted(true);
   }, []);

   // 서버사이드 렌더링 시에는 기본값 사용
   if (!mounted) {
     return <기본컴포넌트 />;
   }
   ```

2. **수정된 컴포넌트들**:
   - `components/ProfileImage.tsx`
   - `components/theme/ThemeToggle.tsx`
   - `components/GiscusComments.tsx`
   - `components/ui/sonner.tsx`

3. **layout.tsx에서 suppressHydrationWarning 추가**:

   ```tsx
   <html lang="en" className="scroll-smooth" suppressHydrationWarning>
   ```

**해결 원리**:

- **서버사이드**: 모든 컴포넌트가 기본값(light 테마)으로 렌더링
- **클라이언트 마운트**: `useEffect`로 `mounted` 상태를 `true`로 변경
- **테마 적용**: 실제 사용자 테마로 다시 렌더링

**결과**:

- ✅ Hydration 에러 해결
- ✅ SEO 최적화 유지
- ✅ 사용자 경험 개선
- ✅ 배포 환경 안정성 확보

### **OpenGraph 이미지 생성 오류 (기존)**

**문제**: OpenGraph 이미지에서 "Internal Server Error" 발생하거나 이미지가 제대로 표시되지 않는 경우

**원인**:

- Next.js 15와 ImageResponse API 호환성 문제
- `params` 타입 불일치 (Promise 타입 처리 필요)
- `app/providers.tsx` 파일 손상 (종종 다른 파일 내용으로 덮어써짐)

**해결방법**:

1. **gymcoding 원본 코드 구조 사용**:

   ```tsx
   // app/opengraph-image.tsx
   export default function OgImage() {
     return new ImageResponse(<div>...</div>, { width: 1200, height: 630 });
   }

   // app/blog/[slug]/opengraph-image.tsx
   export default async function OgImage({ params }: { params: { slug: string } }) {
     const { post } = await getPostBySlug(params.slug);
     // ...
   }
   ```

2. **providers.tsx 파일 정상 상태 확인**:

   ```tsx
   // app/providers.tsx (올바른 내용)
   'use client';
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
   // ... React Query 및 Theme Provider 설정
   ```

3. **캐시 삭제 후 재빌드**:

   ```bash
   rm -rf .next
   npm run build
   ```

4. **Facebook Debugger로 OpenGraph 캐시 갱신**:
   - [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)
   - URL 입력 후 "Scrape Again" 클릭

### **사이트맵 제출 실패 문제**

**문제**: Google Search Console이나 Naver Search Advisor에서 사이트맵을 제출했는데 "올바른 사이트맵이 아니다" 또는 "사이트맵을 찾을 수 없다"는 에러가 발생하는 경우

**원인**:

- **URL 불일치**: 사이트맵 내 URL과 실제 접근 가능한 URL이 다름
- **도메인 리다이렉션**: `example.com` → `www.example.com` 리다이렉션으로 인한 혼란
- **robots.txt 설정 부족**: 검색엔진이 사이트맵을 찾을 수 있는 명확한 경로 없음

**해결방법**:

1. **사이트맵 URL 수정**:

   ```typescript
   // app/sitemap.ts
   export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
     // www 서브도메인을 포함한 기본 URL로 수정
     const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.chdev.kr';

     // 모든 URL이 실제 접근 가능한 도메인으로 통일
     const staticPages: MetadataRoute.Sitemap = [
       {
         url: baseUrl, // https://www.chdev.kr
         lastModified: new Date(),
         changeFrequency: 'daily' as const,
         priority: 1,
       },
       // ... 다른 페이지들
     ];
   }
   ```

2. **robots.txt 개선**:

   ```typescript
   // app/robots.ts
   export default function robots(): MetadataRoute.Robots {
     const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.chdev.kr';

     return {
       rules: {
         userAgent: '*',
         allow: '/',
         disallow: ['/dashboard/', '/api/'],
       },
       sitemap: `${baseUrl}/sitemap.xml`, // 올바른 사이트맵 경로
     };
   }
   ```

3. **Next.js 설정에 헤더 추가**:

   ```typescript
   // next.config.ts
   async headers() {
     return [
       {
         source: '/sitemap.xml',
         headers: [
           {
             key: 'Content-Type',
             value: 'application/xml',
           },
           {
             key: 'Cache-Control',
             value: 'public, max-age=3600, s-maxage=3600',
           },
         ],
       },
       {
         source: '/robots.txt',
         headers: [
           {
             key: 'Content-Type',
             value: 'text/plain',
           },
           {
             key: 'Cache-Control',
             value: 'public, max-age=3600, s-maxage=3600',
           },
         ],
       },
     ];
   }
   ```

4. **배포 후 확인**:

   ```bash
   # 사이트맵 접근 확인
   curl -I https://www.chdev.kr/sitemap.xml

   # robots.txt 접근 확인
   curl -I https://www.chdev.kr/robots.txt

   # 사이트맵 내용 확인
   curl https://www.chdev.kr/sitemap.xml
   ```

5. **검색엔진에 올바른 URL 제출**:
   - **Google Search Console**: `https://www.chdev.kr/sitemap.xml`
   - **Naver Search Advisor**: `https://www.chdev.kr/sitemap.xml`

**주의사항**:

- 도메인 리다이렉션이 있는 경우 실제 접근 가능한 URL을 사용
- 환경 변수 `NEXT_PUBLIC_SITE_URL`이 올바르게 설정되어 있는지 확인
- 배포 후 캐시 갱신까지 시간이 필요할 수 있음

### **커스텀 도메인 연결**

Vercel에 배포된 프로젝트에 구매한 도메인을 연결하는 방법입니다.

**1단계: Vercel에서 도메인 추가**

1. **Vercel 대시보드** → **프로젝트 선택**
2. **Settings** → **Domains** 탭
3. **Add** 버튼 클릭
4. 구매한 도메인 입력 (예: `chdev.kr`)

**2단계: DNS 설정 (가비아 기준)**

```
A 레코드:
타입: A
호스트: @
값: 76.76.19.19
TTL: 3600

CNAME 레코드 (또는 A 레코드):
타입: CNAME (또는 A)
호스트: www
값: cname.vercel-dns.com (또는 76.76.19.19)
TTL: 3600
```

**3단계: 환경변수 업데이트**

- **Vercel Settings** → **Environment Variables**
- `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`으로 변경
- **Redeploy** 실행

**4단계: 확인**

- DNS 전파 시간: 10분 ~ 48시간
- SSL 인증서: 자동 발급 (Let's Encrypt)
- 확인 명령어: `nslookup yourdomain.com`

**주의사항**:

- 로컬 `.env.local` 파일은 `http://localhost:3000` 유지
- Vercel 환경변수만 새 도메인으로 변경
- DNS 전파 완료까지 기존 Vercel URL과 병행 사용 가능

## 📜 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 실행
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 포맷팅
```

## 🤝 기여하기

1. 이 저장소를 Fork
2. 새 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'feat: Add amazing feature'`)
4. 브랜치에 Push (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

---

### **태그 목록과 실제 게시물 불일치 문제**

**문제**: 로컬에서는 태그 목록이 정확한데, 배포된 사이트에서는 잘못된 태그나 숫자가 표시되는 경우

**증상**:

- 로컬: 태그 목록이 실제 게시물과 일치
- 프로덕션: 존재하지 않는 태그 표시, 잘못된 숫자 표시

**원인**:

1. **캐싱 문제**: 빌드 시점의 오래된 데이터가 캐시됨
2. **빌드 타임 vs 런타임 차이**: 로컬은 실시간, 프로덕션은 빌드 시점 데이터
3. **캐시 태그 혼재**: 태그와 게시물이 같은 캐시를 공유

**해결방법**:

1. **캐시 분리 및 재검증 설정**:

   ```typescript
   // lib/notion.ts
   export const getTags = unstable_cache(
     async (): Promise<TagFilterItem[]> => {
       const { posts } = await getPublishedPosts({ pageSize: 100 });

       // 태그 계산 로직
       const tagCount = posts.reduce(
         (acc, post) => {
           post.tags?.forEach((tag) => {
             acc[tag] = (acc[tag] || 0) + 1;
           });
           return acc;
         },
         {} as Record<string, number>
       );

       // TagFilterItem 형식으로 변환
       const tags: TagFilterItem[] = Object.entries(tagCount).map(([name, count]) => ({
         id: name,
         name,
         count,
       }));

       // "전체" 태그 추가
       tags.unshift({
         id: 'all',
         name: '전체',
         count: posts.length,
       });

       return tags;
     },
     undefined,
     {
       tags: ['tags'], // 별도 캐시 태그 사용
       revalidate: 3600, // 1시간마다 재검증
     }
   );
   ```

2. **Promise 기반 컴포넌트 구조**:

   ```typescript
   // app/page.tsx
   export default async function Home({ searchParams }: HomeProps) {
     const { tag, sort } = await searchParams;
     const selectedTag = tag || '전체';
     const selectedSort = sort || 'latest';

     const tagsPromise = getTags(); // Promise 그대로 전달
     const postsPromise = getPublishedPosts({ tag: selectedTag, sort: selectedSort });

     return (
       <div className="container py-8">
         <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr_220px]">
           <aside className="order-2 md:order-none">
             <Suspense fallback={<TagSectionSkeleton />}>
               <TagSectionClient tags={tagsPromise} selectedTag={selectedTag} />
             </Suspense>
           </aside>
           {/* ... 나머지 컴포넌트들 */}
         </div>
       </div>
     );
   }
   ```

3. **클라이언트 컴포넌트에서 use() 훅 사용**:

   ```typescript
   // app/_components/TagSection.client.tsx
   'use client';

   import { use } from 'react';

   interface TagSectionProps {
     tags: Promise<TagFilterItem[]>;
     selectedTag: string;
   }

   export default function TagSection({ tags, selectedTag }: TagSectionProps) {
     const allTags = use(tags); // Promise 해결

     return (
       <Card>
         <CardHeader>
           <CardTitle>태그 목록</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="flex flex-col gap-3">
             {allTags.map((tag) => (
               <Link href={`?tag=${tag.name}`} key={tag.name}>
                 <div className={cn(
                   'hover:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 text-sm transition-colors',
                   selectedTag === tag.name && 'bg-muted-foreground/10 text-foreground font-medium'
                 )}>
                   <span>{tag.name}</span>
                   <span>{tag.count}</span>
                 </div>
               </Link>
             ))}
           </div>
         </CardContent>
       </Card>
     );
   }
   ```

4. **캐시 무효화 함수 추가**:

   ```typescript
   // lib/notion.ts
   import { revalidateTag } from 'next/cache';

   // 캐시 무효화 함수
   export const revalidateCache = () => {
     revalidateTag('posts');
     revalidateTag('tags');
   };

   // 새 포스트 생성 시 자동 캐시 무효화
   export const createPost = async ({ title, tag, content }: CreatePostParams) => {
     const response = await notion.pages.create({
       // ... 포스트 생성 로직
     });

     // 새 포스트 생성 후 캐시 무효화
     revalidateTag('posts');
     revalidateTag('tags');

     return response;
   };
   ```

**해결 원리**:

1. **캐시 분리**: 태그와 게시물을 별도 캐시로 관리
2. **재검증 시간**: 1시간마다 자동으로 최신 데이터로 업데이트
3. **스트리밍 SSR**: Promise 기반으로 점진적 로딩
4. **자동 무효화**: 새 콘텐츠 생성 시 캐시 자동 새로고침

**결과**:

- ✅ **정확한 태그 목록**: 실제 게시물에 있는 태그만 표시
- ✅ **정확한 숫자**: 각 태그의 실제 게시물 수
- ✅ **실시간 동기화**: 새 게시물 추가 시 자동 업데이트
- ✅ **성능 최적화**: 캐싱으로 빠른 로딩

**추가 디버깅**:

```bash
# 캐시 무효화 (Vercel 대시보드에서)
# Settings → Functions → Clear Cache

# 수동 재배포
git commit --allow-empty -m "🔄 태그 캐시 무효화"
git push origin main
```

### **React use() 훅 런타임 에러**

**문제**: `Error: An unsupported type was passed to use(): [object Object]` 에러 발생

**원인**: `use()` 훅에 Promise가 아닌 이미 해결된 배열을 전달

**해결방법**:

1. **Promise 전달 방식으로 수정**:

   ```typescript
   // ❌ 잘못된 방식
   const tags = await getTags(); // 이미 해결됨
   <TagSectionClient tags={tags} /> // 배열 전달

   // ✅ 올바른 방식
   const tagsPromise = getTags(); // Promise 그대로
   <TagSectionClient tags={tagsPromise} /> // Promise 전달
   ```

2. **타입 정의 확인**:

   ```typescript
   interface TagSectionProps {
     tags: Promise<TagFilterItem[]>; // Promise 타입
     selectedTag: string;
   }
   ```

**use() 훅 동작 원리**:

- Promise를 받아서 자동으로 해결
- Suspense와 함께 사용하여 로딩 상태 처리
- 서버 컴포넌트에서 클라이언트 컴포넌트로 데이터 전달

### **Notion 게시물 삭제 후 블로그에 여전히 표시되는 문제**

**문제**: Notion에서 게시물을 삭제했는데 블로그 사이트에서는 여전히 해당 게시물이 표시되는 경우

**증상**:

- 홈페이지에서 삭제된 게시물이 여전히 보임
- 태그 목록에서는 삭제된 게시물이 보이지 않음 (태그별 필터링 시)
- 전체 목록과 태그별 목록 간 데이터 불일치

**원인**:

1. **캐시 불일치**: `getPublishedPosts`와 `getTags` 함수가 서로 다른 캐시 태그 사용
2. **캐시 재검증 시간 차이**: 서로 다른 주기로 캐시가 갱신되어 동기화 문제 발생
3. **캐시 무효화 부족**: 게시물 삭제 시 캐시가 자동으로 무효화되지 않음

**해결방법**:

1. **캐시 태그 통일**:

   ```typescript
   // lib/notion.ts
   export const getPublishedPosts = unstable_cache(
     async ({ tag = '전체', sort = 'latest', pageSize = 10, startCursor }) => {
       // ... 게시물 조회 로직
     },
     undefined,
     {
       tags: ['notion-posts'], // 통일된 캐시 태그 사용
       revalidate: 30, // 30초마다 재검증
     }
   );

   export const getTags = unstable_cache(
     async (): Promise<TagFilterItem[]> => {
       const { posts } = await getPublishedPosts({ pageSize: 100 });
       // ... 태그 계산 로직
     },
     undefined,
     {
       tags: ['notion-posts'], // getPublishedPosts와 같은 캐시 태그 사용
       revalidate: 30, // 30초마다 재검증 (getPublishedPosts와 동일)
     }
   );
   ```

2. **캐시 무효화 개선**:

   ```typescript
   // lib/notion.ts
   import { revalidateTag } from 'next/cache';

   // 캐시 무효화 함수
   export const revalidateCache = () => {
     revalidateTag('notion-posts');
   };

   // 새 포스트 생성 시 자동 캐시 무효화
   export const createPost = async ({ title, tag, content }: CreatePostParams) => {
     const response = await notion.pages.create({
       // ... 포스트 생성 로직
     });

     // 새 포스트 생성 후 캐시 무효화
     revalidateTag('notion-posts');

     return response;
   };
   ```

3. **게시물 삭제 API 추가**:

   ```typescript
   // app/api/posts/[id]/route.ts
   import { notion } from '@/lib/notion';
   import { revalidateTag } from 'next/cache';

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
   ```

4. **수동 캐시 무효화 API**:

   ```typescript
   // app/api/revalidate/route.ts
   import { revalidateTag } from 'next/cache';

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
   ```

5. **홈페이지 게시물 수 증가**:

   ```typescript
   // lib/notion.ts
   export const getPublishedPosts = unstable_cache(
     async ({
       tag = '전체',
       sort = 'latest',
       pageSize = 10, // 홈페이지에서 더 많은 게시물 표시
       startCursor,
     }) => {
       // ... 게시물 조회 로직
     }
   );

   // components/features/blog/PostListSuspense.tsx
   export default function PostList({ postsPromise }: PostListProps) {
     const pageSize = 10; // 더 많은 게시물을 한 번에 로드
     // ... 나머지 로직
   }
   ```

**해결 원리**:

1. **캐시 동기화**: 모든 관련 함수가 같은 캐시 태그를 사용하여 일관성 보장
2. **빠른 재검증**: 30초마다 자동으로 최신 데이터로 업데이트
3. **자동 무효화**: 게시물 생성/삭제 시 캐시 자동 새로고침
4. **수동 제어**: 필요시 API를 통해 즉시 캐시 무효화 가능

**결과**:

- ✅ **일관된 데이터**: 게시물 목록과 태그 목록이 항상 동기화됨
- ✅ **빠른 갱신**: 30초마다 자동으로 캐시가 갱신됨
- ✅ **수동 제어**: 필요시 API를 통해 캐시를 즉시 무효화 가능
- ✅ **삭제 지원**: 게시물 삭제 시 캐시가 자동으로 무효화됨

**사용 방법**:

```bash
# 즉시 캐시 무효화가 필요한 경우
curl -X POST https://chdev.kr/api/revalidate \
  -H "Authorization: Bearer YOUR_TOKEN"

# 게시물 삭제
curl -X DELETE https://chdev.kr/api/posts/POST_ID
```

**주의사항**:

- Notion에서 게시물을 삭제하면 최대 30초 내에 블로그에서도 반영됨
- 환경변수 `REVALIDATE_TOKEN`을 설정하여 보안 강화 권장
- 게시물이 많을 경우 무한 스크롤 기능으로 추가 로드 가능

### **이미지 로딩 및 렌더링 문제**

**문제**: 블로그에서 이미지가 늦게 로딩되거나 아예 표시되지 않는 경우

**증상**:

- 이미지가 로딩 중에 빈 공간으로 표시됨
- Notion 이미지가 너무 크거나 느리게 로딩됨
- 이미지 로딩 실패 시 대체 UI가 없음
- 이미지 최적화가 되지 않아 성능 저하

**원인**:

1. **Notion 이미지 URL 최적화 부족**: 원본 이미지가 너무 크거나 최적화 파라미터 없음
2. **이미지 로딩 에러 처리 부족**: 로딩 실패 시 대체 UI나 에러 처리 없음
3. **캐싱 및 포맷 최적화 부족**: WebP/AVIF 포맷 미사용, 캐시 설정 부족
4. **로딩 상태 표시 부족**: 사용자가 이미지 로딩 상태를 알 수 없음

**해결방법**:

1. **Notion 이미지 URL 최적화**:

   ```typescript
   // lib/notion.ts
   const getCoverImage = (cover: PageObjectResponse['cover']) => {
     if (!cover) return '';

     let imageUrl = '';
     switch (cover.type) {
       case 'external':
         imageUrl = cover.external.url;
         break;
       case 'file':
         imageUrl = cover.file.url;
         break;
       default:
         return '';
     }

     // Notion 이미지 URL 최적화
     if (imageUrl && (imageUrl.includes('notion.so') || imageUrl.includes('amazonaws.com'))) {
       const separator = imageUrl.includes('?') ? '&' : '?';
       return `${imageUrl}${separator}width=800&quality=80`;
     }

     return imageUrl;
   };
   ```

2. **이미지 로딩 상태 및 에러 처리**:

   ```typescript
   // lib/image-utils.ts
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

     return { loading, error, handleLoad, handleError };
   }
   ```

3. **PostCard 컴포넌트 개선**:

   ```tsx
   // components/features/blog/PostCard.tsx
   export function PostCard({ post, isFirst = false }: PostCardProps) {
     const { loading, error, handleLoad, handleError } = useImageLoading();

     return (
       <Card>
         {post.coverImage && (
           <div className="bg-muted relative aspect-[2/1] overflow-hidden">
             {/* 로딩 중 스켈레톤 */}
             {loading && !error && (
               <div className="bg-muted absolute inset-0 flex animate-pulse items-center justify-center">
                 <ImageIcon className="text-muted-foreground/50 h-12 w-12" />
               </div>
             )}

             {/* 에러 시 대체 UI */}
             {error && (
               <div className="bg-muted absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                   <ImageIcon className="text-muted-foreground/50 mx-auto mb-2 h-12 w-12" />
                   <p className="text-muted-foreground text-sm">이미지를 불러올 수 없습니다</p>
                 </div>
               </div>
             )}

             <Image
               src={post.coverImage}
               alt={post.title}
               fill
               sizes={getOptimizedSizes(isFirst)}
               priority={isFirst}
               className={`object-cover transition-transform duration-300 ${
                 loading ? 'opacity-0' : 'opacity-100'
               }`}
               onLoad={handleLoad}
               onError={handleError}
               placeholder="blur"
               blurDataURL={DEFAULT_BLUR_DATA_URL}
             />
           </div>
         )}
       </Card>
     );
   }
   ```

4. **Next.js 이미지 최적화 설정**:

   ```typescript
   // next.config.ts
   const nextConfig: NextConfig = {
     images: {
       remotePatterns: [
         { hostname: 'www.notion.so' },
         { hostname: 'notion.so' },
         { hostname: 's3.us-west-2.amazonaws.com' },
         { hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
       ],
       // 이미지 최적화 설정
       formats: ['image/webp', 'image/avif'],
       minimumCacheTTL: 60 * 60 * 24 * 7, // 7일 캐시
       dangerouslyAllowSVG: true,
       contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
     },
   };
   ```

5. **이미지 크기 최적화**:

   ```typescript
   // lib/image-utils.ts
   export function getOptimizedSizes(isFirst: boolean = false): string {
     if (isFirst) {
       return '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw';
     }
     return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
   }
   ```

**해결 원리**:

1. **URL 최적화**: Notion 이미지에 width, quality 파라미터 추가로 크기 최적화
2. **로딩 상태 관리**: useState로 로딩/에러 상태 추적
3. **대체 UI 제공**: 로딩 중 스켈레톤, 에러 시 대체 메시지
4. **포맷 최적화**: WebP/AVIF 포맷으로 파일 크기 최적화
5. **캐싱 강화**: 7일 캐시로 재방문 시 빠른 로딩

**결과**:

- ✅ **빠른 이미지 로딩**: 최적화된 URL과 포맷으로 로딩 속도 향상
- ✅ **사용자 경험 개선**: 로딩 상태 표시로 사용자 대기 시간 인식
- ✅ **에러 처리**: 이미지 로딩 실패 시 적절한 대체 UI 제공
- ✅ **성능 최적화**: WebP/AVIF 포맷과 캐싱으로 성능 향상
- ✅ **반응형 최적화**: 화면 크기별 최적화된 이미지 크기

**추가 최적화 팁**:

```bash
# 이미지 최적화 확인
# Chrome DevTools → Network 탭에서 이미지 로딩 시간 확인
# Lighthouse에서 이미지 최적화 점수 확인

# 이미지 포맷 확인
curl -I "https://your-image-url" | grep -i content-type
```
