export default {
    require: {
        listError: {
            'name' : 'необходимо заполнить Имя',
            'phone' : 'необходимо заполнить Телефон',
            'email' : 'необходимо заполнить E-mail'
        },
        error: 'обязательно для заполнения',
    },
    email: {
        error: 'некорректно введен E-mail',
    },
    phone: {
        error: 'некорректно введен Телефон',
    },
    'file-size': {
        size: 5242880, // 5Мб
        error: 'размер файлов превышает 5 Мб',
    },
};

export const urlFormRequest = '/assets/components/queries/form-send.php';
