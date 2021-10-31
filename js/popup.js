const renderPopup = (node) => {
  function onDocumentKeyDown (evt) {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      node.remove();
      document.removeEventListener('keydown', onDocumentKeyDown);
    }
  }

  function onPopupClick () {
    node.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
  }

  document.body.append(node);

  node.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};

export { renderPopup };
