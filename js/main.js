import { initMap, renderMap } from './map.js';
import { getData, sendData } from './api.js';
import { setFormListeners, changeStateForm } from './form.js';
import { renderPopup } from './popup.js';

const popupErrorData = document.querySelector('#error-data').content.querySelector('.error-data');

changeStateForm(false);

initMap(
  () => getData(renderMap, () => renderPopup(popupErrorData)),
  () => changeStateForm(true),
);

setFormListeners(
  () => getData(renderMap, () => renderPopup(popupErrorData)),
  sendData,
);
