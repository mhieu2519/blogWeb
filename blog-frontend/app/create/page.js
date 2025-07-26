'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';


export default function CreatePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const [previewUrl, setPreviewUrl] = useState('');

    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login'); // hoặc show thông báo

        }
    }, [status]);

    if (status === 'loading') {
        return <p className="p-6 text-center">⏳ Đang kiểm tra đăng nhập...</p>;
    }
    if (!session) return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = '';
            let publicId = '';

            if (image) {
                const formData = new FormData();
                formData.append('image', image);

                const uploadRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, formData);
                imageUrl = uploadRes.data.url;
                publicId = uploadRes.data.public_id;
            }

            const postData = {
                title,
                content,
                tags: tags
                    ? tags.split(',').map((tag) => tag.trim())
                    : ['chưa gắn tag'],
                coverImageUrl: imageUrl || '',
                publicId: publicId || '',
                author: session.user.email,
            };

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, postData);

            setSuccess(true);
            setImage(null);          // Dọn file
            setPreviewUrl('');       // Dọn ảnh xem trướ
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (err) {
            console.error(err);
            alert('❌ Có lỗi khi đăng bài!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">✍️ Tạo bài viết mới</h1>

            {success ? (
                <div className="bg-green-100 border border-green-500 text-green-800 px-4 py-3 rounded mb-4">
                    ✅ Bài viết đã được đăng! <br />
                    👉 Đang chuyển về trang chủ trong 3 giây...
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <textarea
                        placeholder="Nội dung"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 h-40 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tags (cách nhau bằng dấu phẩy)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setImage(file);
                            if (previewUrl) {
                                URL.revokeObjectURL(previewUrl); // ✅ dọn ảnh cũ
                            }
                            if (file) {
                                setPreviewUrl(URL.createObjectURL(file));
                            } else {
                                setPreviewUrl('');
                            }
                        }}
                        className="w-full p-2 border rounded"
                    />


                    {previewUrl && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-600 mb-1">╎Xem trước ảnh:</p>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="max-h-64 rounded border"
                            />
                        </div>
                    )}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            {loading ? 'Đang đăng...' : 'Đăng bài viết'}
                        </button>
                        <Link
                            href="/"
                            className="inline-block bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition text-center"
                        >
                            ❌ Huỷ bỏ
                        </Link>

                    </div>
                </form>
            )
            }
        </main >
    );
}
