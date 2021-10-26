import { changeStateForm, setFormListeners, changeAddress } from './form.js';
import { createCardList } from './card-offer.js';

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

changeStateForm(false);

const onMapLoad = () => {
  changeStateForm(true);
  setFormListeners();
};

const map = L.map('map-canvas')
  .on('load', onMapLoad)
  .setView({
    lat: MAP.LOCATION.LAT,
    lng: MAP.LOCATION.LNG,
  }, MAP.ZOOM);

L.tileLayer(
  TILE_MAP,
  {
    attribution: MAP_COPYRIGHT,
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: MARKER.MAIN.getSize(),
  iconAnchor: MARKER.MAIN.getAnchor(),
});

const defaultMarkerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: MARKER.DEFAULT.getSize(),
  iconAnchor: MARKER.DEFAULT.getAnchor(),
});

const createMainMarker = (markerLat, markerLng) => {
  const marker = L.marker(
    {
      lat: markerLat,
      lng: markerLng,
    },
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  ).addTo(map);

  const onMarkerMove = () => {
    const {lat, lng} = marker.getLatLng();
    changeAddress(lat, lng);
  };

  onMarkerMove();
  marker.on('move', onMarkerMove);
};


const createMarker = (lat, lng, popup) => {
  L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: false,
      icon: defaultMarkerIcon,
    },
  ).addTo(map).bindPopup(popup);
};

const initMap = (data) => {
  const cardList = createCardList(data);

  data.forEach((elem, index) => {
    const {lat, lng} = elem.location;
    createMarker(lat, lng, cardList[index], true);
  });

  createMainMarker(MAP.LOCATION.LAT, MAP.LOCATION.LNG);
};

export { initMap };
