"use client";

import { useState, useRef } from "react";

export default function EventClient({ date, name }) {
    const [blown, setBlown] = useState(false);
    const audioRef = useRef(null);

    const handleFirstClick = () => {
        audioRef.current?.play();
    };

    return (
        <div className="event-wrapper" onClick={handleFirstClick}>
            <audio ref={audioRef}>
                <source src="/hpbd.mp3" type="audio/mpeg" />
            </audio>

            <div className="info">
                <div className="date">{date}</div>
                <div className="username">{name}</div>
            </div>

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
