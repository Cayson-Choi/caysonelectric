import Link from 'next/link';

const footerNavigation = {
    solutions: [
        { name: 'PLC & 자동화', href: '/services/automation' },
        { name: '전력계통 해석', href: '/services/power' },
        { name: '피뢰/접지', href: '/services/grounding' },
        { name: 'KEC 컨설팅', href: '/services/kec' },
    ],
    support: [
        { name: '공지사항', href: '/notices' },
        { name: '자료실', href: '/resources' },
        { name: '자주 묻는 질문', href: '/faq' },
        { name: '문의하기', href: '/contact' },
    ],
    company: [
        { name: '회사소개', href: '/about' },
        { name: '강사진', href: '/about/instructors' },
        { name: '오시는 길', href: '/about/location' },
    ],
    legal: [
        { name: '이용약관', href: '/terms' },
        { name: '개인정보처리방침', href: '/privacy' },
        { name: '환불규정', href: '/refund' },
    ],
};

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="text-2xl font-bold text-white">
                            Cayson<span className="text-blue-500">Electric</span>
                        </Link>
                        <p className="text-sm leading-6">
                            전기 기술의 미래를 선도하는 전문 교육 및 컨설팅 기업.<br />
                            현장 중심의 실무 교육과 최신 기술 규정(KEC) 해석을 제공합니다.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">서비스</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {footerNavigation.solutions.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">고객지원</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {footerNavigation.support.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">회사</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {footerNavigation.company.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">약관 및 정책</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {footerNavigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-400">
                        &copy; {new Date().getFullYear()} Cayson Electric. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
