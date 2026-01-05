# 2025 Next.js Notion Blog

> Next.js 15, Notion API, TypeScript로 만든 블로그 형식의 사이트입니다.

## 접속 링크

**[https://chdev.kr](https://chdev.kr)**

## 주요 기능

### 블로그 기능

- **Notion API 연동**: Notion 데이터베이스에서 블로그 포스트 자동 가져오기
- **마크다운 렌더링**: MDX를 활용한 풍부한 마크다운 콘텐츠 표시
- **목차(TOC) 자동 생성**: 헤딩을 기반으로 한 자동 목차 생성
- **태그 필터링**: 태그별 포스트 분류 및 필터링
- **검색 및 정렬**: 최신순/오래된순 정렬 기능

### UI/UX

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **다크모드 지원**: 라이트/다크 테마 전환
- **shadcn/ui**: 모던한 UI 컴포넌트 라이브러리
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크

### 기술적 특징

- **React 19**: 최신 React 버전 지원
- **App Router**: Next.js 15의 최신 라우팅 시스템
- **TypeScript**: 타입 안전성 보장
- **Turbopack**: 빠른 개발 서버
- **Hydration 최적화**: SSR/CSR 간 불일치 문제 해결
- **Vercel Blob Storage**: 이미지 영구 저장 및 최적화

## Notion 설정

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

## 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── api/               # API 엔드포인트
│   │   └── upload-image/  # 이미지 업로드 API
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
│   ├── blob-storage.ts  # Vercel Blob 유틸리티
│   ├── notion.ts        # Notion API 함수
│   ├── date.ts          # 날짜 유틸리티
│   └── utils.ts         # 공통 유틸리티
├── scripts/             # 스크립트
│   └── migrate-images.ts # 이미지 마이그레이션
└── types/               # TypeScript 타입 정의
```

## 주요 기술 스택

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: TanStack Query
- **CMS**: Notion API
- **Storage**: Vercel Blob
- **Markdown**: MDX
- **Theme**: next-themes

## 트러블슈팅

### Notion 이미지가 간헐적으로 깨지는 문제

**문제**: 블로그 이미지가 때때로 표시되지 않거나 403 에러 발생

**원인**:

- Notion에서 제공하는 이미지 URL은 서명된 URL(Signed URL)로, 1시간 후 만료됨
- Next.js 캐시는 7일 동안 URL을 저장하여 만료된 URL을 계속 사용
- 결과적으로 간헐적인 이미지 깨짐 현상 발생

**해결방법**: Vercel Blob Storage로 이미지 마이그레이션

1. **Vercel Blob Storage 생성**
   - Vercel 대시보드 → Storage → Create → Blob 선택

2. **환경변수 추가**

   ```bash
   vercel env pull
   ```

3. **이미지 마이그레이션 실행**

   ```bash
   npm run migrate-images
   ```

4. **Next.js 설정 업데이트**
   ```typescript
   // next.config.ts
   images: {
     remotePatterns: [
       {
         hostname: '*.public.blob.vercel-storage.com',
       },
       {
         hostname: 'blob.vercel-storage.com',
       },
     ],
   }
   ```

**결과**:

- 이미지가 Vercel Blob에 영구 저장됨
- URL 만료 문제 완전 해결
- 로딩 속도 개선 (CDN 사용)
- 비용: 무료 (1GB까지)

**마이그레이션 프로세스**:

```
1. Notion 이미지 URL 가져오기
   ↓
2. Vercel Blob에 이미지 업로드
   ↓
3. 새로운 영구 URL 생성
   ↓
4. Notion 데이터베이스 URL 업데이트
```

**주요 파일**:

- `lib/blob-storage.ts`: Blob Storage 유틸리티 함수
- `app/api/upload-image/route.ts`: 이미지 업로드 API
- `scripts/migrate-images.ts`: 마이그레이션 스크립트

### Vercel 배포 시 "API token is invalid" 에러

**문제**: 환경변수를 설정했는데도 Vercel에서 Notion API 토큰을 읽지 못하는 경우

**해결방법**:

1. Vercel 대시보드 → 프로젝트 선택 → Settings → Environment Variables
2. 프로젝트 수준에서 환경변수 설정 (팀 설정 아님)
3. Production, Preview, Development 모두 체크
4. Save 후 Redeploy

### Next.js 이미지 "hostname not configured" 에러

**문제**: `Error: Invalid src prop on next/image, hostname is not configured`

**해결방법**:

```typescript
// next.config.ts
images: {
  remotePatterns: [
    { hostname: '*.public.blob.vercel-storage.com' },
    { hostname: 'blob.vercel-storage.com' },
    { hostname: 'www.notion.so' },
    { hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
  ],
}
```

### React 19 호환성 문제

**문제**: 일부 패키지가 React 19를 지원하지 않음

**해결방법**:

```bash
npm install --legacy-peer-deps
```

### React Hydration 에러

**문제**: "Hydration failed because the server rendered HTML didn't match the client"

**해결방법**:

```tsx
// layout.tsx
<html lang="en" suppressHydrationWarning>

// 테마 관련 컴포넌트에 mounted 패턴 적용
const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <기본컴포넌트 />;
}
```
