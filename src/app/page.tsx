"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Zap,
  Radio,
  BookOpen,
  Library,
  ChevronRight,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  Shield,
  Clock,
  Target,
  GraduationCap,
  Building2,
  Star,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ──────────────────────────────────────────
   Animated Counter Hook
   ────────────────────────────────────────── */
function useCounter(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
}

/* ──────────────────────────────────────────
   Stats Data
   ────────────────────────────────────────── */
const stats = [
  { label: "현장 경력", value: 20, suffix: "+년", icon: Award },
  { label: "교육 수료생", value: 5000, suffix: "+", icon: Users },
  { label: "기업 고객사", value: 50, suffix: "+", icon: Building2 },
  { label: "교육 만족도", value: 98, suffix: "%", icon: Star },
];

/* ──────────────────────────────────────────
   Services Data
   ────────────────────────────────────────── */
const services = [
  {
    title: "산업자동화",
    description:
      "LS, Mitsubishi, Siemens 등 멀티 벤더 PLC 프로그래밍 및 HMI/SCADA 시스템 구축. 스마트 팩토리 데이터 수집과 공정 최적화 솔루션을 제공합니다.",
    icon: Cpu,
    href: "/services/automation",
    color: "blue",
  },
  {
    title: "전력계통",
    description:
      "ETAP/SKM을 활용한 조류 계산, 고장 전류 분석, 보호계전기 정정 및 협조 시뮬레이션을 통해 전력 계통의 신뢰성을 확보합니다.",
    icon: Zap,
    href: "/services/power",
    color: "cyan",
  },
  {
    title: "피뢰/접지",
    description:
      "KEC 및 IEC 62305 기반 공통/통합 접지 설계. 회전구체법 외부 피뢰 시스템 및 SPD 최적 용량 산정, 등전위 본딩 컨설팅을 제공합니다.",
    icon: Radio,
    href: "/services/grounding",
    color: "orange",
  },
  {
    title: "기술교육",
    description:
      "국가기술자격 취득 로드맵 및 NCS 기반 PLC/시퀀스 실무 교육. 현장 엔지니어 역량 강화를 위한 맞춤형 커리큘럼을 운영합니다.",
    icon: BookOpen,
    href: "/education",
    color: "green",
  },
  {
    title: "도서출판",
    description:
      "20년 현장 노하우가 집약된 실무 기술 서적 및 수험서 출판. KEC 해설서, PLC 프로그래밍 가이드 등 전기인을 위한 필독서 시리즈.",
    icon: Library,
    href: "/services/publishing",
    color: "purple",
  },
];

/* ──────────────────────────────────────────
   Featured Courses Data
   ────────────────────────────────────────── */
const featuredCourses = [
  {
    title: "PLC 프로그래밍 실무",
    category: "산업자동화",
    duration: "40시간 (5일)",
    level: "중급",
    description:
      "LS XG5000, Mitsubishi GX Works3 기반 래더 로직 설계부터 HMI 화면 작화까지 현장 실무 중심 교육",
    badge: "인기",
  },
  {
    title: "KEC 접지/피뢰 설계",
    category: "피뢰/접지",
    duration: "24시간 (3일)",
    level: "고급",
    description:
      "한국전기설비규정(KEC) 개정 내용 반영, 공통/통합 접지 시스템 설계 실습 및 사례 분석",
    badge: "신규",
  },
  {
    title: "전력계통 해석 입문",
    category: "전력계통",
    duration: "32시간 (4일)",
    level: "초급~중급",
    description:
      "ETAP 소프트웨어를 활용한 조류 계산, 단락 전류 분석, 보호 협조 시뮬레이션 기초 과정",
    badge: "모집중",
  },
];

/* ──────────────────────────────────────────
   Why Cayson Data
   ────────────────────────────────────────── */
