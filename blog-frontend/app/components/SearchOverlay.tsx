'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function SearchOverlay({ isOpen, onClose }: Props) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    // Đóng khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    // Gọi API tìm kiếm
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                axios
                    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${query}`)
                    .then((res) => setResults(res.data.posts || []))
                    .catch(() => setResults([]));
            } else {
                setResults([]);
            }
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className="fixed inset-0 z-[1000] bg-black/30 backdrop-blur-sm">
            <div
                ref={overlayRef}
                className="bg-white rounded-b-2xl shadow-lg mx-auto mt-6 max-w-5xl w-full p-6 animate-slideDown h-[35vh] overflow-auto"
            >
                {/* Thanh tìm kiếm */}
                <div className="flex justify-between items-center mb-6">
                    <input
                        type="text"
                        placeholder="🔍 Tìm bài viết..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 p-4 border rounded text-lg w-full shadow-sm"
                        autoFocus
                    />
                    <button
                        onClick={onClose}
                        className="ml-4 text-gray-600 hover:text-black text-sm"
                    >
                        Đóng
                    </button>
                </div>

                {/* Kết quả */}
                <h3 className="text-lg font-semibold mb-4">Blog Chill</h3>
                {results.length === 0 ? (
                    <p className="text-gray-500 italic">Không tìm thấy kết quả phù hợp.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {results.map((post: any) => (
                            <Link
                                key={post._id}
                                href={`/post/${post.slug}`}
                                onClick={onClose}
                                className="p-4 border rounded hover:shadow-md transition"
                            >
                                {post.coverImageUrl && (
                                    <img
                                        src={post.coverImageUrl}
                                        className="w-full h-28 object-cover mb-2 rounded"
                                        alt={post.title}
                                    />
                                )}
                                <h4 className="font-semibold text-sm line-clamp-2">
                                    {post.title}
                                </h4>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                    {post.description || ''}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
                <div className="mt-6 text-center">
                    <Link
                        href={`/search?q=${query}`}
                        onClick={onClose}
                        className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition"
                    >
                        Show All Results
                    </Link>
                </div>
            </div>
        </div>
    );
}
