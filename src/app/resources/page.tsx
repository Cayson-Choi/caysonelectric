import Link from "next/link";
import { FileText, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from '@/lib/supabase/server';

export default async function ResourcesPage() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-slate-900 py-20 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold text-white mb-4">기술 자료실</h1>
                    <p className="text-slate-400">
                        실무에 필요한 기술 자료와 다양한 서식을 공유합니다.
                    </p>
                </div>
            </section>

            {/* Board Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">

                    {/* Search and Filter (Mock) */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-slate-600 font-medium">
                            총 <span className="text-blue-600 font-bold">{posts?.length || 0}</span>건
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요"
                                className="border border-slate-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-64"
                            />
                            <Button variant="outline">검색</Button>
                        </div>
                    </div>

                    {/* Board List */}
                    <div className="border-t border-slate-900">
                        {/* Header */}
                        <div className="grid grid-cols-12 bg-slate-50 py-4 text-center text-sm font-bold text-slate-700 border-b border-slate-200">
                            <div className="col-span-1">번호</div>
                            <div className="col-span-7">제목</div>
                            <div className="col-span-2">작성자</div>
                            <div className="col-span-2">작성일</div>
                        </div>

                        {/* Items */}
                        {posts && posts.length > 0 ? (
                            posts.map((item: any) => (
                                <div key={item.id} className="grid grid-cols-12 py-4 text-center text-sm text-slate-600 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="col-span-1 text-slate-400">{item.id}</div>
                                    <div className="col-span-7 text-left px-4 font-medium text-slate-900 group-hover:text-blue-600 truncate flex items-center gap-2">
                                        {item.is_secret && <Lock className="w-3 h-3 text-slate-400" />}
                                        {item.title}
                                    </div>
                                    <div className="col-span-2 text-slate-500">{item.author || '관리자'}</div>
                                    <div className="col-span-2 text-slate-400">{new Date(item.created_at).toLocaleDateString()}</div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center text-slate-500 border-b border-slate-100">
                                등록된 게시물이 없습니다.
                            </div>
                        )}
                    </div>

                    {/* Pagination (Static) */}
                    <div className="flex justify-center mt-12 gap-2">
                        <Button variant="outline" size="sm" disabled>&lt;</Button>
                        <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">1</Button>
                        <Button variant="outline" size="sm" disabled>&gt;</Button>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            글쓰기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
