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
  Loader2,
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
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

interface CourseSession {
  id: number;
  course_id: number;
  start_date: string;
  end_date: string;
  time_info: string;
  capacity: number;
  location: string;
  status: string;
  courses: {
    id: number;
    title: string;
    category: string;
    description: string;
    price: number;
  };
}

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
    case "finished":
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
  if (category === "자격증" || category === "Certification") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
        자격증
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
      실무
    </span>
  );
}

function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0 || diffDays === 1) return "1일";
  if (diffDays <= 7) return `${diffDays}일`;
  const weeks = Math.ceil(diffDays / 7);
  return `${weeks}주`;
}

export default function SchedulePage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>("전체");
  const [sessions, setSessions] = useState<CourseSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CourseSession | null>(null);
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

  useEffect(() => {
    async function fetchSessions() {
      try {
        const supabase = createClient();
        const today = new Date().toISOString().split('T')[0];

        const { data, error } = await supabase
          .from('course_sessions')
          .select(`
            *,
            courses:course_id (
              id,
              title,
              category,
              description,
              price
            )
          `)
          .gte('start_date', today)
          .order('start_date', { ascending: true });

        if (error) throw error;

        // Filter out sessions without valid course data
        const validSessions = (data || []).filter(session => session.courses) as CourseSession[];
        setSessions(validSessions);
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch sessions');
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, []);

  const filters = ["전체", "자격증", "실무"];

  const filteredSessions = activeFilter === "전체"
    ? sessions
    : sessions.filter((s) => {
        const category = s.courses.category;
        if (activeFilter === "자격증") {
          return category === "자격증" || category === "Certification";
        }
        return category === "실무" || category === "Practical";
      });

  const handleApplyClick = (session: CourseSession) => {
    if (!user) {
      router.push("/login");
      return;
    }
    setSelectedSession(session);
    setSubmitSuccess(false);
    setDialogOpen(true);
  };

  const handleApplySubmit = async () => {
    if (!selectedSession || !formData.name || !formData.phone) return;

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("applications").insert({
        session_id: selectedSession.id,
        user_id: user?.id,
        applicant_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: selectedSession.courses.price,
        status: "pending_payment",
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

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-3 text-slate-600">교육 일정을 불러오는 중...</span>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-600">교육 일정을 불러오는데 실패했습니다: {error}</p>
            </div>
          ) : sessions.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="등록된 교육 일정이 없습니다"
              description="관리자가 곧 교육 일정을 등록할 예정입니다. 교육 문의는 고객센터로 연락해 주세요."
              action={{
                label: "문의하기",
                onClick: () => window.location.href = '/contact'
              }}
            />
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">
                해당 카테고리의 교육 일정이 없습니다.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredSessions.map((session) => {
                const isClosed = session.status === "closed" || session.status === "finished";
                const duration = calculateDuration(session.start_date, session.end_date);

                return (
                  <div
                    key={session.id}
                    className={`bg-white rounded-2xl p-6 md:p-8 border border-slate-100 card-hover ${
                      isClosed ? "opacity-70" : ""
                    }`}
                  >
                    {/* Top Row: Badges */}
                    <div className="flex items-center gap-3 mb-4">
                      {getStatusBadge(session.status)}
                      {getCategoryBadge(session.courses.category)}
                    </div>

                    {/* Course Title & Meta */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                          {session.courses.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <span className="inline-flex items-center gap-1.5 font-medium">
                            <Clock className="h-4 w-4" />
                            {duration}
                          </span>
                          {session.courses.price > 0 && (
                            <span className="font-bold text-slate-900 text-base">
                              {session.courses.price.toLocaleString()}원
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Apply Button */}
                      <div className="flex-shrink-0">
                        <Button
                          onClick={() => handleApplyClick(session)}
                          disabled={isClosed}
                          className={`h-11 px-6 rounded-lg text-sm font-bold transition-all ${
                            isClosed
                              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                              : session.status === "closing-soon"
                                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-900/20 hover:translate-y-[-2px]"
                                : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 hover:translate-y-[-2px]"
                          }`}
                        >
                          {isClosed ? "마감됨" : "수강신청"}
                          {!isClosed && <ArrowRight className="ml-1.5 h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Info Row */}
                    <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-slate-100 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        {session.start_date}
                        {session.start_date !== session.end_date && ` ~ ${session.end_date}`}
                      </span>
                      {session.time_info && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-slate-400" />
                          {session.time_info}
                        </span>
                      )}
                      {session.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          {session.location}
                        </span>
                      )}
                      {session.capacity && (
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-slate-400" />
                          정원 {session.capacity}명
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
                    {selectedSession?.courses.title}
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
                    {selectedSession?.courses.title}
                  </strong>{" "}
                  과정에 신청합니다. 아래 정보를 입력해 주세요.
                </DialogDescription>
              </DialogHeader>

              {/* Course Summary */}
              {selectedSession && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">개강일</span>
                    <span className="font-medium text-slate-900">
                      {selectedSession.start_date}
                    </span>
                  </div>
                  {selectedSession.time_info && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">시간</span>
                      <span className="font-medium text-slate-900">
                        {selectedSession.time_info}
                      </span>
                    </div>
                  )}
                  {selectedSession.courses.price > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">수강료</span>
                      <span className="font-bold text-blue-600">
                        {selectedSession.courses.price.toLocaleString()}원
                      </span>
                    </div>
                  )}
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
