const URL_GET = 'https://24.javascript.pages.academy/keksobooking/data';
const URL_POST = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(URL_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((data) => onSuccess(data))
    .catch(() => onError());
};

const sendData = (data, onSuccess, onError) => {
  fetch(URL_POST,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }

      throw new Error();
    })
    .catch(() => onError());
};

export { getData, sendData };

