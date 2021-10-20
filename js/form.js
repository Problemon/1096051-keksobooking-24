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
const MAX_ROOMS = 100;
const NOT_FOR_GUESTS = 0;

const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const mapFormFilter = document.querySelector('.map__filters');
const mapFilters = mapFormFilter.querySelectorAll('fieldset, select');
const adFormTitleInput = adForm.querySelector('.ad-form__title-input');
const adFormPriceInput = adForm.querySelector('.ad-form__price-input');
const adFormType = adForm.querySelector('.ad-form__type');
const adFormRooms = adForm.querySelector('.ad-form__rooms');
const adFormGuests = adForm.querySelector('.ad-form__guests');
const adFormCheckin = adForm.querySelector('.ad-form__checkin');
const adFormCheckout = adForm.querySelector('.ad-form__checkout');


const onClearInput = (evt) => {
  evt.target.setCustomValidity('');
};

const onTitleChange = () => {
  const valueLength = adFormTitleInput.value.length;

  if (valueLength < MIN_LENGTH_TITLE) {
    adFormTitleInput.setCustomValidity(`Минимум ${MIN_LENGTH_TITLE} символов`);
  } else if (valueLength > MAX_LENGTH_TITLE) {
    adFormTitleInput.setCustomValidity(`Максимум ${MAX_LENGTH_TITLE} символов`);
  } else {
    adFormTitleInput.setCustomValidity('');
  }

  adFormTitleInput.reportValidity();
};


const onPriceChange = () => {
  const minPrice = MIN_PRICE_LIST[adFormType.value];
  const price = adFormPriceInput.value;

  adFormPriceInput.placeholder = minPrice;

  if (price > MAX_PRICE) {
    adFormPriceInput.setCustomValidity(`Максимальная цена ${MAX_PRICE}`);
  } else if (price < minPrice) {
    adFormPriceInput.setCustomValidity(`Минимальная цена ${minPrice}`);
  } else {
    adFormPriceInput.setCustomValidity('');
  }

  adFormPriceInput.reportValidity();
};

const onCapacityChange = () => {
  const rooms = Number(adFormRooms.value);
  const guests = Number(adFormGuests.value);

  if (guests > rooms) {
    adFormGuests.setCustomValidity(`Максимум гостей ${rooms}`);
    adFormRooms.setCustomValidity('');
  } else if (guests === NOT_FOR_GUESTS && rooms !== MAX_ROOMS) {
    adFormRooms.setCustomValidity(`Минимум ${MAX_ROOMS} комнат`);
    adFormGuests.setCustomValidity('');
  } else if (rooms === MAX_ROOMS && guests !== NOT_FOR_GUESTS) {
    adFormGuests.setCustomValidity('Не для гостей');
  } else {
    adFormRooms.setCustomValidity('');
    adFormGuests.setCustomValidity('');
  }

  adFormRooms.reportValidity();
  adFormGuests.reportValidity();
};

const onCheckinChange = () => {
  adFormCheckout.value = adFormCheckin.value;
};

const onCheckoutChange = () => {
  adFormCheckin.value = adFormCheckout.value;
};

const changeStateElements = (elements, isDisabled) => {
  elements.forEach((element) => element.disabled = isDisabled);
};

const changeStateForm = (isActive) => {
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

const setFormListeners = () => {
  adFormTitleInput.addEventListener('change', onTitleChange);
  adFormTitleInput.addEventListener('input', onClearInput);

  adFormPriceInput.addEventListener('change', onPriceChange);
  adFormPriceInput.addEventListener('input', onClearInput);

  adFormType.addEventListener('change', onPriceChange);
  adFormGuests.addEventListener('change', onCapacityChange);
  adFormRooms.addEventListener('change', onCapacityChange);
  adFormCheckin.addEventListener('change', onCheckinChange);
  adFormCheckout.addEventListener('change', onCheckoutChange);
};

export {changeStateForm, setFormListeners};
