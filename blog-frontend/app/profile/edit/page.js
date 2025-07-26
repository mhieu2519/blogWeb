'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoSaveOutline, IoReturnUpBackOutline } from "react-icons/io5";

import axios from 'axios';

export default function EditProfilePage() {
    const { data: session, status } = useSession();
    const [form, setForm] = useState({
        name: '',
        gender: '',
        birthday: '',
    });
    const router = useRouter();

    useEffect(() => {
        if (session?.user?.email) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user.email}`)
                .then(res => {
                    const user = res.data;
                    setForm({
                        name: user.name || '',
                        gender: user.gender || '',
                        birthday: user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : '',
                    });
                })
                .catch(console.error);
        }
    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user.email}`, form);
            alert('✅ Hồ sơ đã được cập nhật!');

            router.push('/profile');
        } catch (err) {
            console.error(err);
            alert('❌ Lỗi khi cập nhật hồ sơ!');
        }
    };

    if (status === 'loading') return <p className="p-6">Đang tải...</p>;
    if (!session) return <p className="p-6">Bạn chưa đăng nhập.</p>;

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">✏️ Chỉnh sửa hồ sơ</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Tên</label>
                    <input
                        type="text"
                        value={form.name}
                        readOnly //khogn cho phép chỉnh sửa tên
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Giới tính</label>
                    <select
                        value={form.gender}
                        onChange={e => setForm({ ...form, gender: e.target.value })}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">-- Chọn giới tính --</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                </div>
                <div>
                    <label className="block font-semibold mb-1">Ngày sinh</label>
                    <input
                        type="date"
                        value={form.birthday}
                        onChange={e => setForm({ ...form, birthday: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="inline-flex bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        <IoSaveOutline size={20} />
                        <span className='ml-2'> Lưu</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/profile')}
                        className=" inline-flex bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        <IoReturnUpBackOutline size={20} />
                        <span className='ml-2'>Quay lại hồ sơ</span>
                    </button>
                </div>
            </form>
        </main>
    );
}
