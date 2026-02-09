import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // TODO: Add role check here. For now, just checking if logged in.
    // const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    // if (profile?.role !== 'admin') { redirect('/') }

    return (
        <div className="min-h-screen bg-slate-100 py-12">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Administrator</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 uppercase">Total Users</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-2">12</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 uppercase">New Applications</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-2">5</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 uppercase">Pending Inquiries</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-2">3</p>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">Recent Activity</h2>
                    <div className="border rounded-md p-4 bg-slate-50 text-center text-slate-500">
                        No recent activity to display.
                    </div>
                </div>
            </div>
        </div>
    )
}
