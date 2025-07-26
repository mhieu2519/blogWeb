'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import PostActionMenu from './PostActionMenu';

export default function ClientPostDetail({ post }) {
    const router = useRouter();
    const { data: session } = useSession();
    const [userData, setUserData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [openMenu, setOpenMenu] = useState(false);

    // Lấy thông tin user và bình luận
    useEffect(() => {
        if (session?.user?.email) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user.email}`)
                .then(res => setUserData(res.data))
                .catch(err => console.error('❌ Không thể tải user data', err));
        }

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${post.slug}`)
            .then(res => setComments(res.data))
            .catch(err => console.error('❌ Không thể tải bình luận', err));
        if (post?._id) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${post._id}/view`)
                .catch(console.error);
        }
    }, [session, post.slug, post?._id]);

    const handleDelete = async () => {
        if (!confirm('Bạn có chắc chắn muốn xoá bài viết này?')) return;
        router.push('/');
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${post.slug}`, {
            data: {
                authorEmail: session?.user?.email,
                role: userData?.role,
            }
        }).catch(err => console.error('❌ Lỗi khi xoá:', err));
    };

    const handleSubmitComment = async () => {
        if (!newComment.trim() || !session?.user) return;
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
                postSlug: post.slug,
                content: newComment,
                authorName: session.user.name,
                authorEmail: session.user.email,
                authorImage: session.user.image,
            });
            setComments([res.data, ...comments]);
            setNewComment('');
        } catch (err) {
            console.error('❌ Lỗi khi gửi bình luận', err);
        }
    };

    return (
        <main className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-500 mb-4">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</p>

            {post.coverImageUrl && (
                <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-auto rounded-lg mb-6"
                />
            )}

            <div className="whitespace-pre-line text-base leading-relaxed">{post.content}</div>

            {post.tags?.length > 0 && (
                <div className="mt-6">
                    <span className="text-sm text-gray-600">Tags: </span>
                    {post.tags.map((tag, i) => (
                        <span key={i} className="inline-block bg-gray-200 text-sm px-2 py-1 rounded mr-2">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                👁 {post.views ?? 0} lượt xem
            </p>


            {session && (session.user.email === post.author || userData?.role === 'admin') && (
                <PostActionMenu slug={post.slug} onDelete={handleDelete} />
            )}



            {/* Bình luận */}
            <div className="mt-10">
                <h3 className="text-lg font-semibold mb-2">💬 Bình luận</h3>

                {session ? (
                    <div className="mb-4">
                        <textarea
                            className="w-full border rounded p-2 mb-2"
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Nhập bình luận..."
                        />
                        <button
                            onClick={handleSubmitComment}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Gửi bình luận
                        </button>
                    </div>
                ) : (
                    <p className="text-sm text-gray-600 italic">
                        🔒 Vui lòng đăng nhập để bình luận.
                    </p>
                )}

                <div className="space-y-4">
                    {comments.map(comment => (
                        <div key={comment._id} className="border p-3 rounded">
                            <div className="flex items-center space-x-2 mb-1">
                                {comment.authorImage && (
                                    <img
                                        src={comment.authorImage}
                                        alt={comment.authorName}
                                        className="w-6 h-6 rounded-full"
                                    />
                                )}
                                <span className="font-medium">{comment.authorName}</span>
                                <span className="text-xs text-gray-500 mb-4">
                                    {new Date(comment.createdAt).toLocaleString('vi-VN')}
                                </span>
                            </div>
                            <p>{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
