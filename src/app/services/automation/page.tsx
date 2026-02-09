import Link from "next/link";
import { Cpu, Settings, Monitor, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AutomationPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 opacity-30">
                    {/* Use a relevant background image if available, else a pattern */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Industrial Automation
                    </h1>
                    <p className="text-xl text-blue-200">
                        PLC / SCADA / HMI / Smart Factory Solutions
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            스마트 팩토리의 핵심, 자동화 제어 기술
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Cayson Electric은 다양한 제조 현장의 공정 특성을 분석하여 최적의 자동화 시스템을 설계 및 구축합니다.
                            LS산전, 쓰무비시, 지멘스 등 다양한 PLC 기종에 대한 프로그래밍 기술을 보유하고 있으며,
                            생산 효율성을 극대화하는 스마트 팩토리 솔루션을 제공합니다.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                            <Cpu className="w-10 h-10 text-blue-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">PLC Programming</h3>
                            <p className="text-slate-600">
                                복잡한 시퀀스 제어 로직 설계 및 최적화. LS(XGK/XGI), Mitsubishi(Melcsac), Siemens(S7) 등 전 기종 대응 가능/
                            </p>
                        </div>
                        <div className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                            <Monitor className="w-10 h-10 text-blue-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">HMI / SCADA</h3>
                            <p className="text-slate-600">
                                직관적인 작화 및 시스템 감시 제어 시스템 구축. 실시간 데이터 모니터링 및 알람 관리 시스템.
                            </p>
                        </div>
                        <div className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                            <Settings className="w-10 h-10 text-blue-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">System Integration</h3>
                            <p className="text-slate-600">
                                서보 모터, 인버터 제어 및 각종 센서/액추에이터 연동. 기존 설비의 리뉴얼 및 성능 개선 컨설팅.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-100 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">자동화 시스템 구축 문의</h2>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                        귀사의 생산 라인에 맞는 최적의 자동화 솔루션을 제안해 드립니다. 지금 바로 전문가와 상담하세요.
                    </p>
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/contact">문의하기 <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
