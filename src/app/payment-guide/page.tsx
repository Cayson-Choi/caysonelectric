"use client";

import { useState } from "react";
import Link from "next/link";
import {
    CreditCard,
    Copy,
    Check,
    AlertCircle,
    Phone,
    ArrowRight,
    FileText,
    HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentGuidePage() {
    const [copied, setCopied] = useState(false);

    const bankInfo = {
        bankName: "기업은행",
        accountNumber: "480-123456-01-011",
        accountHolder: "(주)케이슨일렉트릭"
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`${bankInfo.bankName} ${bankInfo.accountNumber}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Header Section */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-6 py-12 md:py-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-6">
                        <CreditCard className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        교육비 입금 안내
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        수강 신청이 정상적으로 접수되었습니다.<br />
                        아래 계좌로 교육비를 입금해주시면 최종 등록이 완료됩니다.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Bank Account Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 h-full flex flex-col items-center text-center">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-blue-600" />
                                입금 계좌 정보
                            </h2>

                            <div className="w-full bg-slate-50 rounded-xl p-6 mb-6 border border-slate-100">
                                <p className="text-sm text-slate-500 mb-1">은행명</p>
                                <p className="text-lg font-semibold text-slate-900 mb-4">{bankInfo.bankName}</p>

                                <p className="text-sm text-slate-500 mb-1">예금주</p>
                                <p className="text-lg font-semibold text-slate-900 mb-4">{bankInfo.accountHolder}</p>

                                <p className="text-sm text-slate-500 mb-1">계좌번호</p>
                                <p className="text-2xl font-bold text-blue-600 tracking-tight">{bankInfo.accountNumber}</p>
                            </div>

                            <Button
                                onClick={handleCopy}
                                className={`w-full h-12 text-base font-medium transition-all duration-300 ${copied
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-slate-900 hover:bg-slate-800 text-white"
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        복사 완료
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 mr-2" />
                                        계좌번호 복사하기
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Guidelines */}
                        <div className="space-y-6">
                            {/* Notice 1 */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-orange-500" />
                                    입금 시 유의사항
                                </h3>
                                <ul className="space-y-3 text-slate-600 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                        <span>입금자명은 반드시 <strong>수강생 본인 이름</strong> 또는 <strong>신청 시 기재한 입금자명</strong>과 일치해야 합니다.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                        <span>법인 명의로 입금하실 경우, 사전에 담당자에게 연락 부탁드립니다.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                        <span>입금 확인은 평일 기준 <strong>오전 10시, 오후 3시</strong>에 일괄 진행됩니다.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Tax Invoice */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-500" />
                                    계산서 발행 안내
                                </h3>
                                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                                    세금계산서 또는 현금영수증 발행이 필요하신 경우,
                                    사업자등록증 사본을 아래 메일로 보내주세요.
                                </p>
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span>📧 tax@cayson.kr</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-100 text-center">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
                            <HelpCircle className="w-5 h-5 text-blue-600" />
                            입금 관련 문의
                        </h3>
                        <p className="text-slate-600 mb-6">
                            입금 확인이 지연되거나 문의사항이 있으시면 언제든지 연락주세요.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="tel:02-1234-5678"
                                className="inline-flex items-center px-6 py-3 bg-white border border-blue-200 rounded-xl text-blue-700 font-medium hover:bg-blue-50 transition-colors shadow-sm"
                            >
                                <Phone className="w-4 h-4 mr-2" />
                                02-1234-5678
                            </a>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
                            >
                                온라인 문의하기
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
