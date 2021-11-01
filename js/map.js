import { changeAddress } from './form.js';
import { createCard } from './card-offer.js';

const MAP = {
  LOCATION: {
    LAT: 35.6837,
    LNG: 139.7650,
  },
  ZOOM: 10,
};

const TILE_MAP = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const MAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MARKER = {
  MAIN: {
    WIDTH: 52,
    HEIGHT: 52,
    getSize () {
      return [this.WIDTH, this.HEIGHT];
    },
    getAnchor () {
      return [this.WIDTH / 2, this.HEIGHT];
    },
  },
  DEFAULT: {
    WIDTH: 40,
    HEIGHT: 40,
    getSize () {
      return [this.WIDTH, this.HEIGHT];
    },
    getAnchor () {
      return [this.WIDTH / 2, this.HEIGHT];
    },
  },
};

const MAIN_MARKER_ICON = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: MARKER.MAIN.getSize(),
  iconAnchor: MARKER.MAIN.getAnchor(),
});

const DEFAULT_MARKER_ICON = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: MARKER.DEFAULT.getSize(),
  iconAnchor: MARKER.DEFAULT.getAnchor(),
});

const map = L.map('map-canvas');
const markersGroup = L.layerGroup().addTo(map);

const createMainMarker = (markerLat, markerLng, layer) => {
  const marker = L.marker(
    {
      lat: markerLat,
      lng: markerLng,
    },
    {
      draggable: true,
      icon: MAIN_MARKER_ICON,
    },
  ).addTo(layer);

  const onMarkerMove = () => {
    const {lat, lng} = marker.getLatLng();
    changeAddress(lat, lng);
  };

  onMarkerMove();
  marker.on('move', onMarkerMove);
};


const createMarker = (announcment, layer) => {
  const { location: { lat, lng } } = announcment;
  L.marker(
    {
      lat,
      lng,
    },
    {
      draggable: false,
      icon: DEFAULT_MARKER_ICON,
    },
  ).addTo(layer).bindPopup(createCard(announcment));
};

const setViewMap = (lat, lng, zoom) => {
  map.setView({
    lat,
    lng,
  }, zoom);
};

const renderMap = (data) => {
  markersGroup.clearLayers();

  setViewMap(MAP.LOCATION.LAT, MAP.LOCATION.LNG, MAP.ZOOM);

  data.forEach((announcment) => createMarker(announcment, markersGroup));

  createMainMarker(MAP.LOCATION.LAT, MAP.LOCATION.LNG, markersGroup);
};

const initMap = (renderMapData, successLoad) => {
  map.on('load', () => {
    renderMapData();
    successLoad();
  });
  setViewMap(MAP.LOCATION.LAT, MAP.LOCATION.LNG, MAP.ZOOM); // Событие не отробатывает без установки размеров карты.

  L.tileLayer(
    TILE_MAP,
    {
      attribution: MAP_COPYRIGHT,
    },
  ).addTo(map);
};

export { initMap, renderMap };
