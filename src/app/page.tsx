import Link from "next/link";
import { ArrowRight, Cpu, Zap, Radio, BookOpen, Library } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Industrial Modern Design (OpenControl Style) */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/mainpicture.png"
            alt="Cayson Electric Main Hero"
            className="h-full w-full object-cover"
          />
          {/* Sophisticated Gradient Overlay: Dark Blue/Slate gradient for text readability and premium feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
          <div className="max-w-3xl">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-100 text-sm font-medium tracking-wide">2026 Season Education Open</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 drop-shadow-lg">
              Smart Factory & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Electrical Safety
              </span> <br />
              Solutions
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl font-light">
              <strong className="text-white font-semibold">Cayson Electric</strong>은 PLC 자동화 제어부터 전력계통 해석, 접지/피뢰 설비까지<br className="hidden md:block" />
              산업 현장에 최적화된 토탈 엔지니어링 및 실무 교육을 제공합니다.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-base font-bold shadow-lg shadow-blue-900/30 transition-all hover:translate-y-[-2px]">
                <Link href="/education">
                  교육과정 신청하기
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 rounded-md text-base font-bold backdrop-blur-sm transition-all hover:border-white/60">
                <Link href="/services">
                  엔지니어링 서비스
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Stats / Highlights - Industrial Style */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10 hidden md:block">
          <div className="container mx-auto px-6 md:px-12 py-6">
            <div className="grid grid-cols-5 gap-8 divide-x divide-white/10">
              <div className="px-4">
                <p className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-1">Automation</p>
                <p className="text-white text-xs opacity-70">PLC / HMI / SCADA System</p>
              </div>
              <div className="px-4">
                <p className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-1">Power System</p>
                <p className="text-white text-xs opacity-70">Analysis & Protection</p>
              </div>
              <div className="px-4">
                <p className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-1">Safety</p>
                <p className="text-white text-xs opacity-70">Grounding & Lightning</p>
              </div>
              <div className="px-4">
                <p className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-1">Education</p>
                <p className="text-white text-xs opacity-70">KEC / Practical Training</p>
              </div>
              <div className="px-4">
                <p className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-1">Publishing</p>
                <p className="text-white text-xs opacity-70">Technical Books & Materials</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Our Expertise</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              전문적인 전기 기술 솔루션
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              수년간의 현장 경험과 전문 지식을 바탕으로 최적의 엔지니어링 및 교육 서비스를 제공합니다.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-5">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <Cpu className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  산업 자동화
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">LS, Mitsubishi, Siemens 등 멀티 벤더 PLC 프로그래밍 및 HMI/SCADA 작화. 스마트 팩토리 데이터 수집 및 공정 최적화 솔루션을 제공합니다.</p>
                  <p className="mt-6">
                    <Link href="/services/automation" className="text-sm font-semibold leading-6 text-blue-600">더 알아보기 <span aria-hidden="true">→</span></Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  전력계통 해석
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">ETAP/SKM을 활용한 조류 계산, 고장 전류 분석, 보호계전기 정정 및 협조 시뮬레이션을 통해 계통 신뢰성을 확보합니다.</p>
                  <p className="mt-6">
                    <Link href="/services/power" className="text-sm font-semibold leading-6 text-blue-600">더 알아보기 <span aria-hidden="true">→</span></Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <Radio className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  피뢰 / 접지
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">KEC 및 IEC 62305 표준 공통/통합 접지 시스템 설계. 회전구체법 기반 외부 피뢰 시스템 및 SPD 최적 용량 산정, 등전위 본딩 컨설팅.</p>
                  <p className="mt-6">
                    <Link href="/services/grounding" className="text-sm font-semibold leading-6 text-blue-600">더 알아보기 <span aria-hidden="true">→</span></Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <BookOpen className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  기술 교육
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">국가기술자격(기능사장/건축전기설비기술사) 취득 로드맵 및 NCS 기반 PLC/시퀀스 실무 교육. 현장 엔지니어 역량 강화를 위한 맞춤형 커리큘럼 제공.</p>
                  <p className="mt-6">
                    <Link href="/education" className="text-sm font-semibold leading-6 text-blue-600">전체 교육과정 보기 <span aria-hidden="true">→</span></Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <Library className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  도서 출판
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">20년 현장 노하우가 집약된 실무 기술 서적 및 수험서 출판. KEC 규정 해설서, PLC 프로그래밍 가이드 등 전기인을 위한 필독서 라인업.</p>
                  <p className="mt-6">
                    <Link href="/services/publishing" className="text-sm font-semibold leading-6 text-blue-600">도서 목록 보기 <span aria-hidden="true">→</span></Link>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              전문가와 상담하세요
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              귀사의 설비에 맞는 최적의 솔루션을 제안해 드립니다.<br />
              지금 바로 문의주세요.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">문의하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
