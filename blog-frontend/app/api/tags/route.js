import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tags`, {
            cache: 'no-store',
        });
        if (!res.ok) throw new Error('Failed to fetch tags');

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error('Fetch error in /api/tags:', err);
        return NextResponse.json([], { status: 500 });
    }
}
