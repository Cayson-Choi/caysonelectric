"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const schedules = [
  {
    id: 1,
    course: "전기기능사 필기 특강",
    category: "자격증",
    date: "2026-03-02",
    time: "19:00 - 22:00",
    duration: "4주",
    status: "recruiting",
    capacity: "20명",
    enrolled: 12,
    location: "제1강의실",
    price: "350,000원",
  },
  {
    id: 2,
    course: "PLC 제어 기초 실습",
    category: "실무",
    date: "2026-03-07",
    time: "10:00 - 17:00 (토)",
    duration: "8주",
    status: "recruiting",
    capacity: "15명",
    enrolled: 8,
    location: "PLC 실습실",
    price: "580,000원",
  },
  {
    id: 3,
    course: "KEC 규정 실무 해설",
    category: "실무",
    date: "2026-03-14",
    time: "14:00 - 18:00 (토)",
    duration: "1일",
    status: "closing-soon",
    capacity: "30명",
    enrolled: 27,
    location: "대강당",
    price: "120,000원",
  },
  {
    id: 4,
    course: "건축전기설비기술사 정규반",
    category: "자격증",
    date: "2026-03-09",
    time: "19:00 - 22:00",
    duration: "12주",
    status: "recruiting",
    capacity: "10명",
    enrolled: 4,
    location: "제2강의실",
    price: "1,200,000원",
  },
  {
    id: 5,
    course: "전기기사 실기 핵심요약",
    category: "자격증",
    date: "2026-02-24",
    time: "19:00 - 22:00",
    duration: "6주",
    status: "closed",
    capacity: "25명",
    enrolled: 25,
    location: "제1강의실",
    price: "450,000원",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "recruiting":
      return (
        <span className="badge-recruiting inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
          </span>
          접수중
        </span>
      );
    case "closing-soon":
      return (
        <span className="badge-closing-soon inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
          </span>
          마감임박
        </span>
      );
    case "closed":
      return (
        <span className="badge-closed inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold">
          마감됨
        </span>
      );
    default:
      return null;
  }
}

function getCategoryBadge(category: string) {
  if (category === "자격증") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
        {category}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
      {category}
    </span>
  );
}

function getCapacityNumber(capacity: string) {
  return parseInt(capacity.replace("명", ""), 10);
}

export default function SchedulePage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>("전체");
  const [user, setUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof schedules)[0] | null
  >(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setFormData((prev) => ({ ...prev, email: user.email || "" }));
      }
    };
    checkUser();
  }, []);

  const filters = ["전체", "자격증", "실무"];

  const filteredSchedules =
    activeFilter === "전체"
      ? schedules
      : schedules.filter((s) => s.category === activeFilter);

  const handleApplyClick = (schedule: (typeof schedules)[0]) => {
    if (!user) {
      router.push("/login");
      return;
    }
    setSelectedCourse(schedule);
    setSubmitSuccess(false);
    setDialogOpen(true);
  };

  const handleApplySubmit = async () => {
    if (!selectedCourse || !formData.name || !formData.phone) return;

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("book_orders").insert({
        user_id: user?.id,
        user_email: formData.email,
        user_name: formData.name,
        user_phone: formData.phone,
        course_name: selectedCourse.course,
        course_date: selectedCourse.date,
        course_price: selectedCourse.price,
        status: "pending",
      });

      if (error) throw error;

      setSubmitSuccess(true);
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("신청 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium tracking-wide">
              Schedule & Enrollment
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            교육신청
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            개설 예정 교육과정을 확인하고 온라인으로 간편하게 수강 신청하세요.
          </p>
        </div>
      </section>

      {/* Filter & Course Cards */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Course Cards */}
          <div className="flex flex-col gap-6">
            {filteredSchedules.map((schedule) => {
              const capacityNum = getCapacityNumber(schedule.capacity);
              const progressPercent = Math.round(
                (schedule.enrolled / capacityNum) * 100
              );
              const isClosed = schedule.status === "closed";

              return (
                <div
                  key={schedule.id}
                  className={`bg-white rounded-2xl p-6 md:p-8 border border-slate-100 card-hover ${
                    isClosed ? "opacity-70" : ""
                  }`}
                >
                  {/* Top Row: Badges */}
                  <div className="flex items-center gap-3 mb-4">
                    {getStatusBadge(schedule.status)}
                    {getCategoryBadge(schedule.category)}
                  </div>

                  {/* Course Title & Meta */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                        {schedule.course}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <Clock className="h-4 w-4" />
                          {schedule.duration}
                        </span>
                        <span className="font-bold text-slate-900 text-base">
                          {schedule.price}
                        </span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex-shrink-0">
                      <Button
                        onClick={() => handleApplyClick(schedule)}
                        disabled={isClosed}
                        className={`h-11 px-6 rounded-lg text-sm font-bold transition-all ${
                          isClosed
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                            : schedule.status === "closing-soon"
                              ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-900/20 hover:translate-y-[-2px]"
                              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 hover:translate-y-[-2px]"
                        }`}
                      >
                        {isClosed ? "마감됨" : "수강신청"}
                        {!isClosed && <ArrowRight className="ml-1.5 h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {schedule.enrolled}명 / {schedule.capacity}
                      </span>
                      <span className="font-medium">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          progressPercent >= 90
                            ? "bg-gradient-to-r from-orange-400 to-red-500"
                            : progressPercent >= 50
                              ? "bg-gradient-to-r from-blue-400 to-blue-600"
                              : "bg-gradient-to-r from-green-400 to-emerald-500"
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Info Row */}
                  <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-slate-100 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      {schedule.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-slate-400" />
                      {schedule.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {schedule.location}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredSchedules.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">
                  해당 카테고리의 교육 일정이 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enrollment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {submitSuccess ? (
            <>
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <DialogTitle className="text-center text-xl">
                  신청이 완료되었습니다
                </DialogTitle>
                <DialogDescription className="text-center">
                  <strong className="text-slate-900">
                    {selectedCourse?.course}
                  </strong>{" "}
                  수강 신청이 정상적으로 접수되었습니다.
                  <br />
                  확인 이메일을 발송해 드리겠습니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-center">
                <Button
                  onClick={() => setDialogOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                >
                  확인
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">수강 신청</DialogTitle>
                <DialogDescription>
                  <strong className="text-slate-900">
                    {selectedCourse?.course}
                  </strong>{" "}
                  과정에 신청합니다. 아래 정보를 입력해 주세요.
                </DialogDescription>
              </DialogHeader>

              {/* Course Summary */}
              {selectedCourse && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">개강일</span>
                    <span className="font-medium text-slate-900">
                      {selectedCourse.date}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">시간</span>
                    <span className="font-medium text-slate-900">
                      {selectedCourse.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">수강료</span>
                    <span className="font-bold text-blue-600">
                      {selectedCourse.price}
                    </span>
                  </div>
                </div>
              )}

              {/* Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    이메일
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="input-modern"
                    placeholder="your@email.com"
                    readOnly={!!user?.email}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    이름
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="input-modern"
                    placeholder="홍길동"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    연락처
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="input-modern"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="border-slate-200"
                >
                  취소
                </Button>
                <Button
                  onClick={handleApplySubmit}
                  disabled={submitting || !formData.name || !formData.phone}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {submitting ? "신청 중..." : "신청하기"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
