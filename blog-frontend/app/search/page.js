'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const tagParams = searchParams.getAll('tag');

    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);

    const limit = 6;
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        setLoading(true);
        const tagQuery = tagParams.map((t) => `tag=${t}`).join('&');
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${query}&page=${page}&${tagQuery}`)
            .then((res) => {
                setResults(res.data.posts);
                setTotal(res.data.total);
            })
            .catch(() => setResults([]))
            .finally(() => setLoading(false));
    }, [query, page, tagParams.join(',')]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tags`).then((res) => setTags(res.data));
    }, []);

    const highlight = (text) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <mark key={i} className="bg-yellow-200">{part}</mark>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    };

    const toggleTag = (tag) => {
        const newTags = tagParams.includes(tag)
            ? tagParams.filter((t) => t !== tag)
            : [...tagParams, tag];
        const tagString = newTags.map((t) => `tag=${t}`).join('&');
        router.push(`/search?q=${query}&${tagString}`);
    };

    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-2xl font-bold mb-4">
                🔍 Kết quả cho: <span className="text-blue-600">{query}</span>
            </h1>

            <div className="mb-6">
                <p className="text-sm font-medium mb-2">Lọc theo tag:</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                        <button
                            key={t}
                            onClick={() => toggleTag(t)}
                            className={`px-3 py-1 rounded-full text-sm border transition ${tagParams.includes(t) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <p>⏳ Đang tìm kiếm...</p>
            ) : results.length === 0 ? (
                <p className="text-gray-500 italic">Không tìm thấy bài viết nào phù hợp.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {results.map((post) => (
                        <Link
                            key={post._id}
                            href={`/post/${post.slug}`}
                            className="p-4 border rounded-lg hover:shadow transition"
                        >
                            {post.coverImageUrl && (
                                <img
                                    src={post.coverImageUrl}
                                    alt={post.title}
                                    className="w-full h-40 object-cover mb-3 rounded"
                                />
                            )}
                            <h3 className="font-semibold text-lg line-clamp-2">{highlight(post.title)}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                            </p>
                        </Link>
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Link
                            key={p}
                            href={`/search?q=${query}&${tagParams.map((t) => `tag=${t}`).join('&')}&page=${p}`}
                            className={`px-3 py-1 border rounded ${p === page ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                        >
                            {p}
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
