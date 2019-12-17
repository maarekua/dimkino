const moreInfo = document.querySelector('.portfolio-item-descr');
const closeButton = document.querySelector('.button-btn');

closeButton.addEventListener('click', function () {
    moreInfo.classList.toggle('test-visible');
})

document.querySelectorAll('.portfolio-item')
    .forEach(item => 
        item.addEventListener('click', moreInfoOpen)
    )

const gallery = document.querySelector('.gallery');
function moreInfoOpen() {
    const itemData = this.getAttribute('data');
    const galleryData = gallery.getAttribute('data');
    if (itemData !== galleryData) {
        moreInfoAdd(itemData);
        moreInfo.classList.toggle('test-visible');
    } else {
        moreInfo.classList.toggle('test-visible');
        return
    }
    
}

function moreInfoAdd(item) {
    gallery.setAttribute("data", item);
    while (gallery.hasChildNodes()) {
        gallery.removeChild(gallery.firstChild);
    };
    const descr = document.querySelector('.portfolio-descr-text');
    fetch('json/portfolio-descr.json')
        .then(response => response.json())
        .then(data => {
            const descrData = data[item];
            descrData.images.forEach(imgSrc => {
                const image = document.createElement('img')
                image.src = imgSrc;
                image.alt = descrData.name;
                image.classList.add('descr-image');
                gallery.append(image);
                image.addEventListener('click', bigImage);
            })
            descr.innerText = descrData.info;
        });
}

const bigImageContainer = document.querySelector('.big-image');
bigImageContainer.addEventListener(`click`, () => bigImageContainer.style.display = 'none');

function bigImage () {
    const imageSrc = this.src;
    while (bigImageContainer.hasChildNodes()) {
        bigImageContainer.removeChild(bigImageContainer.firstChild);
    };
    const image = document.createElement(`img`);
    image.src = imageSrc;
    bigImageContainer.append(image);
    bigImageContainer.style.display = 'block';
}