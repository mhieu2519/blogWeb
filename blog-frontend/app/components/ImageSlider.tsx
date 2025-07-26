'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const slides = [
    {
        image: '/images/slide1.png',
        title: 'Khám phá góc viết chill nhất',
    },
    {
        image: '/images/slide2.png',
        title: 'Góc chia sẻ tri thức nhẹ nhàng',
    },
    {
        image: '/images/slide3.png',
        title: 'Blog của bạn – Không gian của bạn',
    },
];

export default function ImageSlider() {
    return (
        <div className="relative rounded overflow-hidden">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                effect="fade"
                className="w-full h-[400px]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <h2 className="text-white text-3xl font-bold text-center drop-shadow-md">
                                    {slide.title}
                                </h2>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* 👉 Nút điều hướng */}

            <div className="swiper-button-prev !text-white !left-2 !z-50">
                <ChevronLeftIcon className="w-8 h-8 text-white hover:scale-110 transition" />
            </div>
            <div className="swiper-button-next !text-white !right-2 !z-50">
                <ChevronRightIcon className="w-8 h-8 text-white hover:scale-110 transition" />
            </div>



        </div>
    );
}
