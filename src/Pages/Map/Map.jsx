import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useSearchParams } from "react-router-dom";
import { Button, Input, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { t } from "i18next";
import { SearchOutlined } from "@ant-design/icons";

const DEFAULT_LOCATION = { lat: 21.028511, lng: 105.804817 }; // Hồ Gươm fallback

// Tạo icon màu xanh cho start, đỏ cho destination
const startIcon = new L.Icon({
    iconUrl: "https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png", // màu xanh
    iconSize: [50, 50],
    iconAnchor: [20, 41],
    popupAnchor: [0, -41]
});

const destIcon = new L.Icon({
    iconUrl: 'https://pngimg.com/d/google_maps_pin_PNG46.png', // màu đỏ
    iconSize: [45, 45],
    iconAnchor: [20, 41],
    popupAnchor: [0, -41]
});

const MapDirection = () => {
    const mapRef = useRef(null);
    const routingRef = useRef(null);
    const [searchPrams] = useSearchParams();
    const [loading, setLoading]= useState(false)
    const [destinationCoords, setDestinationCoords] = useState({
        lat: searchPrams.get('lat'),
        lng: searchPrams.get('lng')
    });
    const [error, setError] = useState("");
    const [currentLocation, setCurrentLocation] = useState(DEFAULT_LOCATION);
    const [currentSearch, setCurrenSearch] = useState(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map").setView([currentLocation.lat, currentLocation.lng], 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap",
            }).addTo(mapRef.current);
        }
    }, []);

    // Lấy vị trí người dùng
    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Trình duyệt không hỗ trợ lấy vị trí");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCurrentLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
            },
            (err) => {
                setError(err.message);
            }
        );
    }, []);

    // Vẽ đường đi và marker
    useEffect(() => {
        if (!destinationCoords || !mapRef.current) return;

        // Remove previous routing
        if (routingRef.current) {
            mapRef.current.removeControl(routingRef.current);
        }

        routingRef.current = L.Routing.control({
            waypoints: [
                L.latLng(currentLocation.lat, currentLocation.lng),
                L.latLng(destinationCoords.lat, destinationCoords.lng),
            ],
            show: false,
            lineOptions: { addWaypoints: false },
        }).addTo(mapRef.current);

        // Xóa các marker cũ (nếu cần)
        mapRef.current.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                mapRef.current.removeLayer(layer);
            }
        });

        // Marker điểm bắt đầu
        L.marker([currentLocation.lat, currentLocation.lng], { icon: startIcon })
            .addTo(mapRef.current)
            .bindPopup(t('startPoint'));

        // Marker điểm đến
        L.marker([destinationCoords.lat, destinationCoords.lng], { icon: destIcon })
            .addTo(mapRef.current)
            .bindPopup(t('endPoint'));

        // Zoom vừa với 2 điểm
        const group = new L.featureGroup([
            L.marker([currentLocation.lat, currentLocation.lng]),
            L.marker([destinationCoords.lat, destinationCoords.lng])
        ]);
        mapRef.current.fitBounds(group.getBounds().pad(0.5));
    }, [currentLocation, destinationCoords]);

    const handleSearch = async () => {
        if (!currentSearch) return;
        setLoading(true)
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(currentSearch)}`
            );
            const data = await res.json();
            if (data && data.length > 0) {
                setCurrentLocation({
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon),
                });
                setError("");
            } else {
                setError("Không tìm thấy địa chỉ");
            }
            setLoading(false)
        } catch (err) {
            setError("Lỗi khi tìm địa chỉ");
        }
    };

    return (
        <Layout className='w-100 bg-white'>
            <Content style={{ padding: '80px 30px' }}>
                <div className="mt-3" style={{ height: '75vh' }}>
                    <div style={{ marginBottom: 10 }}>
                        <Input
                            type="text"
                            value={currentSearch || ""}
                            onChange={(e) => setCurrenSearch(e.target.value)}
                            placeholder={t('enterAddress')}
                            style={{ width: "300px", padding: "5px" }}
                        />
                        <Button loading={loading} icon={<SearchOutlined/>} onClick={handleSearch} style={{ marginLeft: 10 }}>
                            {t('searchRoad')}
                        </Button>
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div style={{ width: "100%", height: "100%" }}>
                        <div id="map" style={{ width: "100%", height: "100%" }} />
                    </div>
                </div>
            </Content>
        </Layout>

    );
};

export default MapDirection;
