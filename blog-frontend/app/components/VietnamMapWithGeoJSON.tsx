'use client';

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

import { Feature, GeoJsonObject } from 'geojson';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Các tỉnh bạn đã đi qua
const visitedProvinces = [
    'Hòa Bình',
    'Thái Nguyên',
    'Đà Nẵng',
    'Hà Nội',
    'Hải Phòng',
    'Thanh Hóa',
    'Khánh Hòa',
];

export default function VietnamMapWithGeoJSON() {
    const [geoData, setGeoData] = useState(null);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        fetch('/data/vietnam34.geojson') // Đặt file geojson tại public/data/vietnam.geojson
            .then((res) => res.json())
            .then((data) => setGeoData(data));
    }, []);

    const onEachFeature = (feature: Feature, layer: L.Layer) => {
        const name =
            feature.properties?.name || feature.properties?.ten_tinh || 'Không rõ';

        const isVisited = visitedProvinces.includes(name);

        (layer as L.Path).setStyle({
            fillColor: 'transparent',  // hoặc có thể bỏ hoàn toàn
            fillOpacity: 0,
            weight: isVisited ? 2.5 : 1,
            color: isVisited ? '#e11d48' : '#cbd5e1', // đỏ hồng với đã đi, xám nhạt chưa đi
            dashArray: isVisited ? '' : '2', // nét đứt cho chưa đi
        });

        layer.bindTooltip(name, { direction: 'top' });
    };


    return (
        <div className="h-[500px] rounded-xl overflow-hidden shadow">
            <MapContainer
                center={[16.5, 106.5]}
                zoom={5.5}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© OpenStreetMap'
                />
                {geoData && <GeoJSON data={geoData} onEachFeature={onEachFeature} />}
            </MapContainer>
        </div>
    );
}
