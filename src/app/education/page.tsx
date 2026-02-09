import Link from "next/link";
import { BookOpen, Award, PenTool, CheckCircle, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EducationPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-900 to-slate-900" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Technical Education
                    </h1>
                    <p className="text-xl text-orange-200">
                        현장 중심의 실무 교육 & 국가기술자격증 완벽 대비
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">최고의 강사진, 최적의 커리큘럼</h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Cayson Electric의 교육 과정은 이론 위주의 주입식 교육을 탈피하고,
                        <span className="font-bold text-slate-900"> 실제 산업 현장에서 겪게 될 문제 해결 능력</span>을 배양하는 데 초점을 맞춥니다.
                        국가기술자격증 취득부터 전문가 레벨의 실무 기술까지, 단계별 로드맵을 제시합니다.
                    </p>
                </div>
            </section>

            {/* Course Categories - Two Columns */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Certification Courses */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <Award className="w-8 h-8 text-orange-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">자격증 과정</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">전기기능사 (Electrician)</h3>
                                    <p className="text-slate-600 text-sm mb-4">전기 입문자를 위한 필수 자격증. 기초 이론 및 시퀀스 제어 실습.</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">필기/실기</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">기초반</span>
                                    </div>
                                </div>

                                <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">전기산업기사 / 전기기사</h3>
                                    <p className="text-slate-600 text-sm mb-4">전기 설비 관리 및 설계 전문가 양성. 회로이론, 전력공학 등 심층 이론.</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">국가기술자격</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">핵심요약</span>
                                    </div>
                                </div>

                                <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">전기기능장 (Master Electrician)</h3>
                                    <p className="text-slate-600 text-sm mb-4">최상위 숙련 기능인 양성. PLC 제어 및 배관 배선 고급 기술.</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">마스터</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">실기특강</span>
                                    </div>
                                </div>

                                <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">건축전기설비기술사 (Professional Engineer)</h3>
                                    <p className="text-slate-600 text-sm mb-4">건축물의 전기 설비 시스템 계획, 설계, 감리 능력 배양.</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">기술사</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">논술형</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Practical Courses */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <PenTool className="w-8 h-8 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">실무 전문 과정</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">PLC 제어 실습</h3>
                                    <p className="text-slate-600 text-sm mb-4">LS, Mitsubishi, Siemens PLC 프로그래밍 기초부터 응용까지.</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">자동화</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">프로그래밍</span>
                                    </div>
                                </div>

                                <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">전력계통 실무</h3>
                                    <p className="text-slate-600 text-sm mb-4">수배전반 운용, 고장 계산, 보호계전기 정정 실무.</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">계통해석</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">ETAP</span>
                                    </div>
                                </div>

                                <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">접지 / 피뢰 시스템 설계</h3>
                                    <p className="text-slate-600 text-sm mb-4">KEC 규정에 따른 통합 접지 및 피뢰 설비 설계 실습.</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">안전</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">설계</span>
                                    </div>
                                </div>

                                <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">KEC 실무 (한국전기설비규정)</h3>
                                    <p className="text-slate-600 text-sm mb-4">변경된 규정의 이해와 검사 기준, 현장 적용 사례 분석.</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">규정</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">법규</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Schedule / Apply CTA */}
            <section className="bg-slate-900 py-20 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-6">교육신청</h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                        현재 모집 중인 교육 과정을 확인하고 신청하세요.<br />
                        선착순 마감되오니 서두르시기 바랍니다.
                    </p>
                    <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 h-14">
                        <Link href="/schedule">교육 신청하기</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
