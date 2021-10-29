import { initMap } from './map.js';
import { getData } from './api.js';
import { setFormListeners } from './form.js';

getData(initMap);
setFormListeners(initMap);
