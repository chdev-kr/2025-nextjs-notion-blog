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

### **OpenGraph 이미지 생성 오류**

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
     return new ImageResponse(
       (<div>...</div>),
       { width: 1200, height: 630 }
     );
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

**📧 문의**: 문제나 제안사항이 있으시면 Issue를 생성해 주세요!