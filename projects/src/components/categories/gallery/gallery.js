document.addEventListener('DOMContentLoaded', function () {
    new Swiper('#gallery-slider', {
        loop: true,
        slidesPerView: 6,
        speed: 1000,
        // centeredSlides: true,
        pagination: {
            el: '#gallery-slider-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#gallery-slider-next',
            prevEl: '#gallery-slider-prev',
        },
    });
});
