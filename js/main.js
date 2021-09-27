const getRandomNumberInRange = (from, to) => {
  if (from >= to) {
    throw new Error('Неправильные диапозон');
  }

  const rand = from + Math.random() * (to - from + 1);
  return Number(Math.floor(rand));
};
// eslint-disable-next-line no-console
console.log(getRandomNumberInRange(1, 3));


const getRandomNumberInRangeFloat = (from, to, floatingPoint = 0) => {
  if (from >= to) {
    throw new Error('Неправильные диапозон');
  }

  const rand = from + Math.random() * (to - from);
  return Number(rand.toFixed(floatingPoint));
};
// eslint-disable-next-line no-console
console.log(getRandomNumberInRangeFloat(1.1, 1.2, 1));

// Формула взята из https://learn.javascript.ru/task/random-int-min-max
