'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ScrollToTopButton from '../components/ScrollToTopButton'; // Assuming you have a ScrollToTopButton component
import { BsJournalBookmark } from "react-icons/bs";

const POSTS_PER_PAGE = 6; // Number of posts to display per page

export default function AllPostsPage() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
            .then((res) => setPosts(res.data))
            .catch(console.error);
    }, []);

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const currentPosts = posts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    // Function to generate pagination buttons with ellipsis
    const getPaginationButtons = () => {
        const buttons = [];
        const maxButtons = 5; // Maximum number of page buttons to show
        const sideButtons = 2; // Number of buttons to show on each side of current page

        if (totalPages <= maxButtons) {
            // Show all pages if total pages are less than or equal to maxButtons
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(i);
            }
        } else {
            // Always show first page
            buttons.push(1);

            // Calculate start and end for middle buttons
            let startPage = Math.max(2, currentPage - sideButtons);
            let endPage = Math.min(totalPages - 1, currentPage + sideButtons);

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                buttons.push('...');
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                buttons.push(i);
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                buttons.push('...');
            }

            // Always show last page
            if (totalPages > 1) {
                buttons.push(totalPages);
            }
        }

        return buttons;
    };

    // Handle Previous and Next button clicks
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="flex items-center text-3xl  font-bold mb-8">
                <BsJournalBookmark />
                <span className="ml-2">Tất cả bài viết</span>
            </h1>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-2">
                {currentPosts.map((post) => (
                    <div key={post._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                        {post.coverImageUrl && (
                            <img src={post.coverImageUrl} alt={post.title} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-4">
                            <Link href={`/post/${post.slug}`} className="text-xl font-semibold hover:underline">
                                {post.title}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">
                                {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <footer className="mt-12 text-center text-gray-500">
                {/* Pagination */}
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={handlePrevious}
                        className={`w-10 h-10 rounded border ${currentPage === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-black hover:bg-gray-100'
                            }`}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                    {getPaginationButtons().map((page, index) => (
                        <button
                            key={index}
                            onClick={() => typeof page === 'number' && setCurrentPage(page)}
                            className={`w-10 h-10 rounded border ${page === currentPage
                                ? 'bg-pink-300 text-white'
                                : typeof page === 'number'
                                    ? 'bg-white text-black hover:bg-gray-100'
                                    : 'bg-white text-black cursor-default'
                                }`}
                            disabled={typeof page !== 'number'}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={handleNext}
                        className={`w-10 h-10 rounded border ${currentPage === totalPages
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-black hover:bg-gray-100'
                            }`}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
                <ScrollToTopButton />
            </footer>

        </main>
    );
}