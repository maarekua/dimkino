const moreInfo = document.querySelector('.portfolio-item-descr');
const gallery = document.querySelector('.gallery');

document.querySelector('.button-btn').addEventListener('click', function() {
  moreInfo.classList.toggle('portfolio-item-descr-active');
});

document
  .querySelectorAll('.portfolio-item')
  .forEach(item => item.addEventListener('click', moreInfoOpen));

function moreInfoOpen() {
  const itemData = this.getAttribute('data');
  const galleryData = gallery.getAttribute('data');
  if (itemData !== galleryData) {
    moreInfoAdd(itemData);
    moreInfo.classList.toggle('portfolio-item-descr-active');
  } else {
    moreInfo.classList.toggle('portfolio-item-descr-active');
    return;
  }
}

function moreInfoAdd(item) {
  gallery.setAttribute('data', item);
  while (gallery.hasChildNodes()) {
    gallery.removeChild(gallery.firstChild);
  }
  const descr = document.querySelector('.portfolio-descr-text');
  fetch('json/portfolio-descr.json')
    .then(response => response.json())
    .then(data => {
      const descrData = data[item];
      descrData.images.forEach(imgSrc => {
        const image = document.createElement('img');
        image.src = imgSrc;
        image.alt = descrData.name;
        image.classList.add('descr-image');
        gallery.append(image);
        image.addEventListener('click', fullScreen);
      });
      descr.innerText = descrData.info;
    });
}

const fullScreenContainer = document.querySelector('.full-screen');
fullScreenContainer.addEventListener(
  `click`,
  () => (fullScreenContainer.style.display = 'none')
);

function fullScreen() {
  const imageSrc = this.src;
  while (fullScreenContainer.hasChildNodes()) {
    fullScreenContainer.removeChild(fullScreenContainer.firstChild);
  }
  const image = document.createElement(`img`);
  image.src = imageSrc;
  fullScreenContainer.append(image);
  fullScreenContainer.style.display = 'block';
}

document.querySelector('.contacts-btn').addEventListener('click', showContacts)

function showContacts() {
    const modalContacts = document.querySelector('.modal-contacts')
    console.log(modalContacts)
  fetch('contacts.html')
    .then(response => response.text())
    .then(contacts => {
        console.log(contacts)
        if (modalContacts.hasChildNodes()) {
            console.log('nope')
            modalContacts.style.display = 'block';
            return;
        } else {
            console.log('yeap')
            modalContacts.innerHTML = contacts;
            document.querySelector('.close-contacts')
                .addEventListener('click', () => modalContacts.style.display = 'none');
            modalContacts.style.display = 'block';
        }
        });
}
