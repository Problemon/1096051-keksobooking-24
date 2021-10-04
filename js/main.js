// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
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


const getArrayWithNumbers = (amount) => {
  const arrayNumbers = [];
  for (let index = 0; index < amount; index += 1) {
    let number = index + 1;
    if (number < 10) {
      number = `0${number}`; // Прибавляем 0 к цивре пока чило однозначное '1 = 01'
    }

    arrayNumbers[index] = String(number);
  }

  return arrayNumbers;
};

const numbersOfAvatar = getArrayWithNumbers(10);

const createAnnouncement = () => {
  const announcement = {
    createAvatar() {
      const randomIndex = getRandomNumberInRange(0, numbersOfAvatar.length - 1);
      const numberOfAvatar = numbersOfAvatar.splice(randomIndex, 1);
      this.author.avatar = `img/avatars/user${numberOfAvatar}.png`;
    },
    createAddress() {
      const lat = this.location.lat;
      const lng = this.location.lng;
      this.offer.address = `${lat}, ${lng}`;
    },
    author: {
      avatar: `img/avatars/user${this}.png`,
    },
    offer: {
      title: 'Sell annoucement',
      features: getRandomArrayOfArray(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']),
      checkin:  getRandomElementOfArray(['12:00', '13:00', '14:00']),
      checkout: getRandomElementOfArray(['12:00', '13:00', '14:00']),
      type:     getRandomElementOfArray(['palace', 'flat', 'house', 'bungalow', 'hotel']),
      price:    getRandomNumberInRange(0, 10),
      rooms:    getRandomNumberInRange(0, 10),
      quests:   getRandomNumberInRange(0, 10),
      description: 'Best place',
      photos:   getRandomArrayOfArray([
        'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
        'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
        'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
      ]),
    },
    location: {
      lat: getRandomNumberInRangeFloat(35.65000, 35.70000, 5),
      lng: getRandomNumberInRangeFloat(139.70000, 139.80000, 5),
    },
  };
  announcement.createAvatar();
  announcement.createAddress();

  return announcement;
};

const getArrayObject = (number) => {
  const arrayAnnouncements = Array.from({length: number}, createAnnouncement);

  return arrayAnnouncements;
};
// eslint-disable-next-line no-console
console.log(getArrayObject(10));
