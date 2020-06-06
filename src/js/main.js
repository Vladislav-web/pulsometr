$(document).ready(function () {

    //! слайдер
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

    //! табы
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function () {
        $(this)
            .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
            .closest('div.main__container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
    });

    // вход в карточку
    // $('.catalog-item__link').each(function (i) {
    //   $(this).on('click', function (e) {
    //       e.preventDefault();
    //       $('.catalog-item__content').eq(i).toggleClass('catalog-item__content--active');
    //       $('.catalog-item__list').eq(i).toggleClass('catalog-item__list--active');
    //   })
    // })

    // выход из карточки
    // $('.catalog-item__back').each(function (i) {
    //   $(this).on('click', function (e) {
    //       e.preventDefault();
    //       $('.catalog-item__content').eq(i).toggleClass('catalog-item__content--active');
    //       $('.catalog-item__list').eq(i).toggleClass('catalog-item__list--active');
    //   })
    // })

    //! оптимизированный вариант
    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content--active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list--active');
            })
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //! Modal 
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    // при клике на кнопку вытягивает заголовок карточки
    $('.button--mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    // !валидация формы
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    //! Mask
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //! Ajax
    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //! Smooth scroll and pageup
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }

    });

    //! плавный scroll вверх
    $("a[href^='#']").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top + "px"
        });
        return false;
    });
});