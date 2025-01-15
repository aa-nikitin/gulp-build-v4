const className = 'checkbox-group';
const checkboxGroups = document.querySelectorAll(`.${className}`);

const handleCheckboxGroup = (checkboxGroup, checkbox) => {
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
    const checkboxes = checkboxGroup.querySelectorAll(`[name="checkbox-group"]`);
    const checkboxGroupEdit = checkboxGroup.querySelector(`.${className}__edit`);
    const idListCheckboxes = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            idListCheckboxes.push(checkbox.id);
        }
        checkbox.addEventListener('change', () => {
            handleCheckboxGroup(checkboxGroup, checkbox);

            const event = new Event('input', { bubbles: true });
            checkboxGroupEdit.dispatchEvent(event);
        });
    });
    checkboxGroupEdit.value = idListCheckboxes.length ? JSON.stringify(idListCheckboxes) : '';
});
