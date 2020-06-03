$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1000,
        slidesToShow: 1,
        adaptiveHeight: true,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/right.png"></button>',
        responsive: [{
            breakpoint: 884,
            settings: {
                dots: false,
                arrows: false,
            }
        }]

    });
});