import { generateAnnouncements } from './announcement.js';
import { createCardList } from './card-offer.js';
import { changeStateForm } from './form.js';

const NUMBER_OFFERS = 10;

const mapCanvas = document.querySelector('#map-canvas');
const arrayAnnouncements = generateAnnouncements(NUMBER_OFFERS);
const cardList = createCardList(arrayAnnouncements);

changeStateForm(false);
mapCanvas.appendChild(cardList[0]);
setTimeout(() => changeStateForm(true), 1000);

