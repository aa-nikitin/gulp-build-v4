import Validate from './Validate';

/**
 * Обработка форм, проверка полей и отправка запроса на сервер
 * Зарезервированный класс для контейнера '.field-container'
 * @version 1.0.0
 * @example projects/src/components/forms/form-page/form-page.js
 */

export default class BaseFetch {
    idForm; ///< (string) определяем основной контейнер по id формы вся работа с селекторами опирается на него
    fieldName; ///< (string) имя класса по которому в контейнере(idForm) находятся поля с которыми будет вестись работа
    method; ///< (string) метод которым буде отправлен запрос, в зависимости от этого вызывается внутренние методы класса с соотвестствующей обработкой
    url; ///< (string) путь к обработке запроса
    preloader; ///< (string) крутилка на время ожидания выполнения запроса, указывается ID прелоадера, если не указан то не отображается
    success; ///< (function) callback функция для дальнейшей обработки в случае если запрос выполнен успешно, предоставляет первый параметр с результатами от сервера в виде JSON
    error; ///< (function) callback функция для дальнейшей обработки в случае если запрос выполнен с ошибками, предоставляет первый параметр с информацией об ошибке
    isWatch; ///< (boolean) если true, отслеживаем изменения в полях при вводе и проверяем на корректность
    isClear; ///< (boolean) если true, после отправки очищаем поля(устанавливаем исходные значения)

    configRequire; ///< (object) объект с текстами и правилами для проверки ошибок на пустоту при заполненнии полей
    configEmail; ///< (object) объект с текстами и правилами для проверки email на корректность заполнения
    configPhone; ///< (object) объект с текстами и правилами для проверки телефона на корректность заполнения
    configFileSize; ///< (object) объект с текстами и правилами для проверки файла допустимый размер

    dataFields; ///< (array) хранит список полей с параметрами необходимыми для проверки и отправки
    // dataStartFields; ///< (array) стартовые значения полей

    

    constructor({ idForm, fieldName, method, url, preloader, success, error, isWatch, isClear }, configForms = {}) {
        this.idForm = idForm;
        this.fieldName = fieldName ? fieldName : 'ffield';
        this.method = method ? method : 'GET';
        this.url = url ? url : '/';
        this.preloader = preloader ? preloader : '';
        this.success = success ? success : undefined;
        this.error = error ? error : undefined;
        this.isWatch = !!isWatch;
        this.isClear = !!isClear;
        this.default = [];

        this.configRequire = configForms.require
            ? {
                  listError: configForms.require.listError ? configForms.require.listError : {},
                  error: configForms.require.error ? configForms.require.error : '',
              }
            : { listError: {}, error: '' };
        this.configEmail = configForms.email
            ? {
                  error: configForms.email.error ? configForms.email.error : '',
              }
            : { error: '' };
        this.configPhone = configForms.phone
            ? { error: configForms.phone.error ? configForms.phone.error : '' }
            : { error: '' };
        this.configFileSize = configForms['file-size']
            ? {
                  size: configForms['file-size'].size ? configForms['file-size'].size : 0,
                  error: configForms['file-size'].error ? configForms['file-size'].error : '',
              }
            : { size: 0, error: '' };
    }

