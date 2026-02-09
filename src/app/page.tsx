import Link from "next/link";
import { ArrowRight, Cpu, Zap, Radio, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative isolate px-6 pt-14 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              2026년도 전기 전문 교육 과정 모집 중 <Link href="/education" className="font-semibold text-blue-600"><span className="absolute inset-0" aria-hidden="true" />자세히 보기 <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl break-keep">
              전기 기술의 미래를 선도하는 <span className="text-blue-600">Cayson Electric</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 break-keep">
              PLC 자동화, 전력계통 해석, 접지 설계를 아우르는 최고의 기술력.<br className="hidden sm:block" />
              현장 중심의 실무 교육으로 여러분의 기술 경쟁력을 높여드립니다.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/education">교육 신청하기</Link>
              </Button>
              <Link href="/services" className="text-sm font-semibold leading-6 text-gray-900">
                서비스 알아보기 <span aria-hidden="true">→</span>
              </Link>
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
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <Cpu className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  산업 자동화
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">PLC 제어 시스템 설계, 스마트 팩토리 구축, Python 기반 자동화 솔루션 제공.</p>
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
                  <p className="flex-auto">수배전반 설계, 보호계전 협조, 전력품질 분석 및 사고 예방 컨설팅.</p>
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
                  <p className="flex-auto">SPD 설계, 통합 접지 시스템 구성, 낙뢰 보호 및 KEC 기준 적합성 검토.</p>
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
                  KEC 교육
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">한국전기설비규정(KEC) 해설, 자격증 및 실무 심화 과정 운영.</p>
                  <p className="mt-6">
                    <Link href="/education" className="text-sm font-semibold leading-6 text-blue-600">교육 일정 보기 <span aria-hidden="true">→</span></Link>
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
