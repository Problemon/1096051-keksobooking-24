import { changeAddress, changeStateForm } from './form.js';
import { createCard } from './card-offer.js';
import { initFilter } from './filter.js';
import { getData } from './api.js';
import { renderPopup } from './popup.js';

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

const MAX_ANNOUNCEMENTS = 10;

const map = L.map('map-canvas');
const markersGroup = L.layerGroup().addTo(map);
const popupErrorData = document.querySelector('#error-data').content.querySelector('.error-data');
const marker = L.marker(
  {
    lat: MAP.LOCATION.LAT,
    lng: MAP.LOCATION.LNG,
  },
  {
    draggable: true,
    icon: MAIN_MARKER_ICON,
  },
).addTo(map);

const refreshAddressInput = () => {
  const {lat, lng} = marker.getLatLng();
  changeAddress(lat, lng);
};


const createMarker = (announcement, layer) => {
  const { location: { lat, lng } } = announcement;
  L.marker(
    {
      lat,
      lng,
    },
    {
      draggable: false,
      icon: DEFAULT_MARKER_ICON,
    },
  ).addTo(layer).bindPopup(createCard(announcement));
};

const setViewMap = (lat, lng, zoom) => {
  map.setView({
    lat,
    lng,
  }, zoom);
};

const renderMarkers = (announcements) => {
  announcements.forEach((announcement) => createMarker(announcement, markersGroup));
};

const clearMarkers = () => markersGroup.clearLayers();

const refreshMap = (announcements) => {
  clearMarkers();
  renderMarkers(announcements);
  refreshAddressInput();
};

const onMapLoad = (announcements) => {
  renderMarkers(announcements.slice(0, MAX_ANNOUNCEMENTS));
  initFilter(announcements);
  refreshAddressInput();
};

const initMap = () => {

  map.on('load', () => {
    getData(onMapLoad, () => renderPopup(popupErrorData)),
    marker.on('move', refreshAddressInput);

    changeStateForm(true);
  });

  setViewMap(MAP.LOCATION.LAT, MAP.LOCATION.LNG, MAP.ZOOM);

  L.tileLayer(
    TILE_MAP,
    {
      attribution: MAP_COPYRIGHT,
    },
  ).addTo(map);
};

export { initMap, refreshMap };
