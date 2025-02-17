// window.Handlebars = Handlebars; // вывести что либо глобально, может быть полезно для jQuery

Fancybox.bind();

import './components/controls/_index';
import './components/form-fields/_index';
import './components/content/_index';
import './components/elements/_index';
import './components/categories/_index';
import './components/forms/_index';

let delayTimer;
window.addEventListener(
    'scroll',
    function () {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function () {
            const scrollTop = window.scrollY;

            buttonUpScroll(scrollTop); // projects/src/components/controls/button-up/button-up.js

        }, 300);
    },
    true
);
