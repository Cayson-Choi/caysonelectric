"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, Search, Trash2, Edit } from "lucide-react";
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
            {/* Hero */}
            <section className="bg-slate-900 py-20 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-slate-400">
                        궁금하신 점이 있으시면 언제든 문의해주세요.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">Contact Info</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">Address</h3>
                                        <p className="text-slate-600">화성폴리텍 화성캠퍼스 제 1공학관 3층 스마트 전기과</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                                        <p className="text-slate-600">02-1234-5678</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                                        <p className="text-slate-600">contact@caysonelectric.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">Business Hours</h3>
                                        <p className="text-slate-600">평일 09:00 - 18:00 (점심시간 12:00 - 13:00)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Inquiry Section with Tabs */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex mb-8 border-b">
                                <button
                                    className={`pb-4 px-4 font-bold ${activeTab === 'write' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
                                    onClick={() => setActiveTab('write')}
                                >
                                    문의하기
                                </button>
                                <button
                                    className={`pb-4 px-4 font-bold ${activeTab === 'manage' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
                                    onClick={() => setActiveTab('manage')}
                                >
                                    내 문의 관리
                                </button>
                            </div>

                            {activeTab === 'write' ? (
                                /* Write Form */
                                submitSuccess ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">문의가 접수되었습니다!</h3>
                                        <p className="text-slate-600 mb-6">담당자가 확인 후 빠른 시일 내에 답변 드리겠습니다.</p>
                                        <Button onClick={() => setSubmitSuccess(false)} variant="outline">
                                            추가 문의하기
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">이름</label>
                                                <input
                                                    {...form.register("name")}
                                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                    placeholder="홍길동"
                                                />
                                                {form.formState.errors.name && <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">연락처</label>
                                                <input
                                                    {...form.register("phone")}
                                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                    placeholder="010-0000-0000"
                                                />
                                                {form.formState.errors.phone && <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">이메일</label>
                                            <input
                                                {...form.register("email")}
                                                type="email"
                                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder="example@email.com"
                                            />
                                            {form.formState.errors.email && <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">비밀번호 (수정/삭제용)</label>
                                            <input
                                                {...form.register("password")}
                                                type="password"
                                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder="4자리 이상 입력"
                                            />
                                            {form.formState.errors.password && <p className="text-red-500 text-xs">{form.formState.errors.password.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">문의 내용</label>
                                            <textarea
                                                {...form.register("message")}
                                                className="w-full px-4 py-2 border rounded-md h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder="문의하실 내용을 자세히 적어주세요."
                                            />
                                            {form.formState.errors.message && <p className="text-red-500 text-xs">{form.formState.errors.message.message}</p>}
                                        </div>

                                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                                            {isSubmitting ? "접수 중..." : "문의하기"}
                                        </Button>
                                    </form>
                                )
                            ) : (
                                /* Manage Form */
                                <div className="space-y-6">
                                    <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded">
                                        작성 시 입력한 이메일과 비밀번호로 기존 문의 내역을 조회하고 삭제할 수 있습니다.
                                    </p>
                                    <form onSubmit={searchForm.handleSubmit(onSearch)} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input
                                                {...searchForm.register("email")}
                                                type="email"
                                                placeholder="이메일"
                                                className="px-4 py-2 border rounded-md w-full"
                                            />
                                            <input
                                                {...searchForm.register("password")}
                                                type="password"
                                                placeholder="비밀번호"
                                                className="px-4 py-2 border rounded-md w-full"
                                            />
                                        </div>
                                        <Button type="submit" variant="secondary" className="w-full flex items-center gap-2">
                                            <Search className="w-4 h-4" /> 내 문의 조회
                                        </Button>
                                    </form>

                                    {searchError && <p className="text-red-500 text-center text-sm">{searchError}</p>}

                                    {myInquiries.length > 0 && (
                                        <div className="space-y-4 mt-6 border-t pt-6">
                                            <h3 className="font-bold text-slate-900">조회된 문의 내역</h3>
                                            {myInquiries.map((inquiry) => (
                                                <div key={inquiry.id} className="p-4 border rounded-lg bg-slate-50 relative group">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">{inquiry.status || '접수대기'}</span>
                                                        <span className="text-xs text-slate-400">{new Date(inquiry.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    <p className="text-slate-800 text-sm mb-4 whitespace-pre-wrap">{inquiry.message}</p>

                                                    <div className="flex justify-end gap-2">
                                                        {/* Edit could be implemented similarly to delete */}
                                                        <Button size="sm" variant="destructive" onClick={() => onDelete(inquiry.id)} className="h-8">
                                                            <Trash2 className="w-3 h-3 mr-1" /> 삭제
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
            </section>
        </div>
    );
}
