const TYPES_RUS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const offersArray = [];
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

export const createCardList = (offers) => {
  offers.forEach((element) => {
    const cardElement = cardTemplate.cloneNode(true);
    const offerAvatar = cardElement.querySelector('.popup__avatar');
    const offerTitle = cardElement.querySelector('.popup__title');
    const offerAddress = cardElement.querySelector('.popup__text--address');
    const offerPrice = cardElement.querySelector('.popup__text--price');
    const offerType = cardElement.querySelector('.popup__type');
    const offerCopacity = cardElement.querySelector('.popup__text--capacity');
    const offerTime = cardElement.querySelector('.popup__text--time');
    const offerDescription = cardElement.querySelector('.popup__description');
    const offerPhotosContainer = cardElement.querySelector('.popup__photos');
    const offerImageTemplate = offerPhotosContainer.querySelector('.popup__photo');
    const offerFeaturesContainer = cardElement.querySelector('.popup__features');
    const offerFeaturesList = offerFeaturesContainer.querySelectorAll('.popup__feature');

    const title = element.offer.title;
    const address = element.offer.address;
    const price = element.offer.price;
    const photoLinks = element.offer.photos;
    const type = element.offer.type;
    const rooms = element.offer.rooms;
    const guests = element.offer.guests;
    const timeCheckin = element.offer.checkin;
    const timeCheckout = element.offer.checkout;
    const description = element.offer.description;
    const avatar = element.author.avatar;
    const featuresModifiers = element.offer.features.map((item) => `.popup__feature--${item}`);

    const hideEmptyElement = (arrValue, elem, property) => {
      let isEmpty = false;
      isEmpty = arrValue.some((value) => !value);

      if (isEmpty) {
        elem.classList.add('visually-hidden');
      } else {
        elem[property] = '';
        arrValue.forEach((value) => {
          elem[property] += value;
        });
      }

    };

    hideEmptyElement([title], offerTitle, 'textContent');
    hideEmptyElement([address], offerAddress, 'textContent');
    hideEmptyElement([description], offerDescription, 'textContent');
    hideEmptyElement([avatar], offerAvatar, 'src');
    hideEmptyElement([price, ' ₽/ночь'], offerPrice, 'textContent');
    hideEmptyElement([TYPES_RUS[type]], offerType, 'textContent');
    hideEmptyElement([rooms, ' комнаты для ', guests, ' гостей'], offerCopacity, 'textContent');
    hideEmptyElement(['Заезд после ', timeCheckin, ', выезд до ', timeCheckout], offerTime, 'textContent');

    offerPhotosContainer.textContent = '';
    photoLinks.forEach((link) => {
      const imageElement = offerImageTemplate.cloneNode(true);
      imageElement.src = link;

      offerPhotosContainer.appendChild(imageElement);
    });

    offerFeaturesList.forEach((item) => {
      const featureModifier = item.classList[1];

      if (!featuresModifiers.includes(featureModifier)) {
        item.remove();
      }
    });

    offersArray.push(cardElement);
  });

  return offersArray;
};

/* <template id="card">
    <article class="popup">
      <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title">Уютное гнездышко для молодоженов</h3>
      <p class="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
      <p class="popup__text popup__text--price">5200 <span>₽/ночь</span></p>
      <h4 class="popup__type">Квартира</h4>
      <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
      <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
      <ul class="popup__features">
        <li class="popup__feature popup__feature--wifi"></li>
        <li class="popup__feature popup__feature--dishwasher"></li>
        <li class="popup__feature popup__feature--parking"></li>
        <li class="popup__feature popup__feature--washer"></li>
        <li class="popup__feature popup__feature--elevator"></li>
        <li class="popup__feature popup__feature--conditioner"></li>
      </ul>
      <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
      <div class="popup__photos">
        <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
      </div>
    </article>
  </template> */



