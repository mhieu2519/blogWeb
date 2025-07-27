import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get('q') || '';
    const page = searchParams.get('page') || '1';
    const tagParams = searchParams.getAll('tag');
    const tags = tagParams.map(tag => `tag=${encodeURIComponent(tag)}`).join('&');

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${q}&page=${page}&${tags}`;

    try {
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch search results');

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error('Fetch error in /api/search:', err);
        return NextResponse.json({ posts: [], total: 0 }, { status: 500 });
    }
}
