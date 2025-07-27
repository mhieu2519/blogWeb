// app/admin/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import AdminDashboard from './dashboard';
import { FcAcceptDatabase } from "react-icons/fc";
import { FcDocument, FcComments } from "react-icons/fc";
import Link from 'next/link';
export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        redirect('/'); // Không phải admin thì chuyển về trang chủ
    }

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <FcAcceptDatabase size={40} />
                <span > Dashboard Admin</span>
            </h1>
            <p>Chào {session.user.name}! Bạn là quản trị viên.</p>
            {/* Sau này bạn có thể thêm bảng thống kê, danh sách bài viết, người dùng, v.v. */}
            {/* Các liên kết tới trang con */}
            <div className="space-y-4">
                <Link
                    href="/admin/posts"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white rounded hover:bg-blue-200 transition"
                >
                    <FcDocument size={24} />
                    Quản lý Bài viết
                </Link>

                <Link
                    href="/admin/comments"
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-white rounded hover:bg-green-200 transition"
                >
                    <FcComments size={24} />
                    Quản lý Bình luận
                </Link>
            </div>
            <AdminDashboard />
        </div>
    );
}
