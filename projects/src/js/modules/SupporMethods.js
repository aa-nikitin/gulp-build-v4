/**
 * Набор вспомогательных методов
 * @version 1.0.0
 * @example projects/zekor/js/modules/AnimateCounter.js
 */
export default class SupporMethods {
    constructor() {}
    /**
     * Получение параметров необходимых для отслеживания попадает ли блок в область видимости
     *
     * @param nameBlocks (string) - имя блока(блоков) которое ищем
     * @param callbackCheck (function) - колбэк функция в которую передаются 3 параметра:
     *      element (object) - элемент
     *      elementPosition (object) - информация о положении элемента
     *      windowPosition (object) - информация о положении окна(скролла)
     */
    static getScopeParams(nameBlocks, callbackCheck) {
        const listCounters = document.querySelectorAll(`${nameBlocks}`);
        listCounters.forEach((element) => {
            const elementPosition = {
                top: window.pageYOffset + element.getBoundingClientRect().top,
                left: window.pageXOffset + element.getBoundingClientRect().left,
                right: window.pageXOffset + element.getBoundingClientRect().right,
                bottom: window.pageYOffset + element.getBoundingClientRect().bottom,
            };

            const windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight,
            };

            callbackCheck(element, elementPosition, windowPosition);
        });
    }

    
    /**
     * Скролл к элементу
     *
     * @param nameIdBlock (string) - ID блока к которому необходимо проскролить
     */
    static scrollTo(nameIdBlock) {
        const sectionElement = document.getElementById(nameIdBlock);
        const paramsElement = sectionElement.getBoundingClientRect();
        const paramsBody = document.body.getBoundingClientRect();
        const offset = paramsElement.top - paramsBody.top;

        window.scrollTo({
            top: offset,
            left: 0,
            behavior: 'smooth',
        });
    }
}
