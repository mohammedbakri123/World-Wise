import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/citiesContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
  const [searchParam, setSearchParam] = useSearchParams();
  const { cities } = useCities();

  const [position, setPosition] = useState([51.505, -0.09]);

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  const {
    isLoading: isLoadingGeo,
    getPosition: getPositionGeo,
    position: positionGeo,
  } = useGeolocation();

  useEffect(() => {
    if (positionGeo) {
      setPosition([positionGeo.lat, positionGeo.lng]);
    }
  }, [positionGeo]);
  const navigate = useNavigate();

  useEffect(() => {
    if (lat && lng) {
      setPosition([parseFloat(lat), parseFloat(lng)]);
    }
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      {!positionGeo || (
        <Button onClick={getPositionGeo} type="position">
          {isLoadingGeo ? "Loading..." : "Use your location"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={position}
        zoom={60}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              {city.emoji}, {city.country}
            </Popup>
          </Marker>
        ))}
        <ChangeView center={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

export default Map;
