// app/admin/posts/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/authOptions";
import { redirect } from 'next/navigation';
import PostAdminClient from './postsAdmin';

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        redirect('/');
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">📄 Quản lý bài viết</h1>
            <PostAdminClient />
        </div>
    );
}
