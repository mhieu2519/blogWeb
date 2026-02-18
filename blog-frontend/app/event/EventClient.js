"use client";

import { useState, useRef } from "react";

export default function EventClient({ date, name }) {
    const [blown, setBlown] = useState(false);
    const audioRef = useRef(null);

    const handleFirstClick = () => {
        audioRef.current?.play();
    };
    const getAge = (dateStr) => {
        if (!dateStr) return "";

        const [day, month, year] = dateStr.split("-");
        const birth = new Date(year, month - 1, day);
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();
        return age;
    };

    const age = getAge(date);

    return (
        <div className="event-wrapper" onClick={handleFirstClick}>
            <audio ref={audioRef}>
                <source src="/hpbd.mp3" type="audio/mpeg" />
            </audio>
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
            {/* Bokeh particles */}
            {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="bokeh"></div>
            ))}
            <div className="pyro">
                <div className="before"></div>
                <div className="after"></div>
            </div>

            <div className={`number-candles ${blown ? "moved" : ""}`}>
                {age.toString().split("").map((digit, i) => (
                    <div key={i} className="digit-candle">
                        {digit}
                        {/* {!blown && <div className="digit-flame"></div>} */}
                    </div>
                ))}
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

            <div className={`message ${blown ? "show" : ""}`}>
                <h3>Chúc Quỳnh tuổi mới rực rỡ</h3>
                <p>
                    Mong mọi dự định đều thành công, sức khỏe dồi dào và luôn vui vẻ nhé! 💖
                </p>
            </div>
        </div>
    );
}
