'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Post } from '@/types/blog';
import { formatDate } from '@/lib/date';
import { useImageLoading, DEFAULT_BLUR_DATA_URL } from '@/lib/image-utils';
import { getImageOptimizationConfig, getOptimizedSizes } from '@/lib/image-optimizer';

interface PostCardProps {
  post: Post;
  isFirst?: boolean;
}

export function PostCard({ post, isFirst = false }: PostCardProps) {
  const { loading, error, handleLoad, handleError } = useImageLoading();

  // 이미지 최적화 설정 가져오기
  const optimizationConfig = post.coverImage
    ? getImageOptimizationConfig(post.coverImage)
    : { isSignedUrl: false, unoptimized: false, quality: 75, priority: false };

  return (
    <Card className="group bg-card/50 hover:border-primary/20 gap-0 overflow-hidden border p-0 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      {post.coverImage && (
        <div className="bg-muted relative aspect-[2/1] overflow-hidden">
          <div className="from-background/20 absolute inset-0 z-10 bg-gradient-to-t to-transparent" />

          {/* 이미지 로딩 중 스켈레톤 */}
          {loading && !error && (
            <div className="bg-muted absolute inset-0 flex animate-pulse items-center justify-center">
              <ImageIcon className="text-muted-foreground/50 h-12 w-12" />
            </div>
          )}

          {/* 이미지 로딩 실패 시 대체 UI */}
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
            sizes={getOptimizedSizes(isFirst, optimizationConfig.isSignedUrl)}
            priority={isFirst}
            quality={optimizationConfig.quality} // 최적화된 품질 설정
            unoptimized={optimizationConfig.unoptimized} // 최적화 설정
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              loading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h2 className="group-hover:text-primary mb-2 text-xl font-bold tracking-tight transition-colors">
          {post.title}
        </h2>
        {post.description && (
          <p className="text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        )}
        <div className="text-muted-foreground mt-6 flex items-center gap-x-4 text-sm">
          {post.author && (
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
          {post.date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time>{formatDate(post.date)}</time>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
