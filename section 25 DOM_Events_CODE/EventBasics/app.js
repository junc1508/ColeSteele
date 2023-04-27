const btn = document.querySelector('#v2');
btn.onclick = function () {
    console.log("you clicked me")
}

function scream() {
    console.log('ahhhh')
}

btn.onmouseenter = scream;

const btn3 = document.querySelector('#v3');

btn3.addEventListener('click', () => {
    alert('btn3!');
})