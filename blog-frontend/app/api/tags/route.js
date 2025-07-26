import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET() {
    await connectToDB();

    const tags = await Post.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
    ]);

    const tagNames = tags.map((t) => t._id);

    return NextResponse.json(tagNames);
}
