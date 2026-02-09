'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    let email = formData.get('email') as string
    const password = formData.get('password') as string

    // Mapping 'admin' username to admin email
    if (email === 'admin') {
        email = 'admin@cayson.kr' // Default admin email
    }

    const data = {
        email,
        password,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        // Provide user-friendly error messages
        if (error.message.includes('Email not confirmed')) {
            redirect('/login?error=' + encodeURIComponent('이메일 확인이 필요합니다. 받은 이메일의 확인 링크를 클릭해주세요.'))
        } else if (error.message.includes('Invalid login credentials')) {
            redirect('/login?error=' + encodeURIComponent('이메일 또는 비밀번호가 올바르지 않습니다.'))
        } else {
            redirect('/login?error=' + encodeURIComponent(error.message))
        }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string
    const fullname = formData.get('fullname') as string
    const phone = formData.get('phone') as string
    const zonecode = formData.get('zonecode') as string
    const address = formData.get('address') as string
    const detailAddress = formData.get('detailAddress') as string

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
            data: {
                username,
                full_name: fullname,
                phone,
                zonecode,
                address,
                detail_address: detailAddress,
            }
        }
    })

    if (signUpError) {
        redirect('/signup?error=' + encodeURIComponent(signUpError.message))
    }

    // Create profile in profiles table if needed
    if (authData.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: authData.user.id,
                username,
                full_name: fullname,
                email,
                phone,
                zonecode,
                address,
                detail_address: detailAddress,
            })

        if (profileError) {
            console.error('Profile creation error:', profileError)
            // Continue anyway since auth succeeded
        }
    }

    revalidatePath('/', 'layout')
    redirect('/signup/check-email')
}

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    const updates: { email?: string; password?: string } = {}

    if (email) {
        updates.email = email
    }

    if (password) {
        if (password !== confirmPassword) {
            redirect('/mypage?message=Passwords do not match')
        }
        updates.password = password
    }

    const { error } = await supabase.auth.updateUser(updates)

    if (error) {
        redirect('/mypage?error=Could not update profile')
    }

    revalidatePath('/mypage')
    redirect('/mypage?message=Profile updated successfully')
}
