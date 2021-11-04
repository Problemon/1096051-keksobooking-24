import { debounce } from './utils/debounce.js';
import { getData } from './api.js';
import { renderPopup } from './popup.js';
import { setFormListeners } from './form.js';

const PRICE_LIST = {
  any: [0, +Infinity],
  middle: [10000, 50000],
  low: [0, 10000],
  high: [50000, +Infinity],
};

const mapFiltersFrom = document.querySelector('.map__filters');
const mapFilterHouseType = mapFiltersFrom.querySelector('#housing-type');
const mapFilterHousePrice = mapFiltersFrom.querySelector('#housing-price');
const mapFilterHouseRooms = mapFiltersFrom.querySelector('#housing-rooms');
const mapFilterHouseGuests = mapFiltersFrom.querySelector('#housing-guests');
const mapFilterHouseFeatures = mapFiltersFrom.querySelector('#housing-features');
const popupErrorData = document.querySelector('#error-data').content.querySelector('.error-data');

const checkFilterType = (filterType, announcmentType) => filterType === announcmentType || filterType === 'any';

const checkFilterPrice = (filterPrice, announcmentPrice) => {
  const [minPrice, maxPrice]  = PRICE_LIST[filterPrice];

  return announcmentPrice > minPrice && announcmentPrice < maxPrice;
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

const getFilterdAnnouncments = (data) => data
  .filter(checkAnnouncment);

const initFilter = (renderMap) => {
  const renderMapDebounce = debounce(
    () => getData(
      (data) => renderMap(getFilterdAnnouncments(data)),
      () => renderPopup(popupErrorData)),
  );

  setFormListeners(renderMapDebounce);

  mapFiltersFrom.addEventListener('change', renderMapDebounce);
  renderMapDebounce();
};

export { initFilter };
