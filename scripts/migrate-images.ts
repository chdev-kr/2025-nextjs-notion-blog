/**
 * 기존 Notion 이미지를 Vercel Blob으로 마이그레이션하는 스크립트
 *
 * 사용법: npx tsx scripts/migrate-images.ts
 */

// 환경변수 로드
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// 환경변수 로드 후에 Notion Client 생성
import { Client } from '@notionhq/client';
import { migratePostImages } from '../lib/blob-storage';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// 스크립트용 Notion 클라이언트 (환경변수 로드 후 생성)
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function migrateAllImages() {
  console.log('이미지 마이그레이션 시작...\n');

  try {
    // Notion에서 모든 Published 포스트 가져오기
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
    });

    const posts = response.results.filter(
      (page): page is PageObjectResponse => 'properties' in page
    );

    console.log(`총 ${posts.length}개의 포스트를 처리합니다.\n`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const properties = post.properties;

      // 포스트 정보 추출
      const title =
        properties.Title.type === 'title'
          ? properties.Title.title.map((text) => text.plain_text).join('')
          : '';

      const slug =
        properties.Slug.type === 'rich_text'
          ? (properties.Slug.rich_text[0]?.plain_text ?? post.id)
          : post.id;

      console.log(`[${i + 1}/${posts.length}] 처리 중: ${title}`);

      // 커버 이미지 가져오기
      const cover = post.cover;
      if (!cover) {
        console.log('커버 이미지 없음 - 건너뜀\n');
        skipCount++;
        continue;
      }

      let coverImageUrl = '';
      switch (cover.type) {
        case 'external':
          coverImageUrl = cover.external.url;
          break;
        case 'file':
          coverImageUrl = cover.file.url;
          break;
      }

      if (!coverImageUrl) {
        console.log('이미지 URL 없음 - 건너뜀\n');
        skipCount++;
        continue;
      }

      // 이미 Blob Storage에 있는지 확인
      if (
        coverImageUrl.includes('vercel-storage.com') ||
        coverImageUrl.includes('blob.vercel-storage.com')
      ) {
        console.log('이미 마이그레이션됨 - 건너뜀\n');
        skipCount++;
        continue;
      }

      try {
        // 이미지 마이그레이션
        const blobUrl = await migratePostImages(coverImageUrl, slug);

        if (blobUrl && blobUrl !== coverImageUrl) {
          // Notion 페이지의 커버 이미지 URL 업데이트
          await notion.pages.update({
            page_id: post.id,
            cover: {
              type: 'external',
              external: {
                url: blobUrl,
              },
            },
          });

          console.log(`  ✓ 마이그레이션 완료: ${blobUrl}\n`);
          successCount++;
        } else {
          console.log('  ⊘ 마이그레이션 불필요 - 건너뜀\n');
          skipCount++;
        }
      } catch (error) {
        console.error(`  ✗ 에러 발생:`, error);
        console.log('');
        errorCount++;
      }
    }

    console.log('\n========================================');
    console.log('[마이그레이션 완료!]\n');
    console.log(`성공: ${successCount}개`);
    console.log(`건너뜀: ${skipCount}개`);
    console.log(`실패: ${errorCount}개`);
    console.log('========================================\n');
  } catch (error) {
    console.error('마이그레이션 중 오류 발생:', error);
    process.exit(1);
  }
}

// 스크립트 실행
migrateAllImages();
