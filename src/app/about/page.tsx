import {
    Building2,
    Target,
    Award,
    MapPin,
    Phone,
    Mail,
    Clock,
    ArrowRight,
    Lightbulb,
    Shield,
    Wrench,
    Handshake,
    Cpu,
    Zap,
    Radio,
    BookOpen,
    ChevronRight,
    Sparkles,
    TrendingUp,
    Users,
    GraduationCap,
    Factory,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* ============================================
                HERO SECTION - Full Width with Background
               ============================================ */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/mainpicture.png"
                        alt="Cayson Electric"
                        className="h-full w-full object-cover"
                    />
                </div>
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-40" />

                <div className="container mx-auto px-6 md:px-12 relative z-10 text-center pt-20 animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm mb-8">
                        <Building2 className="w-4 h-4 text-blue-300" />
                        <span className="text-blue-100 text-sm font-medium tracking-wide">About Cayson Electric</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                        <span className="gradient-text">회사소개</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                        대한민국 전기 엔지니어링의 미래를 선도하는 기업,{" "}
                        <strong className="text-white font-semibold">Cayson Electric</strong>입니다.
                        <br className="hidden md:block" />
                        현장 중심의 실무 교육과 전문 엔지니어링 솔루션으로 산업의 혁신을 이끌어갑니다.
                    </p>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
                        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                            <div className="w-1 h-3 rounded-full bg-white/60 animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                VISION & MISSION SECTION
               ============================================ */}
            <section className="py-24 md:py-32 bg-white relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-40" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16 animate-fade-in">
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Vision & Mission</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight section-divider section-divider-center">
                            비전과 미션
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
                        {/* Vision Column */}
                        <div className="animate-fade-in">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/20">
                                    <Target className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Our Vision</h3>
                            </div>
                            <div className="pl-0 md:pl-[4.5rem]">
                                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                    4차 산업혁명 시대, 전기 기술은 모든 산업의 핵심입니다.
                                    Cayson Electric은 <strong className="text-slate-900">스마트 팩토리 자동화</strong>,{" "}
                                    <strong className="text-slate-900">전력계통 안전</strong>,{" "}
                                    <strong className="text-slate-900">신재생에너지</strong> 분야에서
                                    대한민국을 대표하는 전기 엔지니어링 교육 및 컨설팅 기업이 되고자 합니다.
                                </p>
                                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                    단순한 이론 전달이 아닌, 현장에서 즉시 적용 가능한 실무 역량을 갖춘
                                    차세대 전기 엔지니어를 양성하여 대한민국 전기 산업의 기술 경쟁력을 높이는 것이
                                    우리의 비전입니다.
                                </p>
                                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                                    <p className="text-blue-800 font-semibold text-lg italic leading-relaxed">
                                        &ldquo;현장의 언어로 기술을 전하고, 실무의 힘으로 미래를 설계합니다.&rdquo;
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mission Column */}
                        <div className="animate-fade-in delay-200">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-600/20">
                                    <Sparkles className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Our Mission</h3>
                            </div>
                            <div className="pl-0 md:pl-[4.5rem]">
                                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                    우리의 미션은 명확합니다. 대한민국 전기 기술 인력의 실무 역량을
                                    세계 수준으로 끌어올리는 것입니다. 이를 위해 세 가지 핵심 과제를 수행합니다.
                                </p>

                                <div className="space-y-5">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <GraduationCap className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 mb-1">실무 중심 기술 교육</p>
                                            <p className="text-sm text-slate-600">KEC 규정 해석, PLC 프로그래밍, 전력계통 해석 등 현장에서 바로 적용 가능한 커리큘럼 운영</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Factory className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 mb-1">산업 현장 맞춤 솔루션</p>
                                            <p className="text-sm text-slate-600">스마트 팩토리, 전력 설비, 접지/피뢰 시스템 등 현장 최적화 엔지니어링 컨설팅 제공</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <BookOpen className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 mb-1">기술 지식 보급</p>
                                            <p className="text-sm text-slate-600">20년 현장 노하우를 담은 전문 기술 서적 출판 및 온/오프라인 교육 콘텐츠 개발</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                CORE VALUES SECTION - 4 Icon Cards
               ============================================ */}
            <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-100" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16 animate-fade-in">
                        <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Core Values</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                            핵심 가치
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
                        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
                            Cayson Electric이 추구하는 네 가지 핵심 가치는 모든 의사결정과 행동의 기준이 됩니다.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Value 1 - 전문성 */}
                        <div className="card-hover group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center animate-fade-in">
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-shadow">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">전문성</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    20년 이상의 현장 경험을 보유한 검증된 전문가 그룹.
                                    국가기술자격, 기술사 자격을 갖춘 최고 수준의 엔지니어링 역량을 자랑합니다.
                                </p>
                            </div>
                        </div>

                        {/* Value 2 - 혁신 */}
                        <div className="card-hover group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center animate-fade-in delay-100">
                            <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-600/30 group-hover:shadow-cyan-600/50 transition-shadow">
                                    <Lightbulb className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">혁신</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    최신 KEC 규정, IEC 국제 표준, 스마트 팩토리 트렌드를 선도합니다.
                                    끊임없이 변화하는 기술 환경에 발맞춰 혁신적 솔루션을 제시합니다.
                                </p>
                            </div>
                        </div>

                        {/* Value 3 - 실용성 */}
                        <div className="card-hover group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center animate-fade-in delay-200">
                            <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:shadow-emerald-600/50 transition-shadow">
                                    <Wrench className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">실용성</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    이론에 그치지 않는, 현장 문제 해결에 초점을 맞춘 실용주의.
                                    배운 즉시 적용 가능한 실무 중심의 기술을 전파합니다.
                                </p>
                            </div>
                        </div>

                        {/* Value 4 - 신뢰 */}
                        <div className="card-hover group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center animate-fade-in delay-300">
                            <div className="absolute inset-0 bg-gradient-to-b from-amber-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-600/30 group-hover:shadow-amber-600/50 transition-shadow">
                                    <Handshake className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">신뢰</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    고객과의 약속을 최우선으로 생각합니다. 투명한 커뮤니케이션과
                                    책임감 있는 기술 서비스로 오래 신뢰받는 파트너가 되겠습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                COMPANY HISTORY TIMELINE
               ============================================ */}
            <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-100 rounded-full blur-3xl opacity-40" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16 animate-fade-in">
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">History</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight section-divider section-divider-center">
                            회사 연혁
                        </h2>
                        <p className="mt-8 text-lg text-slate-600 max-w-2xl mx-auto">
                            Cayson Electric은 오랜 현장 경험을 바탕으로 한 걸음씩 성장해왔습니다.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Timeline Container */}
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-slate-200 md:-translate-x-0.5" />

                            {/* 2024 - Research Start */}
                            <div className="relative flex flex-col md:flex-row items-start mb-12 animate-fade-in">
                                <div className="hidden md:block md:w-1/2 md:pr-12 md:text-right">
                                    <div className="inline-block p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 card-hover">
                                        <h4 className="text-lg font-bold text-slate-900 mb-2">연구개발 시작</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            전기 실무 교육 커리큘럼 연구 및 개발 착수.
                                            KEC 규정 분석, PLC 교육 체계 설계, 전력계통 해석 교재 집필 시작.
                                            현장 엔지니어 대상 교육 니즈 조사 및 파일럿 프로그램 운영.
                                        </p>
                                    </div>
                                </div>
                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full ring-4 ring-blue-100 shadow-lg -translate-x-1/2 mt-8 z-10" />
                                {/* Year Badge */}
                                <div className="ml-16 md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-3 mb-4 md:mb-0">
                                    <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-600/30">
                                        2024
                                    </span>
                                </div>
                                <div className="ml-16 md:hidden p-5 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">연구개발 시작</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        전기 실무 교육 커리큘럼 연구 및 개발 착수.
                                        KEC 규정 분석, PLC 교육 체계 설계, 전력계통 해석 교재 집필 시작.
                                        현장 엔지니어 대상 교육 니즈 조사 및 파일럿 프로그램 운영.
                                    </p>
                                </div>
                                <div className="hidden md:block md:w-1/2 md:pl-12" />
                            </div>

                            {/* 2025 - Preparation */}
                            <div className="relative flex flex-col md:flex-row items-start mb-12 animate-fade-in delay-100">
                                <div className="hidden md:block md:w-1/2 md:pr-12" />
                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-cyan-500 rounded-full ring-4 ring-cyan-100 shadow-lg -translate-x-1/2 mt-8 z-10" />
                                {/* Year Badge */}
                                <div className="ml-16 md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-3 mb-4 md:mb-0">
                                    <span className="inline-block px-4 py-1.5 bg-cyan-500 text-white text-sm font-bold rounded-full shadow-lg shadow-cyan-500/30">
                                        2025
                                    </span>
                                </div>
                                <div className="ml-16 md:ml-0 md:w-1/2 md:pl-12">
                                    <div className="p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 card-hover">
                                        <h4 className="text-lg font-bold text-slate-900 mb-2">법인 설립 준비</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            법인 설립을 위한 조직 체계 구축 및 사업 계획 수립.
                                            교육센터 입지 선정 및 시설 설계 착수.
                                            전문 기술 서적 원고 완성 및 출판 준비. 교육 파트너십 체결 추진.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 2026 - Official Launch */}
                            <div className="relative flex flex-col md:flex-row items-start mb-12 animate-fade-in delay-200">
                                <div className="hidden md:block md:w-1/2 md:pr-12 md:text-right">
                                    <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg shadow-blue-200/30 border border-blue-200 card-hover">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-700 text-xs font-bold rounded-full mb-3">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                                            </span>
                                            현재
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-2">법인 설립 / 교육센터 개원</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            Cayson Electric 법인 정식 설립.
                                            교육센터 개원 및 KEC, PLC, 전력계통 실무 교육 과정 런칭.
                                            기술 도서 출판 및 온라인 교육 플랫폼 베타 서비스 시작.
                                        </p>
                                    </div>
                                </div>
                                {/* Timeline Dot - Highlighted */}
                                <div className="absolute left-8 md:left-1/2 w-5 h-5 bg-blue-600 rounded-full ring-4 ring-blue-200 shadow-lg shadow-blue-600/40 -translate-x-1/2 mt-7 z-10 animate-pulse-glow" />
                                {/* Year Badge */}
                                <div className="ml-16 md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-3 mb-4 md:mb-0">
                                    <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-600/30">
                                        2026
                                    </span>
                                </div>
                                <div className="ml-16 md:hidden p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg shadow-blue-200/30 border border-blue-200">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-700 text-xs font-bold rounded-full mb-3">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                                        </span>
                                        현재
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">법인 설립 / 교육센터 개원</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Cayson Electric 법인 정식 설립.
                                        교육센터 개원 및 KEC, PLC, 전력계통 실무 교육 과정 런칭.
                                        기술 도서 출판 및 온라인 교육 플랫폼 베타 서비스 시작.
                                    </p>
                                </div>
                                <div className="hidden md:block md:w-1/2 md:pl-12" />
                            </div>

                            {/* Future Plans */}
                            <div className="relative flex flex-col md:flex-row items-start animate-fade-in delay-300">
                                <div className="hidden md:block md:w-1/2 md:pr-12" />
                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-slate-300 rounded-full ring-4 ring-slate-100 -translate-x-1/2 mt-8 z-10 border-2 border-dashed border-slate-400" />
                                {/* Year Badge */}
                                <div className="ml-16 md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-3 mb-4 md:mb-0">
                                    <span className="inline-block px-4 py-1.5 bg-slate-200 text-slate-600 text-sm font-bold rounded-full">
                                        2027+
                                    </span>
                                </div>
                                <div className="ml-16 md:ml-0 md:w-1/2 md:pl-12">
                                    <div className="p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-dashed border-slate-200 card-hover">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-5 h-5 text-blue-600" />
                                            <h4 className="text-lg font-bold text-slate-900">미래 계획</h4>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            온라인 교육 플랫폼 정식 오픈. 전국 교육센터 확대 (수도권, 영남권).
                                            해외 기술 교류 프로그램 운영. AI 기반 전력계통 진단 솔루션 개발.
                                            전기 기술 분야 국제 인증 교육 기관으로 성장.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                TEAM / EXPERTISE SECTION
               ============================================ */}
            <section className="py-24 md:py-32 bg-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-3xl opacity-80" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16 animate-fade-in">
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Our Expertise</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight section-divider section-divider-center">
                            전문 분야
                        </h2>
                        <p className="mt-8 text-lg text-slate-600 max-w-2xl mx-auto">
                            수년간의 현장 경험과 전문 지식을 바탕으로 네 가지 핵심 분야에서 최고의 기술력을 제공합니다.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Specialty 1 - Industrial Automation */}
                        <div className="card-hover group bg-white rounded-2xl border border-slate-200 p-8 animate-fade-in relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                <Cpu className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">산업 자동화</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                LS, Mitsubishi, Siemens 등 멀티 벤더 PLC 프로그래밍.
                                HMI/SCADA 작화, 스마트 팩토리 데이터 수집 및 공정 최적화 솔루션.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">PLC</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">HMI</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">SCADA</span>
                            </div>
                        </div>

                        {/* Specialty 2 - Power System */}
                        <div className="card-hover group bg-white rounded-2xl border border-slate-200 p-8 animate-fade-in delay-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 group-hover:bg-cyan-100 transition-colors">
                                <Zap className="w-7 h-7 text-cyan-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">전력계통 해석</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                ETAP/SKM을 활용한 조류 계산, 고장 전류 분석.
                                보호계전기 정정 및 협조 시뮬레이션으로 계통 신뢰성 확보.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">ETAP</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">SKM</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">보호협조</span>
                            </div>
                        </div>

                        {/* Specialty 3 - Grounding & Lightning */}
                        <div className="card-hover group bg-white rounded-2xl border border-slate-200 p-8 animate-fade-in delay-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                                <Radio className="w-7 h-7 text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">접지 / 피뢰</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                KEC 및 IEC 62305 표준 공통/통합 접지 시스템 설계.
                                회전구체법 기반 외부 피뢰 시스템 및 SPD 최적 용량 산정.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">KEC</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">IEC 62305</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">SPD</span>
                            </div>
                        </div>

                        {/* Specialty 4 - Education & Publishing */}
                        <div className="card-hover group bg-white rounded-2xl border border-slate-200 p-8 animate-fade-in delay-300 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors">
                                <BookOpen className="w-7 h-7 text-amber-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">교육 / 출판</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                국가기술자격 취득 로드맵 및 NCS 기반 실무 교육.
                                20년 현장 노하우가 담긴 기술 서적 및 수험서 출판.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">NCS</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">기술사</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">수험서</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                LOCATION SECTION
               ============================================ */}
            <section className="py-24 md:py-32 bg-slate-50">
                <div className="container mx-auto px-6 md:px-12">
                    {/* Section Header */}
                    <div className="text-center mb-16 animate-fade-in">
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Location</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight section-divider section-divider-center">
                            오시는 길
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
                        {/* Address Info */}
                        <div className="lg:col-span-2 animate-fade-in">
                            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg shadow-slate-200/50">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-blue-600" />
                                    </div>
                                    Cayson Electric
                                </h3>

                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <MapPin className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 mb-1">주소</p>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                화성폴리텍 화성캠퍼스<br />
                                                제 1공학관 3층 스마트 전기과
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Phone className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 mb-1">전화</p>
                                            <p className="text-sm text-slate-600">02-1234-5678</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Mail className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 mb-1">이메일</p>
                                            <p className="text-sm text-slate-600">contact@caysonelectric.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 mb-1">운영시간</p>
                                            <p className="text-sm text-slate-600">
                                                평일 09:00 - 18:00<br />
                                                <span className="text-xs text-slate-400">토/일/공휴일 휴무</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        * 방문 상담은 사전 예약제로 운영됩니다.<br />
                                        * 전화 또는 이메일로 사전 예약 후 방문해주시기 바랍니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="lg:col-span-3 animate-fade-in delay-200">
                            <div className="relative w-full h-[400px] lg:h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl border border-slate-200 overflow-hidden shadow-lg shadow-slate-200/50">
                                {/* Decorative Map Styling */}
                                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                        <MapPin className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <p className="text-lg font-bold text-slate-700 mb-2">지도 API 연동 영역</p>
                                    <p className="text-sm text-slate-500 max-w-sm">
                                        화성폴리텍 화성캠퍼스 제 1공학관 3층 스마트 전기과
                                    </p>
                                    <div className="mt-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 text-xs text-slate-500">
                                        Kakao Map / Naver Map 연동 예정
                                    </div>
                                </div>
                                {/* Decorative dots to simulate map feel */}
                                <div className="absolute top-6 left-6 w-3 h-3 rounded-full bg-blue-300/30" />
                                <div className="absolute top-12 right-12 w-2 h-2 rounded-full bg-blue-400/20" />
                                <div className="absolute bottom-16 left-16 w-4 h-4 rounded-full bg-blue-200/30" />
                                <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-blue-300/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                CTA SECTION
               ============================================ */}
            <section className="relative py-24 md:py-32 bg-slate-900 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-grid-pattern" />
                <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-cyan-600/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-3xl mx-auto text-center animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm mb-8">
                            <Users className="w-4 h-4 text-blue-300" />
                            <span className="text-blue-100 text-sm font-medium">함께 성장하는 파트너</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
                            Cayson Electric과
                            <br />
                            <span className="gradient-text">함께 시작하세요</span>
                        </h2>

                        <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                            귀사의 전기 설비에 맞는 최적의 솔루션을 제안해 드립니다.
                            교육 과정 문의부터 엔지니어링 컨설팅까지, 전문가가 친절하게 안내해 드리겠습니다.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button asChild size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base font-bold shadow-lg shadow-blue-900/30 transition-all hover:translate-y-[-2px]">
                                <Link href="/contact">
                                    무료 상담 신청하기
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-14 px-8 bg-transparent hover:bg-white/10 text-white border-2 border-white/20 rounded-xl text-base font-bold backdrop-blur-sm transition-all hover:border-white/40">
                                <Link href="/education">
                                    교육과정 살펴보기
                                    <ChevronRight className="w-5 h-5 ml-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
