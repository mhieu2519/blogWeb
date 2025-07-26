'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    PieChart, Pie, Cell, Tooltip,
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import classNames from 'classnames';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C266ED'];

interface TagStat {
    tag: string;
    count: number;
}

interface ViewData {
    _id: string;
    views: number;
}

interface Stats {
    totalPosts: number;
    totalViews: number;
    topTags: TagStat[];
    dailyViews: ViewData[];
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [days, setDays] = useState(7);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stats/summary?days=${days}`)
            .then((res) => setStats(res.data))
            .catch(console.error);
    }, [days]);

    return (
        <div className="max-w-6xl mx-auto py-12 px-6 space-y-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold"></h1>
                <div className="space-x-2">
                    {[7, 30, 90].map(option => (
                        <button
                            key={option}
                            className={classNames(
                                'px-4 py-1 border rounded text-sm',
                                days === option
                                    ? 'bg-black text-white dark:bg-white dark:text-black'
                                    : 'bg-gray-100 text-black dark:bg-zinc-700 dark:text-white hover:brightness-110'
                            )}
                            onClick={() => setDays(option)}
                        >
                            {option} ngày
                        </button>
                    ))}
                </div>
            </div>

            {!stats ? (
                <p>Đang tải thống kê...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div style={{ background: 'var(--background-admin)' }}
                            className=" rounded-xl p-6 shadow">
                            <h2 className="text-lg font-medium">📝 Tổng bài viết</h2>
                            <p className="text-3xl font-bold mt-2">{stats.totalPosts}</p>
                        </div>
                        <div style={{ background: 'var(--background-admin)' }}
                            className=" rounded-xl p-6 shadow">
                            <h2 className="text-lg font-medium">👁 Tổng lượt xem</h2>
                            <p className="text-3xl font-bold mt-2">{stats.totalViews}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div style={{ background: 'var(--background-admin)' }}
                            className=" rounded-xl p-6 shadow">
                            <h2 className="text-lg font-semibold mb-4">🏷️ Tag phổ biến</h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={stats.topTags}
                                        dataKey="count"
                                        nameKey="tag"
                                        outerRadius={80}
                                        label
                                    >
                                        {stats.topTags.map((_, i) => (
                                            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div style={{ background: 'var(--background-admin)' }}
                            className=" rounded-xl p-6 shadow">
                            <h2 className="text-lg font-semibold mb-4">📈 Biểu đồ lượt xem</h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={stats.dailyViews}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
