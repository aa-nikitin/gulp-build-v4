// необходимо указать в переменной radioboxGroups селекторы всех разновидностей переключателей(через запятую)
// например: (`.radiobox-group, .radiobox-btn-group, .radiobox-img-group`)

const radioboxGroups = document.querySelectorAll(`.radiobox-group`);

const handleRadioboxGroup = (radioboxGroup, radiobox, className) => {
    const radioboxGroupEdit = radioboxGroup.querySelector(`.${className}__edit`);
    let idListRadioboxes = radioboxGroupEdit.value ? JSON.parse(radioboxGroupEdit.value) : [];
    
    idListRadioboxes = [radiobox.id];
    radioboxGroupEdit.value = idListRadioboxes.length ? JSON.stringify(idListRadioboxes) : '';
};

radioboxGroups.forEach((radioboxGroup) => {
    const radioboxes = radioboxGroup.querySelectorAll(`[data-type="radiobox"]`);
    const className = radioboxGroup.classList[0];
    const radioboxGroupEdit = radioboxGroup.querySelector(`.${className}__edit`);
    let idListRadioboxes = [];

    radioboxes.forEach((radiobox) => {
        if (radiobox.checked) {
            idListRadioboxes = [radiobox.id];
        }
        radiobox.addEventListener('change', () => {
            handleRadioboxGroup(radioboxGroup, radiobox, className);

            const event = new Event('input', { bubbles: true });
            radioboxGroupEdit.dispatchEvent(event);
        });
    });
    radioboxGroupEdit.value = idListRadioboxes.length ? JSON.stringify(idListRadioboxes) : '';
});
