const className = 'file-field';
const fileInputs = document.querySelectorAll(`.${className}__input`);
const fileRemoves = document.querySelectorAll(`.${className}__remove`);

fileInputs.forEach((fileInput) => {
    const filesBox = fileInput.closest(`.${className}`);
    const defaultCaption = filesBox.querySelector(`.${className}__input-label`).getAttribute('data-value');
    fileInput.addEventListener('change', (e) => {
        let files = e.target.files;
        let msgFiles = '';

        filesBox.classList.add('active');

        if (files.length > 1) {
            msgFiles = `Выбрано файлов: ${files.length}`;
        } else if (files.length === 1) {
            msgFiles = files[0].name;
        } else {
            msgFiles = defaultCaption;
            filesBox.classList.remove('active');
        }
        filesBox.querySelector(`.${className}__input-label`).setAttribute('data-value', msgFiles);
    });
});

fileRemoves.forEach((fileRemove) => {
    const filesBox = fileRemove.closest(`.${className}`);
    const defaultCaption = filesBox.querySelector(`.${className}__input-label`).getAttribute('data-value');
    fileRemove.addEventListener('click', (e) => {
        const inputFile = filesBox.querySelector(`.${className}__input`);
        filesBox.classList.remove('active');
        inputFile.value = '';
        filesBox.querySelector(`.${className}__input-label`).setAttribute('data-value', defaultCaption);

        const event = new Event('input', { bubbles: true });
        inputFile.dispatchEvent(event);
    });
});
