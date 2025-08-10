'use client';

import { useSession, signOut } from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { IoCreateOutline, IoLogOutOutline, IoDocumentTextOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FcSearch } from "react-icons/fc";
import { getServerSession } from 'next-auth/next';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

type HeaderProps = {
    toggleSearch: () => void;
};
//const session = await getServerSession(authOptions);
export default function Header({ toggleSearch }: HeaderProps) {
    const { data: session } = useSession();

    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [openSmallMenu, setOpenSmallMenu] = useState(false);
    const smallMenuRef = useRef<HTMLDivElement>(null);


    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpenMenu(false);
            }
            if (
                smallMenuRef.current &&
                !smallMenuRef.current.contains(event.target as Node)
            ) {
                setOpenSmallMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-gradient-to-r from-pink-100 to-blue-100 text-gray-800 px-6 py-3 flex justify-between items-center shadow relative">
            <div className="flex items-center space-x-6">
                {/* Logo bên trái */}
                <Link href="/" className="flex items-center space-x-3 hover:opacity-80">
                    <img src="/images/logo.png" alt="logo" className="w-10 h-10" />
                    <span className="text-2xl font-bold">Lặng</span>
                </Link>



                {/* Nút tìm kiếm */}
                <button
                    onClick={toggleSearch}
                    className="ml-4 px-2 py-1 rounded hover:bg-pink-200 "

                >
                    <FcSearch size={26} />
                </button>
            </div>

            <div className="flex items-center space-x-4">
                {/*menu */}
                <div className="relative" ref={smallMenuRef}>
                    <button
                        onClick={() => setOpenSmallMenu(!openSmallMenu)}
                        className="p-2 hover:bg-pink-200 rounded"
                    >
                        <FiMenu size={24} />
                    </button>

                    {openSmallMenu && (
                        <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow z-50">
                            <Link
                                href="/about"
                                onClick={() => setOpenSmallMenu(false)}
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Giới thiệu
                            </Link>
                            <Link
                                href="/terms"
                                onClick={() => setOpenSmallMenu(false)}
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Điều khoản sử dụng
                            </Link>
                            <Link
                                href="/privacy"
                                onClick={() => setOpenSmallMenu(false)}
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Chính sách bảo mật
                            </Link>
                        </div>
                    )}
                </div>

                {/* Người dùng bên phải */}
                {session ? (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            className="flex items-center space-x-2 hover:opacity-80"
                        >
                            {session.user && (
                                <>
                                    <Image
                                        src={session.user.image || ''}
                                        alt="Avatar"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <span>{session.user.name}</span>
                                </>
                            )}
                        </button>

                        {openMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded shadow z-50">
                                <Link
                                    href="/profile"
                                    onClick={() => setOpenMenu(false)}
                                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                                >
                                    <CgProfile />
                                    <span className="ml-2"> Hồ sơ</span>
                                </Link>
                                <Link
                                    href="/my-posts"
                                    onClick={() => setOpenMenu(false)}
                                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                                >
                                    <IoDocumentTextOutline />
                                    <span className="ml-2"> Bài viết của tôi</span>
                                </Link>
                                <Link
                                    href="/create"
                                    onClick={() => setOpenMenu(false)}
                                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                                >
                                    <IoCreateOutline />
                                    <span className="ml-2"> Tạo bài viết</span>
                                </Link>
                                {/* thêm nút chỉ riêng cho admin */}
                                {session.user?.role === 'admin' && (
                                    <Link
                                        href="/admin"
                                        onClick={() => setOpenMenu(false)}
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-blue-600"
                                    >
                                        <MdOutlineAdminPanelSettings />
                                        <span className="ml-2">Dashboard Admin</span>
                                    </Link>
                                )}


                                <button
                                    onClick={() => {
                                        setOpenMenu(false);
                                        signOut();
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                                >
                                    <IoLogOutOutline />
                                    <span className="ml-2"> Đăng xuất</span>
                                </button>

                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="bg-pink-300 hover:bg-cyan-600 px-4 py-2 rounded inline-block"
                    >
                        🔐 Đăng nhập
                    </Link>

                )}
            </div>
        </header>
    );
}
