const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const mapFormFilter = document.querySelector('.map__filters');
const mapFilters = mapFormFilter.querySelectorAll('fieldset, select');

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
