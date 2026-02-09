import { login, signup } from '../auth/actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center text-3xl font-bold tracking-tight text-slate-900">
                    Cayson <span className="text-blue-600 ml-1">Electric</span>
                </Link>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    로그인
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                이메일 또는 아이디
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                비밀번호
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>

                        <div>
                            <Button formAction={login} className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                로그인
                            </Button>
                        </div>

                        <div>
                            <Button formAction={signup} variant="outline" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm">
                                회원가입
                            </Button>
                        </div>
                    </form>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    아직 회원이 아니신가요?{' '}
                    <Link href="/signup" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                        회원가입하기
                    </Link>
                </p>
            </div>
        </div>
    )
}
