import { changeStateForm, setFormListeners, changeAddress } from './form.js';

changeStateForm(false);

const onMapLoad = () => {
  changeStateForm(true);
  setFormListeners();
};

const map = L.map('map-canvas')
  .on('load', onMapLoad)
  .setView({
    lat: 35.4137,
    lng: 139.415026,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const defaultMarkerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMarker = (lat, lng, popup,isDefault=false) => {
  const marker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: true,
      icon: markerIcon,
    },
  ).addTo(map);

  if (isDefault) {
    marker.setIcon(defaultMarkerIcon);
    marker.dragging.disable();
    marker.bindPopup(popup);
  }

  const onMarkerMove = () => {
    const markerLat = marker.getLatLng().lat;
    const markerLng = marker.getLatLng().lng;
    changeAddress(markerLat, markerLng);
  };

  onMarkerMove();
  marker.on('move', onMarkerMove);
};

export { createMarker };
