import SupporMethods from './SupporMethods';

/**
 * Создает и запускает анимированные счетчики при попадании счетчика в область видимости
 * @version 1.0.0
 * @example ./app.js
 */

export default class AnimateCounter {
    nameBlocks; ///< (string) список имен блоков которые будет отслеживаться и в случае если они в зоне видимости, будет запущен счетчик
    classNameCounter; ///< (string) имя класса, счетчика или нескольких счетчиков внутри блока(nameBlocks)

    dataStartName; ///< (string) имя дата атрибута для начального значения счетчика(с которого стартует), значение по умолчанию ('data-start')
    dataEndName; ///< (string) имя дата атрибута для конечного значения счетчика(на котором заканчивает крутить), значение по умолчанию ('data-end')
    dataSpeedName; ///< (string) имя дата атрибута для скорости изменения, значение по умолчанию ('data-speed')
    dataStepName; ///< (string) имя дата атрибута для шага счетчика, значение по умолчанию ('data-step')

    constructor(params) {
        const { nameBlocks, classNameCounter, dataStartName, dataEndName, dataSpeedName, dataStepName } = params;

        this.nameBlocks = nameBlocks;
        this.classNameCounter = classNameCounter;

        this.dataStartName = dataStartName ? dataStartName : 'data-start';
        this.dataEndName = dataEndName ? dataEndName : 'data-end';
        this.dataSpeedName = dataSpeedName ? dataSpeedName : 'data-speed';
        this.dataStepName = dataStepName ? dataStepName : 'data-step';
    }


    /**
     * Функция для запуска анимации счетчика(можно как на возростание так и на убывание)
     *
     * @param element (object) - элемент
     * @param start (number) - число с которого стартует счетчик
     * @param end (number) - число которым заканчивает
     * @param speed (number) - скорость
     * @param step (number) - шаг увеличения при анимации, по умолчанию - 1
     */
    #animateValue(element, start, end, speed, step = 1) {
        if (start === end) return;
        const range = end - start;
        let current = start;
        const increment = end > start ? step : step * -1;
        const stepTime = Math.abs(Math.floor(speed / range));
        const timer = setInterval(function () {
            current += increment;
            element.innerHTML = new Intl.NumberFormat('fr-FR').format(current);
            if (current >= end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    /**
     * Отслеживаем попадает ли блок в область видимости скрола, если попадает активируем анимацию счетчика
     *
     * @param callbackCheck (function) - колбэк функция(не обязательный параметр, если передан то выполнится то что передано при вызове, иначе то что в методе)
     * в которую передаются 3 параметра:
     *      element (object) - элемент
     *      elementPosition (object) - информация о положении элемента
     *      windowPosition (object) - информация о положении окна(скролла)
     */
    watch(callbackCheck) {
        SupporMethods.getScopeParams(this.nameBlocks, (element, elementPosition, windowPosition) => {
            if (callbackCheck) {
                callbackCheck(elementPosition, windowPosition);
            } else {
                // elementPosition.right > windowPosition.left &&
                // elementPosition.left < windowPosition.right
                if (elementPosition.bottom > windowPosition.top && elementPosition.top < windowPosition.bottom) {
                    const listCounters = element.querySelectorAll(`.${this.classNameCounter}`);

                    if (!element.classList.contains('activated')) {
                        listCounters.forEach((item) => {
                            const counterStart = Number(item.getAttribute(this.dataStartName));
                            const counterEnd = Number(item.getAttribute(this.dataEndName));
                            const counterSpeed = Number(item.getAttribute(this.dataSpeedName));
                            const counterStep = Number(item.getAttribute(this.dataStepName));
                            
                            this.#animateValue(
                                item,
                                counterStart,
                                counterEnd,
                                counterSpeed,
                                counterStep ? counterStep : 1
                            );
                        });
                        element.classList.add('activated');
                    }
                }
            }
        });
    }
}
