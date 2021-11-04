import { debounce } from './utils/debounce.js';
import { refreshMap } from './map.js';

const DEFAULT_VALUE = 'any';

const MAX_ANNOUNCEMENTS = 10;

const mapFiltersFrom = document.querySelector('.map__filters');
const mapFilterHouseType = mapFiltersFrom.querySelector('#housing-type');
const mapFilterHousePrice = mapFiltersFrom.querySelector('#housing-price');
const mapFilterHouseRooms = mapFiltersFrom.querySelector('#housing-rooms');
const mapFilterHouseGuests = mapFiltersFrom.querySelector('#housing-guests');
const mapFilterHouseFeatures = mapFiltersFrom.querySelector('#housing-features');

const priceList = {
  any: [0, +Infinity],
  middle: [10000, 50000],
  low: [0, 10000],
  high: [50000, +Infinity],
};

const checkFilterType = (filterType, announcmentType) => (
  filterType === announcmentType || filterType === DEFAULT_VALUE
);

const checkFilterPrice = (filterPrice, announcmentPrice) => {
  const [minPrice, maxPrice]  = priceList[filterPrice];

  return announcmentPrice > minPrice && announcmentPrice < maxPrice;
};


const checkFilterRooms = (filterRooms, announcmentRooms) => (
  Number(filterRooms) === announcmentRooms || filterRooms === DEFAULT_VALUE
);

const checkFilterGuests = (filterGuests, announcmentGuests) => (
  Number(filterGuests) === announcmentGuests || filterGuests === DEFAULT_VALUE
);

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

const filterAnnouncments = (data) => data.filter(checkAnnouncment).slice(0, MAX_ANNOUNCEMENTS);

const onFilterChange = (data) => {
  const filteredAnnouncements = filterAnnouncments(data);
  refreshMap(filteredAnnouncements);
};

const initFilter = (data) => {
  mapFiltersFrom.addEventListener('change', debounce(() => onFilterChange(data)));
  mapFiltersFrom.addEventListener('reset', debounce(() => onFilterChange(data)));
};

export { initFilter };
