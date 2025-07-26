// app/admin/comments/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import CommentAdminClient from './commentsAdmin';

export default async function AdminCommentsPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        redirect('/');
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">💬 Quản lý bình luận</h1>
            <CommentAdminClient />
        </div>
    );
}
