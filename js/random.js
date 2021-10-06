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

export {
  getRandomNumberInRange,
  getRandomNumberInRangeFloat,
  getRandomElementOfArray,
  getRandomArrayOfArray
};
