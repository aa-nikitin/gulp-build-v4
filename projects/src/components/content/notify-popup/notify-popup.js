const notifyBox = 'notify-popup';
document.querySelector(`.${notifyBox}__close`).addEventListener('click', (e) => {
    document.getElementById(`${notifyBox}`).classList.remove('active');
});
