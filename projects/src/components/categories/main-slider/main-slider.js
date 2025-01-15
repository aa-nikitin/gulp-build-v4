document.addEventListener('DOMContentLoaded', function () {
    new Swiper('#main-slider', {
        loop: true,
        slidesPerView: 1,
        speed: 1000,
        // centeredSlides: true,
        pagination: {
            el: '#main-slider-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#main-slider-next',
            prevEl: '#main-slider-prev',
        },
    });
});
