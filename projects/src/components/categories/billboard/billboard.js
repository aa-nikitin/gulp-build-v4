document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.billboard-slider', {
        loop: true,
        slidesPerView: 1,
        speed: 1000,
        // centeredSlides: true,
        pagination: {
            el: '.billboard-slider-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.billboard-slider-next',
            prevEl: '.billboard-slider-prev',
        },
    });
});
