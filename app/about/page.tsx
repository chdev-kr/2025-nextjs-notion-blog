'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Github,
  Mail,
  MapPin,
  Coffee,
  Star,
  BookOpen,
  Briefcase,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function About() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // URL 해시가 변경될 때 해당 섹션으로 스크롤
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#tech-stack') {
        const element = document.getElementById('tech-stack');
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 100);
        }
      }
    };

    // 초기 로드 시 해시 확인
    handleHashChange();

    // 해시 변경 이벤트 리스너
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 개인 정보
  const personalInfo = {
    name: '김채현',
    role: 'Frontend Developer',
    location: '대전, 대한민국',
    email: 'chkim.dev@gmail.com', // 실제 이메일로 변경하세요
    github: 'https://github.com/chdev-kr',
    passion: ['사용자 경험', '깔끔한 코드', '새로운 기술', '웹 접근성', '의사소통 능력'],
    currentlyLearning: ['Next.js', 'React Native'],
    funFact: '커피와 함께하는 코딩이 최고! ☕',
    mbti: 'I형이지만 발표를 즐기는 개발자 🌟',
  };

  // 기술 스택
  const techStack = {
    frontend: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Sass',
      'Bootstrap',
    ],
    backend: ['Node.js', 'Python', 'Django', 'Spring', 'Java'],
    database: ['MySQL', 'Oracle'],
    tools: ['Git', 'GitHub', 'AWS', 'Firebase', 'Figma'],
  };

  // 경험
  const experience = [
    {
      company: '대전 소재 E사',
      period: '2021.11 - 2025.03',
      role: '데이터 분석 / 교육 기획 / 콘텐츠 제작',
      description: [
        'Python을 활용한 데이터 수집/분석',
        'AI/SW 교육 기획 및 운영',
        '강의안 작성 및 교육 자료 개발',
      ],
    },
  ];

  // 교육
  const education = [
    {
      institution: '모두의연구소 프론트엔드 스쿨',
      period: '2025.07 - 현재',
      description: 'HTML5, CSS3, JavaScript, TypeScript, React, Next.js',
    },
    {
      institution: '빅데이터전문가 양성과정',
      period: '2021.05 - 2021.11',
      description: 'Python, Django, SQL, ML/DL',
    },
  ];

  // 자격증
  const certifications = ['ADsP', 'SQLD'];

  const handleCardClick = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="w-full">
      <div className="space-y-6 sm:space-y-8">
        {/* 헤더 섹션 */}
        <div className="space-y-4 text-center">
          <div className="animate-fade-in">
            <h1 className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl dark:from-slate-200 dark:via-slate-300 dark:to-slate-400">
              {personalInfo.name}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg sm:text-xl">{personalInfo.role}</p>
            <div className="text-muted-foreground mt-2 flex items-center justify-center gap-2 text-sm sm:text-base">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>

        {/* 개인 소개 카드 */}
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
            activeSection === 'about' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => handleCardClick('about')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Star className="h-5 w-5" />
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed sm:text-lg">
              안녕하세요! 저는 사용자 경험과 깔끔한 코드를 추구하는 프론트엔드 개발자입니다. 새로운
              기술을 배우는 것을 좋아하며, 웹 접근성과 의사소통 능력을 중요하게 생각합니다.
            </p>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-sm font-semibold sm:text-base">
                  <BookOpen className="h-4 w-4" />
                  현재 학습 중
                </h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.currentlyLearning.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs transition-all hover:scale-105 sm:text-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-sm font-semibold sm:text-base">
                  <Coffee className="h-4 w-4" />
                  재미있는 사실
                </h4>
                <p className="text-muted-foreground text-xs sm:text-sm">{personalInfo.funFact}</p>
                <p className="text-muted-foreground text-xs sm:text-sm">{personalInfo.mbti}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold sm:text-base">열정</h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.passion.map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="text-xs transition-all hover:scale-105 hover:bg-blue-50 sm:text-sm dark:hover:bg-blue-950"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 기술 스택 */}
        <Card
          id="tech-stack"
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
            activeSection === 'tech' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => handleCardClick('tech')}
        >
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">🛠️ Tech Stack</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              현재 사용하고 있는 기술들입니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-semibold sm:text-base">Frontend Development</h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.frontend.map((tech) => (
                    <Badge
                      key={tech}
                      variant="default"
                      className="text-xs transition-all hover:scale-105 hover:bg-blue-600 sm:text-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold sm:text-base">Backend & Database</h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.backend.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs transition-all hover:scale-105 sm:text-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {techStack.database.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs transition-all hover:scale-105 sm:text-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold sm:text-base">Tools & Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.tools.map((tool) => (
                    <Badge
                      key={tool}
                      variant="outline"
                      className="text-xs transition-all hover:scale-105 hover:bg-gray-50 sm:text-sm dark:hover:bg-gray-900"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 경험 */}
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
            activeSection === 'experience' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => handleCardClick('experience')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Briefcase className="h-5 w-5" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <h4 className="text-base font-semibold sm:text-lg">{exp.company}</h4>
                      <p className="text-muted-foreground text-sm sm:text-base">{exp.role}</p>
                    </div>
                    <span className="text-muted-foreground text-xs sm:text-sm">{exp.period}</span>
                  </div>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 text-xs sm:text-sm">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="hover:text-foreground transition-all">
                        {desc}
                      </li>
                    ))}
                  </ul>
                  {index < experience.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 교육 */}
        <Card
          className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
            activeSection === 'education' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => handleCardClick('education')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <GraduationCap className="h-5 w-5" />
              Education & Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="mb-3 text-sm font-semibold sm:text-base">Education</h4>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-1">
                          <h5 className="text-sm font-medium sm:text-base">{edu.institution}</h5>
                          <p className="text-muted-foreground text-xs sm:text-sm">
                            {edu.description}
                          </p>
                        </div>
                        <span className="text-muted-foreground text-xs sm:text-sm">
                          {edu.period}
                        </span>
                      </div>
                      {index < education.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-3 text-sm font-semibold sm:text-base">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <Badge
                      key={cert}
                      variant="secondary"
                      className="text-xs transition-all hover:scale-105 sm:text-sm"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 연락처 */}
        <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">📫 Connect With Me</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2 transition-all hover:scale-105"
              >
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2 transition-all hover:scale-105"
              >
                <a href={`mailto:${personalInfo.email}`}>
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
