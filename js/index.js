const nav = document.getElementById('nav');
const checkbox = document.getElementById('menu-btn');

checkbox.addEventListener('change', function() {
  if (this.checked) {
    nav.style.backgroundColor = 'var(--main-transparent-color)';
  } else {
    nav.style.backgroundColor = '';
  }
});

const owl = $('.owl-carousel');
	owl.owlCarousel({
    items:5,
    loop:true,
    center:true,
    dots: false,
    autoWidth:true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:false
        },
        600:{
            items:3,
            nav:false
        },
        800:{
            items:5,
            nav:false
        }
    }
});