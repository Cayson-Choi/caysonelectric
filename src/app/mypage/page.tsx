import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, MessageSquare, Package, Settings, User, Calendar, Clock, MapPin, CreditCard, ArrowRight, FileText, Bell } from 'lucide-react';
import Link from 'next/link';
import { ProfileSettings } from '@/components/auth/ProfileSettings';

export default async function MyPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch user profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // Fetch Course Applications
    const { data: applications } = await supabase
        .from('applications')
        .select(`
            *,
            course_sessions (
                *,
                courses (
                    title
                )
            )
        `)
        .eq('email', user.email)
        .order('submitted_at', { ascending: false });

    // Fetch Book Orders
    const { data: bookOrders } = await supabase
        .from('book_orders')
        .select('*')
        .eq('email', user.email)
        .order('order_date', { ascending: false });

    // Fetch Inquiries
    const { data: inquiries } = await supabase
        .from('leads')
        .select('*')
        .eq('email', user.email)
        .order('submitted_at', { ascending: false });

    const memberSince = user.created_at
        ? new Date(user.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';

    const userInitial = user.email?.charAt(0).toUpperCase() || 'U';
    const userName = user.user_metadata?.full_name || '회원님';

    return (
        <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

                {/* ── Profile Header Section ── */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-10">
                    {/* Gradient Banner */}
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl relative">
                        {/* Decorative pattern overlay */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 right-8 w-24 h-24 border-2 border-white rounded-full" />
                            <div className="absolute top-12 right-28 w-16 h-16 border-2 border-white rounded-full" />
                            <div className="absolute bottom-4 left-12 w-20 h-20 border border-white rounded-full" />
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="px-6 sm:px-8 pb-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
                            {/* Avatar */}
                            <div className="-mt-12 relative z-10">
                                <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-3xl ring-4 ring-white shadow-lg">
                                    {userInitial}
                                </div>
                            </div>

                            {/* Name & Email */}
                            <div className="text-center sm:text-left pb-1 flex-1">
                                <h1 className="text-2xl font-bold text-slate-900">{userName}</h1>
                                <p className="text-slate-500 text-sm">{user.email}</p>
                                {memberSince && (
                                    <p className="text-slate-400 text-xs mt-1 flex items-center justify-center sm:justify-start gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {memberSince} 가입
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
                            <div className="bg-blue-50/70 rounded-xl p-4 text-center transition-all hover:bg-blue-50">
                                <div className="text-2xl font-bold text-blue-700">{applications?.length || 0}</div>
                                <div className="text-xs sm:text-sm text-blue-600/70 font-medium mt-0.5">수강신청</div>
                            </div>
                            <div className="bg-emerald-50/70 rounded-xl p-4 text-center transition-all hover:bg-emerald-50">
                                <div className="text-2xl font-bold text-emerald-700">{bookOrders?.length || 0}</div>
                                <div className="text-xs sm:text-sm text-emerald-600/70 font-medium mt-0.5">도서주문</div>
                            </div>
                            <div className="bg-violet-50/70 rounded-xl p-4 text-center transition-all hover:bg-violet-50">
                                <div className="text-2xl font-bold text-violet-700">{inquiries?.length || 0}</div>
                                <div className="text-xs sm:text-sm text-violet-600/70 font-medium mt-0.5">문의내역</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Tabs Section ── */}
                <Tabs defaultValue="courses" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 h-auto mb-8">
                        <TabsTrigger
                            value="courses"
                            className="py-3 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-slate-700 data-[state=inactive]:hover:bg-slate-50"
                        >
                            <GraduationCap className="w-4 h-4 mr-1.5 shrink-0" />
                            <span className="hidden sm:inline">수강 신청 내역</span>
                            <span className="sm:hidden">수강</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="books"
                            className="py-3 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-slate-700 data-[state=inactive]:hover:bg-slate-50"
                        >
                            <BookOpen className="w-4 h-4 mr-1.5 shrink-0" />
                            <span className="hidden sm:inline">도서 주문 내역</span>
                            <span className="sm:hidden">도서</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="inquiries"
                            className="py-3 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-slate-700 data-[state=inactive]:hover:bg-slate-50"
                        >
                            <MessageSquare className="w-4 h-4 mr-1.5 shrink-0" />
                            <span className="hidden sm:inline">나의 문의 내역</span>
                            <span className="sm:hidden">문의</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="py-3 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-slate-700 data-[state=inactive]:hover:bg-slate-50"
                        >
                            <Settings className="w-4 h-4 mr-1.5 shrink-0" />
                            <span className="hidden sm:inline">설정</span>
                            <span className="sm:hidden">설정</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* ── Courses Tab ── */}
                    <TabsContent value="courses" className="space-y-4 mt-0">
                        {applications && applications.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-lg font-semibold text-slate-800">수강 신청 내역</h2>
                                    <span className="text-sm text-slate-400">총 {applications.length}건</span>
                                </div>
                                {applications.map((app) => (
                                    <div
                                        key={app.id}
                                        className={`bg-white rounded-xl shadow-sm border border-slate-100 p-5 sm:p-6 transition-all hover:shadow-md hover:-translate-y-0.5 border-l-4 ${
                                            app.status === 'paid'
                                                ? 'border-l-emerald-500'
                                                : app.status === 'cancelled'
                                                ? 'border-l-red-400'
                                                : 'border-l-amber-400'
                                        }`}
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                            app.status === 'paid'
                                                                ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 ring-1 ring-emerald-200'
                                                                : app.status === 'cancelled'
                                                                ? 'bg-red-50 text-red-600 ring-1 ring-red-200'
                                                                : 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 ring-1 ring-amber-200'
                                                        }`}
                                                    >
                                                        {app.status === 'paid'
                                                            ? '결제완료'
                                                            : app.status === 'cancelled'
                                                            ? '취소됨'
                                                            : '입금대기'}
                                                    </span>
                                                    <span className="text-slate-400 text-xs flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(app.submitted_at).toLocaleDateString('ko-KR')} 신청
                                                    </span>
                                                </div>

                                                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 truncate">
                                                    {app.course_sessions?.courses?.title || '과정명 정보 없음'}
                                                </h3>

                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                                                    {app.course_sessions?.time_info && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                            {app.course_sessions.time_info}
                                                        </span>
                                                    )}
                                                    {app.course_sessions?.location && (
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                            {app.course_sessions.location}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="text-left md:text-right shrink-0">
                                                <div className="flex items-center gap-1.5 text-lg font-bold text-slate-900">
                                                    <CreditCard className="w-4 h-4 text-slate-400 hidden md:block" />
                                                    {app.amount?.toLocaleString()}원
                                                </div>
                                                {app.depositor_name && (
                                                    <div className="text-xs text-slate-400 mt-0.5">
                                                        입금자명: {app.depositor_name}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                    <GraduationCap className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">수강 신청 내역이 없습니다</h3>
                                <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                                    전문적인 전기 기술 교육으로 역량을 키워보세요. 다양한 과정이 준비되어 있습니다.
                                </p>
                                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2.5 shadow-sm">
                                    <Link href="/schedule" className="inline-flex items-center gap-2">
                                        교육 과정 보러가기
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    {/* ── Books Tab ── */}
                    <TabsContent value="books" className="space-y-4 mt-0">
                        {bookOrders && bookOrders.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-lg font-semibold text-slate-800">도서 주문 내역</h2>
                                    <span className="text-sm text-slate-400">총 {bookOrders.length}건</span>
                                </div>
                                {bookOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className={`bg-white rounded-xl shadow-sm border border-slate-100 p-5 sm:p-6 transition-all hover:shadow-md hover:-translate-y-0.5 border-l-4 ${
                                            order.status === 'delivered'
                                                ? 'border-l-emerald-500'
                                                : order.status === 'cancelled'
                                                ? 'border-l-red-400'
                                                : 'border-l-blue-400'
                                        }`}
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex items-start gap-4 flex-1 min-w-0">
                                                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center shrink-0">
                                                    <BookOpen className="w-5 h-5 text-slate-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                                order.status === 'delivered'
                                                                    ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 ring-1 ring-emerald-200'
                                                                    : order.status === 'cancelled'
                                                                    ? 'bg-red-50 text-red-600 ring-1 ring-red-200'
                                                                    : 'bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 ring-1 ring-blue-200'
                                                            }`}
                                                        >
                                                            <Package className="w-3 h-3 mr-1" />
                                                            {order.status === 'delivered'
                                                                ? '배송완료'
                                                                : order.status === 'cancelled'
                                                                ? '취소됨'
                                                                : '주문접수'}
                                                        </span>
                                                        <span className="text-slate-400 text-xs flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {new Date(order.order_date).toLocaleDateString('ko-KR')} 주문
                                                        </span>
                                                    </div>

                                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 truncate">
                                                        {order.book_title}
                                                    </h3>

                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                                                        <span className="flex items-center gap-1">
                                                            <User className="w-3.5 h-3.5 text-slate-400" />
                                                            수령인: {order.recipient_name}
                                                        </span>
                                                        {order.address && (
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                                {order.address}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-left md:text-right shrink-0 pl-14 md:pl-0">
                                                <div className="text-lg font-bold text-slate-900">
                                                    {order.total_price?.toLocaleString()}원
                                                </div>
                                                <div className="text-xs text-slate-400 mt-0.5">
                                                    {order.quantity}권
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                    <BookOpen className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">도서 주문 내역이 없습니다</h3>
                                <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                                    전기 분야 최고의 기술 서적을 만나보세요. 실무에 바로 활용할 수 있는 도서를 제공합니다.
                                </p>
                                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6 py-2.5 shadow-sm">
                                    <Link href="/services/publishing" className="inline-flex items-center gap-2">
                                        도서 목록 보러가기
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    {/* ── Inquiries Tab ── */}
                    <TabsContent value="inquiries" className="space-y-4 mt-0">
                        {inquiries && inquiries.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-lg font-semibold text-slate-800">나의 문의 내역</h2>
                                    <span className="text-sm text-slate-400">총 {inquiries.length}건</span>
                                </div>
                                {inquiries.map((inquiry) => (
                                    <div
                                        key={inquiry.id}
                                        className={`bg-white rounded-xl shadow-sm border border-slate-100 p-5 sm:p-6 transition-all hover:shadow-md hover:-translate-y-0.5 border-l-4 ${
                                            inquiry.status === 'closed'
                                                ? 'border-l-slate-300'
                                                : 'border-l-blue-400'
                                        }`}
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                        inquiry.status === 'closed'
                                                            ? 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
                                                            : 'bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 ring-1 ring-blue-200'
                                                    }`}
                                                >
                                                    <Bell className="w-3 h-3 mr-1" />
                                                    {inquiry.status === 'closed' ? '답변완료' : '검토중'}
                                                </span>
                                                <span className="text-slate-400 text-xs flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(inquiry.submitted_at).toLocaleDateString('ko-KR')}
                                                </span>
                                            </div>
                                            {inquiry.phone && (
                                                <span className="text-xs text-slate-400">
                                                    연락처: {inquiry.phone}
                                                </span>
                                            )}
                                        </div>

                                        <div className="bg-slate-50 p-4 rounded-lg text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                                            {inquiry.message && inquiry.message.length > 200
                                                ? inquiry.message.substring(0, 200) + '...'
                                                : inquiry.message}
                                        </div>

                                        {inquiry.company && (
                                            <div className="mt-3 text-xs text-slate-400 flex items-center gap-1">
                                                <FileText className="w-3 h-3" />
                                                {inquiry.company}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                    <MessageSquare className="w-8 h-8 text-violet-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">문의 내역이 없습니다</h3>
                                <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                                    궁금한 점이 있으시면 언제든 문의해주세요. 빠르고 친절하게 답변드리겠습니다.
                                </p>
                                <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 py-2.5 shadow-sm">
                                    <Link href="/contact" className="inline-flex items-center gap-2">
                                        문의하기
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    {/* ── Settings Tab ── */}
                    <TabsContent value="settings" className="mt-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                                    <Settings className="w-5 h-5 text-slate-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">계정 설정</h2>
                                    <p className="text-sm text-slate-400">비밀번호 변경 및 계정 관리</p>
                                </div>
                            </div>
                            <ProfileSettings user={user} profile={profile} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
