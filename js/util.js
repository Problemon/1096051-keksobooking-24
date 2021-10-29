const templatePopupSuccess = document.querySelector('#success').content;
const templatePopupError = document.querySelector('#error').content;
const templatePopupErrorData = document.querySelector('#error-data').content;

const onWindowKeyDown = (evt, element) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    element.remove();
  }
};

const onWindowClick = (element) => {
  element.remove();
};

const showSuccess = () => {
  const popupSuccess = templatePopupSuccess.querySelector('.success').cloneNode(true);

  document.body.append(popupSuccess);

  window.addEventListener('click', () => onWindowClick(popupSuccess), {once: true});
  window.addEventListener('keydown', (evt) => onWindowKeyDown(evt, popupSuccess), {once: true});
};

const showError = () => {
  const popupError = templatePopupError.querySelector('.error').cloneNode(true);

  document.body.append(popupError);

  window.addEventListener('click', () => onWindowClick(popupError), {once: true});
  window.addEventListener('keydown', (evt) => onWindowKeyDown(evt, popupError), {once: true});
};

const showErrorData = () => {
  const popupErrorData = templatePopupErrorData.querySelector('.error-data').cloneNode(true);
  const buttonClose = popupErrorData.querySelector('.error-data__close');

  document.body.append(popupErrorData);

  buttonClose.addEventListener('click', () => popupErrorData.remove());
};

export { showSuccess, showError, showErrorData };
