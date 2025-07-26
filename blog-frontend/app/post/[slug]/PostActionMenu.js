'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PiDotsThreeCircleLight } from 'react-icons/pi';

export default function PostActionMenu({ slug, onDelete }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const router = useRouter();

    // ✅ Đóng menu khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button onClick={() => setOpen(!open)} className="p-2 hover:opacity-80">
                <PiDotsThreeCircleLight size={24} />
            </button>

            {open && (
                <div className="absolute eft-full ml-2 w-48 bg-white shadow-xl rounded-lg p-2 z-50">
                    <div className="space-y-2">
                        <Link
                            href={`/edit/${slug}`}
                            onClick={() => setOpen(false)}
                            className="block w-full text-left bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                            ✏️ Sửa bài viết
                        </Link>
                        <button
                            onClick={() => {
                                onDelete();
                                setOpen(false);
                            }}
                            className="block w-full text-left bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            🗑️ Xoá bài viết
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
