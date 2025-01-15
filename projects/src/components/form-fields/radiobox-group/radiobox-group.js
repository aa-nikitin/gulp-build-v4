const className = 'radiobox-group';
const radioboxGroups = document.querySelectorAll(`.${className}`);

const handleRadioboxGroup = (radioboxGroup, radiobox) => {
    const radioboxGroupEdit = radioboxGroup.querySelector(`.${className}__edit`);
    let idListRadioboxes = radioboxGroupEdit.value ? JSON.parse(radioboxGroupEdit.value) : [];
    
    idListRadioboxes = [radiobox.id];
    radioboxGroupEdit.value = idListRadioboxes.length ? JSON.stringify(idListRadioboxes) : '';
};

radioboxGroups.forEach((radioboxGroup) => {
    const radioboxes = radioboxGroup.querySelectorAll(`[name="radiobox-group"]`);
    const radioboxGroupEdit = radioboxGroup.querySelector(`.${className}__edit`);
    let idListRadioboxes = [];

    radioboxes.forEach((radiobox) => {
        if (radiobox.checked) {
            idListRadioboxes = [radiobox.id];
        }
        radiobox.addEventListener('change', () => {
            handleRadioboxGroup(radioboxGroup, radiobox);

            const event = new Event('input', { bubbles: true });
            radioboxGroupEdit.dispatchEvent(event);
        });
    });
    radioboxGroupEdit.value = idListRadioboxes.length ? JSON.stringify(idListRadioboxes) : '';
});
