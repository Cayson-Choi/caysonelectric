import { Building2, Target, Award, MapPin } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 opacity-20">
                    {/* Abstract background pattern or image */}
                    <div className="absolute inset-0 bg-[url('/mainpicture.png')] bg-cover bg-center" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        About <span className="text-blue-500">Cayson Electric</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                        전기 기술의 미래를 선도하는 기업, 케이슨 일렉트릭입니다.<br />
                        현장 중심의 실무 교육과 전문 엔지니어링 솔루션을 제공합니다.
                    </p>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Target className="w-8 h-8 text-blue-600" />
                                Our Vision
                            </h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-8">
                                우리는 4차 산업혁명 시대에 발맞춰 <strong>스마트 팩토리 자동화</strong>와 <strong>전력계통 안전</strong> 분야에서 최고의 기술력을 자랑합니다. 단순히 이론에 그치지 않는, 현장에서 즉시 적용 가능한 실무 중심의 기술을 전파하여 대한민국 전기 엔지니어들의 기술 향상에 기여하고자 합니다.
                            </p>

                            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Award className="w-8 h-8 text-blue-600" />
                                Core Values
                            </h2>
                            <ul className="space-y-4 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2.5" />
                                    <span><strong>Professionalism:</strong> 검증된 전문가 그룹의 기술력</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2.5" />
                                    <span><strong>Innovation:</strong> 최신 기술 규정(KEC) 및 자동화 트렌드 선도</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2.5" />
                                    <span><strong>Practicality:</strong> 현장 문제 해결에 초점을 맞춘 실용주의</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
                            {/* Placeholder for an office or team image */}
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
                                <Building2 className="w-24 h-24 opacity-20" />
                            </div>
                            {/* If you have an image, replace the div above with an <img /> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* History (Simplified) */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">History</h2>
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="flex gap-6">
                            <div className="w-24 text-right font-bold text-blue-600 text-xl pt-1">2026</div>
                            <div className="flex-1 border-l-2 border-slate-200 pl-8 pb-8 relative">
                                <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                                <h3 className="text-lg font-bold text-slate-900">법인 설립 및 교육센터 개원</h3>
                                <p className="text-slate-600 mt-2">Cayson Electric 정식 출범, 전기 실무 교육 과정(KEC, PLC) 런칭</p>
                            </div>
                        </div>
                        {/* Additional history items can be added here */}
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center justify-center gap-3">
                        <MapPin className="w-8 h-8 text-blue-600" />
                        Location
                    </h2>
                    <p className="text-lg text-slate-700 mb-12">
                        화성폴리텍 화성캠퍼스 제 1공학관 3층 스마트 전기과<br />
                        (방문 상담은 사전 예약제로 운영됩니다)
                    </p>
                    <div className="w-full h-[400px] bg-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                        {/* Map Integration Placeholder */}
                        지도 API 연동 영역
                    </div>
                </div>
            </section>
        </div>
    );
}
