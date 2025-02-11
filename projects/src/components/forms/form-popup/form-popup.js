import BaseFetch from '../../../js/modules/forms/BaseFetch.js';
import configForms from '../../../js/configs/config-forms.js';

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
        url: 'https://test.ru/test/',
        method: 'post',
        preloader: 'preloader',
        isWatch: true,
        isClear: true,
        success: (data) => {
            notifyHandle('Заявка успешно отправлена', 'green');

            // console.log(data);
        },
        error: (error) => {
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
