const buttonMore = document.querySelector('.big-firstrow');
const moreInfo = document.querySelector('.portfolio-item-descr');
const closeButton = document.querySelector('.button-btn');

buttonMore.addEventListener('click', function () {
    moreInfo.classList.toggle('test-visible');
})
closeButton.addEventListener('click', function () {
    moreInfo.classList.toggle('test-visible');
})

function addCarousel () {
    const owl = $('.gallery');
    owl.owlCarousel({
        items: 1,
        loop: true,
        center: true,
        dots: false,
        autoWidth: true,
        animateOut: 'fadeOutLeft',
        animateIn: 'fadeinLeft',
        autoplay: true,
        autoplayTimeout: 2500,
        autoplayHoverPause: true,
        margin: 10,
        marge: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 3,
                nav: false
            },
            750: {
                items: 5,
                nav: false
            }
        }
    });
}


document.querySelector('.portfolio-item')
    .addEventListener('click', moreInfoOpen);

const gallery = document.querySelector('.gallery');
function moreInfoOpen() {
    const itemData = this.getAttribute('data');
    const galleryData = gallery.getAttribute('data');
    if (itemData !== galleryData) {
        console.log('start')
        moreInfoAdd(itemData)
    } else {
        console.log('stop')
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
            addCarousel();
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