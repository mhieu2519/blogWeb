// app/profile/page.js
'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';


export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState(null);
    const [postCount, setPostCount] = useState(0);
    // console.log('ProfilePage session:', session);
    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            const fetchUser = async () => {
                try {
                    // 🔄 Gọi API lấy user
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {

                        googleId: session.user.id,
                        name: session.user.name,
                        email: session.user.email,
                        image: session.user.image,
                    });
                    setUserData(res.data);

                    // 🔄 Lấy số bài viết của user
                    const postRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?author=${res.data.email}`);
                    setPostCount(postRes.data.length);
                } catch (err) {
                    console.error('❌ Lỗi khi tải hồ sơ:', err);
                }
            };

            fetchUser();
        }
    }, [session]);



    if (status === 'loading') return <p>⏳ Đang tải...</p>;
    if (!session) return <p>⚠️ Bạn chưa đăng nhập.</p>;

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">👤 Hồ sơ của tôi</h1>
            {userData && (
                <div className="space-y-4">
                    <img src={userData.image} alt="avatar" className="w-32 h-32 rounded-full" />
                    <p><strong>👋 Tên:</strong> {userData.name}</p>
                    <p><strong>🎂 Ngày sinh:</strong> {userData.birthday}</p>
                    <p><strong>🧬 Giới tính:</strong> {userData.gender}</p>
                    <p><strong>📧 Email:</strong> {userData.email}</p>
                    <p><strong>📅 Ngày tham gia:</strong> {new Date(userData.createdAt).toLocaleDateString('vi-VN')}</p>
                    <p><strong>📝 Bài viết đã đăng:</strong> {postCount}</p>
                </div>
            )}
            <div className="flex gap-4">
                <Link href="/profile/edit">
                    <button className="mt-4 bg-pink-300 text-white px-4 py-2 rounded hover:bg-pink-700">
                        ✏️ Chỉnh sửa hồ sơ
                    </button>
                </Link>
                <Link href="/">
                    <button className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                        🏠 Về trang chủ
                    </button>
                </Link>
            </div>
        </main>
    );
}
