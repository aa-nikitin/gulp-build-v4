// window.Handlebars = Handlebars; // вывести что либо глобально, может быть полезно для jQuery

Fancybox.bind();

import AnimateCounter from './js/modules/AnimateCounter';

import './components/controls/_index';
import './components/form-fields/_index';
import './components/content/_index';
import './components/elements/_index';
import './components/categories/_index';
import './components/forms/_index';

// const aboutCounter = new AnimateCounter({
//     nameBlocks: '.about-counters',
//     classNameCounter: 'animate-counter',
//     dataStartName: 'data-start',
//     dataEndName: 'data-end',
//     dataSpeedName: 'data-speed',
//     dataStepName: 'data-step',
// }); // анимированные счетчики создание

let delayTimer;
window.addEventListener(
    'scroll',
    function () {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function () {
            const scrollTop = window.scrollY;

            buttonUpScroll(scrollTop); // projects/src/components/controls/button-up/button-up.js

            // aboutCounter.watch(); // анимированные счетчики вызов

        }, 300);
    },
    true
);

window.addEventListener('resize', () => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
        location.reload();
    }, 200);
});
