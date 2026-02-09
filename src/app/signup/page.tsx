"use client";

import { useState } from 'react'
import { signup } from '../auth/actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserPlus, Mail, Lock, ArrowRight, User, Phone, MapPin, Search } from 'lucide-react'
import Script from 'next/script'

declare global {
  interface Window {
    daum: any;
  }
}

export default function SignupPage() {
  const [address, setAddress] = useState('')
  const [zonecode, setZonecode] = useState('')
  const [addressError, setAddressError] = useState('')

  const handleAddressSearch = () => {
    if (typeof window === 'undefined' || !window.daum) {
      alert('주소 검색 API를 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }

    new window.daum.Postcode({
      oncomplete: function (data: any) {
        let addr = ''
        if (data.userSelectedType === 'R') {
          addr = data.roadAddress
        } else {
          addr = data.jibunAddress
        }
        setZonecode(data.zonecode)
        setAddress(addr)
        setAddressError('')
        // Focus on detailed address input
        document.getElementById('detailAddress')?.focus()
      }
    }).open()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!address) {
      setAddressError('주소를 검색하여 선택해주세요.')
      return
    }

    const formData = new FormData(e.currentTarget)
    formData.append('zonecode', zonecode)
    formData.append('address', address)

    const password = formData.get('password')
    const passwordConfirm = formData.get('password-confirm')

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    await signup(formData)
  }

  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-bold text-slate-800">Cayson Electric</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full mb-4">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">회원가입</h1>
            <p className="text-sm text-slate-500">Cayson Electric에 가입하고 다양한 서비스를 이용하세요</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Username/ID */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                  아이디 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="아이디"
                    className="w-full pl-10 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="fullname" className="block text-sm font-medium text-slate-700">
                  이름 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    required
                    placeholder="홍길동"
                    className="w-full pl-10 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                이메일 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@email.com"
                  className="w-full pl-10 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                전화번호 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  className="w-full pl-10 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Address Search */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                주소 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={zonecode}
                  readOnly
                  placeholder="우편번호"
                  className="w-32 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                />
                <Button
                  type="button"
                  onClick={handleAddressSearch}
                  className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-medium"
                >
                  <Search className="h-4 w-4" />
                  주소 검색
                </Button>
              </div>
              <input
                type="text"
                value={address}
                readOnly
                placeholder="주소 검색 버튼을 클릭하세요"
                className={`w-full px-4 py-2.5 rounded-xl border ${addressError ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} text-sm`}
              />
              {addressError && (
                <p className="text-xs text-red-500">{addressError}</p>
              )}
              <input
                id="detailAddress"
                name="detailAddress"
                type="text"
                placeholder="상세주소 (동/호수 등)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  비밀번호 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="비밀번호"
                    className="w-full pl-10 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Password Confirm */}
              <div className="space-y-2">
                <label htmlFor="password-confirm" className="block text-sm font-medium text-slate-700">
                  비밀번호 확인 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="password-confirm"
                    name="password-confirm"
                    type="password"
                    required
                    placeholder="비밀번호 확인"
                    className="w-full pl-10 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Signup Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-2 mt-6"
            >
              회원가입
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Benefits */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
            <p className="text-xs font-semibold text-slate-600 mb-3">가입 시 이용 가능한 서비스</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                '교육과정 신청',
                '도서 구매',
                '기술 자료 열람',
                '전문가 상담',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-slate-200" />
            <span className="px-4 text-xs text-slate-400">또는</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-500">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              로그인
            </Link>
          </p>
        </div>
        </div>
      </div>
    </>
  )
}
