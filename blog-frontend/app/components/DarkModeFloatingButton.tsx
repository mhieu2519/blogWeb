'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
export default function DarkModeFloatingButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="fixed bottom-20 right-6 z-50 bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-900 dark:text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
            aria-label="Toggle Dark Mode"
        >
            {isDark ? <IoSunnyOutline size={20} /> : <IoMoonOutline size={20} />}
        </button>
    );
}
