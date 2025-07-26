import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(req) {
    await connectToDB();
    const { searchParams } = new URL(req.url);

    const q = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 6;
    const skip = (page - 1) * limit;

    const tags = searchParams.getAll('tag');

    const filter = {
        ...(q && { title: { $regex: q, $options: 'i' } }),
        ...(tags.length > 0 && { tags: { $in: tags } }),
    };

    const [posts, total] = await Promise.all([
        Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Post.countDocuments(filter),
    ]);

    return NextResponse.json({ posts, total });
}
