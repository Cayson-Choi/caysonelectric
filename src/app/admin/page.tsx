import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    Users,
    GraduationCap,
    BookOpen,
    MessageSquare,
    FileText,
    TrendingUp,
    Calendar,
    Settings,
    BarChart3,
    ArrowUpRight,
    Clock,
    CheckCircle,
    AlertCircle,
    Eye,
    Package,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function AdminPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch real data from Supabase
    const { data: applications, error: appError } = await supabase
        .from('applications')
        .select('*')
        .order('submitted_at', { ascending: false })
        .limit(10)

    const { data: leads, error: leadError } = await supabase
        .from('leads')
        .select('*')
        .order('submitted_at', { ascending: false })
        .limit(10)

    const { data: bookOrders } = await supabase
        .from('book_orders')
        .select('*')
        .order('order_date', { ascending: false })
        .limit(10)

    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

    const { data: courses } = await supabase.from('courses').select('*')

    const { data: sessions } = await supabase.from('course_sessions').select('*')

    const today = new Date()
    const formattedDate = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    })

    const formatDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return '-'
        const d = new Date(dateStr)
        return d.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
    }

    const getApplicationStatusBadge = (status: string | null | undefined) => {
        switch (status) {
            case 'paid':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        <CheckCircle className="h-3 w-3" />
                        결제완료
                    </span>
                )
            case 'cancelled':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                        <AlertCircle className="h-3 w-3" />
                        취소
                    </span>
                )
            case 'pending':
            default:
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        <Clock className="h-3 w-3" />
                        대기중
                    </span>
                )
        }
    }

    const getLeadStatusBadge = (status: string | null | undefined) => {
        switch (status) {
            case 'in_progress':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        <Clock className="h-3 w-3" />
                        처리중
                    </span>
                )
            case 'closed':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        <CheckCircle className="h-3 w-3" />
                        완료
                    </span>
                )
            case 'new':
            default:
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                        <AlertCircle className="h-3 w-3" />
                        신규
                    </span>
                )
        }
    }

    const getOrderStatusBadge = (status: string | null | undefined) => {
        switch (status) {
            case 'shipped':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                        <Package className="h-3 w-3" />
                        배송중
                    </span>
                )
            case 'delivered':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        <CheckCircle className="h-3 w-3" />
                        배송완료
                    </span>
                )
            case 'pending':
            default:
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        <Clock className="h-3 w-3" />
                        준비중
                    </span>
                )
        }
    }

    const statsCards = [
        {
            label: '수강신청',
            count: applications?.length || 0,
            icon: GraduationCap,
            gradient: 'from-blue-500 to-blue-600',
            bgLight: 'bg-blue-50',
            textColor: 'text-blue-600',
            trend: '+12%',
        },
        {
            label: '문의접수',
            count: leads?.length || 0,
            icon: MessageSquare,
            gradient: 'from-orange-500 to-orange-600',
            bgLight: 'bg-orange-50',
            textColor: 'text-orange-600',
            trend: '+8%',
        },
        {
            label: '도서주문',
            count: bookOrders?.length || 0,
            icon: BookOpen,
            gradient: 'from-emerald-500 to-emerald-600',
            bgLight: 'bg-emerald-50',
            textColor: 'text-emerald-600',
            trend: '+5%',
        },
        {
            label: '자료실 게시글',
            count: posts?.length || 0,
            icon: FileText,
            gradient: 'from-purple-500 to-purple-600',
            bgLight: 'bg-purple-50',
            textColor: 'text-purple-600',
            trend: '+3%',
        },
    ]

    const quickMenuItems = [
        {
            label: '교육과정 관리',
            href: '/admin',
            icon: GraduationCap,
            description: '과정 및 세션 관리',
        },
        {
            label: '자료실 관리',
            href: '/resources',
            icon: FileText,
            description: '게시글 작성 및 관리',
        },
        {
            label: '문의 관리',
            href: '/contact',
            icon: MessageSquare,
            description: '고객 문의 확인 및 답변',
        },
        {
            label: '사이트 설정',
            href: '/admin',
            icon: Settings,
            description: '사이트 기본 설정',
        },
    ]

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                    <BarChart3 className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                                        관리자 대시보드
                                    </h1>
                                </div>
                            </div>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                                Admin
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-slate-500 hidden sm:block">
                                <Calendar className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />
                                {formattedDate}
                            </div>
                            <Link href="/">
                                <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1.5" />
                                    사이트 보기
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {statsCards.map((card) => {
                        const Icon = card.icon
                        return (
                            <div
                                key={card.label}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 mb-1">
                                            {card.label}
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 tracking-tight">
                                            {card.count}
                                        </p>
                                    </div>
                                    <div
                                        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-sm`}
                                    >
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center gap-1.5">
                                    <TrendingUp className={`h-3.5 w-3.5 ${card.textColor}`} />
                                    <span className={`text-xs font-semibold ${card.textColor}`}>
                                        {card.trend}
                                    </span>
                                    <span className="text-xs text-slate-400">지난달 대비</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Tables */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Recent Applications Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <GraduationCap className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        최근 수강 신청
                                    </h2>
                                    {applications && applications.length > 0 && (
                                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                            {applications.length}건
                                        </span>
                                    )}
                                </div>
                                <Link
                                    href="/admin"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                                >
                                    전체보기
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                            {applications && applications.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-slate-50/80">
                                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                                    신청자
                                                </th>
                                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                                    이메일
                                                </th>
                                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                                    상태
                                                </th>
                                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                                    신청일
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {applications.map((app: any, idx: number) => (
                                                <tr
                                                    key={app.id || idx}
                                                    className="hover:bg-slate-50/50 transition-colors"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                                                                <Users className="h-4 w-4 text-slate-500" />
                                                            </div>
                                                            <span className="text-sm font-medium text-slate-900">
                                                                {app.name || app.user_name || '이름 없음'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">
                                                        {app.email || app.user_email || '-'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {getApplicationStatusBadge(app.status)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">
                                                        {formatDate(app.submitted_at || app.created_at)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="px-6 py-16 text-center">
                                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                                        <GraduationCap className="h-6 w-6 text-slate-400" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-500">
                                        수강 신청 내역이 없습니다
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        새로운 수강 신청이 접수되면 여기에 표시됩니다
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Recent Leads Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center">
                                        <MessageSquare className="h-4 w-4 text-orange-600" />
                                    </div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        최근 문의
                                    </h2>
                                    {leads && leads.length > 0 && (
                                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                            {leads.length}건
                                        </span>
                                    )}
                                </div>
                                <Link
                                    href="/contact"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                                >
                                    전체보기
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                            {leads && leads.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-slate-50/80">
                                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                                    이름
                                                </th>
                                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                                    이메일
                                                </th>
                                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                                    내용
                                                </th>
                                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                                    상태
                                                </th>
                                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                                    접수일
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {leads.map((lead: any, idx: number) => (
                                                <tr
                                                    key={lead.id || idx}
                                                    className="hover:bg-slate-50/50 transition-colors"
                                                >
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-medium text-slate-900">
                                                            {lead.name || '이름 없음'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">
                                                        {lead.email || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 max-w-[200px]">
                                                        <p className="truncate">
                                                            {lead.message || lead.content || '-'}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {getLeadStatusBadge(lead.status)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">
                                                        {formatDate(lead.submitted_at || lead.created_at)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="px-6 py-16 text-center">
                                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                                        <MessageSquare className="h-6 w-6 text-slate-400" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-500">
                                        접수된 문의가 없습니다
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        새로운 문의가 접수되면 여기에 표시됩니다
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Menu */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-100">
                                <h2 className="text-base font-semibold text-slate-900">빠른 메뉴</h2>
                            </div>
                            <div className="p-3">
                                {quickMenuItems.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
                                        >
                                            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors flex-shrink-0">
                                                <Icon className="h-5 w-5 text-slate-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900">
                                                    {item.label}
                                                </p>
                                                <p className="text-xs text-slate-400 truncate">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors flex-shrink-0" />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Recent Book Orders */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                        <BookOpen className="h-4 w-4 text-emerald-600" />
                                    </div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        최근 도서 주문
                                    </h2>
                                </div>
                            </div>
                            {bookOrders && bookOrders.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {bookOrders.slice(0, 5).map((order: any, idx: number) => (
                                        <div
                                            key={order.id || idx}
                                            className="px-6 py-4 flex items-center justify-between gap-3"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-slate-900 truncate">
                                                    {order.book_title || order.title || '도서명 없음'}
                                                </p>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    수량: {order.quantity || 1}권
                                                </p>
                                            </div>
                                            {getOrderStatusBadge(order.status)}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-12 text-center">
                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2">
                                        <BookOpen className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-500">
                                        도서 주문 내역이 없습니다
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        새로운 주문이 들어오면 여기에 표시됩니다
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* System Info */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                        <Settings className="h-4 w-4 text-slate-600" />
                                    </div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        시스템 정보
                                    </h2>
                                </div>
                            </div>
                            <div className="px-6 py-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">서버 상태</span>
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                        정상
                                    </span>
                                </div>
                                <div className="border-t border-slate-100" />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">마지막 배포</span>
                                    <span className="text-sm font-medium text-slate-700">
                                        {formatDate(today.toISOString())}
                                    </span>
                                </div>
                                <div className="border-t border-slate-100" />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">Next.js 버전</span>
                                    <span className="text-sm font-medium text-slate-700">16.1.6</span>
                                </div>
                                <div className="border-t border-slate-100" />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">교육과정</span>
                                    <span className="text-sm font-medium text-slate-700">
                                        {courses?.length || 0}개
                                    </span>
                                </div>
                                <div className="border-t border-slate-100" />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">교육 세션</span>
                                    <span className="text-sm font-medium text-slate-700">
                                        {sessions?.length || 0}개
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
