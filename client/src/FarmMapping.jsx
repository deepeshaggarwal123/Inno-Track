import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const FarmMapping = () => {
  const [activeLayer, setActiveLayer] = useState("terrain");
  const [soilOn, setSoilOn] = useState(false);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const terrainLayerRef = useRef(null);
  const satelliteLayerRef = useRef(null);
  const soilPolygonRef = useRef(null);
  const markerGroupRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const terrainLayer = L.tileLayer(
      "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 17,
        attribution: "Map data: © OpenStreetMap contributors",
      }
    );

    const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles © Esri",
      }
    );

    const map = L.map(mapRef.current, {
      center: [12.9716, 77.5946],
      zoom: 14,
      layers: [terrainLayer],
      zoomControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const markers = L.layerGroup().addTo(map);
    const mainMarker = L.marker([12.9716, 77.5946]).addTo(markers);
    mainMarker
      .bindPopup("<b>Inno-Track HQ Farm</b><br>Sector Alpha: Wheat")
      .openPopup();

    const soilPolygon = L.polygon(
      [
        [12.974, 77.59],
        [12.97, 77.59],
        [12.97, 77.6],
        [12.974, 77.6],
      ],
      { color: "#76ba1b", fillOpacity: 0.3 }
    );

    terrainLayerRef.current = terrainLayer;
    satelliteLayerRef.current = satelliteLayer;
    soilPolygonRef.current = soilPolygon;
    markerGroupRef.current = markers;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const terrainLayer = terrainLayerRef.current;
    const satelliteLayer = satelliteLayerRef.current;

    if (!map || !terrainLayer || !satelliteLayer) return;

    if (activeLayer === "terrain") {
      if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
      if (!map.hasLayer(terrainLayer)) map.addLayer(terrainLayer);
    }

    if (activeLayer === "satellite") {
      if (map.hasLayer(terrainLayer)) map.removeLayer(terrainLayer);
      if (!map.hasLayer(satelliteLayer)) map.addLayer(satelliteLayer);
    }
  }, [activeLayer]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const soilPolygon = soilPolygonRef.current;

    if (!map || !soilPolygon) return;

    if (soilOn) {
      if (!map.hasLayer(soilPolygon)) map.addLayer(soilPolygon);
    } else {
      if (map.hasLayer(soilPolygon)) map.removeLayer(soilPolygon);
    }
  }, [soilOn]);

  return (
    <PageTransition>
      <Header />
      <style>{`
        .farm-map-container {
          height: 100vh;
          width: 100%;
          position: relative;
          padding-top: 80px;
          overflow: hidden;
        }

        .farm-map-canvas {
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .map-overlay-sidebar {
          position: absolute;
          top: 100px;
          left: 20px;
          z-index: 1000;
          width: 320px;
          background: rgba(26, 60, 94, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 1.5rem;
          color: white;
          box-shadow: var(--shadow-lg);
        }

        .status-dot {
          width: 10px; height: 10px;
          background: var(--accent);
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
          box-shadow: 0 0 10px var(--accent);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }

        .map-control-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 0.8rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: var(--transition);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          text-align: left;
        }

        .map-control-btn.active {
          background: var(--grad-green);
          border-color: transparent;
        }

        .map-control-btn i { color: var(--accent); width: 20px; text-align: center; }
        .map-control-btn.active i { color: white; }

        @media (max-width: 768px) {
          .map-overlay-sidebar {
            width: calc(100% - 40px);
            bottom: 20px;
            top: auto;
          }
        }
      `}</style>

      <div className="farm-map-container">
        <div ref={mapRef} className="farm-map-canvas"></div>

        <div className="map-overlay-sidebar">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>
            <h3>Farm Explorer</h3>
            <span style={{ fontSize: "0.75rem" }}>
              <span className="status-dot"></span> LIVE
            </span>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem", color: "var(--accent)" }}>Map Layers</h4>
            <button className={`map-control-btn ${activeLayer === "satellite" ? "active" : ""}`} onClick={() => setActiveLayer("satellite")}>
              <i className="fas fa-satellite"></i> Satellite View
            </button>
            <button className={`map-control-btn ${activeLayer === "terrain" ? "active" : ""}`} onClick={() => setActiveLayer("terrain")}>
              <i className="fas fa-mountain"></i> Terrain View
            </button>
            <button className={`map-control-btn ${soilOn ? "active" : ""}`} onClick={() => setSoilOn(!soilOn)}>
              <i className="fas fa-layer-group"></i> Soil Zoning
            </button>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem", color: "var(--accent)" }}>Active Units</h4>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "1rem", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, marginBottom: "0.5rem" }}>
                <span>Sector Alpha (Wheat)</span>
                <span style={{ color: "var(--accent)" }}>92%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", opacity: 0.7 }}>
                <span>Moisture Level</span>
                <span>Optimal</span>
              </div>
            </div>
          </div>

          <a href="/crop-health" className="btn btn-primary" style={{ width: "100%", fontSize: "0.9rem", textAlign: "center", display: "block" }}>
            View Detailed Analytics
          </a>
        </div>
      </div>
    </PageTransition>
  );
};

export default FarmMapping;