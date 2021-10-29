import { showErrorData } from './util.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status}: ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch((err) => {
      showErrorData();
      return err;
    });
};

const sendData = (data, onSuccess, onError) => {
  fetch('https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }

      throw new Error (`${response.status}: ${response.statusText}`);
    })
    .catch((err) => {
      onError();
      return err;
    });
};

export { getData, sendData };

