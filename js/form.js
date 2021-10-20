const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 1000000;
const MIN_PRICE_LIST = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const mapFormFilter = document.querySelector('.map__filters');
const mapFilters = mapFormFilter.querySelectorAll('fieldset, select');
const adFormTitleInput = adForm.querySelector('.ad-form__title-input');
const adFormPriceInput = adForm.querySelector('.ad-form__price-input');
const adFormType = adForm.querySelector('.ad-form__type');
const adFormRooms = adForm.querySelector('.ad-form__rooms');
const adFormGuests = adForm.querySelector('.ad-form__guests');

const checkValidityTitle = () => {
  const valueLength = adFormTitleInput.value.length;

  if (valueLength < MIN_LENGTH_TITLE) {
    adFormTitleInput.setCustomValidity(`Минимум ${MIN_LENGTH_TITLE} символов, добавьте еще ${MIN_LENGTH_TITLE - valueLength} символа`);
  } else if (valueLength > MAX_LENGTH_TITLE) {
    adFormTitleInput.setCustomValidity(`Максимум ${MAX_LENGTH_TITLE} символов, удалите еще ${valueLength - MAX_LENGTH_TITLE} символа`);
  } else {
    adFormTitleInput.setCustomValidity('');
  }

  adFormTitleInput.reportValidity();
};

const onTitileInput = () => {
  adFormTitleInput.addEventListener('input', checkValidityTitle);
};


const checkValidityPrice = () => {
  const minPrice = MIN_PRICE_LIST[adFormType.value];
  const price = adFormPriceInput.value;

  if (price > MAX_PRICE) {
    adFormPriceInput.setCustomValidity(`Макс цена ${MAX_PRICE}`);
  } else if (price < minPrice) {
    adFormPriceInput.setCustomValidity(`Мин цена ${minPrice}`);
  } else {
    adFormPriceInput.setCustomValidity('');
  }

  adFormPriceInput.reportValidity();
};

const onPriceInput = () => {
  adFormPriceInput.addEventListener('input', checkValidityPrice);
};

const onTypeList = () => {
  adFormType.addEventListener('change', checkValidityPrice);
};

const checkValidityGuests = () => {
  const rooms = Number(adFormRooms.value);
  const guests = Number(adFormGuests.value);

  if (guests > rooms) {
    adFormGuests.setCustomValidity(`Максимум гостей ${rooms}`);
  } else if (rooms === 100 && guests !== 0) {
    adFormGuests.setCustomValidity('Не для гостей');
  } else {
    adFormGuests.setCustomValidity('');
  }

  adFormGuests.reportValidity();
};

const onGuestsList = () => {
  adFormGuests.addEventListener('change', checkValidityGuests);
};

const onRoomsList = () => {
  adFormRooms.addEventListener('change', checkValidityGuests);
};

const checkValidity = () => {
  onTitileInput();
  onPriceInput();
  onTypeList();
  onGuestsList();
  onRoomsList();
};

const changeStateElements = (elements, isDisabled) => {
  elements.forEach((element) => element.disabled = isDisabled);
};

export const changeStateForm = (isActive) => {
  if (isActive) {
    adForm.classList.remove('ad-form--disabled');
    mapFormFilter.classList.remove('map__filters--disabled');
    changeStateElements(adFieldsets, false);
    changeStateElements(mapFilters, false);
  } else {
    adForm.classList.add('ad-form--disabled');
    mapFormFilter.classList.add('map__filters--disabled');
    changeStateElements(adFieldsets, true);
    changeStateElements(mapFilters, true);
  }
};

checkValidity();
