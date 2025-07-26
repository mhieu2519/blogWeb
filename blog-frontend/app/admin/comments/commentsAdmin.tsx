// app/admin/comments/commentAdmin.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { IoReturnUpBack } from "react-icons/io5";
export interface Comment {
    _id: string; // MongoDB luôn có _id
    postSlug: string;
    authorEmail: string;
    authorName: string;
    authorImage: string;
    content: string;
    createdAt: string; // hoặc Date nếu bạn xử lý bằng Date
}



export default function CommentAdminClient() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [selected, setSelected] = useState<string[]>([]);


    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/`)
            .then(res => setComments(res.data))
            .catch(console.error);
    }, []);

    const handleSelect = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        if (!selected.length) return;
        if (!confirm(`Bạn chắc chắn xoá ${selected.length} bình luận?`)) return;

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/delete-multiple`, {
                ids: selected
            });
            setComments(comments.filter(c => !selected.includes(c._id)));
            setSelected([]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="flex gap-4">
                <button
                    onClick={handleDeleteSelected}
                    disabled={selected.length === 0}
                    className="mb-4 bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    🗑️ Xoá {selected.length} bình luận đã chọn
                </button>

                <Link href="/admin">
                    <button className="mb-4 flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                        <IoReturnUpBack size={24} />
                        <span className="ml-2"> Quay lại</span>
                    </button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 dark:border-zinc-700 ">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white">
                            <th className="p-2 text-left">Chọn</th>
                            <th className="p-2 text-left">Người gửi</th>
                            <th className="p-2 text-left">Bài viết</th>
                            <th className="p-2 text-left">Nội dung</th>
                            <th className="p-2 text-center">Ngày</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map(comment => (
                            <tr key={comment._id} className="border-t dark:border-zinc-700">
                                <td className="p-2">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(comment._id)}
                                        onChange={() => handleSelect(comment._id)}
                                    />
                                </td>
                                <td className="p-2">{comment.authorName || 'Ẩn danh'}</td>
                                <td className="p-2">{comment.postSlug}</td>
                                <td className="p-2">{comment.content}</td>
                                <td className="text-center">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
