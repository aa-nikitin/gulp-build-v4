/**
 * Обработка действий по взаимодействию(открытию/скрытию тела при клике на заголовок) с Аккордионом / Раскрывающемся списком
 * Аккордион / Раскрывающийся список - в дальнейшем именуется как Аккардеон
 * Помимо контейнера элемента с классом, Аккордион должен обязательно содержать следующие элементы с классом '[className]-head' и '[className]-body'
 * где className - имя класса контейнера элемента
 * '[className]-head' - заголовок элемента Аккардеона, при нажатии на который раскрывается контент(при необходимости можно создать несколько таких элементов)
 * '[className]-body' - контент элемента Аккардеона
 * @version 1.0.0
 * @example projects/src/components/content/seo-text/seo-text.js
 * @example projects/src/components/categories/accordion/accordion.js
 */

export default class Accordion {
    classAccrodion; ///< (string)[параметр className] класс контейнера для Аккардеона
    showMultiple; ///< (boolean) если true, то можно разворачивать одновременно несколько элементов
    
    classAccrodionHead; ///< (string) класс для заголовка Аккардеона
    classAccrodionBody; ///< (string) класс для тела Аккардеона

    constructor({ className, showMultiple }) {
        if (!className) {
            console.error('Не заданн класс контейнера для Аккардеона / Раскрывающегося списка');
            return;
        }
        this.classAccrodion = className;
        this.classAccrodionHead = `${className}-head`;
        this.classAccrodionBody = `${className}-body`;
        this.showMultiple = !!showMultiple;
        this.#start();
    }

    /**
     * запускается в конструкторе, вызывает необходимые методы для формирования Аккардиона
     */
    #start() {
        this.#create();
    }

    /**
     * сворачивает все элементы аккардиона с поределенным классом
     */
    rollUp() {
        const accordionItems = document.querySelectorAll(`.${this.classAccrodion}.active`);

        accordionItems.forEach((item) => {
            const accordionBody = item.querySelector(`.${this.classAccrodionBody}`);
            item.classList.remove('active');
            accordionBody.style.height = '0px';
        });
    }

    /**
     * формирует взаимодействие с Аккардионом
     * обрабатывает клики на зоголовки и сворачивает/разворачивает контент
     */
    #create() {
        const accordionItems = document.querySelectorAll(`.${this.classAccrodion}`);

        accordionItems.forEach((item) => {
            const accordionHeads = item.querySelectorAll(`.${this.classAccrodionHead}`);
            const accordionBody = item.querySelector(`.${this.classAccrodionBody}`);
            const accordionBodyHeight = accordionBody.offsetHeight;
            setTimeout(() => {
                if (!item.classList.contains('active')) accordionBody.style.height = '0px';
                else accordionBody.style.height = `${accordionBodyHeight}px`;
            }, 200);
            accordionHeads.forEach((accordionHead) => {
                accordionHead.addEventListener('click', () => {
                    if (!item.classList.contains('active')) {
                        if (!this.showMultiple) this.rollUp();
                        accordionBody.style.height = `${accordionBodyHeight}px`;
                        item.classList.add('active');
                    } else {
                        accordionBody.style.height = '0px';
                        item.classList.remove('active');
                    }
                });
            });
        });
    }
}
