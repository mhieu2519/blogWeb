'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditPost() {

    const { slug } = useParams(); // 👈 đúng cách dùng trong Client Component
    //console.log('🔍 Slug:', slug);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        // console.log('🧩 useEffect running, slug:', slug);

        if (!slug) return;

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`)
            .then(res => {
                //  console.log('✅ Bài viết nhận về:', res.data);
                setPost(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('❌ Không tìm thấy bài viết:', err.response?.data || err.message);
                router.push('/');
            });
    }, [slug]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        //  console.log('📤 Đang gửi dữ liệu cập nhật:', post); // 👈 Chỉ log tại đây
        try {


            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`, post);
            // alert('✅ Đã cập nhật bài viết!');
            router.push(`/post/${slug}`);
        } catch (err) {
            alert('❌ Lỗi khi cập nhật');
        }
    };

    if (loading || !post) return <p>Đang tải bài viết...</p>;

    return (
        <main className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">✏️ Sửa bài viết</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={post.title}
                    onChange={e => setPost({ ...post, title: e.target.value })}
                    className="w-full border p-2 rounded"
                    placeholder="Tiêu đề"
                />
                <textarea
                    value={post.content}
                    onChange={e => setPost({ ...post, content: e.target.value })}
                    className="w-full border p-2 rounded h-40"
                    placeholder="Nội dung"
                />

                <input
                    type="text"
                    value={post.tags.join(', ')}
                    onChange={e => setPost({ ...post, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                    className="w-full border p-2 rounded"
                    placeholder="Tags (phân cách bởi dấu phẩy)"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    💾 Lưu
                </button>
            </form>
        </main>
    );
}
