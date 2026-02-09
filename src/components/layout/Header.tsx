"use client";

import Link from 'next/link';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
    { name: '회사소개', href: '/about' },
    { name: '기술교육', href: '/education' },
    { name: '교육신청', href: '/schedule' },
    { name: '도서구입', href: '/services/publishing' },
    { name: '자료실', href: '/resources' },
    { name: '문의하기', href: '/contact' },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();
    const router = useRouter();

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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push('/');
        router.refresh();
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold tracking-tight text-slate-900">
                        Cayson <span className="text-blue-600">Electric</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-500 hidden xl:inline-block">
                                {user.user_metadata?.full_name || user.email?.split('@')[0]}님
                            </span>
                            <Link href="/mypage" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600">
                                마이페이지
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-semibold leading-6 text-red-600 hover:text-red-700"
                            >
                                로그아웃
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                            로그인 <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )}
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-50" />
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>
                                Cayson <span className="text-blue-600">Electric</span>
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {user ? (
                                        <>
                                            <div className="mb-4 px-3 text-sm text-gray-500">
                                                {user.email}님 환영합니다.
                                            </div>
                                            <Link
                                                href="/mypage"
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                마이페이지
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setMobileMenuOpen(false);
                                                }}
                                                className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-600 hover:bg-gray-50"
                                            >
                                                로그아웃
                                            </button>
                                        </>
                                    ) : (
                                        <Link
                                            href="/login"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            로그인
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
