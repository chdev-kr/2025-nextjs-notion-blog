import { Github, BookOpen, Instagram } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProfileImage } from '@/components/ProfileImage';
const socialLinks = [
  // {
  //   icon: Youtube,
  //   href: 'https://www.youtube.com/gymcoding',
  // },
  {
    icon: Github,
    href: 'https://github.com/chdev-kr',
  },
  {
    icon: BookOpen,
    href: 'https://blog.naver.com/datachae',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/chdev.kr',
  },
];
export default function ProfileSection() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-muted rounded-full p-2">
              <div className="h-36 w-36 overflow-hidden rounded-full">
                <ProfileImage />
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold">chDEV</h3>
            <p className="text-primary text-sm">Frontend Developer</p>
          </div>

          <div className="flex justify-center gap-2">
            {socialLinks.map((item, index) => (
              <Button key={index} variant="ghost" className="bg-primary/10" size="icon" asChild>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <item.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>

          <p className="bg-primary/10 rounded p-2 text-center text-sm">프론트엔드 개발자 💻</p>
        </div>
      </CardContent>
    </Card>
  );
}
