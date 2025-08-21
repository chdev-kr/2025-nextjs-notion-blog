# 🧠 2025 Next.js Notion Blog

> Notion을 CMS로 활용한 모던 기술 블로그입니다.

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
