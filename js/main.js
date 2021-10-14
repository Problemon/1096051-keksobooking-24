import { generateAnnouncements } from './announcment.js';
import { createCardList } from './element-announcment.js';

const NUMBER_OFFERS = 10;

const mapCanvas = document.querySelector('#map-canvas');
const arrayAnnouncments = generateAnnouncements(NUMBER_OFFERS);
const cardList = createCardList(arrayAnnouncments);

mapCanvas.appendChild(cardList[0]);

