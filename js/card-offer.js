const TYPES_RUS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const hideEmptyElement = (arrValue, elem, property) => {
  const isEmpty = arrValue.some((value) => !value);

  isEmpty ? elem.remove() : elem[property] = arrValue.join('');
};


const addFeatureElement = (feature, container) => {
  const featureElement = document.createElement('li');
  const className = 'popup__feature';
  const classFeature = `${className}--${feature}`;

  featureElement.classList.add(className, classFeature);

  container.appendChild(featureElement);
};

const addImage = (link, container, template) => {
  const imageElement = template.cloneNode(true);
  imageElement.src = link;

  container.appendChild(imageElement);
};

export const createCard = (announcement) => {
  const cardElement = cardTemplate.cloneNode(true);
  const offerAvatar = cardElement.querySelector('.popup__avatar');
  const offerTitle = cardElement.querySelector('.popup__title');
  const offerAddress = cardElement.querySelector('.popup__text--address');
  const offerPrice = cardElement.querySelector('.popup__text--price');
  const offerType = cardElement.querySelector('.popup__type');
  const offerCapacity = cardElement.querySelector('.popup__text--capacity');
  const offerTime = cardElement.querySelector('.popup__text--time');
  const offerDescription = cardElement.querySelector('.popup__description');
  const offerPhotosContainer = cardElement.querySelector('.popup__photos');
  const offerImageTemplate = offerPhotosContainer.querySelector('.popup__photo');
  const offerFeaturesContainer = cardElement.querySelector('.popup__features');

  const {offer, author} = announcement;
  const {
    title,
    address,
    price,
    photos,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    description,
    features,
  } = offer;
  const {avatar} = author;

  hideEmptyElement([title], offerTitle, 'textContent');
  hideEmptyElement([address], offerAddress, 'textContent');
  hideEmptyElement([description], offerDescription, 'textContent');
  hideEmptyElement([avatar], offerAvatar, 'src');
  hideEmptyElement([price, ' ₽/ночь'], offerPrice, 'textContent');
  hideEmptyElement([TYPES_RUS[type]], offerType, 'textContent');
  hideEmptyElement([rooms, ' комнаты для ', guests, ' гостей'], offerCapacity, 'textContent');
  hideEmptyElement(['Заезд после ', checkin, ', выезд до ', checkout], offerTime, 'textContent');

  offerPhotosContainer.innerHTML = '';
  photos.forEach((link) => addImage(link, offerPhotosContainer, offerImageTemplate));

  offerFeaturesContainer.innerHTML = '';
  features.forEach((item) => addFeatureElement(item, offerFeaturesContainer));

  return cardElement;
};

export const createCardList = (offers) => offers.map(createCard);
