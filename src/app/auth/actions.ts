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
        redirect('/login?error=Could not authenticate user')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/signup?error=Could not authenticate user')
    }

    revalidatePath('/', 'layout')
    redirect('/signup?message=Check email to continue sign in process')
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
