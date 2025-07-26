'use client';

import { useState } from 'react';
import Header from './Header';
import TopBanner from './TopBanner';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import SearchOverlay from './SearchOverlay';
import DarkModeFloatingButton from './DarkModeFloatingButton';

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {

    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <Header toggleSearch={() => setSearchOpen(true)} />
            <TopBanner />

            <main className="flex-1">{children}</main>

            <Footer />
            <ScrollToTopButton />
            <DarkModeFloatingButton />
            {/* 👇 Overlay hiển thị nếu searchOpen true */}
            {searchOpen && <SearchOverlay isOpen={true} onClose={() => setSearchOpen(false)} />}
        </>
    );
}