    /**
     * взаимодействие с полем(создает / удаляет пометку об ошибке ) после проведения проверки
     *
     * @param check (boolean) - приходит в true если поле прошло проверку валидации
     * @param checkEmpty (boolean) - если в false то пустое поле не проверяется
     * @param message (string) - если в false то пустое поле не проверяется
     * @param fieldContainer (object) - корневой элемент поля
     * @return вернет false если проверка не пройдена и true если пройдена
     */
    #checked(check, checkEmpty, message, fieldContainer) {
        if (!check && checkEmpty) {
            fieldContainer.classList.add('error');
            fieldContainer.setAttribute('data-error', message);
            return false;
        } else {
            fieldContainer.classList.remove('error');
            return true;
        }
    }
    /**
     * проверка занчения поля на корректность при вводе
     */
    startHandle() {
        const elemForm = document.getElementById(this.idForm);
        if (!elemForm) return;
        const fields = elemForm.querySelectorAll(`.ffield`);
        fields.forEach((field) => {
            const errorWatch = field.closest('.error-watch');
            if (this.isWatch && errorWatch) {
                field.addEventListener('input', (e) => {
                    this.verify(field, errorWatch);
                });
            }
            const fieldType = field.getAttribute('data-type');
            switch (fieldType) {
                case 'checkbox':
                case 'radiobox':
                    this.default.push({ name: field.name, value: field.checked, type: fieldType, id: field.id });
                    break;

                default:
                    this.default.push({ name: field.name, value: field.value, type: fieldType, id: field.id });
                    break;
            }
        });
    }

    /**
     * метод верефикации который можно переопределить для дополнения к основному
     * @param checkItem (string) - тип поля (data-type)
     * @return вернет false если проверка не пройдена и true если пройдена
     */
    customVerify(checkItem) {
        return true;
    }

    /**
     * основной метод верефикации полей
     * @param field (object) - элемент поля
     * @param fieldContainer (object) - корневой элемент поля
     * @return вернет false если проверка не пройдена и true если пройдена
     */
    verify(field, fieldContainer) {
        const checks = field.getAttribute('data-checks').split(',');
        const fieldType = field.getAttribute('data-type');
        for (let i = 0; i < checks.length; i++) {
            const checkItem = checks[i].replace(/\s/g, '');
            switch (checkItem) {
                case 'require':
                    let fieldValue = field.value;
                    switch (fieldType) {
                        case 'checkbox':
                            fieldValue = field.checked;
                            break;
                        case 'radiobox':
                            fieldValue = field.checked;
                            break;
                        default:
                            break;
                    }
                    const isRequire = Validate.checkRequire(fieldValue);
                    const errorText = this.configRequire.listError[field.name]
                        ? this.configRequire.listError[field.name]
                        : this.configRequire.error;
                    if (!this.#checked(isRequire, true, errorText, fieldContainer)) return false;
                    break;

                case 'email':
                    const isEmail = Validate.checkEmail(field.value);
                    if (!this.#checked(isEmail, !!field.value, this.configEmail.error, fieldContainer)) return false;
                    break;

                case 'phone':
                    const isPhone = Validate.checkPhone(field.value);
                    if (!this.#checked(isPhone, !!field.value, this.configPhone.error, fieldContainer)) return false;
                    break;

                case 'file-size':
                    const isSizeFiles = Validate.checkSizeAllFiles(field.files, this.configFileSize.size);
                    if (!this.#checked(isSizeFiles, !!field.value, this.configFileSize.error, fieldContainer))
                        return false;
                    break;

                default:
                    break;
            }
            if (i === checks.length - 1) return this.customVerify(checkItem);
        }
        return true;
    }

    /**
     * метод обработки ответа после отправки на сервер
     * @param response (object) - ответ от сервера
     */

    async #responseHandle(response) {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        if (this.preloader) {
            const preloader = document.getElementById(this.preloader);
            preloader.classList.remove('active');
        }
        const results = await response.json();

        this.successHandle(results);
        if (this.isClear) {
            this.default.forEach((item) => {
                switch (item.type) {
                    case 'checkbox':
                    case 'radiobox':
                        document.getElementById(item.id).checked = item.value;
                        break;

                    default:
                        document.getElementById(item.id).value = item.value;
                        break;
                }
            });
        }
    }

    /**
     * метод который будет вызван в случае успешного ответа от сервера
     * @param results (object) - ответ от сервера
     */
    successHandle(results) {
        if (this.success)
            setTimeout(() => {
                this.success(results);
            }, 100);
    }

    /**
     * метод который будет вызван в случае ошибки
     * @param error (object) - ответ от сервера
     */
    errorHandle(error) {
        if (this.preloader) {
            const preloader = document.getElementById(this.preloader);
            preloader.classList.remove('active');
        }
        this.error(error.message);
        if (this.error) {
            setTimeout(() => {}, 100);
        }
    }

    /**
     * метод отправки через GET
     */
    async getSend() {
        const formData = {};

        for (let i = 0; i < this.dataFields.length; i++) {
            const field = this.dataFields[i];
            switch (field.type) {
                case 'file-field':
                    break;
                case 'select':
                    if (field.value) {
                        formData[field.name] = JSON.stringify(field);
                    }
                    break;
                case 'checkbox':
                    if (field.checked) {
                        formData[field.name] = JSON.stringify(field);
                    }
                    break;
                case 'checkbox-group':
                case 'radiobox-group':
                    if (field.value) {
                        formData[field.name] = JSON.stringify(field.value);
                    }
                    break;

                default:
                    if (field.value) formData[field.name] = field.value;
                    break;
            }
        }
        try {
            const response = await fetch(`${this.url}?` + new URLSearchParams(formData).toString(), {
                method: 'GET',
            });
            this.#responseHandle(response);
        } catch (error) {
            this.errorHandle(error);
        }
    }
    /**
     * метод отправки через POST
     */
    async postSend() {
        const formData = new FormData();
        for (let i = 0; i < this.dataFields.length; i++) {
            const field = this.dataFields[i];
            switch (field.type) {
                case 'file-field':
                    if (field.value.length) {
                        for (let j = 0; j < field.value.length; j++) {
                            const file = field.value[j];
                            formData.append(`${field.name}_${j}`, file);
                        }
                    }
                    break;
                case 'select':
                    if (field.value) {
                        formData.append(field.name, JSON.stringify(field));
                    }
                    break;
                case 'checkbox':
                    if (field.checked) {
                        formData.append(field.name, JSON.stringify(field));
                    }
                    break;
                case 'checkbox-group':
                case 'radiobox-group':
                    if (field.value) {
                        formData.append(field.name, JSON.stringify(field.value));
                    }
                    break;

                default:
                    if (field.value) formData.append(field.name, field.value);
                    break;
            }
        }

        // for (let [name, value] of formData) { //- для отладки formData
        //     console.log(name, value);
        // }

        try {
            const response = await fetch(this.url, {
                method: 'POST',
                body: formData,
            });

            await this.#responseHandle(response);
        } catch (error) {
            this.errorHandle(error);
        }
    }
    /**
     * метод отправки через PUT
     */
    async putSend() {
        console.log('пока нет обработки, можно отнаследоваться от BaseFetch и переопределить putSend');
    }
    /**
     * метод отправки через DELETE
     */
    async deleteSend() {
        console.log('пока нет обработки, можно отнаследоваться от BaseFetch и переопределить deleteSend');
    }

    /**
     * запускает проверку полей и отправку запроса на сервер
     */
    start() {
        const fields = document.getElementById(this.idForm).querySelectorAll(`.${this.fieldName}`);
        let allow = true;
        this.dataFields = [];
        fields.forEach((field) => {
            const fieldContainer = field.closest(`.field-container`);
            const fieldValue = field.value;
            const fieldName = field.name;
            const fieldType = field.getAttribute('data-type');
            const commonObj = { name: fieldName, type: fieldType, id: field.id };
            if (field.getAttribute('data-checks')) {
                if (!this.verify(field, fieldContainer)) allow = false;
            }
            switch (fieldType) {
                case 'text-field':
                case 'textarea':
                    this.dataFields.push({ value: fieldValue, ...commonObj });
                    break;

                case 'select':
                    this.dataFields.push({
                        value: field.getAttribute('data-value'),
                        caption: fieldValue,
                        ...commonObj,
                    });
                    break;
                case 'file-field':
                    this.dataFields.push({ value: field.files, ...commonObj });
                    break;
                case 'checkbox':
                case 'radiobox':
                    this.dataFields.push({ checked: field.checked, value: fieldValue, ...commonObj });
                    break;
                case 'checkbox-group':
                case 'radiobox-group':
                    const fieldValueList = fieldValue ? JSON.parse(fieldValue) : [];
                    let listValues = [];
                    if (fieldValueList.length) {
                        fieldValueList.forEach((fieldID) => {
                            const fieldCheckBox = document.getElementById(fieldID);
                            listValues.push({
                                value: fieldCheckBox.value,
                                caption: fieldCheckBox.getAttribute('data-caption'),
                                id: fieldID,
                            });
                        });
                    } else listValues = undefined;
                    if (listValues)
                        this.dataFields.push({
                            value: fieldType === 'radiobox-group' ? listValues[0] : listValues,
                            ...commonObj,
                        });

                    break;
                default:
                    break;
            }
            this.dataFields[fieldName] = {
                ...this.dataFields[fieldName],
                name: fieldName,
                type: fieldType,
                id: field.id,
            };
        });
        if (allow) {
            if (this.preloader) {
                const preloader = document.getElementById(this.preloader);
                preloader.classList.add('active');
            }
            switch (this.method) {
                case 'get':
                    this.getSend();
                    break;
                case 'post':
                    this.postSend();
                    break;
                case 'put':
                    this.putSend();
                    break;
                case 'delete':
                    this.deleteSend();
                    break;

                default:
                    console.error('Выбран не существующий метот(параметр method) доступны: (POST, GET, PUT, DELETE)');
                    break;
            }
        } else {
            if (this.error)
                setTimeout(() => {
                    this.error('Неккорректно заполнены поля');
                }, 100);
        }
    }
}
