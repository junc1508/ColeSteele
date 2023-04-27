const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

const buttons = document.querySelectorAll('button');
// loop over all buttons
//change color only for the button clicked
for (let button of buttons) {
    button.addEventListener('click', colorize);
}

function colorize() {
    this.style.backgroundColor = makeRandColor();
}