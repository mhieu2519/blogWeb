'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function MyPosts() {
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (session?.user?.email) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?author=${session.user.email}`)
                .then(res => setPosts(res.data))
                .catch(console.error);
        }
    }, [session]);

    if (status === 'loading') return <p className="p-4">Đang tải...</p>;
    if (!session) return <p className="p-4">Bạn chưa đăng nhập.</p>;

    return (
        <main className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">📂 Bài viết của tôi</h1>

            {posts.length === 0 ? (
                <p>❌ Bạn chưa có bài viết nào.</p>
            ) : (
                posts.map(post => (
                    <div key={post._id} className="p-4 border rounded mb-4 shadow-sm">
                        <Link href={`/post/${post.slug}`}>
                            <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
                        </Link>
                        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                        <div className="mt-2 space-x-2">
                            <Link href={`/edit/${post.slug}`}>
                                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">✏️ Sửa</button>
                            </Link>
                            <Link href={`/post/${post.slug}`}>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">🔍 Xem</button>
                            </Link>
                        </div>

                    </div>

                ))
            )}
            <div className="mt-2 text-gray-700">
                <Link href="/">
                    <button className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                        🏠 Về trang chủ
                    </button>
                </Link>
            </div>
        </main>
    );
}
