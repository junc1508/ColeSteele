const btn = document.querySelector('button');
const h1 = document.querySelector('h1');
btn.addEventListener('click', function () {
    // set the background color to body
    const newColor = MakeRandomColor();
    document.body.style.backgroundColor = newColor;
    h1.innerText = newColor;
})

const MakeRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgb(${r}, ${g}, ${b})`;

}
