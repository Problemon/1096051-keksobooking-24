import { changeAddress } from './form.js';
import { createCard } from './card-offer.js';
import { debounce } from './utils/debounce.js';

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

const PRICE_LIST = {
  any: [0, +Infinity],
  middle: [10000, 50000],
  low: [0, 10000],
  high: [50000, +Infinity],
};

const MAX_ANNOUNCMENTS = 10;

const map = L.map('map-canvas');
const markersGroup = L.layerGroup().addTo(map);
const mapFiltersFrom = document.querySelector('.map__filters');

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

const checkFilterType = (filterType, announcmentType) => filterType === announcmentType || filterType === 'any';

const checkFilterPrice = (filterPrice, announcmentPrice) => {
  const minPrice = PRICE_LIST[filterPrice][0];
  const maxPrice = PRICE_LIST[filterPrice][1];
  let isInclude = false;

  if (announcmentPrice > minPrice && announcmentPrice < maxPrice) {
    isInclude = true;
  }

  return isInclude;
};


const checkFilterRooms = (filterRooms, announcmentRooms) => Number(filterRooms) === announcmentRooms || filterRooms === 'any';

const checkFilterGuests = (filterGuests, announcmentGuests) =>  Number(filterGuests) === announcmentGuests || filterGuests === 'any';

const checkFilterFeatures = (filterFeatures, announcmentFeatures) => {
  if (!announcmentFeatures) {
    return false;
  }

  if (filterFeatures.length === 0) {
    return true;
  }

  for (let i = 0; i < filterFeatures.length; i += 1) {
    const filterFeature = filterFeatures[i].value;

    if (!announcmentFeatures.includes(filterFeature)) {
      return false;
    }
  }

  return true;
};

const checkAnnouncment = (announcment) => {
  const mapFilterHouseType = mapFiltersFrom.querySelector('#housing-type');
  const mapFilterHousePrice = mapFiltersFrom.querySelector('#housing-price');
  const mapFilterHouseRooms = mapFiltersFrom.querySelector('#housing-rooms');
  const mapFilterHouseGuests = mapFiltersFrom.querySelector('#housing-guests');
  const mapFilterHouseFeatures = mapFiltersFrom.querySelector('#housing-features');
  const filterCheckedFeatures = mapFilterHouseFeatures.querySelectorAll('input:checked');

  const {type, price, rooms, guests, features} = announcment.offer;

  return (
    checkFilterType(mapFilterHouseType.value, type) &&
    checkFilterPrice(mapFilterHousePrice.value, price) &&
    checkFilterRooms(mapFilterHouseRooms.value, rooms) &&
    checkFilterGuests(mapFilterHouseGuests.value, guests) &&
    checkFilterFeatures(filterCheckedFeatures, features)
  );
};

const renderMap = (data) => {

  markersGroup.clearLayers();

  setViewMap(MAP.LOCATION.LAT, MAP.LOCATION.LNG, MAP.ZOOM);

  data
    .slice()
    .filter(checkAnnouncment)
    .slice(0, MAX_ANNOUNCMENTS)
    .forEach((announcment) => createMarker(announcment, markersGroup));

  createMainMarker(MAP.LOCATION.LAT, MAP.LOCATION.LNG, markersGroup);
};

const initMap = (renderMapData, successLoad) => {
  map.on('load', () => {
    renderMapData();
    successLoad();
  });
  setViewMap(MAP.LOCATION.LAT, MAP.LOCATION.LNG, MAP.ZOOM);

  L.tileLayer(
    TILE_MAP,
    {
      attribution: MAP_COPYRIGHT,
    },
  ).addTo(map);

  renderMapData = debounce(renderMapData);
  mapFiltersFrom.addEventListener('change', renderMapData);
};

export { initMap, renderMap };