const benefits = [
  {
    title: "현장 중심 교육",
    description:
      "20년 이상의 산업 현장 경험을 보유한 전문 엔지니어가 직접 교육합니다. 이론뿐 아니라 실제 설비 운용 노하우를 전수합니다.",
    icon: Target,
    highlights: ["실습 위주 커리큘럼", "현장 사례 기반 교재", "1:1 실기 지도"],
  },
  {
    title: "최신 규정 대응",
    description:
      "KEC, IEC, IEEE 등 최신 전기 규정 및 국제 표준 변경사항을 실시간으로 반영하여 항상 최신 정보로 교육합니다.",
    icon: Shield,
    highlights: ["KEC 개정 즉시 반영", "국제 표준 대응", "규정 해설 자료 제공"],
  },
  {
    title: "맞춤형 솔루션",
    description:
      "기업별 설비 환경과 인력 수준을 분석하여 최적화된 교육 프로그램 및 엔지니어링 컨설팅을 설계합니다.",
    icon: TrendingUp,
    highlights: ["기업 맞춤 커리큘럼", "설비 현황 진단", "사후 기술 지원"],
  },
];

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */
export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("animate-on-scroll");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // IntersectionObserver for stats counter trigger
  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Animated counter values
  const statYears = useCounter(20, 2000, statsVisible);
  const statStudents = useCounter(5000, 2500, statsVisible);
  const statClients = useCounter(50, 2000, statsVisible);
  const statSatisfaction = useCounter(98, 2000, statsVisible);
  const counterValues = [statYears, statStudents, statClients, statSatisfaction];

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* ════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 -z-10"
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          <img
            src="/mainpicture.png?v=2"
            alt="Cayson Electric - 전기 엔지니어링 교육 및 컨설팅"
            className="h-[120%] w-full object-cover"
          />
        </div>

        {/* Hero Gradient Overlay */}
        <div className="absolute inset-0 -z-[5] hero-gradient" />
        <div className="absolute inset-0 -z-[5] bg-grid-pattern opacity-40" />

        {/* Hero Content */}
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 pt-24 pb-32">
          <div className="max-w-3xl">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="text-blue-200 text-sm font-medium tracking-wide">
                2026년 상반기 교육과정 모집중
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 animate-slide-up">
              전기 기술의 미래를
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 animate-gradient">
                현장에서 설계하다
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl font-light animate-fade-in delay-200">
              <strong className="text-white font-semibold">Cayson Electric</strong>은
              산업 자동화, 전력계통 해석, 접지/피뢰 설계부터 실무 교육까지
              <br className="hidden md:block" />
              20년 현장 경험 기반의 토탈 엔지니어링 솔루션을 제공합니다.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-bold shadow-lg shadow-blue-900/40 transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-blue-900/30 btn-glow"
              >
                <Link href="/education">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  교육과정 신청하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 rounded-lg text-base font-bold backdrop-blur-sm transition-all hover:border-white/60 hover:translate-y-[-2px]"
              >
                <Link href="/services">
                  엔지니어링 서비스 보기
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-10 animate-fade-in delay-500">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>정부 인증 교육기관</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>NCS 기반 커리큘럼</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>수료증 발급</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500">
          <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-float" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          STATS COUNTER SECTION
          ════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="relative py-16 md:py-20 bg-slate-900 bg-dot-pattern"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/20 mb-4 group-hover:bg-blue-600/30 transition-colors">
                    <IconComp className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tabular-nums">
                    {counterValues[index]}
                    <span className="text-blue-400">{stat.suffix}</span>
                  </div>
                  <p className="text-gray-400 text-sm font-medium tracking-wide">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SERVICES SECTION
          ════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 section-divider section-divider-center">
              전문 서비스 영역
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-8">
              수년간의 현장 경험과 전문 지식을 바탕으로
              <br className="hidden sm:block" />
              산업 현장에 최적화된 엔지니어링 및 교육 서비스를 제공합니다.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const IconComp = service.icon;
              const delayClass = `delay-${(index + 1) * 100}`;
              const colorMap: Record<string, string> = {
                blue: "from-blue-500 to-blue-600",
                cyan: "from-cyan-500 to-blue-500",
                orange: "from-orange-500 to-red-500",
                green: "from-emerald-500 to-teal-500",
                purple: "from-purple-500 to-indigo-500",
              };
              const gradient = colorMap[service.color] || colorMap.blue;

              return (
                <div
                  key={service.title}
                  className={`animate-on-scroll ${delayClass}`}
                >
                  <Link href={service.href} className="block h-full">
                    <div className="card-hover group relative bg-white rounded-2xl border border-gray-100 p-8 h-full hover:border-blue-200">
                      {/* Icon */}
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComp className="h-7 w-7 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Link Arrow */}
                      <div className="flex items-center text-blue-600 text-sm font-semibold mt-auto">
                        <span>자세히 보기</span>
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHY CAYSON SECTION
          ════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Why Cayson
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 section-divider section-divider-center">
              왜 <span className="gradient-text">케이슨 전기</span>인가
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-8">
              단순한 교육이 아닌, 현장에서 즉시 적용 가능한
              <br className="hidden sm:block" />
              실무 역량을 키워드립니다.
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComp = benefit.icon;
              const delayClass = `delay-${(index + 1) * 100}`;
              return (
                <div
                  key={benefit.title}
                  className={`animate-on-scroll ${delayClass}`}
                >
                  <div className="card-hover bg-white rounded-2xl p-8 h-full border border-gray-100 hover:border-blue-200 relative overflow-hidden group">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                      <IconComp className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {benefit.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {benefit.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          EDUCATION PREVIEW SECTION
          ════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div className="animate-on-scroll">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Featured Courses
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 section-divider">
                인기 교육과정
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mt-8 max-w-xl">
                실무 현장에서 가장 필요로 하는 핵심 기술 교육을 만나보세요.
              </p>
            </div>
            <div className="animate-on-scroll delay-200">
              <Button
                asChild
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-semibold"
              >
                <Link href="/education">
                  전체 교육과정 보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredCourses.map((course, index) => {
              const delayClass = `delay-${(index + 1) * 100}`;
              const badgeColor: Record<string, string> = {
                "인기": "bg-orange-100 text-orange-700",
                "신규": "bg-blue-100 text-blue-700",
                "모집중": "bg-green-100 text-green-700",
              };
              return (
                <div
                  key={course.title}
                  className={`animate-on-scroll ${delayClass}`}
                >
                  <div className="card-hover bg-white rounded-2xl border border-gray-100 overflow-hidden h-full hover:border-blue-200 group">
                    {/* Card Top Accent */}
                    <div className="h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 group-hover:from-blue-500 group-hover:via-blue-600 group-hover:to-cyan-500 transition-all" />

                    <div className="p-8">
                      {/* Badge + Category */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                          {course.category}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${badgeColor[course.badge] || "bg-gray-100 text-gray-600"}`}
                        >
                          {course.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {course.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-6">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="h-3.5 w-3.5" />
                          <span>{course.level}</span>
                        </div>
                      </div>

                      {/* Action */}
                      <Link
                        href="/education"
                        className="inline-flex items-center text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors"
                      >
                        과정 상세보기
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BOTTOM CTA SECTION
          ════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Decorative Blurs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                귀사에 최적화된
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  전기 기술 솔루션
                </span>
                을 제안합니다
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                설비 진단부터 교육, 컨설팅까지 원스톱으로 지원합니다.
                <br />
                지금 바로 전문가와 상담하세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-bold shadow-lg shadow-blue-900/50 transition-all hover:translate-y-[-2px] hover:shadow-xl btn-glow"
                >
                  <Link href="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    무료 상담 신청하기
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 rounded-lg text-base font-bold backdrop-blur-sm transition-all hover:border-white/60 hover:translate-y-[-2px]"
                >
                  <Link href="/schedule">
                    교육 일정 확인하기
                  </Link>
                </Button>
              </div>
            </div>

            {/* Contact Hint */}
            <p className="text-gray-500 text-sm mt-8 animate-on-scroll delay-200">
              평일 09:00 - 18:00 | 상담 전화 환영합니다
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
