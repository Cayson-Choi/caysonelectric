import Link from "next/link";
import { Zap, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PowerPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-900 to-blue-900" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Power System Analysis
                    </h1>
                    <p className="text-xl text-cyan-200">
                        전력계통 해석 및 보호협조 / 아크플래시 진단
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            안전하고 효율적인 전력 시스템 구축
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            전력 계통의 안정성은 기업의 생산성과 직결됩니다. Cayson Electric은 ETAP 등 전문 해석 프로그램을 활용하여
                            전력 조류 계산, 단락 용량 계산, 보호 계전기 정정 등정밀한 전력 계통 분석 서비스를 제공합니다.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                            <Zap className="w-10 h-10 text-cyan-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">전력 조류 및 단락 해석</h3>
                            <p className="text-slate-600">
                                부하 흐름 분석을 통한 설비 용량 적정성 검토 및 고장 전류 계산.
                            </p>
                        </div>
                        <div className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                            <ShieldCheck className="w-10 h-10 text-cyan-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">보호 협조 (Protection Coordination)</h3>
                            <p className="text-slate-600">
                                상위/하위 계전기 간의 동작 시간 협조를 통해 정전 범위를 최소화하고 사고 확산 방지.
                            </p>
                        </div>
                        <div className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                            <Activity className="w-10 h-10 text-cyan-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">아크 플래시 (Arc Flash) 분석</h3>
                            <p className="text-slate-600">
                                전기 사고 시 발생하는 아크 에너지를 분석하여 작업자의 안전 거리 및 보호구 등급 산정.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-100 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">전력 계통 진단 문의</h2>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                        정밀한 분석을 통해 귀사의 전력 설비 안정성을 확보해 드립니다.
                    </p>
                    <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                        <Link href="/contact">문의하기 <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
