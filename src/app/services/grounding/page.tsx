import Link from "next/link";
import { Radio, CloudLightning, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GroundingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-slate-900" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Grounding & Lightning
                    </h1>
                    <p className="text-xl text-green-200">
                        접지 설계 / 피뢰 시스템 / KEC 적합성 평가
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            KEC 규정에 완벽 대응하는 접지 솔루션
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            한국전기설비규정(KEC) 도입으로 접지 및 피뢰 시스템 설계가 더욱 중요해졌습니다.
                            통합 접지 시스템 구성부터 서지 보호 장치(SPD) 선정까지, 최신 규정에 맞춘 안전한 환경을 설계합니다.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                            <Radio className="w-10 h-10 text-green-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">통합 접지 시스템</h3>
                            <p className="text-slate-600">
                                공통 접지 및 통합 접지 시스템 설계. 등전위 본딩을 통한 전위차 해소 및 감전 사고 예방.
                            </p>
                        </div>
                        <div className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                            <CloudLightning className="w-10 h-10 text-green-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">피뢰 설비 (Lightning Protection)</h3>
                            <p className="text-slate-600">
                                회전구체법 등을 적용한 피뢰 보호 범위 산정 (IEC 62305). 외부 피뢰 및 내부 피뢰 시스템 구축.
                            </p>
                        </div>
                        <div className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                            <Shield className="w-10 h-10 text-green-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">SPD (서지보호기)</h3>
                            <p className="text-slate-600">
                                낙뢰 및 개폐 서지로부터 주요 전자 장비를 보호하기 위한 최적의 SPD 용량 선정 및 설치 자문.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-100 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">접지/피뢰 설계 문의</h2>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                        KEC 규정에 적합한 안전한 설계를 도와드립니다.
                    </p>
                    <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                        <Link href="/contact">문의하기 <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
