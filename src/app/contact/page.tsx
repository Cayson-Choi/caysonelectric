"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, Search, Trash2, Edit, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Form Schema
const formSchema = z.object({
    name: z.string().min(2, "이름을 입력해주세요."),
    phone: z.string().min(10, "연락처를 정확히 입력해주세요."),
    email: z.string().email("올바른 이메일 주소를 입력해주세요."),
    password: z.string().min(4, "비밀번호는 4자리 이상이어야 합니다."), // Added password
    message: z.string().min(10, "문의 내용을 10자 이상 작성해주세요."),
});

// Search Schema
const searchSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export default function ContactPage() {
    const [activeTab, setActiveTab] = useState<'write' | 'manage'>('write');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [myInquiries, setMyInquiries] = useState<any[]>([]);
    const [searchError, setSearchError] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const searchForm = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
    });

    const supabase = createClient();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('leads')
                .insert([
                    {
                        contact_name: values.name,
                        phone: values.phone,
                        email: values.email,
                        message: values.message,
                        password: values.password, // Saving password (plain text for simplicity in this demo, usually should be hashed)
                        topic: 'General Inquiry',
                        status: 'new'
                    }
                ]);

            if (error) throw error;

            setSubmitSuccess(true);
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('문의 접수 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSearch = async (values: z.infer<typeof searchSchema>) => {
        setSearchError("");
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('email', values.email)
            .eq('password', values.password); // Simple matching

        if (error) {
            console.error(error);
            setSearchError("조회 중 오류가 발생했습니다.");
            return;
        }

        if (!data || data.length === 0) {
            setSearchError("일치하는 문의 내역이 없습니다.");
            setMyInquiries([]);
        } else {
            setMyInquiries(data);
        }
    };

    const onDelete = async (id: number) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        const { error } = await supabase.from('leads').delete().eq('id', id);
        if (error) {
            alert("삭제 실패");
        } else {
            alert("삭제되었습니다.");
            setMyInquiries(prev => prev.filter(item => item.id !== id));
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative h-[40vh] bg-slate-900 flex items-center justify-center overflow-hidden">
                {/* Dot pattern overlay */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        문의하기
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        궁금하신 점이 있으시면 언제든 문의해주세요. 빠르고 정확하게 답변 드리겠습니다.
                    </p>
                </div>
            </section>

            {/* Contact Info + Form Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-5 gap-8">

                        {/* LEFT: Contact Info (2 cols) */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100/50 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold text-slate-900 mb-8">연락처 정보</h2>

                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-blue-50/50">
                                            <MapPin className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">주소</p>
                                            <p className="text-slate-700 font-medium leading-relaxed">화성폴리텍 화성캠퍼스 제 1공학관 3층 스마트 전기과</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-emerald-50/50">
                                            <Phone className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">전화번호</p>
                                            <p className="text-slate-700 font-medium">02-1234-5678</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-violet-50 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-violet-50/50">
                                            <Mail className="w-5 h-5 text-violet-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">이메일</p>
                                            <p className="text-slate-700 font-medium">contact@caysonelectric.com</p>
                                        </div>
                                    </div>

                                    {/* Business Hours */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-amber-50/50">
                                            <Clock className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">영업 시간</p>
                                            <p className="text-slate-700 font-medium">평일 09:00 - 18:00</p>
                                            <p className="text-slate-500 text-sm">점심시간 12:00 - 13:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100/50">
                                <div className="h-48 bg-slate-200 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300" />
                                    <div className="relative z-10 text-center">
                                        <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500 font-medium">지도 위치</p>
                                        <p className="text-xs text-slate-400 mt-1">화성폴리텍 화성캠퍼스</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Form Area (3 cols) */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
                                {/* Tab Switcher - Pill Style */}
                                <div className="flex bg-slate-100 rounded-xl p-1.5 mb-8">
                                    <button
                                        className={`flex-1 py-3 px-6 rounded-lg text-sm font-bold transition-all duration-200 ${
                                            activeTab === 'write'
                                                ? 'bg-white text-blue-600 shadow-sm'
                                                : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                        onClick={() => setActiveTab('write')}
                                    >
                                        문의하기
                                    </button>
                                    <button
                                        className={`flex-1 py-3 px-6 rounded-lg text-sm font-bold transition-all duration-200 ${
                                            activeTab === 'manage'
                                                ? 'bg-white text-blue-600 shadow-sm'
                                                : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                        onClick={() => setActiveTab('manage')}
                                    >
                                        내 문의 관리
                                    </button>
                                </div>

                                {activeTab === 'write' ? (
                                    /* Write Form */
                                    submitSuccess ? (
                                        <div className="text-center py-16">
                                            {/* Checkmark animation */}
                                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200 animate-bounce">
                                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-3">문의가 접수되었습니다!</h3>
                                            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                                                담당자가 확인 후 빠른 시일 내에 답변 드리겠습니다.
                                            </p>
                                            <Button
                                                onClick={() => setSubmitSuccess(false)}
                                                variant="outline"
                                                className="rounded-xl px-8 py-3 border-2 hover:bg-slate-50"
                                            >
                                                추가 문의하기
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                            <div className="grid md:grid-cols-2 gap-5">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-slate-700">
                                                        이름 <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        {...form.register("name")}
                                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-slate-50/50 hover:bg-white hover:border-slate-300"
                                                        placeholder="홍길동"
                                                    />
                                                    {form.formState.errors.name && (
                                                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-slate-700">
                                                        연락처 <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        {...form.register("phone")}
                                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-slate-50/50 hover:bg-white hover:border-slate-300"
                                                        placeholder="010-0000-0000"
                                                    />
                                                    {form.formState.errors.phone && (
                                                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">
                                                    이메일 <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    {...form.register("email")}
                                                    type="email"
                                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-slate-50/50 hover:bg-white hover:border-slate-300"
                                                    placeholder="example@email.com"
                                                />
                                                {form.formState.errors.email && (
                                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">
                                                    비밀번호 (수정/삭제용) <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    {...form.register("password")}
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-slate-50/50 hover:bg-white hover:border-slate-300"
                                                    placeholder="4자리 이상 입력"
                                                />
                                                {form.formState.errors.password && (
                                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">
                                                    문의 내용 <span className="text-red-500">*</span>
                                                </label>
                                                <textarea
                                                    {...form.register("message")}
                                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl h-36 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-slate-50/50 hover:bg-white hover:border-slate-300"
                                                    placeholder="문의하실 내용을 자세히 적어주세요."
                                                />
                                                {form.formState.errors.message && (
                                                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.message.message}</p>
                                                )}
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-bold text-base shadow-lg shadow-blue-200 transition-all duration-200 hover:shadow-xl hover:shadow-blue-300"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                        </svg>
                                                        접수 중...
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <Send className="w-5 h-5" />
                                                        문의하기
                                                    </span>
                                                )}
                                            </Button>
                                        </form>
                                    )
                                ) : (
                                    /* Manage Form */
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 p-5 rounded-xl border border-slate-100">
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                작성 시 입력한 <span className="font-semibold text-slate-800">이메일</span>과 <span className="font-semibold text-slate-800">비밀번호</span>로 기존 문의 내역을 조회하고 삭제할 수 있습니다.
                                            </p>
                                        </div>

                                        <form onSubmit={searchForm.handleSubmit(onSearch)} className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                    <input
                                                        {...searchForm.register("email")}
                                                        type="email"
                                                        placeholder="이메일"
                                                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-slate-50/50 hover:bg-white hover:border-slate-300"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                    <input
                                                        {...searchForm.register("password")}
                                                        type="password"
                                                        placeholder="비밀번호"
                                                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-slate-50/50 hover:bg-white hover:border-slate-300"
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                type="submit"
                                                variant="secondary"
                                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold transition-all duration-200"
                                            >
                                                <Search className="w-4 h-4" /> 내 문의 조회
                                            </Button>
                                        </form>

                                        {searchError && (
                                            <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                                                <p className="text-red-600 text-sm font-medium">{searchError}</p>
                                            </div>
                                        )}

                                        {myInquiries.length > 0 && (
                                            <div className="space-y-4 mt-2 pt-6 border-t border-slate-100">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-bold text-slate-900 text-lg">조회된 문의 내역</h3>
                                                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                                                        {myInquiries.length}건
                                                    </span>
                                                </div>
                                                {myInquiries.map((inquiry) => (
                                                    <div
                                                        key={inquiry.id}
                                                        className="p-5 border border-slate-100 rounded-xl bg-gradient-to-r from-white to-slate-50/50 hover:shadow-md transition-all duration-200 group"
                                                    >
                                                        <div className="flex justify-between items-center mb-3">
                                                            <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${
                                                                inquiry.status === 'new'
                                                                    ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                                                                    : inquiry.status === 'resolved'
                                                                    ? 'bg-green-50 text-green-700 ring-1 ring-green-200'
                                                                    : 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                                                            }`}>
                                                                {inquiry.status === 'new' ? '접수대기' : inquiry.status === 'resolved' ? '답변완료' : inquiry.status || '접수대기'}
                                                            </span>
                                                            <span className="text-xs text-slate-400 font-medium">
                                                                {new Date(inquiry.created_at).toLocaleDateString('ko-KR', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                })}
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-700 text-sm mb-4 whitespace-pre-wrap leading-relaxed">
                                                            {inquiry.message}
                                                        </p>
                                                        <div className="flex justify-end">
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() => onDelete(inquiry.id)}
                                                                className="h-9 rounded-lg px-4 text-xs font-bold bg-red-500 hover:bg-red-600 transition-colors"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5 mr-1.5" /> 삭제
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
