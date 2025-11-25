"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icons in react-leaflet
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const mapVariants = cva("relative z-10", {
  variants: {
    size: {
      sm: "h-64 rounded-2xl overflow-hidden border border-gray-200 shadow-elevation-3",
      md: "h-96 rounded-2xl overflow-hidden border border-gray-200 shadow-elevation-3",
      lg: "h-[32rem] rounded-2xl overflow-hidden border border-gray-200 shadow-elevation-3",
      full: "h-screen w-full"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export interface MapProps extends VariantProps<typeof mapVariants> {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    popup?: string;
  }>;
  className?: string;
}

// Component to update map view
function ChangeView({
  center,
  zoom
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function Map({
  center = [51.505, -0.09], // Default to London
  zoom = 13,
  markers = [],
  size,
  className
}: MapProps) {
  return (
    <div className={mapVariants({ size, className })}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={icon}>
            {marker.popup && <Popup>{marker.popup}</Popup>}
          </Marker>
        ))}
      </MapContainer>

      {/* Custom positioned zoom control */}
      <style jsx global>{`
        .leaflet-container {
          z-index: 1;
        }
        .leaflet-top.leaflet-left {
          top: 60px;
          left: 10px;
        }
        .leaflet-control-zoom {
          z-index: 30;
        }
      `}</style>
    </div>
  );
}
