const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.random();

        setTimeout(() => {
            if (rand < 0.7) {
                resolve('You pass');
            }
            reject('Error');

        }, 1000)
    })
}


// fakeRequest('/dogs/1')
//     .then((data) => {
//         console.log('Done');
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log('NO!!!');
//         console.log(err)
//     })


//we will never reject it because we just want to change color
const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

delayedColorChange('red', 1000)
    .then(() => {
        return delayedColorChange('orange', 1000);
    })
    .then(() => delayedColorChange('yellow', 1000))
    .then(() => {
        delayedColorChange('violet', 1000)
    })




