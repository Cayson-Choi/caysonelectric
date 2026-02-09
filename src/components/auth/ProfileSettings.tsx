"use client";

import { updateProfile } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";

export function ProfileSettings({ userEmail }: { userEmail: string | undefined }) {
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    const error = searchParams.get("error");

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-6">계정 설정</h3>

            {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">{message}</div>}
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

            <form action={updateProfile} className="space-y-6">
                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">이메일 (ID) 변경</h4>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">새 이메일 주소</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder={userEmail}
                            defaultValue={userEmail}
                        />
                        <p className="text-xs text-slate-500">
                            * 이메일을 변경하면 확인 메일이 발송되며, 확인 후 로그인이 가능합니다.
                        </p>
                    </div>
                </div>

                <div className="border-t border-slate-100 my-6"></div>

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">비밀번호 변경</h4>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">새 비밀번호</Label>
                        <Input type="password" id="password" name="password" placeholder="변경할 비밀번호 입력" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                        <Input type="password" id="confirmPassword" name="confirmPassword" placeholder="비밀번호 재입력" />
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800">
                        정보 수정 저장
                    </Button>
                </div>
            </form>
        </div>
    );
}
