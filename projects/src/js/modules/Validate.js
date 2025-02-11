/**
 * Набор методов для валидации данных
 * @version 1.0.0
 * @example projects/src/js/modules/BaseFetch.js
 */
export default class Validate {
    constructor() {}
    /**
     * проверка(поля) на пустоту
     *
     * @param value (string) - значение(поля)
     * @return вернет true если поле не пустое
     */
    static checkRequire(value) {
        return !!value;
    }

    /**
     * проверка на кореектность ввода email
     *
     * @param value (string) - значение(поля)
     * @return вернет true если email введен корректно
     */
    static checkEmail(value) {
        const regex = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        return regex.test(value);
    }


    /**
     * проверка телефона на кореектность ввода 
     *
     * @param value (string) - значение(поля)
     * @return вернет true если телефон введен корректно
     */
    static checkPhone(value) {
        const pattern = new RegExp(/\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/);
        return pattern.test(value);
    }

    /**
     * проверка размера каждого файла на превышение
     *
     * @param value (object) - параметры файла
     * @param size (number) - разрешенный размер файла
     * @return вернет true если проверка пройдена успешно
     */
    static checkSizeEachFile(value, size) {
        let allow = true;
        for (let i = 0; i < value.length; i++) {
            const file = value[i];
            if (file.size > size) {
                allow = false;
            }
        }
        return allow;
    }

    /**
     * проверят суммарный размер всех файлов на превышение
     *
     * @param value (object) - параметры файла
     * @param size (number) - разрешенный размер всех файлов суммарно
     * @return вернет true если проверка пройдена успешно
     */
    static checkSizeAllFiles(value, size) {
        let sumSize = 0;
        for (let i = 0; i < value.length; i++) {
            const file = value[i];
            sumSize += file.size;
        }
        if (sumSize > size) return false;

        return true;
    }
}
