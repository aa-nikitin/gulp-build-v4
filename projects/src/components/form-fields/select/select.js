const className = 'select';
const selects = document.querySelectorAll(`.${className}`);
const selectInputs = document.querySelectorAll(`.${className}__input`);

selectInputs.forEach((selectInput) => {
    if (selectInput.value) {
        const selectItem = selectInput.closest(`.${className}`).querySelector(`[data-value="${selectInput.value}"]`);
        const selectCaption = selectItem.innerHTML;
        const selectValue = selectItem.getAttribute('data-value');
        selectInput.setAttribute('data-value', selectValue);
        selectInput.value = selectCaption;
        selectItem.classList.add('active');
    }
    selectInput.addEventListener('click', () => {
        const selectBox = selectInput.closest(`.${className}`);
        const hasActive = selectBox.classList.contains('active');
        if (hasActive) {
            selectBox.classList.remove('active');
        } else {
            selects.forEach((select) => {
                select.classList.remove('active');
            });
            selectBox.classList.add('active');
        }
    });
});

document.addEventListener('click', (event) => {
    const selectBox = document.querySelectorAll(`.${className}`);
    if (!event.target.closest(`.${className}`)) {
        selectBox.forEach((selectList) => {
            selectList.classList.remove('active');
        });
    }
});

const selectItemsAll = document.querySelectorAll(`.${className}__list-item`);

document.addEventListener('click', () => {
    selectItemsAll.forEach((selectItem) => {
        selectItem.addEventListener('click', () => {
            const selectBox = selectItem.closest(`.${className}`);
            const selectItems = selectBox.querySelectorAll(`.${className}__list-item`);
            const valueItem = selectItem.getAttribute('data-value');
            const hasActive = selectItem.classList.contains('active');
            if (hasActive) return;
            const htmlItem = selectItem.innerHTML;
            // selectBox.setAttribute('data-value', valueItem);
            // selectBox.querySelector(`.${className}__input`).setAttribute('data-value', htmlItem);
            const selectInput = selectBox.querySelector(`.${className}__input`);
            selectInput.value = htmlItem;
            selectInput.setAttribute('data-value', valueItem);
            selectInput.setAttribute('value', htmlItem);
            selectBox.classList.remove('active');
            selectItems.forEach((selectListItem) => {
                selectListItem.classList.remove('active');
            });
            selectItem.classList.add('active');

            const event = new Event('input', { bubbles: true });
            selectInput.dispatchEvent(event);
        });
    });
});
