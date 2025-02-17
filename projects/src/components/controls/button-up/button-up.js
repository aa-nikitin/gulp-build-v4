const buttonUpName = 'button-up';
window.buttonUpScroll = (scrollTop) => {
    const buttonUp = document.querySelector(`.${buttonUpName}`);
    if (!buttonUp) return;
    if (scrollTop > 400) buttonUp.classList.add('active');
    else buttonUp.classList.remove('active');
};
const buttonUp = document.querySelector(`.${buttonUpName}`);
if (buttonUp)
    buttonUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    });
