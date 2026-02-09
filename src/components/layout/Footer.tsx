import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

const quickLinks = [
    { name: '회사소개', href: '/about' },
    { name: '기술교육', href: '/education' },
    { name: '교육신청', href: '/schedule' },
    { name: '자료실', href: '/resources' },
    { name: '문의하기', href: '/contact' },
];

const serviceLinks = [
    { name: 'PLC / 산업자동화', href: '/services/automation' },
    { name: '전력계통 해석', href: '/services/power' },
    { name: '접지 / 피뢰', href: '/services/grounding' },
    { name: '기술 도서', href: '/services/publishing' },
];

export function Footer() {
    return (
        <footer className="relative bg-slate-950 overflow-hidden" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            {/* CTA Banner */}
            <div className="relative border-b border-white/5">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">프로젝트를 시작할 준비가 되셨나요?</h3>
                            <p className="text-slate-400 text-sm">전문 엔지니어가 최적의 솔루션을 제안해 드립니다.</p>
                        </div>
                        <Link
                            href="/contact"
                            className="group flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5"
                        >
                            무료 상담 신청
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                                <span className="text-white font-black text-base">C</span>
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                Cayson <span className="text-blue-400">Electric</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            전기 기술의 미래를 선도하는 전문 교육 및 컨설팅 기업.
                            KEC 규정 해석부터 현장 실무 교육까지, 최고의 솔루션을 제공합니다.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">바로가기</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">서비스</h3>
                        <ul className="space-y-3">
                            {serviceLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">연락처</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-400">화성폴리텍 화성캠퍼스<br />제 1공학관 3층 스마트 전기과</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <span className="text-sm text-slate-400">02-1234-5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <span className="text-sm text-slate-400">contact@caysonelectric.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <span className="text-sm text-slate-400">평일 09:00 - 18:00</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Cayson Electric. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/about" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
                            개인정보처리방침
                        </Link>
                        <Link href="/about" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
                            이용약관
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
