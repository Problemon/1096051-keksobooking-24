import { renderPopup } from './popup.js';
import { sendData } from './api.js';

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
const FILE_TYPES = ['png', 'jpg', 'jpeg', 'webp'];
const IMG = {
  WIDTH: 70,
  HEIGHT: 70,
};
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const mapFormFilter = document.querySelector('.map__filters');
const mapFilters = mapFormFilter.querySelectorAll('fieldset, select');
const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const adFormTitleInput = adForm.querySelector('.ad-form__title-input');
const adFormPriceInput = adForm.querySelector('.ad-form__price-input');
const adFormType = adForm.querySelector('.ad-form__type');
const adFormAddress = adForm.querySelector('.ad-form__address');
const adFormRooms = adForm.querySelector('.ad-form__rooms');
const adFormGuests = adForm.querySelector('.ad-form__guests');
const adFormCheckin = adForm.querySelector('.ad-form__checkin');
const adFormCheckout = adForm.querySelector('.ad-form__checkout');
const adFormReset = adForm.querySelector('.ad-form__reset');
const adFormAvatarInput = adForm.querySelector('#avatar');
const adFormAvatar = adForm.querySelector('.ad-form-header__preview').querySelector('img');
const adFormImagesInput = adForm.querySelector('#images');
const adFormImagesContainer = adForm.querySelector('.ad-form__photo');

const popupSuccess = document.querySelector('#success').content.querySelector('.success');
const popupError = document.querySelector('#error').content.querySelector('.error');

const onClearInput = (evt) => {
  evt.target.setCustomValidity('');
};

const checkPictureType = (fileName) => FILE_TYPES.some((type) => fileName.endsWith(type));

const onAvatarChange = (img) => {
  const file = adFormAvatarInput.files[0];
  const fileName = file.name.toLowerCase();

  if (checkPictureType(fileName)) {
    img.src = URL.createObjectURL(file);
  }
};

const createNodeImg = (container) => {
  const img = document.createElement('img');
  container.append(img);

  return img;
};

const onImagesChoice = () => {
  const files = adFormImagesInput.files;

  for (const file of files) {
    const fileName = file.name.toLowerCase();
    const img = createNodeImg(adFormImagesContainer);

    if (checkPictureType(fileName)) {
      img.src = URL.createObjectURL(file);
      img.classList.add('ad-form__img');
      img.width = IMG.WIDTH;
      img.height =IMG.HEIGHT;
    }
  }
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

const getMinPrice = () => MIN_PRICE_LIST[adFormType.value];

const changeStylePrice = () => {
  const minPrice = getMinPrice();

  adFormPriceInput.placeholder = minPrice;
  adFormPriceInput.min = minPrice;
};

const onPriceChange = () => {
  const minPrice = getMinPrice();
  const price = adFormPriceInput.value;

  changeStylePrice();

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

const changeAddress = (lat, lng) => {
  adFormAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const onCheckinChange = () => {
  adFormCheckout.value = adFormCheckin.value;
};

const onCheckoutChange = () => {
  adFormCheckin.value = adFormCheckout.value;
};

const onResetClick = () => {
  mapFormFilter.reset();
  adForm.reset();
  changeStylePrice();
  adFormImagesContainer.innerHTML = '';
  adFormAvatar.src = DEFAULT_AVATAR;
};

const onSuccess = () => {
  adFormReset.click();
  renderPopup(popupSuccess);
};

const onError = () => {
  renderPopup(popupError);
};

const onFormSubmit = () => (evt) => {
  evt.preventDefault();

  const form = new FormData(evt.target);

  sendData(form, onSuccess, onError);
};


const changeStateElements = (elements, isDisabled) => {
  elements.forEach((element) => {
    if (isDisabled) {
      element.disabled;
    } else {
      element.enabled;
    }
  });
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
  adForm.addEventListener('submit', onFormSubmit(sendData));
  adFormImagesInput.addEventListener('change', () => onImagesChoice(adFormImagesContainer));
  adFormAvatarInput.addEventListener('change', () => onAvatarChange(adFormAvatar));


  adFormTitleInput.addEventListener('change', onTitleChange);
  adFormTitleInput.addEventListener('input', onClearInput);

  adFormPriceInput.addEventListener('change', onPriceChange);
  adFormPriceInput.addEventListener('input', onClearInput);

  adFormType.addEventListener('change', onPriceChange);
  adFormGuests.addEventListener('change', onCapacityChange);
  adFormRooms.addEventListener('change', onCapacityChange);
  adFormCheckin.addEventListener('change', onCheckinChange);
  adFormCheckout.addEventListener('change', onCheckoutChange);

  adFormReset.addEventListener('click', onResetClick);
};

export {changeStateForm, setFormListeners, changeAddress};
