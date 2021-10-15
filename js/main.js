import { generateAnnouncements } from './announcement.js';
import { createCardList } from './card-offer.js';

const NUMBER_OFFERS = 10;

const mapCanvas = document.querySelector('#map-canvas');
const arrayAnnouncements = generateAnnouncements(NUMBER_OFFERS);
const cardList = createCardList(arrayAnnouncements);

mapCanvas.appendChild(cardList[0]);

