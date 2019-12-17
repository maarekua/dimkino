document
  .querySelectorAll('.services-item')
  .forEach(item =>
    item.addEventListener('click', () =>
      item
        .querySelector('.services-descr')
        .classList.toggle('services-descr-active')
    )
  );