// app/page.tsx hoặc app/page.js

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ImageSlider from './components/ImageSlider';


import { FaYoutube, FaInstagram, FaPinterest } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { GrDocumentStore } from "react-icons/gr";
export default function HomePage() {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
            .then((res) => setPosts(res.data))
            .catch(console.error);
    }, []);

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            {/* Hero Section */}
            <section
                className="text-center py-12 rounded-xl mb-12"
                style={{ background: "var(--background-hero)" }}
            >
                <h1 className="text-4xl font-bold mb-4">🌿 Lặng</h1>
                <p className="text-gray-600">Nơi chia sẻ cảm hứng, kỹ năng và kinh nghiệm sống mỗi ngày.</p>
            </section>
            <div className="mb-10">
                <ImageSlider />


            </div>

            {/* Danh sách bài viết */}
            <section>
                <h2 className="text-2xl font-semibold mb-8">📑 Bài viết mới nhất</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.slice(0, 5).map((post) => (
                        <div key={post._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                            {post.coverImageUrl && (
                                <img src={post.coverImageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            )}
                            <div className="p-4">
                                <Link href={`/post/${post.slug}`} className="text-xl font-semibold hover:underline">
                                    {post.title}
                                </Link>
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* 👉 Nút chuyển tới trang tất cả bài viết */}
                <div className="mt-20 text-center">
                    <Link href="/all-posts" className="inline-flex text-pink-600 hover:underline text-base font-medium">
                        <GrDocumentStore size={21} />
                        <span className='ml-2'>Xem tất cả bài viết</span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 text-center text-gray-500 text-sm border-t pt-6">
                <div className="flex justify-center gap-6 text-xl">
                    <a
                        href="https://www.youtube.com/@hieunm2519"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-500"
                    >
                        <FaYoutube />
                    </a>
                    <a
                        href="https://www.instagram.com/hnm_241"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-500"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://www.pinterest.com/minhhieu00/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-400"
                    >
                        <FaPinterest />
                    </a>
                    <a
                        href="https://x.com/minhhieuhd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black"
                    >
                        <FaSquareXTwitter />
                    </a>

                </div>
                <div className="text-xs text-gray-400 mt-4">
                    Made with ❤️ by hnm
                </div>

            </footer>
        </main>
    );
}
