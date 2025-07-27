import { Suspense } from 'react';
import SearchClient from './SearchClient';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
    return (
        <Suspense fallback={<p className="p-6">⏳ Đang tải trang tìm kiếm...</p>}>
            <SearchClient />
        </Suspense>
    );
}
