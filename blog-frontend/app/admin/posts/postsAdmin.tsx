'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { IoReturnUpBack } from "react-icons/io5";

export interface Post {
    _id: string;
    title: string;
    slug: string;
    content: string;
    coverImageUrl: string;
    publicId: string;
    tags: string[];
    author: string;
    createdAt: string;
    views: number;
}

export default function PostAdminClient() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
            .then((res) => setPosts(res.data))
            .catch(console.error);
    }, []);

    const handleSelect = (slug: string) => {
        setSelected((prev) =>
            prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
        );
    };

    const handleDeleteSelected = async () => {
        if (!selected.length) return;
        if (!confirm(`Bạn chắc chắn xoá ${selected.length} bài viết?`)) return;

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/delete-multiple`, {
                slugs: selected,
                role: 'admin',
                authorEmail: 'admin@email.com',
            });

            setPosts(posts.filter((p) => !selected.includes(p.slug)));
            setSelected([]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="flex gap-4 mb-4 flex-wrap">
                <button
                    onClick={handleDeleteSelected}
                    disabled={selected.length === 0}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 transition"
                >
                    🗑️ Xoá {selected.length} bài viết đã chọn
                </button>

                <Link href="/admin">
                    <button className="flex items-center bg-gray-300 text-gray-800 dark:bg-zinc-700 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-zinc-600 transition">
                        <IoReturnUpBack size={20} />
                        <span className="ml-2">Quay lại</span>
                    </button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 dark:border-zinc-700 rounded-md shadow">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white">
                            <th className="p-2 text-left">Chọn</th>
                            <th className="p-2 text-left">Tiêu đề</th>
                            <th className="p-2 text-center">Lượt xem</th>
                            <th className="p-2 text-center">Tác giả</th>
                            <th className="p-2 text-center">Ngày đăng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr
                                key={post._id}
                                className="group border-t border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                            >
                                <td className="p-2">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(post.slug)}
                                        onChange={() => handleSelect(post.slug)}
                                    />
                                </td>
                                <td className="p-2 group-hover:text-red-600">{post.title}</td>
                                <td className="text-center group-hover:text-red-600">{post.views}</td>
                                <td className="text-center group-hover:text-red-600">{post.author}</td>
                                <td className="text-center group-hover:text-red-600">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
