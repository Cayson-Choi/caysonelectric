"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Lock, AlertCircle, CheckCircle, Trash2, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    daum: any;
  }
}

interface ProfileSettingsProps {
  user: any;
  profile: any;
}

export function ProfileSettings({ user, profile }: ProfileSettingsProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [phone, setPhone] = useState(profile?.phone || "");
    const [zonecode, setZonecode] = useState(profile?.zonecode || "");
    const [address, setAddress] = useState(profile?.address || "");
    const [detailAddress, setDetailAddress] = useState(profile?.detail_address || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();
    const supabase = createClient();

    const handleAddressSearch = () => {
        if (typeof window === 'undefined' || !window.daum) {
            alert('주소 검색 API를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
            return;
        }

        new window.daum.Postcode({
            oncomplete: function (data: any) {
                let addr = '';
                if (data.userSelectedType === 'R') {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }
                setZonecode(data.zonecode);
                setAddress(addr);
            }
        }).open();
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        setMessage("");
        setError("");

        try {
            // Update profile info
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    phone,
                    zonecode,
                    address,
                    detail_address: detailAddress,
                })
                .eq('id', user.id);

            if (profileError) throw profileError;

            // Update password if provided
            if (password) {
                if (password !== confirmPassword) {
                    setError("비밀번호가 일치하지 않습니다.");
                    setIsUpdating(false);
                    return;
                }

                const { error: authError } = await supabase.auth.updateUser({
                    password,
                });

                if (authError) throw authError;
            }

            setMessage("정보가 성공적으로 업데이트되었습니다!");
            setPassword("");
            setConfirmPassword("");

            // Refresh page after 1 second
            setTimeout(() => {
                router.refresh();
            }, 1000);
        } catch (err: any) {
            setError(err.message || "업데이트 중 오류가 발생했습니다.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm("정말로 회원탈퇴를 하시겠습니까?\n\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.")) {
            return;
        }

        if (!confirm("탈퇴하시면 수강 신청, 도서 주문, 문의 내역 등 모든 정보가 삭제됩니다.\n\n정말로 진행하시겠습니까?")) {
            return;
        }

        setIsDeleting(true);
        setError("");

        try {
            // Delete profile
            const { error: profileError } = await supabase
                .from('profiles')
                .delete()
                .eq('id', user.id);

            if (profileError) throw profileError;

            // Sign out
            await supabase.auth.signOut();

            // Redirect to home
            router.push('/?message=' + encodeURIComponent('회원탈퇴가 완료되었습니다.'));
        } catch (err: any) {
            setError(err.message || "탈퇴 중 오류가 발생했습니다.");
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Script
                src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                strategy="lazyOnload"
            />

            <div className="space-y-6">
                {/* Messages */}
                {message && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-green-800">{message}</p>
                    </div>
                )}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                {/* Read-only Information */}
                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4">
                        기본 정보 (변경 불가)
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-600 flex items-center gap-2">
                                <User className="w-4 h-4" /> 아이디
                            </Label>
                            <Input
                                type="text"
                                value={profile?.username || ""}
                                disabled
                                className="bg-slate-100 cursor-not-allowed"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-600 flex items-center gap-2">
                                <User className="w-4 h-4" /> 이름
                            </Label>
                            <Input
                                type="text"
                                value={profile?.full_name || ""}
                                disabled
                                className="bg-slate-100 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-slate-600 flex items-center gap-2">
                            <Mail className="w-4 h-4" /> 이메일
                        </Label>
                        <Input
                            type="email"
                            value={user.email || ""}
                            disabled
                            className="bg-slate-100 cursor-not-allowed"
                        />
                        <p className="text-xs text-slate-500">
                            * 이메일은 변경할 수 없습니다. 변경이 필요한 경우 관리자에게 문의해주세요.
                        </p>
                    </div>
                </div>

                {/* Editable Information */}
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
                        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4">
                            수정 가능 정보
                        </h3>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="w-4 h-4" /> 전화번호
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="010-0000-0000"
                                className="focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> 주소
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    value={zonecode}
                                    readOnly
                                    placeholder="우편번호"
                                    className="w-32 bg-slate-50"
                                />
                                <Button
                                    type="button"
                                    onClick={handleAddressSearch}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <Search className="h-4 w-4" />
                                    주소 검색
                                </Button>
                            </div>
                            <Input
                                type="text"
                                value={address}
                                readOnly
                                placeholder="주소 검색 버튼을 클릭하세요"
                                className="bg-slate-50"
                            />
                            <Input
                                type="text"
                                value={detailAddress}
                                onChange={(e) => setDetailAddress(e.target.value)}
                                placeholder="상세주소 (동/호수 등)"
                            />
                        </div>
                    </div>

                    {/* Password Change */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
                        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4">
                            비밀번호 변경
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="flex items-center gap-2">
                                    <Lock className="w-4 h-4" /> 새 비밀번호
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="변경할 비밀번호 (선택사항)"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                                    <Lock className="w-4 h-4" /> 비밀번호 확인
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="비밀번호 재입력"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">
                            * 비밀번호를 변경하지 않으려면 비워두세요.
                        </p>
                    </div>

                    {/* Save Button */}
                    <Button
                        type="submit"
                        disabled={isUpdating}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                    >
                        {isUpdating ? "저장 중..." : "변경사항 저장"}
                    </Button>
                </form>

                {/* Delete Account */}
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-2">
                        회원탈퇴
                    </h3>
                    <p className="text-sm text-red-700 mb-4">
                        회원탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
                    </p>
                    <Button
                        type="button"
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        {isDeleting ? "탈퇴 처리 중..." : "회원탈퇴"}
                    </Button>
                </div>
            </div>
        </>
    );
}
