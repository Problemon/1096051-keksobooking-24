const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TIME = ['12:00', '13:00', '14:00'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MAX_ANNOUNCMENT_AMOUNT = 10;
const COORDINATE = {
  MIN: {
    LAT: 35.65000,
    LNG: 139.70000,
  },
  MAX: {
    LAT: 35.70000,
    LNG: 139.80000,
  },
};

const getRandomNumberInRange = (first, second) => {
  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomNumberInRangeFloat = (first, second, digits = 0) => {
  const lower = Math.min(Math.abs(first), Math.abs(second));
  const upper = Math.max(Math.abs(first), Math.abs(second));

  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

const getRandomElementOfArray = (array) => array[getRandomNumberInRange(0, array.length - 1)];

const getRandomArrayOfArray = (array) => {
  const randomIndex = getRandomNumberInRange(1, array.length);
  return array.slice(0, randomIndex);
};

const createAnnouncement = (index) => {
  const randomLat = getRandomNumberInRangeFloat(COORDINATE.MIN.LAT, COORDINATE.MAX.LAT, 5);
  const randomLng = getRandomNumberInRangeFloat(COORDINATE.MIN.LNG, COORDINATE.MAX.LNG, 5);
  const avatarIndex = index.toString().padStart(2, 0);

  return {
    author: {
      avatar: `img/avatars/user${avatarIndex}.png`,
    },
    offer: {
      title: 'Sell annoucement',
      address: `${randomLat}, ${randomLng}`,
      features: getRandomArrayOfArray(FEATURES),
      photos: getRandomArrayOfArray(PHOTOS),
      checkin: getRandomElementOfArray(TIME),
      checkout: getRandomElementOfArray(TIME),
      type: getRandomElementOfArray(TYPES),
      price: getRandomNumberInRange(0, MAX_ANNOUNCMENT_AMOUNT),
      rooms: getRandomNumberInRange(0, MAX_ANNOUNCMENT_AMOUNT),
      quests: getRandomNumberInRange(0, MAX_ANNOUNCMENT_AMOUNT),
      description: 'Best place',
    },
    location: {
      lat: randomLat,
      lng: randomLng,
    },
  };
};

const generateAnnouncements = (number) => Array.from({length: number}, (_, index) => (
  createAnnouncement(index + 1)),
);
// eslint-disable-next-line no-console
console.log(generateAnnouncements(MAX_ANNOUNCMENT_AMOUNT));
