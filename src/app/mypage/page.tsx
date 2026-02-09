import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, MessageSquare, Package, Settings } from 'lucide-react';
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

    // Fetch Course Applications
    // Note: Assuming 'applications' table has 'email' column to link to user
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

    return (
        <div className="min-h-screen bg-slate-50 py-20">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-1 w-full">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                                {user.email?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">{user.user_metadata?.full_name || '회원님'}</h1>
                                <p className="text-slate-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 border-t pt-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{applications?.length || 0}</div>
                                <div className="text-sm text-slate-500">수강신청</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{bookOrders?.length || 0}</div>
                                <div className="text-sm text-slate-500">도서주문</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{inquiries?.length || 0}</div>
                                <div className="text-sm text-slate-500">문의내역</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="courses" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-xl shadow-sm border border-slate-100 h-auto">
                        <TabsTrigger value="courses" className="py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-lg">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            수강 신청 내역
                        </TabsTrigger>
                        <TabsTrigger value="books" className="py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-lg">
                            <BookOpen className="w-4 h-4 mr-2" />
                            도서 주문 내역
                        </TabsTrigger>
                        <TabsTrigger value="inquiries" className="py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-lg">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            나의 문의 내역
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-lg">
                            <Settings className="w-4 h-4 mr-2" />
                            설정
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="courses" className="mt-8 space-y-4">
                        {applications && applications.length > 0 ? (
                            applications.map((app) => (
                                <div key={app.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${app.status === 'paid' ? 'bg-green-100 text-green-700' :
                                                app.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {app.status === 'paid' ? '결제완료' : app.status === 'cancelled' ? '취소됨' : '입금대기'}
                                            </span>
                                            <span className="text-slate-400 text-sm">{new Date(app.submitted_at).toLocaleDateString()} 신청</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            {app.course_sessions?.courses?.title || '과정명 정보 없음'}
                                        </h3>
                                        <p className="text-slate-500 text-sm mt-1">
                                            {app.course_sessions?.time_info} | {app.course_sessions?.location}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-slate-900">{app.amount?.toLocaleString()}원</div>
                                        {app.depositor_name && <div className="text-sm text-slate-500">입금자명: {app.depositor_name}</div>}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                                <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-900">수강 신청 내역이 없습니다.</h3>
                                <p className="text-slate-500 mb-6">전문적인 전기 기술 교육을 받아보세요.</p>
                                <Button asChild>
                                    <Link href="/schedule">교육 과정 보러가기</Link>
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="books" className="mt-8 space-y-4">
                        {bookOrders && bookOrders.length > 0 ? (
                            bookOrders.map((order) => (
                                <div key={order.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {order.status === 'delivered' ? '배송완료' : order.status === 'cancelled' ? '취소됨' : '주문접수'}
                                            </span>
                                            <span className="text-slate-400 text-sm">{new Date(order.order_date).toLocaleDateString()} 주문</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">{order.book_title}</h3>
                                        <p className="text-slate-500 text-sm mt-1">
                                            수령인: {order.recipient_name} | {order.address}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-slate-900">{order.total_price?.toLocaleString()}원</div>
                                        <div className="text-sm text-slate-500">{order.quantity}권</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-900">도서 주문 내역이 없습니다.</h3>
                                <p className="text-slate-500 mb-6">최고의 기술 서적을 만나보세요.</p>
                                <Button asChild>
                                    <Link href="/services/publishing">도서 목록 보러가기</Link>
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="inquiries" className="mt-8 space-y-4">
                        {inquiries && inquiries.length > 0 ? (
                            inquiries.map((inquiry) => (
                                <div key={inquiry.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${inquiry.status === 'closed' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {inquiry.status === 'closed' ? '답변완료' : '검토중'}
                                            </span>
                                            <span className="text-slate-400 text-sm">{new Date(inquiry.submitted_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg text-slate-700 text-sm whitespace-pre-wrap">
                                        {inquiry.message}
                                    </div>
                                    <div className="mt-2 text-right text-xs text-slate-400">
                                        연락처: {inquiry.phone}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-900">문의 내역이 없습니다.</h3>
                                <p className="text-slate-500 mb-6">궁금한 점이 있으시면 언제든 문의해주세요.</p>
                                <Button asChild>
                                    <Link href="/contact">문의하기</Link>
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="settings" className="mt-8 space-y-4">
                        <ProfileSettings userEmail={user.email} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
