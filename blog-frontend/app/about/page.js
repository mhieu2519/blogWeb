'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { Dancing_Script } from 'next/font/google';
import dynamic from 'next/dynamic';
const VietnamMapWithGeoJSON = dynamic(() => import('../components/VietnamMapWithGeoJSON'), {
    ssr: false,
});
//import VietnamMapWithGeoJSON from '../components/VietnamMapWithGeoJSON';




const dancingScript = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    display: 'swap'
});

export default function AboutPage() {
    return (
        <ParallaxProvider>
            <main className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-50 to-white text-gray-800 ">
                {/* Hero Section */}
                <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
                    <Image
                        src="/images/hero-poetry.jpg"
                        alt="Hero"
                        fill
                        className="object-cover brightness-75 object-center"
                        priority
                    />
                    <div className="relative z-10 max-w-3xl px-6">
                        <motion.h1
                            className="text-white text-5xl md:text-6xl font-bold drop-shadow-lg"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <Typewriter
                                options={{
                                    strings: [
                                        "Đi và viết...",
                                        "Những chuyến đi..",
                                        "Văn học – Thơ ca",
                                        "Để chạm đến những điều tươi đẹp nhất",
                                        "Lưu giữ khoảnh khắc,...",
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    delay: 100,
                                    deleteSpeed: 200
                                }}
                            />
                        </motion.h1>
                    </div>
                </section>

                {/* About Me */}
                <section className="max-w-4xl mx-auto py-20 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/images/avatar-writer.png"
                            alt="Tác giả"
                            width={130}
                            height={130}
                            className="rounded-full mx-auto border-4 border-white shadow-md"
                        />
                        <h2 className="text-3xl mt-5 font-bold text-pink-800">Mình là Hieu NM</h2>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                            Yêu văn chương, đam mê khám phá, mình viết để giữ lại những khoảnh khắc, cảm xúc và hành trình.
                        </p>
                    </motion.div>
                </section>

                {/* Writing Journey Section */}
                <section className="max-w-3xl mx-auto py-16 px-6">
                    <h3 className="text-3xl font-semibold text-pink-700 text-center mb-6">📜 Hành trình viết lách</h3>
                    <ul className="space-y-4 text-gray-700">
                        <li><strong>2013:</strong> Những bài viết đầu tiên được biết đến và ghi nhận</li>
                        <li><strong>2017:</strong> Bài thơ đầu tiên xuất hiện trên mạng xã hội</li>
                        <li><strong>2019:</strong> Hành trình đầu tiên đến nơi xa, những bài thơ mới</li>
                        <li><strong>2020:</strong> Bắt đầu ấp ủ và soạn ebook đầu tay</li>
                        <li><strong>20..:</strong> Sẽ còn tiếp tục...</li>
                    </ul>
                </section>

                {/* Places Traveled */}
                <section className="max-w-4xl mx-auto py-16 px-6 text-center">
                    <h3 className="text-3xl font-semibold text-pink-700 mb-6">🌍 Những nơi mình đã đi qua</h3>
                    <p className="text-gray-700">Mình từng đặt chân đến Hòa Bình, Thái Nguyên, Thanh Hóa... Mỗi nơi là một miền ký ức.</p>
                    <p className="text-gray-700 mb-4">Đà Nẵng và Khánh Hòa mình hiện chưa đặt chân đến, nhưng với mong muốn thể hiện chủ quyền lãnh thổ dân tộc nên mình đã đánh dấu lại trên bản đồ.</p>
                    <VietnamMapWithGeoJSON />
                </section>

                {/* Music Section */}
                <section className="max-w-4xl mx-auto py-24 px-6 text-center">
                    <h3 className="text-3xl font-semibold text-pink-700 mb-6">🎸 Góc âm nhạc – Bức Tường</h3>
                    <p className="text-gray-700 mb-4">Mình là fan của ban nhạc Bức Tường – âm nhạc của họ đã đồng hành cùng mình trong nhiều chuyến đi và những khoảnh khắc viết lách.</p>

                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/4RgCllKvJuc?si=a1q7akSMu4-E5F-O"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="rounded-xl shadow-md"
                    />


                </section>

                {/* Parallax Section */}
                <section className="relative h-[60vh] my-16 overflow-hidden">
                    <Parallax speed={-10}>
                        <div
                            className="h-[60vh] bg-cover bg-center bg-no-repeat opacity-70"
                            style={{
                                backgroundImage: "url('/images/parallax.jpg')",
                            }}
                        />
                    </Parallax>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                        <h2 className="text-white text-3xl md:text-4xl font-semibold">
                            “Viết – không phải để nổi tiếng, mà để sống thêm lần nữa.”
                        </h2>
                    </div>
                </section>

                {/* Categories */}
                <section className="max-w-5xl mx-auto py-20 px-6">
                    <h3 className="text-2xl text-center font-semibold text-pink-700 mb-10">Mình thường viết về</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            ['📖 Văn học', 'Cảm nhận, trích đoạn, tác phẩm yêu thích'],
                            ['✈️ Du lịch', 'Ký sự rong chơi, những góc nhìn mới'],
                            ['📝 Thơ ca', 'Chữ nghĩa đi vào hồn, gió thổi thành thơ'],
                        ].map(([title, desc]) => (
                            <motion.div
                                key={title}
                                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 40 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-xl font-semibold text-pink-600">{title}</h4>
                                <p className="mt-2 text-gray-600">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Footer poetic note */}
                <footer className="text-center text-2xxl font-bold text-pink-700 text-gray-500 py-10">
                    ~~ Lưu lại những điều đẹp đẽ bằng con chữ.~
                </footer>
            </main>
        </ParallaxProvider>
    );
}
