import resp from '../../../js/configs/responsive.js';
const { sm, lg } = resp;

document.addEventListener('DOMContentLoaded', function () {
    new Swiper('#gallery-slider', {
        loop: true,
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 1000,
        watchOverflow: true,
        // centeredSlides: true,
        pagination: {
            el: '#gallery-slider-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#gallery-slider-next',
            prevEl: '#gallery-slider-prev',
        },
        breakpoints: {
            // when window width is >= 420px
            [sm]: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            // when window width is >= 992
            [lg]: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
        },
    });
});
