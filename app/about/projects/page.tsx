import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export default function AboutProjects() {
  return (
    <div className="w-full">
      <div className="space-y-6 sm:space-y-8">
        {/* 헤더 섹션 */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">프로젝트</h1>
          <p className="text-muted-foreground text-lg sm:text-xl">진행한 프로젝트들을 소개합니다</p>
        </div>

        {/* 업데이트 예정 카드 */}
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl">
              <Clock className="h-5 w-5" />
              업데이트 예정
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground text-base sm:text-lg">
              현재 프로젝트들을 정리하고 있습니다.
              <br />곧 멋진 프로젝트들을 소개해드릴 예정입니다! 🚀
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
