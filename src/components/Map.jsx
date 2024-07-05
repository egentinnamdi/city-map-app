import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const {
    isLoading: geoLoading,
    position: geoPosition,
    getPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();
  const [position, setPosition] = useState([51.505, -0.09]);

  useEffect(
    function () {
      if (lat && lng) setPosition([lat, lng]);
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (geoPosition) setPosition([geoPosition.lat, geoPosition.lng]);
    },
    [geoPosition]
  );
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={position}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {city.emoji} {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
      {!geoPosition && (
        <Button type="position" onClick={getPosition}>
          {geoLoading ? "Loading..." : "use your position"}
        </Button>
      )}
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
