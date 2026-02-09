import Link from "next/link";
import { BookOpen, Library, Book, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublishingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-slate-900" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Technical Publishing
                    </h1>
                    <p className="text-xl text-indigo-200">
                        전기 실무 기술 서적 / 자격증 수험서 / 전문 교재
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            현장 전문가가 집필한 살아있는 지식
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Cayson Electric의 출판 사업부는 20년 이상의 현장 경험을 바탕으로, 이론과 실무의 간극을 메우는
                            실전 기술 서적을 출판합니다. 초보 엔지니어부터 전문가까지, 전기인들의 필독서를 만나보세요.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Book Item 1 */}
                        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <div className="w-32 h-44 bg-slate-200 mb-4 rounded shadow-inner flex items-center justify-center text-slate-400">
                                <Book className="w-12 h-12" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">PLC 제어 실무</h3>
                            <p className="text-sm text-slate-500 mb-4">기초부터 응용까지 완전 정복</p>
                            <Button variant="outline" size="sm" className="w-full mt-auto">상세보기</Button>
                        </div>

                        {/* Book Item 2 */}
                        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <div className="w-32 h-44 bg-slate-200 mb-4 rounded shadow-inner flex items-center justify-center text-slate-400">
                                <Book className="w-12 h-12" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">KEC 핸드북</h3>
                            <p className="text-sm text-slate-500 mb-4">현장 적용을 위한 규정 해설</p>
                            <Button variant="outline" size="sm" className="w-full mt-auto">상세보기</Button>
                        </div>

                        {/* Book Item 3 */}
                        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <div className="w-32 h-44 bg-slate-200 mb-4 rounded shadow-inner flex items-center justify-center text-slate-400">
                                <Book className="w-12 h-12" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">수배전반 설계</h3>
                            <p className="text-sm text-slate-500 mb-4">단선 결선도 작성 및 계산</p>
                            <Button variant="outline" size="sm" className="w-full mt-auto">상세보기</Button>
                        </div>

                        {/* Book Item 4 */}
                        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <div className="w-32 h-44 bg-slate-200 mb-4 rounded shadow-inner flex items-center justify-center text-slate-400">
                                <Book className="w-12 h-12" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">시퀀스 회로 이해</h3>
                            <p className="text-sm text-slate-500 mb-4">자동제어 입문자를 위한 가이드</p>
                            <Button variant="outline" size="sm" className="w-full mt-auto">상세보기</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-100 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">대량 구매 및 교재 채택</h2>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                        대학, 직업학교, 기업체 교육용 교재 대량 구매 시 특별 할인을 제공합니다.
                    </p>
                    <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                        <Link href="/contact">견적 문의하기 <ShoppingCart className="ml-2 w-4 h-4" /></Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
