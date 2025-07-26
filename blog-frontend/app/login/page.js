'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
export default function LoginPage() {
    return (

        <div className=" flex items-center justify-center h-[calc(100vh-160px)] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">

            <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center space-y-6">
                <Image src="/images/logo.png" width={80} height={80} alt="Logo" className="mx-auto" />

                <h1 className="text-2xl font-bold text-gray-800">Chào mừng đến với Blog Chill ✨</h1>
                <p className="text-sm text-gray-500">Vui lòng đăng nhập để tiếp tục</p>

                <button
                    onClick={() =>
                        signIn('google', {
                            prompt: 'select_account',
                            callbackUrl: '/',
                        })
                    }
                    className="w-full flex items-center justify-center gap-3 bg-pink-400 hover:bg-pink-300 text-white py-3 rounded transition"
                >
                    <Image src="https://www.svgrepo.com/show/475656/google-color.svg"
                        width={20}
                        height={20}
                        alt="Google" />
                    <span>Đăng nhập với Google</span>
                </button>

                <p className="text-xs text-gray-400">
                    Bằng việc đăng nhập, bạn đồng ý với{' '}
                    <Link href="/terms" className="underline text-pink-500 hover:text-pink-800">
                        Điều khoản
                    </Link>{' '}
                    và{' '}
                    <Link href="/privacy" className="underline text-pink-500 hover:text-pink-800">
                        Chính sách bảo mật
                    </Link>{' '}
                    của chúng mình.
                </p>
            </div>
        </div>


    );
}
