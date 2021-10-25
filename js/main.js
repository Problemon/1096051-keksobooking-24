import { generateAnnouncements } from './announcement.js';
import { createCardList } from './card-offer.js';
import { createMarker } from './map.js';

const NUMBER_OFFERS = 10;

const arrayAnnouncements = generateAnnouncements(NUMBER_OFFERS);
const cardList = createCardList(arrayAnnouncements);


arrayAnnouncements.forEach((elem, index) => {
  const {lat, lng} = elem.location;
  createMarker(lat, lng, cardList[index], true);
});

createMarker(35.6837, 139.76503);
