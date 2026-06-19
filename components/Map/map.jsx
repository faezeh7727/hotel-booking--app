/** @format */

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import useGeolocation from "../../hooks/useGeolocation";
import useUrlLocation from "../../hooks/useUrllocation";
function Map({MarkerLocations}) {

  const [mapCenter, setMapCenter] = useState([51, 10]);

  const {lat,lng} =useUrlLocation()
  //get geolocation:
  const {
    isloading: isloadinggeolocation,
    position: geolocationposition,
    getPosition,
  } = useGeolocation();
  //sync map center with lat and lng
  //مختصات هتل روی مپ سنتر باقی بماند تا وقتی که لوکیشن جدیدی بزنیم
  //: useEffect رابطِ بینِ تغییراتِ آدرسِ سایت و تغییراتِ نمایشِ نقشه است.
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  //sync geolocation with mapcenter:
  //sync with use your location button
  useEffect(() => {
    if (geolocationposition?.lat && geolocationposition?.lng)
      setMapCenter([geolocationposition.lat, geolocationposition.lng]);
  }, [geolocationposition]);

  return (
    <div className="mapContainer">
      <button onClick={getPosition} className="getLocation">
        {isloadinggeolocation ? "Loaging..." : "Use your Location"}
      </button>
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <DetectClick />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {
          /**روی پاپاپ و مارکر map میمدازیک
           * با ارایه ای از مختصات خود هتل ها
           */
          MarkerLocations.map((item) => (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          ))
        }
      </MapContainer>
    </div>
  );
}

export default Map;

//change center based on position hotel

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
    //go to add new bookmark
   navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  });
  return null;
}