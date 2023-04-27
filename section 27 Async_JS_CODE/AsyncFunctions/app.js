// async function hello() {
// }


// const sing = async () => {
//     throw "OH NO, PROBLEM!"
//     return 'LA LA LA LA'
// }

// sing()
//     .then(data => {
//         console.log("PROMISE RESOLVED WITH:", data)
//     })
//     .catch(err => {
//         console.log("OH NO, PROMISE REJECTED!")
//         console.log(err)
//     })

//usually an async function coz we need to check the database
const login = async (username, password) => {
    if (!username || !password) throw "missing credentials";
    if (password === 'corgifeet') return 'Welcome';
    throw 'Invalid Password'
}

login('abdc', 'corgifeet')
    .then(msg => {
        console.log('LOGGED IN');
        console.log(msg)
    })
    .catch(err => {
        console.log('ERROR');
        console.log(err)
    })


const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

async function rainbow() {
    await delayedColorChange('red', 1000);
    await delayedColorChange('orange', 1000);
}

rainbow().then(() => console.log("END OF RAINBOW!"));
//same as
async function printRainbow() {
    await rainbow();
    console.log("END OF RAINBOW!");
}

async function makeTwoRequests() {
    try {
        let data = await fakeRequest('/page1');
        console.log(data);
    } catch (e) {
        console.log("CAUGHT AN ERROR");
        console.log(e);
    }
}

