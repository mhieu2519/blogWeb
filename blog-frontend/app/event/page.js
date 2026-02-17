"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import "./event.css";

export default function EventPage() {
    const [blown, setBlown] = useState(false);
    const searchParams = useSearchParams()
    const audioRef = useRef(null)

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    useEffect(() => {
        const dateStr = searchParams.get('t')
        const displayName = searchParams.get('n')

        if (dateStr?.length === 8) {
            setDate(dateStr.replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3'))
        }

        if (displayName) {
            setName(decodeURIComponent(displayName))
        }
    }, [searchParams])
    const handleBlow = (e) => {
        e.stopPropagation()
        setBlown(true)
    }

    const handleFirstClick = () => {
        audioRef.current?.play()
    }


    return (
        <div className='event-wrapper' onClick={handleFirstClick}>

            <audio ref={audioRef}>
                <source src="/hpbd.mp3" type="audio/mpeg" />
            </audio>
            {/* Bokeh particles */}
            {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="bokeh"></div>
            ))}
            {/* 🌸 Flower particles */}
            <div className="flowers">
                {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className="flower">🌸</span>
                ))}
            </div>
            <div className="info">
                <div className="date">{date}</div>
                <div className="username">{name}</div>
            </div>
            <div className="pyro">
                <div className="before"></div>
                <div className="after"></div>
            </div>

            <div className='icon'>🎉</div>

            <div className={`candle ${blown ? "moved" : ""}`}>
                <div
                    id="flame"
                    className={`lit ${blown ? "off" : ""}`}
                    onClick={() => setBlown(true)}
                ></div>
            </div>

            <h2>Chúc Mừng Sinh Nhật</h2>

            <div className={`cake ${blown ? "moved" : ""}`}></div>

            <div className={`overlay ${blown ? "show" : ""}`}></div>

            <div className={`message ${blown ? "show" : ""}`}>
                <h3>Chúc Quỳnh tuổi mới rực rỡ</h3>
                <p>
                    Mong mọi dự định đều thành công, sức khỏe dồi dào và luôn vui vẻ nhé! 💖
                </p>
            </div>
        </div>
    );
}
