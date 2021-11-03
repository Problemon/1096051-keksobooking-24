const API_URL = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(`${API_URL}/data`)
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
  fetch(API_URL,
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

