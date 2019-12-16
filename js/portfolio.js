const buttonMore = document.querySelector('.big-firstrow');
const moreInfo = document.querySelector('.mc-cremonese');
const closeButton = document.querySelector('.button-btn');

buttonMore.addEventListener('click', function() {
    moreInfo.classList.toggle('test-visible');
})
closeButton.addEventListener('click', function() {
    moreInfo.classList.toggle('test-visible');
})

var owl = $('.gallery');
	owl.owlCarousel({
    items:1,
    loop:true,
    center:true,
    dots: false,
    autoWidth: false,
    animateOut: 'fadeOutLeft',
    animateIn: 'fadeinLeft',
    autoplay:true,
    autoplayTimeout:2500,
    autoplayHoverPause:true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:false
        },
        750:{
            items:2,
            nav:false
        }
    }
});