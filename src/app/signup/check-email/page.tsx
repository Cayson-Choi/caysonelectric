'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-bold text-slate-800">Cayson Electric</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">이메일을 확인해주세요</h1>
            <p className="text-sm text-slate-500">
              회원가입이 거의 완료되었습니다!
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  이메일 확인 링크를 보냈습니다
                </p>
                <p className="text-xs text-blue-700">
                  가입하신 이메일 주소로 확인 링크를 발송했습니다. 이메일의 링크를 클릭하여 계정을 활성화해주세요.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs font-semibold text-slate-600 mb-2">이메일이 오지 않았나요?</p>
              <ul className="space-y-1 text-xs text-slate-500">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  스팸 메일함을 확인해주세요
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  이메일 주소가 정확한지 확인해주세요
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  몇 분 정도 소요될 수 있습니다
                </li>
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <Link href="/login">
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-2"
            >
              로그인 페이지로 이동
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          {/* Footer Note */}
          <p className="text-center text-xs text-slate-400 mt-6">
            이메일 확인 후 로그인할 수 있습니다
          </p>
        </div>
      </div>
    </div>
  );
}
