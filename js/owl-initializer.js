var owl = $('.owl-carousel');
	owl.owlCarousel({
    items:5,
    loop:true,
    center:true,
    dots: false,
    autoWidth:true,
    autoplay:true,
    autoplayTimeout:2500,
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
