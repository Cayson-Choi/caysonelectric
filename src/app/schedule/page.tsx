"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

// Mock Data for Schedule
const schedules = [
    { id: 1, course: '전기기능사 필기 특강', date: '2026-03-02', time: '19:00 - 22:00', duration: '4주', status: 'recruiting', capacity: '20명', location: '제1강의실' },
    { id: 2, course: 'PLC 제어 기초 실습', date: '2026-03-07', time: '10:00 - 17:00 (토)', duration: '8주', status: 'recruiting', capacity: '15명', location: 'PLC 실습실' },
    { id: 3, course: 'KEC 규정 실무 해설', date: '2026-03-14', time: '14:00 - 18:00 (토)', duration: '1일', status: 'closing-soon', capacity: '30명', location: '대강당' },
    { id: 4, course: '건축전기설비기술사 정규반', date: '2026-03-09', time: '19:00 - 22:00', duration: '12주', status: 'recruiting', capacity: '10명', location: '제2강의실' },
    { id: 5, course: '전기기사 실기 핵심요약', date: '2026-02-24', time: '19:00 - 22:00', duration: '6주', status: 'closed', capacity: '25명', location: '제1강의실' },
];

export default function SchedulePage() {
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [user, setUser] = useState<User | null>(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    const handleApplyClick = (course: any) => {
        if (!user) {
            if (confirm('수강신청은 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?')) {
                router.push('/login');
            }
            return;
        }
        setSelectedCourse(course);
        setOpen(true);
    };

    const handleApplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send data to Supabase
        // const formData = new FormData(e.currentTarget as HTMLFormElement);

        // Simulating API call
        if (!user) return;

        // TODO: Insert into 'applications' table
        /*
        const { error } = await supabase.from('applications').insert({
            session_id: selectedCourse.id, // Assuming mapping
            applicant_name: (e.target as any).name.value,
            phone: (e.target as any).phone.value,
            email: user.email,
            status: 'pending_payment'
        });
        */

        alert('수강신청이 완료되었습니다! 담당자가 확인 후 연락드리겠습니다.');
        setOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-slate-900 py-20 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold text-white mb-4">교육신청</h1>
                    <p className="text-slate-400">
                        원하시는 교육 과정을 선택하여 신청해주세요.
                    </p>
                </div>
            </section>

            <section className="py-16 container mx-auto px-6 max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">개설 강좌 목록</h2>
                    {user ? (
                        null // Removed welcome message
                    ) : (
                        <span className="text-sm text-slate-500">로그인이 필요합니다.</span>
                    )}
                </div>

                <div className="space-y-6">
                    {schedules.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        {item.status === 'recruiting' && <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">접수중</span>}
                                        {item.status === 'closing-soon' && <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded">마감임박</span>}
                                        {item.status === 'closed' && <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">마감됨</span>}
                                        <span className="text-slate-500 text-sm">{item.duration}과정</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">{item.course}</h3>
                                </div>

                                {item.status !== 'closed' ? (
                                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleApplyClick(item)}>신청하기</Button>
                                ) : (
                                    <Button variant="secondary" disabled>신청마감</Button>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 border-t pt-4">
                                <div className="flex items-center gap-1">
                                    <CalendarIcon className="w-4 h-4 text-slate-400" />
                                    개강일: {item.date}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    시간: {item.time}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    장소: {item.location}
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4 text-slate-400" />
                                    정원: {item.capacity}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>수강 신청</DialogTitle>
                            <DialogDescription>
                                {selectedCourse?.course} 과정을 신청합니다.<br />
                                등록된 회원 정보로 자동 입력됩니다.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleApplySubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">이메일(ID)</Label>
                                    <Input id="email" className="col-span-3 bg-slate-100" value={user?.email || ''} readOnly />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">이름</Label>
                                    <Input
                                        id="name"
                                        className="col-span-3"
                                        defaultValue={user?.user_metadata?.full_name || ''}
                                        placeholder="이름을 입력하세요"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phone" className="text-right">연락처</Label>
                                    <Input
                                        id="phone"
                                        className="col-span-3"
                                        defaultValue={user?.user_metadata?.phone || ''}
                                        placeholder="010-0000-0000"
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full">신청 완료</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </section>
        </div>
    );
}
