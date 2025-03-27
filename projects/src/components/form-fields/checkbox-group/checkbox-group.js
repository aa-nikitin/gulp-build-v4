// необходимо указать в переменной checkboxGroups селекторы всех разновидностей переключателей(через запятую)
// например: (`.checkbox-group, .checkbox-btn-group, .checkbox-img-group`)

const checkboxGroups = document.querySelectorAll(`.checkbox-group, .checkbox-img-group, .checkbox-btn-group`);

const handleCheckboxGroup = (checkboxGroup, checkbox, className) => {
    const checkboxGroupEdit = checkboxGroup.querySelector(`.${className}__edit`);
    const idListCheckboxes = checkboxGroupEdit.value ? JSON.parse(checkboxGroupEdit.value) : [];
    const indexCheckbox = idListCheckboxes.indexOf(checkbox.id);

    if (checkbox.checked) {
        idListCheckboxes.push(checkbox.id);
    } else {
        idListCheckboxes.splice(indexCheckbox, 1);
    }

    checkboxGroupEdit.value = idListCheckboxes.length ? JSON.stringify(idListCheckboxes) : '';
};

checkboxGroups.forEach((checkboxGroup) => {
    const checkboxes = checkboxGroup.querySelectorAll(`[data-type="checkbox"]`);
    const className = checkboxGroup.classList[0];
    const checkboxGroupEdit = checkboxGroup.querySelector(`.${className}__edit`);
    const idListCheckboxes = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            idListCheckboxes.push(checkbox.id);
        }
        checkbox.addEventListener('change', (e) => {
            // console.log(checkbox.closest('.field-container').getAttribute('data-type-group'));
            const typeGroupContainer = e.target.closest('.field-group-container');
            const typeGroup = typeGroupContainer.getAttribute('data-type-group');
            const necessary = typeGroupContainer.getAttribute('data-necessary');
            
            if (typeGroup === 'radiobox') {
                const checkboxGroupEdit = checkboxGroup.querySelector(`.${className}__edit`);
                const checkboxesGroup = typeGroupContainer.querySelectorAll(`[data-type="checkbox"]`);
                checkboxGroupEdit.value = '';
                checkboxesGroup.forEach((item) => {
                    if (item.id !== e.target.id) item.checked = false;
                });
            }
            if (necessary) {
                const checkboxesGroup = typeGroupContainer.querySelectorAll(`[data-type="checkbox"]:checked`);
                if (!checkboxesGroup.length) {
                    e.target.checked = true;
                }
            }

            handleCheckboxGroup(checkboxGroup, checkbox, className);

            const event = new Event('input', { bubbles: true });
            checkboxGroupEdit.dispatchEvent(event);
        });
    });
    checkboxGroupEdit.value = idListCheckboxes.length ? JSON.stringify(idListCheckboxes) : '';
});
