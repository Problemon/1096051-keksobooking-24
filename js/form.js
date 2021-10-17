const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const mapFormFilter = document.querySelector('.map__filters');
const mapSelects = mapFormFilter.querySelectorAll('select');
const mapFieldsets = mapFormFilter.querySelectorAll('fieldset');

const changeStateElements = (elements, isDisabled) => {
  isDisabled ?
    elements.forEach((element) => element.setAttribute('disabled', 'disabled')) :
    elements.forEach((element) => element.removeAttribute('disabled'));
};

export const changeStateForm = (isVisible) => {
  if (isVisible) {
    adForm.classList.remove('ad-form--disabled');
    mapFormFilter.classList.remove('map__filters--disabled');
    changeStateElements(adFieldsets, false);
    changeStateElements(mapSelects, false);
    changeStateElements(mapFieldsets, false);
  } else {
    adForm.classList.add('ad-form--disabled');
    mapFormFilter.classList.add('map__filters--disabled');
    changeStateElements(adFieldsets, true);
    changeStateElements(mapSelects, true);
    changeStateElements(mapFieldsets, true);
  }
};
