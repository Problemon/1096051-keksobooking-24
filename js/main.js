import { generateAnnouncements } from './announcement.js';
import { initMap } from './map.js';

const NUMBER_OFFERS = 10;

const arrayAnnouncements = generateAnnouncements(NUMBER_OFFERS);

initMap(arrayAnnouncements);
