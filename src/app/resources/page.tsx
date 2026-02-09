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
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative bg-slate-900 py-16 overflow-hidden">
                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
                <div className="relative z-10 container mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">Resources</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        기술 자료실
                    </h1>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                        실무에 필요한 기술 자료와 다양한 서식을 공유합니다.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-6xl">

                    {/* Search Bar + Count */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div className="text-slate-600 font-medium text-sm">
                            전체 게시물 <span className="text-blue-600 font-bold text-lg ml-1">{posts?.length || 0}</span>
                            <span className="text-slate-400 ml-1">건</span>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            {/* Filter dropdown */}
                            <select className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer min-w-[120px]">
                                <option>전체</option>
                                <option>제목</option>
                                <option>작성자</option>
                            </select>
                            {/* Search input with icon */}
                            <div className="relative flex-1 md:w-80">
                                <svg
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="검색어를 입력하세요"
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-300"
                                />
                            </div>
                            <Button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors">
                                검색
                            </Button>
                        </div>
                    </div>

                    {/* Board List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 bg-slate-50 py-4 px-6 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                            <div className="col-span-1">번호</div>
                            <div className="col-span-6 text-left pl-4">제목</div>
                            <div className="col-span-2">작성자</div>
                            <div className="col-span-2">작성일</div>
                            <div className="col-span-1">조회수</div>
                        </div>

                        {/* Table Rows */}
                        {posts && posts.length > 0 ? (
                            posts.map((item: any, index: number) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-12 py-4 px-6 text-center text-sm text-slate-600 border-b border-slate-50 last:border-b-0 hover:bg-blue-50/30 transition-colors duration-150 cursor-pointer group"
                                >
                                    <div className="col-span-1 text-slate-400 font-mono text-xs flex items-center justify-center">
                                        {item.id}
                                    </div>
                                    <div className="col-span-6 text-left pl-4 font-medium text-slate-800 group-hover:text-blue-600 truncate flex items-center gap-2 transition-colors duration-150">
                                        {item.is_secret && (
                                            <Lock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                        )}
                                        <span className="truncate">{item.title}</span>
                                    </div>
                                    <div className="col-span-2 text-slate-500 flex items-center justify-center text-xs">
                                        {item.author || '관리자'}
                                    </div>
                                    <div className="col-span-2 text-slate-400 flex items-center justify-center text-xs">
                                        {new Date(item.created_at).toLocaleDateString('ko-KR')}
                                    </div>
                                    <div className="col-span-1 text-slate-400 flex items-center justify-center text-xs">
                                        {item.views || 0}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-24 text-center">
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                    <FileText className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-2">등록된 게시물이 없습니다</h3>
                                <p className="text-sm text-slate-400 mb-6">
                                    아직 등록된 기술 자료가 없습니다. 첫 번째 게시물을 작성해보세요.
                                </p>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2.5 font-medium">
                                    글쓰기
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Bottom: Pagination + Write Button */}
                    <div className="flex items-center justify-between mt-8">
                        {/* Pagination */}
                        <div className="flex-1 flex justify-center">
                            <div className="flex items-center gap-1.5">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled
                                    className="w-9 h-9 p-0 rounded-lg border-slate-200 disabled:opacity-40"
                                >
                                    &lt;
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-9 h-9 p-0 rounded-lg bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white font-bold"
                                >
                                    1
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled
                                    className="w-9 h-9 p-0 rounded-lg border-slate-200 disabled:opacity-40"
                                >
                                    &gt;
                                </Button>
                            </div>
                        </div>

                        {/* Write Button */}
                        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 py-2.5 font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-200">
                            글쓰기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
