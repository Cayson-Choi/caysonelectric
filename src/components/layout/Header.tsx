"use client";

import Link from 'next/link';
import { Menu, X, ChevronDown, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';

const navigation = [
    { name: '회사소개', href: '/about' },
    {
        name: '서비스', href: '#', children: [
            { name: 'PLC / 산업자동화', href: '/services/automation' },
            { name: '전력계통 해석', href: '/services/power' },
            { name: '접지 / 피뢰', href: '/services/grounding' },
            { name: '기술 도서', href: '/services/publishing' },
        ]
    },
    { name: '기술교육', href: '/education' },
    { name: '교육신청', href: '/schedule' },
    { name: '자료실', href: '/resources' },
    { name: '문의하기', href: '/contact' },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [serviceDropdown, setServiceDropdown] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const supabase = createClient();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Re-fetch user when pathname changes (e.g., after login redirect)
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [pathname]);

    useEffect(() => {
        setMobileMenuOpen(false);
        setServiceDropdown(false);
        setUserMenuOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setUserMenuOpen(false);
        router.push('/');
        router.refresh();
    };

    const isHomePage = pathname === '/';
    const headerBg = scrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-900/5 border-b border-slate-100'
        : isHomePage
            ? 'bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-transparent backdrop-blur-sm'
            : 'bg-white/95 backdrop-blur-xl border-b border-slate-100';

    const textColor = scrolled || !isHomePage ? 'text-slate-700' : 'text-white drop-shadow-md';
    const logoColor = scrolled || !isHomePage ? 'text-slate-900' : 'text-white';
    const hoverColor = 'hover:text-blue-600';

    return (
        <>
            <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerBg}`}>
                <nav className="flex items-center justify-between px-6 lg:px-12 h-20" aria-label="Global">
                    {/* Logo */}
                    <div className="flex lg:flex-1">
                        <Link href="/" className="flex items-center gap-1 group">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-shadow">
                                    <span className="text-white font-black text-lg">C</span>
                                </div>
                            </div>
                            <span className={`text-xl font-bold tracking-tight ml-2 transition-colors ${logoColor} drop-shadow-md`}>
                                Cayson <span className="text-blue-500 drop-shadow-none">Electric</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:gap-x-1">
                        {navigation.map((item) => (
                            item.children ? (
                                <div key={item.name} className="relative group"
                                    onMouseEnter={() => setServiceDropdown(true)}
                                    onMouseLeave={() => setServiceDropdown(false)}
                                >
                                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${textColor} ${hoverColor} hover:bg-blue-50/80`}>
                                        {item.name}
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${serviceDropdown ? 'rotate-180' : ''}`} />
                                    </button>
                                    {serviceDropdown && (
                                        <div className="absolute top-full left-0 pt-2 w-56">
                                            <div className="bg-slate-50/95 backdrop-blur-md rounded-xl shadow-2xl shadow-slate-300/60 border border-slate-200/80 py-2 animate-slide-down">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="block px-4 py-2.5 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-100/60 transition-colors font-medium"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${textColor} ${hoverColor} hover:bg-blue-50/80 ${pathname === item.href ? 'text-blue-600 bg-blue-50/60' : ''
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
                        {user && (
                            <Link
                                href="/mypage"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${textColor} ${hoverColor} hover:bg-blue-50/80 ${pathname === '/mypage' ? 'text-blue-600 bg-blue-50/60' : ''
                                    }`}
                            >
                                나의 페이지
                            </Link>
                        )}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100/80 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                        {user.user_metadata?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className={`text-sm font-medium ${scrolled || !isHomePage ? 'text-slate-700' : 'text-white/90'}`}>
                                        {user.user_metadata?.username || user.email?.split('@')[0]}
                                    </span>
                                    <ChevronDown className={`w-3.5 h-3.5 ${textColor} transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {userMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 z-50 animate-slide-down">
                                            <div className="px-4 py-3 border-b border-slate-100">
                                                <p className="text-sm font-medium text-slate-900 truncate">{user.email}</p>
                                            </div>
                                            <Link href="/mypage" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
                                                <User className="w-4 h-4" /> 마이페이지
                                            </Link>
                                            {user.email === 'admin@cayson.kr' && (
                                                <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
                                                    <LayoutDashboard className="w-4 h-4" /> 관리자 대시보드
                                                </Link>
                                            )}
                                            <div className="border-t border-slate-100 mt-1 pt-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/50 w-full transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" /> 로그아웃
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${textColor} ${hoverColor}`}
                                >
                                    로그인
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5"
                                >
                                    회원가입
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className={`p-2 rounded-lg transition-colors ${scrolled || !isHomePage ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

                    <div className="fixed inset-y-0 right-0 z-[101] w-full sm:max-w-sm bg-white shadow-2xl animate-fade-in-right overflow-y-auto">
                        {/* Mobile Header */}
                        <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                                    <span className="text-white font-black text-base">C</span>
                                </div>
                                <span className="text-lg font-bold text-slate-900">
                                    Cayson <span className="text-blue-600">Electric</span>
                                </span>
                            </Link>
                            <button
                                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Mobile User Info */}
                        {user && (
                            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                                        {user.user_metadata?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{user.user_metadata?.username || '회원'}</p>
                                        <p className="text-xs text-slate-500">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mobile Navigation */}
                        <div className="px-4 py-4 space-y-1">
                            {user && (
                                <Link
                                    href="/mypage"
                                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === '/mypage'
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    나의 페이지
                                </Link>
                            )}
                            {navigation.map((item) => (
                                item.children ? (
                                    <div key={item.name}>
                                        <p className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{item.name}</p>
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className="block px-3 py-2.5 pl-6 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === item.href
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                                            }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            ))}
                        </div>

                        {/* Mobile Footer Actions */}
                        <div className="px-4 py-4 border-t border-slate-100 mt-auto">
                            {user ? (
                                <div className="space-y-1">
                                    <Link
                                        href="/mypage"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <User className="w-4 h-4" /> 마이페이지
                                    </Link>
                                    {user.email === 'admin@cayson.kr' && (
                                        <Link
                                            href="/admin"
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <LayoutDashboard className="w-4 h-4" /> 관리자 대시보드
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" /> 로그아웃
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Link
                                        href="/login"
                                        className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        로그인
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        회원가입
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
