'use client'

import { useEffect, useState } from 'react'
import Link from "next/link"
import {
  BookOpen,
  Award,
  PenTool,
  CheckCircle,
  GraduationCap,
  ArrowRight,
  Users,
  Clock,
  Star,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { createClient } from '@/lib/supabase/client'

interface Course {
  id: number
  title: string
  category: string
  description: string
  price: number
  is_active: boolean
}

export default function EducationPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('is_active', true)
          .order('category', { ascending: true })
          .order('created_at', { ascending: true })

        if (error) throw error
        setCourses(data || [])
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch courses')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const certCourses = courses.filter(c => c.category === 'Certification' || c.category === '자격증')
  const practicalCourses = courses.filter(c => c.category === 'Practical' || c.category === '실무')

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/80" />
        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
            <GraduationCap className="h-4 w-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium tracking-wide">
              Professional Education
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            기술 교육
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            현장 중심의 실무 교육과 체계적인 자격증 취득 과정으로
            <br className="hidden md:block" />
            전기 전문가로 성장하는 가장 확실한 길을 제시합니다.
          </p>
        </div>
      </section>

      {/* Stats / Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100 text-center card-hover">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 mb-4">
                <BookOpen className="h-7 w-7 text-blue-600" />
              </div>
              <p className="text-4xl font-extrabold text-slate-900 mb-1">20+</p>
              <p className="text-slate-500 font-medium">교육과정</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100 text-center card-hover">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-orange-100 mb-4">
                <Users className="h-7 w-7 text-orange-600" />
              </div>
              <p className="text-4xl font-extrabold text-slate-900 mb-1">5,000+</p>
              <p className="text-slate-500 font-medium">수료생</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100 text-center card-hover">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 mb-4">
                <Star className="h-7 w-7 text-green-600" />
              </div>
              <p className="text-4xl font-extrabold text-slate-900 mb-1">98%</p>
              <p className="text-slate-500 font-medium">만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Layout Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Curriculum
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              교육과정 안내
            </p>
            <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
              현업 전문가가 직접 설계한 커리큘럼으로 이론과 실무를 동시에 잡으세요.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-3 text-slate-600">교육과정을 불러오는 중...</span>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-600">교육과정을 불러오는데 실패했습니다: {error}</p>
            </div>
          ) : courses.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="등록된 교육 과정이 없습니다"
              description="관리자가 곧 교육 과정을 등록할 예정입니다. 교육 문의는 고객센터로 연락해 주세요."
              action={{
                label: "문의하기",
                onClick: () => window.location.href = '/contact'
              }}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* LEFT: 자격증 과정 */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">자격증 과정</h3>
                    <p className="text-sm text-slate-500">국가기술자격 취득 대비</p>
                  </div>
                </div>
                {certCourses.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {certCourses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-white rounded-2xl p-6 border border-slate-100 border-l-4 border-l-orange-500 card-hover"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-bold text-slate-900">
                            {course.title}
                          </h4>
                          <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {course.description}
                        </p>
                        {course.price > 0 && (
                          <p className="mt-3 text-sm font-semibold text-orange-600">
                            {course.price.toLocaleString()}원
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <p>등록된 자격증 과정이 없습니다</p>
                  </div>
                )}
              </div>

              {/* RIGHT: 실무 전문 과정 */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100">
                    <PenTool className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">실무 전문 과정</h3>
                    <p className="text-sm text-slate-500">현장 적용 중심 실무 역량 강화</p>
                  </div>
                </div>
                {practicalCourses.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {practicalCourses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-white rounded-2xl p-6 border border-slate-100 border-l-4 border-l-blue-500 card-hover"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-bold text-slate-900">
                            {course.title}
                          </h4>
                          <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {course.description}
                        </p>
                        {course.price > 0 && (
                          <p className="mt-3 text-sm font-semibold text-blue-600">
                            {course.price.toLocaleString()}원
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <p>등록된 실무 과정이 없습니다</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                왜 Cayson 교육인가?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">현업 전문가 강사진</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    20년 이상의 현장 경험을 보유한 전문 엔지니어가 직접 강의합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">자체 교재 및 교구</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    최신 KEC 규정이 반영된 자체 개발 교재와 실습 장비를 제공합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">유연한 수강 일정</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    평일 야간반, 주말반 등 직장인을 위한 다양한 시간대를 운영합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">수료 후 지원</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    수료생 커뮤니티와 취업 연계 프로그램으로 지속적인 성장을 지원합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-blue-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern" />
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              교육신청
            </h2>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl mx-auto">
              원하시는 교육과정을 선택하고 온라인으로 간편하게 수강 신청하세요.
              <br className="hidden md:block" />
              상담이 필요하시면 언제든 문의해 주세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-10 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-base font-bold shadow-lg shadow-orange-900/30 transition-all hover:translate-y-[-2px]"
              >
                <Link href="/schedule">
                  교육 일정 확인 및 신청
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-10 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 rounded-lg text-base font-bold backdrop-blur-sm transition-all hover:border-white/60"
              >
                <Link href="/contact">상담 문의하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
