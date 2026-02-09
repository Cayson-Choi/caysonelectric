import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-slate-950 py-12 md:py-16" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-8">
                    {/* Logo */}
                    <Link href="/" className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                        Cayson <span className="text-blue-500">Electric</span>
                    </Link>

                    {/* Tagline / Description */}
                    <p className="text-center text-slate-400 max-w-md leading-relaxed">
                        전기 기술의 미래를 선도하는 전문 교육 및 컨설팅 기업.<br />
                        KEC 규정 해석부터 현장 실무 교육까지, 최고의 솔루션을 약속드립니다.
                    </p>

                    {/* Divider */}
                    <div className="w-16 h-1 bg-blue-900/50 rounded-full" />

                    {/* Copyright */}
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Cayson Electric. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
