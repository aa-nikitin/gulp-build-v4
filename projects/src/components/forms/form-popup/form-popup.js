import BaseFetch from '../../../js/modules/BaseFetch.js';
import configForms, { urlFormRequest } from '../../../js/configs/forms.js';

const formName = 'form-popup';
const phone = document.getElementById(`${formName}-phone`);
const notifyHandle = (text, color) => {
    const notifyBox = document.getElementById('notify-popup');
    const notifyContent = notifyBox.querySelector('.notify-popup__content');
    if (text) notifyContent.innerHTML = text;
    notifyBox.classList.add('active');
    if (color) notifyBox.style.setProperty('background-color', color);
    setTimeout(() => {
        notifyBox.classList.remove('active');
    }, 1500);
};

if (phone)
    IMask(document.getElementById(`${formName}-phone`), {
        mask: '+{7} (000) 000-00-00',
        lazy: true,
    });

const formOrder = new BaseFetch(
    {
        idForm: formName,
        fieldName: 'ffield',
        nameOrder: 'Обратный звонок',
        url: urlFormRequest,
        method: 'post',
        preloader: 'preloader',
        isWatch: true,
        isClear: true,
        isTest: false,
        success: (data) => {
            // console.log(data);
            notifyHandle('Заявка успешно отправлена', 'green');
            Fancybox.close();
        },
        error: (error) => {
            // console.log(error);
            notifyHandle(error, 'red');
        },
    },
    configForms
);
const elemForm = document.getElementById(`${formName}-send`);
if (elemForm)
    elemForm.addEventListener('click', (e) => {
        formOrder.start();
    });

formOrder.startHandle();

//--- start настройки над окном popup(fancybox)

//- простой вызов fancybox
// Fancybox.bind(`[${formName}]`, {});

//- для вызова fancybox с кастомными настройками(во всю высоту по правой или левой стороне)
Fancybox.bind(`[${formName}]`, {
    closeBtn: false,
    on: {
        'Carousel.ready': (fancybox) => {
            fancybox.container.classList.add(`${formName}-container`);
            fancybox.container.querySelector('.fancybox__slide').classList.add(`${formName}-iframe`);
        },
    },
});

//- обработчик по кнопки закрытия для fancybox
// document.querySelector(`.${formName}__close`).addEventListener('click', (e) => {
//     Fancybox.close();
// });

//--- end
