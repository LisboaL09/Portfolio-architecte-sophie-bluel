export function setActiveButton(activeButton) {

    const filter = document.querySelector('.filter');

    const buttons = filter.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}