export default class Validate {
    constructor() {}

    static checkRequire(value) {
        return !!value;
    }

    static checkEmail(value) {
        const regex = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        return regex.test(value);
    }

    static checkPhone(value) {
        const pattern = new RegExp(/\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/);
        return pattern.test(value);
    }

    // // проверят размер каждого файла на превышение
    // static checkSizeEachFiles(value, size) {
    //     let allow = true;
    //     for (let i = 0; i < value.length; i++) {
    //         const file = value[i];
    //         if (file.size > size) {
    //             allow = false;
    //         }
    //     }
    //     console.log(allow);
    //     return allow;
    // }

    // проверят суммарный размер всех файлов на превышение
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
